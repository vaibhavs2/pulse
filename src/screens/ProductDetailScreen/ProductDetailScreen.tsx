import React, { useCallback } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import Carousel, { Pagination } from 'react-native-new-snap-carousel';

import { FavouriteButton, ScreenContainer } from '../../GlobalComponents';
import { CartItem, NativeScreenProps } from '../../types';
import { useAppContext } from '../../Contexts/AppContext';
import { Price } from '../../GlobalComponents/Price';

type Props = NativeScreenProps<'ProductDetailScreen'>;
export function ProductDetailScreen(props: Props) {
  const { product } = props.route.params;
  const { width } = useWindowDimensions();
  const { addItemToCart, getCart } = useAppContext();
  const [activeSlide, setActiveSlide] = React.useState(0);

  const renderCarouselItem = useCallback(
    ({ item }: any) => (
      <Image source={{ uri: item }} resizeMode="contain" style={styles.carouselImage} />
    ),
    [],
  );

  const addToCartPressed = useCallback(() => {
    const item: CartItem = {
      count: 1,
      title: product.title,
      thumbnail: product.thumbnail,
      price: product.price,
      id: product.id,
      discountPercentage: product.discountPercentage,
    };
    addItemToCart(item);
  }, []);
  const isAddedToCart = !!getCart?.find(item => item.id === product.id);
  return (
    <ScreenContainer cart canGoback navigationTitle={''}>
      <ScrollView style={styles.container}>
        <View style={styles.carouselContainer}>
          <Carousel
            data={product.images}
            renderItem={renderCarouselItem}
            sliderWidth={width - 24}
            itemWidth={width - 24}
            onSnapToItem={(index: number) => setActiveSlide(index)}
            layout={'default'}
          />
          <Pagination
            dotsLength={product.images.length}
            activeDotIndex={activeSlide}
            containerStyle={styles.paginationContainer}
            dotStyle={styles.paginationDot}
            inactiveDotStyle={styles.paginationInactiveDot}
            inactiveDotOpacity={0.6}
            inactiveDotScale={0.8}
          />
          <FavouriteButton
            style={{ position: 'absolute', right: 0 }}
            productId={product.id}
          />
        </View>
        <View style={styles.productInfoContainer}>
          <Text style={styles.productTitle}>{product.title}</Text>
          <Text style={styles.productDescription}>{product.description}</Text>
          <Price
            large
            price={product.price}
            discountPercentage={product.discountPercentage}
          />
        </View>
      </ScrollView>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={addToCartPressed}>
          <Text style={styles.buttonText}>
            {isAddedToCart ? 'Add More' : 'Add to Cart'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  carouselContainer: {
    marginVertical: 10,
  },
  carouselImage: {
    height: 200,
    borderRadius: 10,
  },
  paginationContainer: {
    marginTop: -15,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 8,
    backgroundColor: '#1AACAC',
  },
  paginationInactiveDot: {
    backgroundColor: '#C70039',
  },
  productInfoContainer: {
    paddingHorizontal: 20,
  },
  productTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  productDescription: {
    fontSize: 16,
    color: '#555555',
    marginVertical: 5,
  },

  buttonsContainer: {
    marginVertical: 15,
  },
  button: {
    paddingVertical: 15,
    borderRadius: 8,
    backgroundColor: 'green',
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
});
