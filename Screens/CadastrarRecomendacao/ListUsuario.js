import axios from "axios";
import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ListUsuario = ({ navigation }) => {

    const [lista, setLista] = useState([]);
    const [busca, setBusca] = useState("");
    
    const fetchList = async () => {
        const token = await AsyncStorage.getItem("token");
        await axios.request({
            headers: {
                Authorization: `Bearer ${token}`
            },
            method: "GET",
            url: `http://10.0.2.2:8080/aishoppingbuddy/api/usuario`
        }).then(response => {
            console.log(response.data);
            setLista(response.data.content);
        });
    }

    const fetchListSearch = async () => {
        if (busca == "") {
            console.log("sem busca:"+busca)
            fetchList();
        } else {
            console.log("buscando:"+busca)
            const token = await AsyncStorage.getItem("token");
            await axios.request({
                headers: {
                    Authorization: `Bearer ${token}`
                },
                method: "GET",
                url: `http://10.0.2.2:8080/aishoppingbuddy/api/usuario/nome/${busca}`
            }).then(response => {
                setLista(response.data.content);
            });
        }
    }

    useEffect(() => {
        fetchList();
    }, []);

    return (
        <View>
            <Image style={style.bg0} source={require('../../Assets/bg0.png')} />
            <Image style={style.bg1} source={require('../../Assets/bg1.png')} />
            <Image style={style.bg2} source={require('../../Assets/bg2.png')} />
            <Image style={style.bg3} source={require('../../Assets/bg3.png')} />
            <View style={style.filter}>
                <TextInput
                    placeholder="Buscar Usuário"
                    value={busca}
                    onChangeText={setBusca}
                    style={style.inputText}
                />
                <TouchableOpacity style={style.searchButton} onPress={fetchListSearch}>
                    <Image style={style.buttonIcon} source={require('../../Assets/busca.png')} />
                </TouchableOpacity>
            </View>
            <FlatList
                style={style.flatList}
                data={lista}
                renderItem={props => <ListItem navigation={navigation} {...props} />}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

const style = StyleSheet.create({
    filter: {
        margin:12,
        flexDirection:'row',
        alignItems:"center",
        justifyContent:"space-between"
    },
    button: {
        flexDirection:'row',
        alignItems:'center',
    },
    buttonLabel: {
        fontFamily:'Poppins',
        fontSize:18,
        color:'#000',
        marginRight:22,
    },
    icon: {
        width:30,
        height:30,
        marginRight:8,
    },
    bg0: {
        width:100,
        height:100,
        position:'absolute',
        left:320,
        top:-60,
    },
    bg1: {
        width:150,
        height:150,
        position:'absolute',
        left:-40,
        top:100,
    },
    bg2: {
        width:180,
        height:180,
        position:'absolute',
        left:320,
        top:300,
    },
    bg3: {
        width:120,
        height:120,
        position:'absolute',
        left:0,
        top:550,
    },
    inputText:{
        backgroundColor:"#EEE",
        borderRadius:20,
        width:330,
        height:44,
        borderColor:"#CCC",
        borderWidth:2,
        paddingLeft:12,
        color:"#747980",
        marginTop:4,
        marginBottom:8,
    },
    searchButton:{
        width:44,
        height:44,
        backgroundColor:"#2F37F1",
        borderRadius:22,
        justifyContent:"center",
        alignItems:"center",
    },
    buttonIcon:{
        width:30,
        height:30,
    },
    flatList:{
        height:540,
    }
});


const ListItem = (props) => {

    const { navigation } = props;
    const { item } = props;

    const id = item.id;
    const nome = item.nome;
    const cpf = item.cpf;

    const mensagem = `ID: ${id}\nCPF: ${cpf}`

    return (
        <View style={styleItem.card}>
            <Text style={styleItem.titulo}>{nome}</Text>
            <View style={styleItem.bar}></View>
            <Text style={styleItem.mensagem}>{mensagem}</Text>
            <View style={styleItem.buttonView}>
                <TouchableOpacity style={styleItem.button}  onPress={() => navigation.push('recomendacaoListProduto', {id: item.id, navigation:navigation, usuario:item })}>
                    <Text style={styleItem.buttonLabel}>Selecionar</Text>
                    <Image style={styleItem.arrow} source={require('../../Assets/arrow.png')} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styleItem = StyleSheet.create({
    card: {
        margin:8,
        backgroundColor:'#FFF',
        borderRadius:10,
        padding:12,
    },
    titulo: {
        color:'#000',
        fontFamily:'Poppins',
        fontSize:20,
        fontWeight:'bold',
    },
    mensagem: {
        color:'#888',
        fontFamily:'Poppins',
        fontSize:16,
    },
    bar: {
        backgroundColor:'#DDD',
        height:1,
        width:'100%',
        marginTop:6,
        marginBottom:6,
    },
    buttonView: {
        width:'100%',
        flexDirection:'row',
        justifyContent:'flex-end'
    },
    button: {
        flexDirection:'row',
        alignItems:'center',
    },
    buttonLabel:{
        color:'#000',
        fontFamily:'Poppins',
        fontSize:16,
        fontWeight:'bold',
    },
    arrow: {
        width:20,
        height:20,
    }
});

export {ListUsuario};