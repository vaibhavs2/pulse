import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {CuisineItem} from '../../../types';
import {useAppContext} from '../../../Contexts/AppContext';

type Props = CuisineItem & {shopId: string; cusineId: string};
export function MenuItem({shopId, cusineId, ...props}: Props) {
  const {getCart, addItemToCart} = useAppContext();

  const onAddPressed = () => {
    addItemToCart(shopId, cusineId, props);
  };

  const itemCount =
    (getCart?.shopId == shopId &&
      getCart?.items.find(item => item.itemId == props.itemId)?.count) ||
    0;

  return (
    <View style={styles.topContainer}>
      <View style={styles.container}>
        <View style={{flex: 1}}>
          <Image source={{uri: props.imageUrl}} style={styles.image} />
          {!!itemCount && (
            <View style={styles.countBadge}>
              <Text style={styles.count}>{itemCount}</Text>
            </View>
          )}
        </View>
        <View style={styles.infoContainer}>
          <View>
            <Text style={styles.text}>{props.name}</Text>
            <Text style={styles.text}>@ ₹{props.price}</Text>
          </View>
          <TouchableOpacity style={styles.addButton} onPress={onAddPressed}>
            <Text style={styles.addText}>Add +</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topContainer: {flexDirection: 'row', marginVertical: 8},
  container: {flex: 1, flexDirection: 'row'},
  countBadge: {
    position: 'absolute',
    backgroundColor: 'green',
    width: 26,
    height: 26,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    end: -10,
    top: -8,
  },
  count: {fontWeight: 'bold', color: 'white'},
  text: {fontSize: 20},
  addText: {fontSize: 18, color: 'white'},
  addButton: {
    backgroundColor: 'green',
    width: '70%',
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 12,
  },
  infoContainer: {flex: 1.5, justifyContent: 'space-between', marginLeft: 18},
  image: {width: '100%', height: 110, borderRadius: 12},
});
