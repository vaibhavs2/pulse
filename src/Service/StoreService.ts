import {FirebaseDatabaseTypes, firebase} from '@react-native-firebase/database';

import {ReturnData, StoreInfo, UserStoreList} from '../types';

class StoreService {
  private dbReferance = firebase
    .app()
    .database(
      'https://assign-project-e48fc-default-rtdb.asia-southeast1.firebasedatabase.app/',
    );

  async getUserStores(
    userId: string,
    cursor = '0',
    limit = 15,
  ): Promise<ReturnData<UserStoreList>> {
    try {
      const querySnapshot = await this.dbReferance
        .ref(`/users/${userId}/stores/`)
        .orderByKey()
        .startAt(cursor)
        .limitToFirst(limit + 1)
        .once('value');

      const storeIds: Array<{storeId: string; docKey: string}> = [];
      querySnapshot.forEach(childSnapshot => {
        childSnapshot.val() &&
          storeIds.push({
            storeId: childSnapshot.val(),
            docKey: childSnapshot.key!,
          });
        return undefined;
      });

      let haveMore = storeIds.length >= limit + 1;
      let nextCursor = storeIds.pop()?.docKey!;
      return {data: {storeIds, haveMore, nextCursor}, errorMessage: undefined};
    } catch (error: any) {
      return {
        data: undefined,
        errorMessage: error.message,
      };
    }
  }

  async getStoreInfo(storeId: string): Promise<ReturnData<StoreInfo>> {
    try {
      const storeInfo = await this.dbReferance
        .ref(`stores/${storeId}/`)
        .once('value');
      return {errorMessage: undefined, data: storeInfo.val()};
    } catch (error: any) {
      return {
        errorMessage: error.message,
        data: undefined,
      };
    }
  }

  async searchUserStores(
    userId: string,
    cursor?: string,
    searchQuery?: string,
    limit = 20,
  ): Promise<ReturnData<Array<StoreInfo>>> {
    try {
      const storeRef = this.dbReferance.ref('/stores/');
      let query = storeRef.orderByKey();

      if (searchQuery) {
        query = storeRef
          .orderByChild('name')
          .startAt(searchQuery)
          .endAt(searchQuery + '\uf8ff');
      }
      if (cursor) {
        query = query.startAt(cursor);
      }

      const response = await query.limitToFirst(limit).once('value');

      if (!response.exists()) {
        if (searchQuery) throw new Error('No match found!');
        else throw new Error('Got error, try fetching again!');
      }

      const searchresults: Array<StoreInfo> = [];
      response.forEach(snapshot => {
        searchresults.push({
          ...snapshot.val(),
          id: snapshot.key,
        });
        return undefined;
      });

      const checkStatus = await Promise.all(
        searchresults.map(async item => {
          const userStore = await this.dbReferance
            .ref(`users/${userId}/stores`)
            .orderByValue()
            .equalTo(item.id)
            .once('value');
          if (userStore.exists()) return item;
          return null;
        }),
      );
      const userStores = checkStatus.filter(
        item => item != null,
      ) as StoreInfo[];

      return {
        errorMessage: undefined,
        data: userStores,
      };
    } catch (error: any) {
      console.log('limitToFirst(limit)', error);
      return {
        errorMessage: error.message,
        data: undefined,
      };
    }
  }
}

export const userStoreService = new StoreService();
