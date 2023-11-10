import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LinearGradient from "react-native-linear-gradient";


const ListProduto = ({route}) => {
    
    const { navigation } = route.params;
    const { usuario } = route.params;
    
    const texto = `CPF: ${usuario.cpf}\nCEP: ${usuario.cep}\nGênero: ${usuario.genero}\n`;
    
    const [produtoList, setProdutoList] = useState([]);
    
    const [lista, setLista] = useState([]);
    const [busca, setBusca] = useState("");
    
    const fetchList = async () => {
        const token = await AsyncStorage.getItem("token");
        await axios.request({
            headers: {
                Authorization: `Bearer ${token}`
            },
            method: "GET",
            url: `http://10.0.2.2:8080/aishoppingbuddy/api/produto`
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
                url: `http://10.0.2.2:8080/aishoppingbuddy/api/produto/nome/${busca}`
            }).then(response => {
                setLista(response.data.content);
            });
        }
    }

    const cadastrarRecomendacao = async () => {
        const credential = {
            produtoList: produtoList
        }
        console.log(credential);
        try {
            const token = await AsyncStorage.getItem("token");
            const response = await axios.request({
                headers: {
                    Authorization: `Bearer ${token}`
                },
                method: "POST",
                url: `http://10.0.2.2:8080/aishoppingbuddy/api/recomendacao/${usuario.id}`,
                data: credential
            });
            console.log(response);
            createAlert("Cadastro realizado com sucesso!");
            navigation.navigate("recomendacao");
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

    useEffect(() => {
        fetchList();
    }, []);

    return (
        <View>
            <Image style={style.bg0} source={require('../../Assets/bg0.png')} />
            <Image style={style.bg1} source={require('../../Assets/bg1.png')} />
            <Image style={style.bg2} source={require('../../Assets/bg2.png')} />
            <Image style={style.bg3} source={require('../../Assets/bg3.png')} />
            <View style={style.card}>
                <Text style={[style.title,style.titleSize]}>{usuario.nome}</Text>
                <View style={styleItem.bar}></View>
                <Text style={style.text}>ID: {usuario.id}</Text>
                <Text style={style.text}>{texto}</Text>
            </View>
            <View style={style.filter}>
                <TextInput
                    placeholder="Buscar Produto"
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
                renderItem={props => <ListItem navigation={navigation} produtoList={produtoList} setProdutoList={setProdutoList} {...props} />}
                keyExtractor={item => item.id}
            />
            <LinearGradient
                colors={['#881AFF','#32C7F1']}
                useAngle={true}
                angle={135}
                style={style.buttonLarge}>
                <TouchableOpacity style={style.touchLarge} onPress={cadastrarRecomendacao}>
                    <Text style={style.titleButton}>{'Gerar Recomendação'}</Text>
                    <Image style={style.shadow} source={require('../../Assets/shadow.png')} />
                    <Image style={style.logo} source={require('../../Assets/logo_white.png')} />
                </TouchableOpacity>
            </LinearGradient>
        </View>
    );
};

const style = StyleSheet.create({
    filter: {
        margin:0,
        flexDirection:'row',
        alignItems:"center",
        justifyContent:"space-between"
    },
    button: {
        flexDirection:'row',
        alignItems:'center',
    },
    buttonLarge: {
        width:'96%',
        height:100,
        margin:'2%',
        borderRadius:10,
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
    title: {
        color:"#000",
        fontWeight:"bold",
        fontSize:18,
    },
    titleButton: {
        color:'#FFF',
        fontSize:20,
        fontWeight:'bold',
        fontFamily:'Poppins',
    },
    touchLarge: {
        flexDirection:'row',
        justifyContent:'space-between',
        padding:16,
    },
    logo: {
        width:60,
        height:66.1875,
        marginTop:2,
        marginRight:12,
    },
    shadow: {
        width:111,
        height:17.8125,
        position:'absolute',
        top:80,
        left:284,
        borderBottomRightRadius:10,
    },
    titleSize:{fontSize:22},
    text: {
        color:"#777",
        fontSize:18,
    },
    card: {
        backgroundColor:"#FFF",
        borderRadius:20,
        margin:4,
        padding:15,
        width:400,
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
        marginBottom:4,
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
        height:270,
    }
});

const ListItem = (props) => {

    const { navigation } = props;
    const { item } = props;
    const { produtoList } = props;
    const { setProdutoList } = props;

    const id = item.id;
    const nome = item.nome;
    const valor = item.valor;

    const mensagem = `ID: ${id}\nR$ ${valor}`

    const [selected, setSelected] = useState(false);

    const handleSelected = () => {
        if (selected) {
            let list = produtoList;
            const index = list.indexOf({id:id});
            list.splice(index,1);
            setProdutoList(list);
            setSelected(false);
        } else {
            setProdutoList([...produtoList, {id:id}]);
            setSelected(true);
        }
    }

    return (
        <View style={styleItem.card}>
            <Text style={styleItem.titulo}>{nome}</Text>
            <View style={styleItem.bar}></View>
            <Text style={styleItem.mensagem}>{mensagem}</Text>
            <View style={styleItem.buttonView}>
                <TouchableOpacity style={styleItem.button}  onPress={handleSelected}>
                    {selected ? (
                        <View style={style.button}>
                            <Text style={styleItem.buttonLabel}>Selcionado</Text>
                            <Image style={styleItem.arrow} source={require('../../Assets/sel.png')} />
                        </View>
                    ) : (
                        <View style={style.button}>
                            <Text style={styleItem.buttonLabel}>Selcionar</Text>
                            <Image style={styleItem.arrow} source={require('../../Assets/notSel.png')} />
                        </View>
                    )}
                    
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styleItem = StyleSheet.create({
    card: {
        margin:4,
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

export {ListProduto};