import firestore from '@react-native-firebase/firestore';
import {Restaurant, RestaurantCuisine, ReturnData} from '../types';

class RestaurantService {
  private restaurantCollection = firestore().collection('restaurants');

  async getNearByRestaurants(
    cursor = 0,
    limit = 5,
  ): Promise<ReturnData<{restaurants: Array<Restaurant>; haveMore: boolean}>> {
    try {
      const ducumentSnapshot = await this.restaurantCollection
        .where('distance', '<=', 10)
        .limit(5)
        .orderBy('distance', 'asc')
        .startAfter(cursor)
        .get();

      const restaurants: Array<Restaurant> = [];

      ducumentSnapshot.forEach(docs => {
        restaurants.push({...(docs.data() as Restaurant), id: docs.id});
      });

      let haveMore = restaurants.length == limit;

      return {data: {restaurants, haveMore}, errorMessage: undefined};
    } catch (error: any) {
      return {
        data: {restaurants: [], haveMore: false},
        errorMessage: error.message,
      };
    }
  }

  async getRestaurantCuisine(
    restaurantId: string,
  ): Promise<ReturnData<Array<RestaurantCuisine>>> {
    try {
      const restaurantMenu: Array<RestaurantCuisine> = [];
      const cuisineDocs = await this.restaurantCollection
        .doc(restaurantId)
        .collection('cuisine')
        .get();
      cuisineDocs.forEach(docs => {
        const docsData = docs.data();
        restaurantMenu.push({
          id: docs.id,
          name: docsData.name,
          data: docsData.items,
        });
      });

      if (restaurantMenu.length == 0) {
        throw new Error('No items available for now');
      }
      return {errorMessage: undefined, data: restaurantMenu};
    } catch (error: any) {
      return {
        errorMessage: error.message,
        data: [],
      };
    }
  }
}

export const userRestaurantService = new RestaurantService();
