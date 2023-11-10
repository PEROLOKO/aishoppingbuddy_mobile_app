import React from 'react';
import { Home } from './Screens/Home';

import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Image, View } from 'react-native';
import Recomendacao from './Screens/Recomendacao';
import Acesso from './Screens/Acesso';
import Usuario from './Screens/Usuario';
import CadastroUsuario from './Screens/Usuario/CadastroUsuario';
import CadastroProduto from './Screens/Produto/CadastroProduto';
import Produto from './Screens/Produto';
import CadastroRecomendacao from './Screens/CadastrarRecomendação';

const Stack = createNativeStackNavigator();

const Logo = () => {
  return (
      <View style={{ flex: 1, alignItems: 'center'}}>
          <Image style={{width:175, height:25, marginLeft:-50}} source={require('./Assets/logo_title.png')} />
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
