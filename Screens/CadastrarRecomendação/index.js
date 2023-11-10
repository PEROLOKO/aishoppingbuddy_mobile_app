import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ListProduto } from './ListProduto';
import { ListUsuario } from './ListUsuario';

const Stack = createNativeStackNavigator();

const CadastroRecomendacao = ({ navigation, route }) => {

  return (
      <Stack.Navigator>
        <Stack.Screen name="recomendacaoListUsuario" component={ListUsuario} options={{headerShown: false}} navigation={navigation}/>
        <Stack.Screen name="recomendacaoListProduto" component={ListProduto} options={{headerShown: false}} navigation={navigation}/>
      </Stack.Navigator>
  );
};

export default CadastroRecomendacao;