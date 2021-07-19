import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ListView from './ListView';
import SearchBar from './SearchBar';
import RightHeader from './RightHeader';



const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ListView">
        <Stack.Screen name="ListView" component={ListView}
        options={{ headerShown: false }}
         />
        <Stack.Screen name="SearchBar" component={SearchBar}
         options={{ headerShown: false }} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
