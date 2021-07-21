import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ListView from './ListView';
import SearchBar from './SearchBar';
import Favourites from './Favourites';
import { createStore } from 'redux';

import { Provider } from 'react-redux'
import stackReducer from './StackReducer';



const Stack = createStackNavigator();
const store = createStore(stackReducer);

function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ListView">
        <Stack.Screen name="ListView" component={ListView}
        options={{ headerShown: false }}
         />
        <Stack.Screen name="SearchBar" component={SearchBar}
         options={{ headerShown: false }} />
         <Stack.Screen name="Favourites" component={Favourites}
         options={{ headerShown: false }} />
        
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

export default App;
