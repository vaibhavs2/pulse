import {useEffect, useState} from 'react';
import {SectionList, Text} from 'react-native';

import {ScreenContainer} from '../../GlobalComponents';
import {NativeScreenProps, RestaurantCuisine} from '../../types';
import {MenuItem} from './components/MenuItem';
import {userRestaurantService} from '../../Service/RestaurantsService';
import {LoadingError} from '../../GlobalComponents/LoadingError';

type Props = NativeScreenProps<'RestaurantMenu'>;
export function RestaurantMenu(props: Props) {
  const [allCuisine, setAllCuisine] = useState<Array<RestaurantCuisine>>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const cuisine = await userRestaurantService.getRestaurantCuisine(
      props.route.params.storeId,
    );
    if (cuisine.errorMessage) {
      setError(cuisine.errorMessage);
    }
    {
      setAllCuisine(cuisine.data!);
    }
  };

  return (
    <ScreenContainer cart canGoback navigationTitle={props.route.params.name}>
      <SectionList
        sections={allCuisine}
        keyExtractor={(item, index) => `item-${item.itemId}-${index}`}
        renderItem={({item, section}) => (
          <MenuItem
            {...item}
            shopId={props.route.params.storeId}
            cusineId={section.id}
          />
        )}
        renderSectionHeader={({section: {name}}) => (
          <Text style={{fontWeight: 'bold', fontSize: 24}}>{name}</Text>
        )}
        contentContainerStyle={{flex: 1}}
        ListEmptyComponent={() => (
          <LoadingError error={error} onRetryPressed={fetchMenu} />
        )}
      />
    </ScreenContainer>
  );
}
