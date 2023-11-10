import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const CadastroProduto = (props) => {
    const { navigation } = props;

    const [nome, setNome] = useState("");
    const [categoria, setCategoria] = useState("");
    const [tipo, setTipo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [valor, setValor] = useState();

    const cadastro = async () => {

        const credential = {
            nome: nome,
            categoria: categoria,
            tipo: tipo,
            descricao: descricao,
            valor: parseFloat(valor)
        }
        console.log(credential);

        try {
            const token = await AsyncStorage.getItem("token");
            const response = await axios.request({
                headers: {
                    Authorization: `Bearer ${token}`
                },
                method: "POST",
                url: `http://10.0.2.2:8080/aishoppingbuddy/api/produto`,
                data: credential
            });
            console.log(response);
            createAlert("Cadastro realizado com sucesso!");
            navigation.navigate("home");
        } catch (error) {
            createAlert("Dados inválidos.");
            console.log(error);
        }
    }

    const createAlert = (text) => {
        Alert.alert("Aviso", text, [{
            text: "OK",
        }])
    }

    return (
        <ScrollView style={style.window}>
            <View>
                <Text style={style.text}>Nome</Text>
                <TextInput
                    placeholder="Nome do produto"
                    value={nome}
                    onChangeText={setNome}
                    style={style.inputText}
                />
                <TextInput
                    placeholder="Categoria do produto"
                    value={categoria}
                    onChangeText={setCategoria}
                    style={style.inputText}
                />
                <TextInput
                    placeholder="Tipo de produto"
                    value={tipo}
                    onChangeText={setTipo}
                    style={style.inputText}
                />
                <Text style={style.text}>Descrição</Text>
                <TextInput
                    placeholder="Descrição do produto"
                    value={descricao}
                    onChangeText={setDescricao}
                    multiline = {true}
                    numberOfLines = {4}
                    style={[style.inputText,style.textArea]}
                />
                <Text style={style.text}>Preço</Text>
                <TextInput
                    placeholder="Valor do produto"
                    value={valor}
                    onChangeText={setValor}
                    style={style.inputText}
                    inputMode="decimal"
                />
            </View>
            <View style={style.buttonDiv}>
                <TouchableOpacity style={style.button} onPress={cadastro}>
                    <Text style={style.buttonLabel}>Enviar</Text>
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
    textArea:{
        height:"auto"
    },
    buttonDiv:{
        margin:30,
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

export default CadastroProduto;