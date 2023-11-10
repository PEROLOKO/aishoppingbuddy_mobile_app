import axios from "axios";
import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import ListItem from "./ListItem";
import AsyncStorage from "@react-native-async-storage/async-storage";

const List = ({ navigation }) => {

    const [lista, setLista] = useState([]);
    const [busca, setBusca] = useState("");
    
    const fetchList = async () => {
        const token = await AsyncStorage.getItem("token");
        await axios.request({
            headers: {
                Authorization: `Bearer ${token}`
            },
            method: "GET",
            url: `http://10.0.2.2:8080/aishoppingbuddy/api/recomendacao`
        }).then(response => {
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
                url: `http://10.0.2.2:8080/aishoppingbuddy/api/recomendacao/busca/${busca}`
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
                    placeholder="Buscar Recomendação"
                    value={busca}
                    onChangeText={setBusca}
                    style={style.inputText}
                />
                <TouchableOpacity style={style.searchButton} onPress={fetchListSearch}>
                    <Image style={style.buttonIcon} source={require('../../Assets/busca.png')} />
                </TouchableOpacity>
            </View>
            <FlatList
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
});

export {List};