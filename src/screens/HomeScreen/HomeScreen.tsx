import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  ToastAndroid,
  View,
} from 'react-native';

import { NativeScreenProps, Product } from '../../types';
import { ScreenContainer } from '../../GlobalComponents';
import { userProductService } from '../../Service/ProductService';
import { ProductItem } from './components/ProductItem';
import { LoadingError } from '../../GlobalComponents/LoadingError';

export function HomeScreen(props: NativeScreenProps<'HomeScreen'>) {
  const [getAllProducts, setAllProducts] = useState<{
    products: Array<Product>;
    haveMore: boolean;
  }>({ products: [], haveMore: true });
  const [loadingMore, setLoadingMore] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const onEndReachedDuringMomentum = useRef(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = useCallback(
    async (skip: number = 0) => {
      setErrorMessage('');
      setLoadingMore(true);
      const productResponse = await userProductService.getProducts(skip);
      setLoadingMore(false);

      if (productResponse.errorMessage) {
        ToastAndroid.show(productResponse.errorMessage, ToastAndroid.LONG);
        setErrorMessage(productResponse.errorMessage);
      } else {
        if (skip) {
          setAllProducts({
            products: getAllProducts.products.concat(productResponse.data?.products!),
            haveMore: productResponse.data?.haveMore!,
          });
        } else {
          setAllProducts(productResponse.data!);
        }
      }
    },
    [getAllProducts],
  );

  const onLoadMore = useCallback(async () => {
    if (
      !getAllProducts.products.length ||
      !getAllProducts.haveMore ||
      onEndReachedDuringMomentum.current
    ) {
      return;
    }
    fetchProducts(getAllProducts.products.length);
    onEndReachedDuringMomentum.current = true;
  }, [getAllProducts]);

  const onItemPressed = useCallback((product: Product) => {
    props.navigation.navigate('ProductDetailScreen', { product });
  }, []);

  const renderItem = useCallback(({ item }: { item: Product }) => {
    return <ProductItem {...item} onPress={onItemPressed} />;
  }, []);

  const momentumScrollBegin = useCallback(() => {
    onEndReachedDuringMomentum.current = false;
  }, []);

  return (
    <ScreenContainer
      noDefaultPadding
      cart
      navigationTitle="Stores"
      SafeEdges={['left', 'right', 'top']}>
      <FlatList
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={getAllProducts.products}
        renderItem={renderItem}
        keyExtractor={(_, index) => `product-${_.id} - ${index}`}
        ListEmptyComponent={
          <LoadingError error={errorMessage} onRetryPressed={() => fetchProducts()} />
        }
        ListFooterComponent={
          <View style={styles.footer}>{loadingMore && <ActivityIndicator />}</View>
        }
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.1}
        onMomentumScrollBegin={momentumScrollBegin}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { flexGrow: 1 },
  listEmpty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    paddingVertical: 24,
  },
});
