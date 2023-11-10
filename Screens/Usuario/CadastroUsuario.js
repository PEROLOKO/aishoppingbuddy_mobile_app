import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import DatePicker from "react-native-date-picker";

const CadastroUsuario = (props) => {
    const { navigation } = props;

    const [nome, setNome] = useState("");
    const [data, setData] = useState(new Date());
    const [cpf, setCpf] = useState("");
    const [cep, setCep] = useState("");
    const [genero, setGenero] = useState("M");

    const cadastro = async () => {

        const credential = {
            nome: nome,
            dataNascimento: JSON.stringify(data).slice(1,11).split("-").map(parseFloat),
            cpf: cpf,
            cep: cep,
            genero: genero
        }
        console.log(credential);

        try {
            const token = await AsyncStorage.getItem("token");
            const response = await axios.request({
                headers: {
                    Authorization: `Bearer ${token}`
                },
                method: "POST",
                url: `http://10.0.2.2:8080/aishoppingbuddy/api/usuario`,
                data: credential
            });
            console.log(response);
            createAlert("Cadastro realizado com sucesso!");
            navigation.navigate("usuario");
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
                    placeholder="Digite o nome completo"
                    value={nome}
                    onChangeText={setNome}
                    style={style.inputText}
                />
                <Text style={style.text}>Data de Nascimento</Text>
                <DatePicker date={data} mode="date" onDateChange={setData} locale="pt-br"/>
                <Text style={style.text}>CPF</Text>
                <TextInput
                    placeholder="Digite o cpf"
                    value={cpf}
                    onChangeText={setCpf}
                    style={style.inputText}
                />
                <Text style={style.text}>CEP</Text>
                <TextInput
                    placeholder="Digite o cep"
                    value={cep}
                    onChangeText={setCep}
                    style={style.inputText}
                />
                <Text style={style.text}>Gênero</Text>
                <Picker
                    selectedValue={genero}
                    onValueChange={(itemValue, itemIndex) => setGenero(itemValue)}
                    style={style.inputText}
                >
                    <Picker.Item label="Masculino" value="M" />
                    <Picker.Item label="Feminino" value="F" />
                    <Picker.Item label="Não Binário" value="NB" />
                </Picker>
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

export default CadastroUsuario;