import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  FlatList,
  TextInput,
  Text,
  Button,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchData} from '../api/homeApi';
import {useNavigation} from '@react-navigation/core';
import InputText from './InputText';

const useDebounce = (value, delay) => {
  const [deValue, updateValue] = useState('');
  let timer = useRef(null);
  useEffect(() => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      updateValue(value);
    }, delay);
  }, [value]);
  return deValue;
};

export default function Homepage() {
  const [searchValue, updateSearch] = useState('');
  const debouncedValue = useDebounce(searchValue, 500);
  const textInputRef = useRef(null);
  console.log(textInputRef);
  const {list, cartData} = useSelector(({home}) => {
    return {
      list: home?.data,
      cartData: home?.cart,
    };
  });
  const dispatch = useDispatch();
  const navigation = useNavigation();
  useEffect(() => {
    fetchData(dispatch);
    const value = textInputRef.current.value();
    console.log(value);
  }, []);
  const updateQuantity = item => {
    console.log(item);
    dispatch({
      type: 'ADD_TO_CHECKOUT',
      payload: item?.id,
    });
  };
  const renderItem = ({item, index}) => {
    return (
      <View
        style={{
          backgroundColor: 'grey',
          width: '100%',
          borderRadius: 20,
          marginVertical: 20,
          padding: 20,
          flexDirection: 'row',
        }}>
        <Text
          numberOfLines={1}
          style={{
            width: 60,
          }}>
          {item?.title}
        </Text>
        <View style={{marginRight: 40}}>
          <Text
            numberOfLines={4}
            style={{
              fontSize: 14,
              color: 'white',
              marginHorizontal: 20,
              textAlign: 'left',
            }}>
            {item?.description}
          </Text>
          <Text>{cartData[item?.id] || 0} </Text>
          <TouchableOpacity
            title="increase"
            onPress={() => {
              updateQuantity(item);
            }}
            style={{backgroundColor: 'red', width: 40, height: 40}}>
            <Text>{'press me'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const filteredValue = useMemo(() => {
    if (debouncedValue === '') {
      return list;
    }
    const filtered = list.filter(item => item.title.startsWith(debouncedValue));
    return filtered;
  }, [debouncedValue, list]);
  const onChangeText = value => {
    updateSearch(value);
  };

  return (
    <View style={{flex: 1, marginTop: 40, paddingHorizontal: 20}}>
      <TextInput
        value={searchValue}
        onChangeText={onChangeText}
        style={{width: 160, height: 40, backgroundColor: 'grey'}}
      />
      <FlatList
        keyExtractor={item => item?.id}
        data={filteredValue}
        initialNumToRender={5}
        renderItem={renderItem}
      />
      <InputText ref={textInputRef} />
    </View>
  );
}
