import React from 'react';
import { Home } from './Screens/Home';

import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Recomendacao from './Screens/Recomendacao';
import Acesso from './Screens/Acesso';
import Usuario from './Screens/Usuario';
import CadastroUsuario from './Screens/Usuario/CadastroUsuario';
import CadastroProduto from './Screens/Produto/CadastroProduto';
import Produto from './Screens/Produto';
import CadastroRecomendacao from './Screens/CadastrarRecomendacao';
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const Logo = () => {

  const navigation = useNavigation();

  const logout = async () => {
    await AsyncStorage.setItem("token","");
    navigation.replace('acesso');
  }

  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent:'space-between', flexDirection:'row'}}>
        <View/>
        <Image style={{width:175, height:25, marginLeft:0}} source={require('./Assets/logo_title.png')} />
        <TouchableOpacity style={{marginRight:30}} onPress={logout}>
          <Icon name="log-out" size={24} color={"#888"}/>
        </TouchableOpacity>
      </View>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="acesso" component={Acesso} options={{headerShown: false}} />
        <Stack.Screen name="home" component={Home} options={{ headerTitle: () =>  <Logo />, headerBackVisible: false}} />
        <Stack.Screen name="recomendacao" component={Recomendacao} options={{ headerTitle: 'Recomendações'}} />
        <Stack.Screen name="usuario" component={Usuario} options={{ headerTitle: 'Usuários'}} />
        <Stack.Screen name="produto" component={Produto} options={{ headerTitle: 'Produtos'}} />
        <Stack.Screen name="cadastroUsuario" component={CadastroUsuario} options={{headerTitle:"Cadastrar Usuário"}}/>
        <Stack.Screen name="cadastroProduto" component={CadastroProduto} options={{headerTitle:"Cadastrar Produto"}}/>
        <Stack.Screen name="cadastroRecomendacao" component={CadastroRecomendacao} options={{headerTitle:"Gerar Recomendação"}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
