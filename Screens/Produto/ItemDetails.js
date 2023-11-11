import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

const ItemDetails = ({route}) => {

    const { navigation } = route.params;
    const { item } = route.params;

    const id = item.id;
    const nome = item.nome;
    const descricao = item.descricao;
    const valor = item.valor;
    const categoria = item.categoria;
    const tipo = item.tipo;

    return (
        <ScrollView style={style.window} contentContainerStyle={{ alignItems: 'center', padding:20 }}>
            <View style={styleProduto.card}>
                <View style={styleProduto.imageFrame}>
                    <View style={[styleProduto.image, style.usuario]}>
                        <Image style={styleProduto.imageIcon} source={require('../../Assets/iconID.png')} />
                    </View>
                </View>
                <View style={styleProduto.text}>
                    <Text style={style.title}>ID do Produto</Text>
                    <Text style={style.text}>{id}</Text>
                </View>
            </View>
            <View style={styleProduto.card}>
                <View style={styleProduto.imageFrame}>
                    <View style={[styleProduto.image, style.data]}>
                        <Image style={styleProduto.imageIcon} source={require('../../Assets/Produto.png')} />
                    </View>
                </View>
                <View style={styleProduto.text}>
                    <Text style={style.title}>Nome do Produto</Text>
                    <Text style={style.text}>{nome}</Text>
                </View>
            </View>
            <View style={styleProduto.card}>
                <View style={styleProduto.text}>
                    <Text style={style.title}>Descrição</Text>
                    <Text style={[style.text,style.textDesc]}>{descricao}</Text>
                </View>
            </View>
            <View style={styleProduto.card}>
                <View style={styleProduto.imageFrame}>
                    <View style={[styleProduto.image, style.usuario]}>
                        <Image style={styleProduto.imageIcon} source={require('../../Assets/iconCategoria.png')} />
                    </View>
                </View>
                <View style={styleProduto.text}>
                    <Text style={style.title}>Categoria</Text>
                    <Text style={style.text}>{categoria}</Text>
                </View>
            </View>
            <View style={styleProduto.card}>
                <View style={styleProduto.imageFrame}>
                    <View style={[styleProduto.image, style.tipo]}>
                        <Image style={styleProduto.imageIcon} source={require('../../Assets/iconTipo.png')} />
                    </View>
                </View>
                <View style={styleProduto.text}>
                    <Text style={style.title}>Tipo</Text>
                    <Text style={style.text}>{tipo}</Text>
                </View>
            </View>
            <View style={styleProduto.card}>
                <View style={styleProduto.imageFrame}>
                    <View style={[styleProduto.image, style.data]}>
                        <Image style={styleProduto.imageIcon} source={require('../../Assets/iconPrice.png')} />
                    </View>
                </View>
                <View style={styleProduto.text}>
                    <Text style={style.title}>Preço</Text>
                    <Text style={style.text}>R$ {valor}</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const style = StyleSheet.create({
    window:{
        backgroundColor:"#FFF",
        height:"100%",
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
    textDesc:{
        width:320,
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
    tipo: {
        backgroundColor:"#464344",
    }
});

const styleProduto = StyleSheet.create({
    card:{
        backgroundColor:"#FFF",
        width:360,
        borderRadius:10,
        flexDirection:"row",
        alignItems:"center",
        marginTop:10,
        marginBottom:5,
        borderWidth:2,
        borderColor:"#DDD",
    },
    text: {
        marginLeft:16,
        flexDirection:"column",
        width:270,
        marginVertical:10,
    },
    imageFrame:{
        backgroundColor:"#DDD",
        width:80,
        paddingVertical:10,
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