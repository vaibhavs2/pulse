import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native';

type Props = {
  price: number;
  discountPercentage: number;
  large?: boolean;
};
export function Price(props: Props) {
  const sellingPrice = props.price - (props.price * props.discountPercentage) / 100;

  return (
    <View style={styles.horizontal}>
      <Text style={[props.large && styles.large]}>Price:</Text>
      <Text style={[styles.price, props.large && styles.large]}>
        {props.discountPercentage == 0 ? '' : `$${props.price}`}
      </Text>

      <Text style={[{ color: 'green' }, props.large && styles.large]}>
        ${sellingPrice.toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  price: { textDecorationLine: 'line-through', marginHorizontal: 5 },

  horizontal: { flexDirection: 'row', alignItems: 'center' },
  large: { fontSize: 18, fontWeight: 'bold' },
});
