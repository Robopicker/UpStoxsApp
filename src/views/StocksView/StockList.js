import React, {memo} from 'react';
import {
  ActivityIndicator,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import {API_UTILS, colorUtils} from './utils';
import GenericText from './GenericText';

const styles = StyleSheet.create({
  stockItemStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    paddingVertical: 10,
  },
  itemSeparatorStyle: {
    width: '100%',
    height: 1,
    backgroundColor: colorUtils.lightGrey,
  },
  loaderStyle: {
    backgroundColor: colorUtils.lightGrey,
    width: '90%',
    height: 300,
    borderRadius: 20,
    margin: 20,
    justifyContent: 'center',
  },
  marginStyle: {marginBottom: 10},
  backgroundColor: {backgroundColor: 'white'},
  retryStyle: {
    backgroundColor: 'green',
    borderRadius: 6,
    padding: 6,
    paddingHorizontal: 20,
    marginTop: 12,
  },
  footerStyle: {height: 200, width: '100%'},
});
function StockList(props) {
  const {onRetryClicked} = props;
  const data = useSelector(({stock}) => stock?.data?.stockList);
  const status = useSelector(({stock}) => stock?.status);
  const renderStockItem = ({item, index}) => (
    <View style={styles.backgroundColor}>
      <View style={styles.stockItemStyle}>
        <View>
          <GenericText fontWeight={'600'} style={styles.marginStyle}>
            {item?.symbol}
          </GenericText>
          <GenericText>{item?.quantity}</GenericText>
        </View>
        <View>
          <GenericText style={styles.marginStyle} align="center">
            {'LTP: '}
            <GenericText fontWeight={'600'}>{`₹ ${item?.ltp}`}</GenericText>
          </GenericText>
          <GenericText align="center">
            {'P/L: '}
            <GenericText fontWeight={'600'}>{`₹ ${item?.pl}`}</GenericText>
          </GenericText>
        </View>
      </View>
    </View>
  );
  const itemSeparator = () => {
    return <View style={styles.itemSeparatorStyle} />;
  };
  switch (status) {
    case API_UTILS.FETCH: {
      return (
        <View style={styles.loaderStyle}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

    case API_UTILS.SUCCESS: {
      return (
        <FlatList
          data={data}
          keyExtractor={item => item?.symbol}
          ItemSeparatorComponent={itemSeparator}
          renderItem={renderStockItem}
          ListFooterComponent={<View style={styles.footerStyle} />}
        />
      );
    }
    default: {
      return (
        <View style={[styles.loaderStyle, {alignItems: 'center'}]}>
          <GenericText>
            {'Something went wrong please try again later'}
          </GenericText>
          <TouchableOpacity onPress={onRetryClicked} style={styles.retryStyle}>
            <GenericText color={'white'}>{'Retry'}</GenericText>
          </TouchableOpacity>
        </View>
      );
    }
  }
}
export default memo(StockList);
