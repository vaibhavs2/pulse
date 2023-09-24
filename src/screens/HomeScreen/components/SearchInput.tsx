import React, {useRef, useState} from 'react';
import {TextInput, View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  onInput: (query: string) => void;
  onClearPressed: () => void;
};
export function SearchInput(props: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleSearch = () => {
    props.onInput(searchTerm);
  };

  const onInput = (text: string) => {
    setSearchTerm(text);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(handleSearch, 800);
  };

  const onClearPress = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setSearchTerm('');
    props.onClearPressed();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search by name"
        onChangeText={onInput}
        value={searchTerm}
      />
      <TouchableOpacity onPress={onClearPress}>
        <Icon name="close" size={28} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 25,
    paddingEnd: 12,
    marginVertical: 12,
  },
  input: {
    flex: 1,
    height: 45,
    paddingHorizontal: 12,
  },
});
