import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { List } from "./List";
import ItemDetails from './ItemDetails';

const Stack = createNativeStackNavigator();

const Produto = ({ navigation, route }) => {

  return (
      <Stack.Navigator>
        <Stack.Screen name="listProduto" component={List} options={{headerShown: false}} navigation={navigation}/>
        <Stack.Screen name="itemProduto" component={ItemDetails} options={{headerShown: false}} navigation={navigation}/>
      </Stack.Navigator>
  );
};

export default Produto;