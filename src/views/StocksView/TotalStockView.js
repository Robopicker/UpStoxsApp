import React, {memo} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import GenericText from './GenericText';
import {API_UTILS} from './utils';
const styles = StyleSheet.create({
  containerStyle: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#D3D3D3',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  textRowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  separatorHeight: {height: 20},
  stubsStyle: {
    backgroundColor: 'grey',
    width: 50,
    height: 12,
    borderRadius: 6,
  },
});
function TotalStockView() {
  const {
    totalCurrentValue,
    totalInvestmentValue,
    totalPL,
    todayPL,
    status,
    change,
  } = useSelector(({stock}) => {
    return {
      totalCurrentValue: stock.data?.totalCurrentValue,
      totalInvestmentValue: stock?.data?.totalInvestmentValue,
      status: stock.status,
      totalPL: stock?.data?.totalPL,
      todayPL: stock?.data?.todayPL,
      change: stock?.change,
    };
  });
  // const dispatch = useDispatch();
  const renderTextRow = (title, value) => (
    <View style={styles.textRowStyle}>
      <GenericText fontWeight={'800'} align="center">
        {title}
      </GenericText>
      {status === API_UTILS.FETCH ? (
        <View style={styles.stubsStyle} />
      ) : (
        <GenericText align="center">{`₹ ${value}`}</GenericText>
      )}
    </View>
  );
  if (status === API_UTILS.ERROR) {
    return (
      <View style={[styles.containerStyle, {alignItems: 'center'}]}>
        <GenericText>{'Something went wrong please try again'}</GenericText>
      </View>
    );
  }
  return (
    <View style={styles.containerStyle}>
      {renderTextRow('Current Value:', totalCurrentValue)}
      {renderTextRow('Total Investment:', totalInvestmentValue)}
      {renderTextRow("Todays's profit & Loss:", todayPL)}
      <View style={styles.separatorHeight} />
      {renderTextRow('Profit & Loss:', totalPL)}
      <GenericText>{change}</GenericText>
      {/* <Button
        title="click me"
        onPress={() => {
          dispatch({
            type: 'CHANGE_VALUE',
            payload: change + 1,
          });
        }}
      /> */}
    </View>
  );
}
export default memo(TotalStockView);
