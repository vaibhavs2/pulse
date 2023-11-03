import React, {useRef, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  ToastAndroid,
  View,
} from 'react-native';

import {NativeScreenProps, Restaurant} from '../../types';
import {ScreenContainer} from '../../GlobalComponents';
import {userRestaurantService} from '../../Service/RestaurantsService';
import {RestaurantItem} from './components/RestaurantItem';
import {LoadingError} from '../../GlobalComponents/LoadingError';
import auth from '@react-native-firebase/auth';

export function HomeScreen(props: NativeScreenProps<'HomeScreen'>) {
  const [getAllNearbyRestaurants, setAllNearbyRestaurants] = useState<{
    restaurants: Array<Restaurant>;
    haveMore: boolean;
  }>({restaurants: [], haveMore: true});
  const [loadingMore, setLoadingMore] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const onEndReachedDuringMomentum = useRef(true);

  useEffect(() => {
    fetchNearbyRestaurants();
  }, []);

  const fetchNearbyRestaurants = async (nextCursor: number = 0) => {
    setErrorMessage('');
    const restaurants = await userRestaurantService.getNearByRestaurants(
      nextCursor,
    );

    if (restaurants.errorMessage) {
      ToastAndroid.show(restaurants.errorMessage, ToastAndroid.LONG);
      setErrorMessage(restaurants.errorMessage);
    } else {
      if (nextCursor) {
        setAllNearbyRestaurants({
          restaurants: getAllNearbyRestaurants.restaurants.concat(
            restaurants.data?.restaurants!,
          ),
          haveMore: restaurants.data?.haveMore!,
        });
      } else {
        setAllNearbyRestaurants(restaurants.data!);
      }
    }
  };

  const onLoadMore = async () => {
    if (
      !getAllNearbyRestaurants.restaurants.length ||
      !getAllNearbyRestaurants.haveMore ||
      onEndReachedDuringMomentum.current
    )
      return;
    setLoadingMore(true);
    fetchNearbyRestaurants(getAllNearbyRestaurants.restaurants.length);
    onEndReachedDuringMomentum.current = true;
    setLoadingMore(false);
  };

  const onRestaurantPressed = (storeId: string, name: string) => {
    props.navigation.navigate('RestaurantMenu', {storeId, name});
  };

  return (
    <ScreenContainer
      cart
      navigationTitle="Stores"
      SafeEdges={['left', 'right', 'top']}>
      <FlatList
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        data={getAllNearbyRestaurants.restaurants}
        renderItem={({item}) => (
          <RestaurantItem {...item} onPress={onRestaurantPressed} />
        )}
        keyExtractor={(_, index) => _.id + index}
        ListEmptyComponent={() => (
          <LoadingError
            error={errorMessage}
            onRetryPressed={() => fetchNearbyRestaurants()}
          />
        )}
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
