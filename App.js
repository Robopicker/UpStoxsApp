import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Homepage from './src/views/Homepage';
import Temppage from './src/views/Temppage';
import {Provider} from 'react-redux';
import {store} from './src/store/reduxStore';
import StockPage from './src/views/StocksView/StockPage';

const Stack = createNativeStackNavigator();
const App = () => (
  <Provider store={store}>
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="stock">
          <Stack.Screen name="homepage" component={Homepage} />
          <Stack.Screen name="temp" component={Temppage} />
          <Stack.Screen name="stock" component={StockPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  </Provider>
);
export default App;
