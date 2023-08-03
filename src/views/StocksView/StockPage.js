import React, {Profiler, memo, useCallback, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import GenericText from './GenericText';
import TotalStockView from './TotalStockView';
import StockList from './StockList';
import {useDispatch} from 'react-redux';
import {fetchStockData} from './apiCall';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerStyle: {backgroundColor: 'blue', padding: 20},
});
function StockPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    fetchStockData(dispatch);
  }, [dispatch]);

  const onRetryClicked = () => {
    fetchStockData(dispatch);
  };

  function onRenderCallback(
    id, // the "id" prop of the Profiler tree that has just committed
    phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
    actualDuration, // time spent rendering the committed update
    baseDuration, // estimated time to render the entire subtree without memoization
    startTime, // when React began rendering this update
    commitTime, // when React committed this update
  ) {
    console.log(id, phase, actualDuration, baseDuration, startTime, commitTime);
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerStyle}>
        <GenericText color={'white'} size={20} fontWeight={'600'}>
          {'Upstoxs Holding'}
        </GenericText>
      </View>
      <View style={styles.container}>
        <StockList onRetryClicked={onRetryClicked} />
      </View>
      <TotalStockView />
    </View>
  );
}

export default memo(StockPage);
