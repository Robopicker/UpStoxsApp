import React, {memo} from 'react';
import {View, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
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
  const totalCurrentValue = useSelector(
    ({stock}) => stock?.data?.totalCurrentValue,
  );
  const totalInvestmentValue = useSelector(
    ({stock}) => stock?.data?.totalInvestmentValue,
  );
  const status = useSelector(({stock}) => stock.status);
  const totalPL = useSelector(({stock}) => stock?.data?.totalPL);
  const todayPL = useSelector(({stock}) => stock?.data?.todayPL);
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
    </View>
  );
}
export default memo(TotalStockView);
