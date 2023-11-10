import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Cadastro from "./Cadastro";
import Login from "./Login";

const Stack = createNativeStackNavigator();

const Acesso = ({ navigation, route }) => {

  return (
      <Stack.Navigator>
        <Stack.Screen name="login" component={Login} options={{headerShown: false}} navigation={navigation}/>
        <Stack.Screen name="cadastro" component={Cadastro} options={{headerShown: false}} navigation={navigation}/>
      </Stack.Navigator>
  );
};

export default Acesso;