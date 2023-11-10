import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const ItemDetails = ({route}) => {

    const { navigation } = route.params;
    const { item } = route.params;

    const id = item.id;
    const titulo = item.titulo;
    const mensagem = item.mensagem;
    const produtos = item.produtoList;
    const usuario = item.usuario;
    const data = item.data;

    return (
        <View style={style.window}>
            <View style={style.card}>
                <Text style={style.text}>ID: {id}</Text>
                <Text style={[style.title,style.titleSize]}>{titulo}</Text>
                <Text style={style.text}>{mensagem}</Text>
                {produtos.map(produto => <ProdutoDetails produto={produto} key={produto.id} />)}
            </View>
            <View style={styleProduto.card}>
                <View style={styleProduto.imageFrame}>
                    <View style={[styleProduto.image, style.usuario]}>
                        <Image style={styleProduto.imageIcon} source={require('../../Assets/icon4.png')} />
                    </View>
                </View>
                <View style={styleProduto.text}>
                    <Text style={style.title}>ID de {usuario.nome}</Text>
                    <Text style={style.text}>{usuario.id}</Text>
                </View>
            </View>
            <View style={styleProduto.card}>
                <View style={styleProduto.imageFrame}>
                    <View style={[styleProduto.image, style.data]}>
                        <Image style={styleProduto.imageIcon} source={require('../../Assets/icon3.png')} />
                    </View>
                </View>
                <View style={styleProduto.text}>
                    <Text style={style.title}>Data da Recomendação</Text>
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
    },
    usuario:{
        backgroundColor:"#90F"
    },
    data: {
        backgroundColor:"#0AF",
        borderRadius:20
    },
});

const ProdutoDetails = (props) => {
    const { produto } = props;
    return(
        <View style={styleProduto.card}>
            <View style={styleProduto.imageFrame}>
                <View style={styleProduto.image}>
                    <Image style={styleProduto.imageIcon} source={require('../../Assets/Produto.png')} />
                </View>
            </View>
            <View style={styleProduto.text}>
                <Text style={style.title}>{produto.nome}</Text>
                <Text style={style.text}>R${produto.valor}</Text>
            </View>
        </View>
    );
}

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