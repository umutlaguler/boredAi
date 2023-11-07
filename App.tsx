
import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import type {PropsWithChildren} from 'react';
import Home from './src/screens/Home';
import Chat from './src/screens/Chat';
import Search from './src/screens/Search';
import { Provider } from 'react-redux';
import store from './store';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import History from './src/screens/History';

export type RootStackParams = {
  Home: undefined;
  Chat: undefined;
  Search: undefined;
  History: undefined;
}

const RootStack = createNativeStackNavigator<RootStackParams>();
function App(): JSX.Element {
  // const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack.Navigator initialRouteName='Home'>
          <RootStack.Screen name='Home' component={Home} options={{headerShown: false}}/>
          <RootStack.Screen name='Chat' component={Chat} options={{headerShown: false}}/>
          <RootStack.Screen name='Search' component={Search} options={{headerShown: false}}/>
          <RootStack.Screen name='History' component={History} options={{headerShown: false}}/>
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;