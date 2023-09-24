import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';

import {NativeScreenProps, StoreInfo} from '../../types';
import {ScreenContainer} from '../../GlobalComponents';
import {userStoreService} from '../../Service/StoreService';
import UserService from '../../Service/UserService';
import {StoreItem} from './components/StoreItem';
import {SearchInput} from './components/SearchInput';

export function HomeScreen(props: NativeScreenProps<'HomeScreen'>) {
  const [getAllUserStores, setAllUserStore] = useState<Array<StoreInfo>>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const onEndReachedDuringMomentum = useRef(true);
  const filterAttrubute = useRef();

  useEffect(() => {
    fetchAllUserStores();
  }, []);

  const fetchAllUserStores = async (
    nextCursor?: string,
    searchQuery?: string,
  ) => {
    !nextCursor && setLoading(true);
    const stores = await userStoreService.searchUserStores(
      UserService.getCurrentUser()?.uid!,
      nextCursor,
      searchQuery,
    );

    if (stores.errorMessage) {
      ToastAndroid.show(stores.errorMessage, ToastAndroid.LONG);
      setErrorMessage(stores.errorMessage);
    } else {
      if (nextCursor) {
        getAllUserStores?.pop();
        setAllUserStore(getAllUserStores?.concat(stores.data!));
      } else {
        setAllUserStore(stores.data!);
      }
    }
    setLoading(false);
  };

  const onLoadMore = async () => {
    if (!getAllUserStores.length || onEndReachedDuringMomentum.current) return;
    setLoadingMore(true);
    await fetchAllUserStores(getAllUserStores[getAllUserStores.length - 1].id);
    onEndReachedDuringMomentum.current = true;
    setLoadingMore(false);
  };

  const onSearch = (searchQuery: string) => {
    fetchAllUserStores(undefined, searchQuery);
  };

  const onStorePress = (storeId: string) => {};

  return (
    <ScreenContainer
      navigationTitle="Stores"
      SafeEdges={['left', 'right', 'top']}>
      <SearchInput onClearPressed={fetchAllUserStores} onInput={onSearch} />
      <FlatList
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        data={getAllUserStores}
        renderItem={({item}) => <StoreItem {...item} onPress={onStorePress} />}
        keyExtractor={(_, index) => _.id + index}
        ListEmptyComponent={
          <View style={styles.listEmpty}>
            {loading ? (
              <ActivityIndicator color={'black'} />
            ) : (
              <TouchableOpacity
                onPress={() => {
                  fetchAllUserStores();
                }}>
                <Text>{errorMessage}</Text>
                <Text>Retry?</Text>
              </TouchableOpacity>
            )}
          </View>
        }
        ListFooterComponent={
          <View style={styles.footer}>
            {loadingMore && <ActivityIndicator />}
          </View>
        }
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.1}
        onMomentumScrollBegin={() => {
          onEndReachedDuringMomentum.current = false;
        }}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {flexGrow: 1},
  listEmpty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    paddingVertical: 24,
  },
});
