import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const Login = (props) => {
    const { navigation } = props;

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const login = async () => {

        const credential = {
            email: email,
            senha: senha
        }

        try {
            const response = await axios.post(
                `http://10.0.2.2:8080/aishoppingbuddy/api/funcionario/login`,
                credential
            );

            try {
                await AsyncStorage.setItem("token",response.data.token);
                console.log(await AsyncStorage.getItem("token"));
                navigation.navigate("home");
            } catch (error) {
                console.log(error);
            }

        } catch (error) {
            console.log(error);
            createAlert("Dados inválidos");
        }

    }

    const createAlert = (text) => {
        Alert.alert("Aviso", text, [{
            text: "OK",
        }])
    }

    return (
        <ScrollView style={style.window}>
            <View style={style.header}>
                <Text style={style.title}>Let's Get{"\n"}Started</Text>
                <Text style={style.text}>Shopping Better,{"\n"}with Shopping Buddy</Text>
            </View>
            <View>
                <Text style={style.text}>Email</Text>
                <TextInput
                    placeholder="Digite seu email"
                    value={email}
                    onChangeText={setEmail}
                    style={style.inputText}
                />
                <Text style={style.text}>Senha</Text>
                <TextInput
                    placeholder="Digite sua senha"
                    value={senha}
                    onChangeText={setSenha}
                    style={style.inputText}
                    secureTextEntry={true}
                />
                <Text style={style.subText}>By signing up you agree to our <Text style={style.subPrimary}>Terms &{"\n"}Condition</Text> and <Text style={style.subPrimary}>Privacy Policy.*</Text></Text>
            </View>
            <View style={style.buttonDiv}>
                <TouchableOpacity style={style.button} onPress={login}>
                    <Text style={style.buttonLabel}>Enviar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {navigation.navigate("cadastro")}}>
                    <Text>Não possuí login? Signup</Text>
                </TouchableOpacity>
            </View>
            
        </ScrollView>
    );
}

const style = StyleSheet.create({
    window:{
        padding:20,
        backgroundColor:"#FFF"
    },
    header: {
        marginBottom:24,
    },
    title: {
        color:"#282921",
        fontSize:64,
        fontWeight:"900"
    },
    text: {
        color:"#282921",
        fontSize:22,
    },
    subText:{
        marginTop:10,
        color:"#747980",
        fontSize:16,
    },
    subPrimary:{
        color:"#312E49"
    },
    inputText:{
        backgroundColor:"FFF",
        borderRadius:20,
        width:360,
        height:44,
        borderColor:"#CCC",
        borderWidth:2,
        paddingLeft:12,
        color:"#747980",
        marginTop:4,
        marginBottom:8,
    },
    buttonDiv:{
        margin:30,
        marginTop:114,
        justifyContent:"center",
        alignItems:"center",
    },
    button: {
        backgroundColor:"#2FC6F1",
        width:100,
        height:50,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:20,
        marginBottom:10,
    },
    buttonLabel:{
        color:"#FFF",
        fontSize:20,
        fontWeight:"bold"
    }
});

export default Login;