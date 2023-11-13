import axios from "axios";
import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import ListItem from "./ListItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Feather";

const List = ({ navigation }) => {

    const [lista, setLista] = useState([]);
    const [busca, setBusca] = useState("");
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    
    const fetchList = async () => {
        const token = await AsyncStorage.getItem("token");
        console.log(`http://10.0.2.2:8080/aishoppingbuddy/api/recomendacao?page=${page}`);
        await axios.get(`http://10.0.2.2:8080/aishoppingbuddy/api/recomendacao?page=${page}`,
        {headers: {Authorization: `Bearer ${token}`}}).then(response => {
            setLista(response.data.content);
            setTotalPages(response.data.totalPages);
        });
    }

    const fetchListSearch = async () => {
        if (busca == "") {
            console.log("sem busca:"+busca)
            fetchList();
        } else {
            console.log("buscando:"+busca)
            const token = await AsyncStorage.getItem("token");
            await axios.get(`http://10.0.2.2:8080/aishoppingbuddy/api/recomendacao/busca/${busca}?page=${page}`,
            {headers: {Authorization: `Bearer ${token}`}}).then(response => {
                setLista(response.data.content);
                setTotalPages(response.data.totalPages);
            });
        }
    }

    const nextPage = async () => {
        if(page+1 <= totalPages-1) {
            setPage(antes => antes+1);
            fetchListSearch();
        }
    }

    const prevPage = async () => {
        if(0 <= page-1) {
            setPage(antes => antes-1);
            fetchListSearch();
        }
    }

    useEffect(() => {
        fetchListSearch();
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
                style={style.flatList}
                data={lista}
                renderItem={props => <ListItem navigation={navigation} {...props} />}
                keyExtractor={item => item.id}
            />
            <View style={style.page}>
                <TouchableOpacity onPress={prevPage}><Icon name="arrow-left" size={24} color={"#000"}/></TouchableOpacity>
                    <Text style={style.number}>{page}</Text>
                <TouchableOpacity onPress={nextPage}><Icon name="arrow-right" size={24} color={"#000"}/></TouchableOpacity>
            </View>
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
        height:500,
    },
    page:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
    },
    number:{
        color:"#000",
        fontSize:20,
        marginHorizontal:40,
    }
});

export {List};