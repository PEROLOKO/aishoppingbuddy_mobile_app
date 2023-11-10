import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const ItemDetails = ({route}) => {

    const { navigation } = route.params;
    const { item } = route.params;

    const id = item.id;
    const nome = item.nome;
    const cpf = item.cpf;
    const cep = item.cep;
    const genero = item.genero;
    const data = item.dataNascimento;
    const mensagem = `CPF: ${cpf}\nCEP: ${cep}\nGênero: ${genero}\n`;

    return (
        <View style={style.window}>
            <View style={styleProduto.card}>
                <View style={styleProduto.imageFrame}>
                    <View style={[styleProduto.image, style.usuario]}>
                        <Image style={styleProduto.imageIcon} source={require('../../Assets/icon4.png')} />
                    </View>
                </View>
                <View style={styleProduto.text}>
                    <Text style={style.title}>ID de {nome}</Text>
                    <Text style={style.text}>{id}</Text>
                </View>
            </View>
            <View style={style.card}>
                <Text style={style.text}>ID: {id}</Text>
                <Text style={[style.title,style.titleSize]}>{nome}</Text>
                <Text style={style.text}>{mensagem}</Text>
            </View>
            <View style={styleProduto.card}>
                <View style={styleProduto.imageFrame}>
                    <View style={[styleProduto.image, style.data]}>
                        <Image style={styleProduto.imageIcon} source={require('../../Assets/icon3.png')} />
                    </View>
                </View>
                <View style={styleProduto.text}>
                    <Text style={style.title}>Data da Nascimento</Text>
                    <Text style={style.text}>{data[2]}/{data[1]}/{data[0]}</Text>
                </View>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    window:{
        alignItems:"center"
    },
    title: {
        color:"#000",
        fontWeight:"bold",
        fontSize:18,
    },
    titleSize:{fontSize:22},
    text: {
        color:"#777",
        fontSize:18,
    },
    card: {
        backgroundColor:"#FFF",
        borderRadius:20,
        margin:10,
        padding:15,
        width:360,
    },
    usuario:{
        backgroundColor:"#90F"
    },
    data: {
        backgroundColor:"#0AF",
        borderRadius:20
    },
});

const styleProduto = StyleSheet.create({
    card:{
        backgroundColor:"#FFF",
        height:80,
        width:360,
        borderRadius:10,
        flexDirection:"row",
        alignItems:"center",
        marginTop:10,
        marginBottom:5,
        borderWidth:2,
        borderColor:"#DDD"
    },
    text: {
        marginLeft:16,
        flexDirection:"column"
    },
    imageFrame:{
        backgroundColor:"#DDD",
        width:80,
        height:80,
        justifyContent:"center",
        alignItems:"center",
        borderBottomLeftRadius:10,
        borderTopLeftRadius:10,
    },
    image:{
        backgroundColor:"#0044FF",
        height:60,
        width:60,
        borderRadius:20,
        justifyContent:"center",
        alignItems:"center"
    },
    imageIcon: {
        height:35,
        width:35,
    }
});

export default ItemDetails;