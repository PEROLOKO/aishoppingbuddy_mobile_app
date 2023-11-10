import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default ListItem = (props) => {

    const { navigation } = props;
    const { item } = props;

    const id = item.id;
    const nome = item.nome;
    const cpf = item.cpf;

    const mensagem = `ID: ${id}\nCPF: ${cpf}`

    return (
        <View style={style.card}>
            <Text style={style.titulo}>{nome}</Text>
            <View style={style.bar}></View>
            <Text style={style.mensagem}>{mensagem}</Text>
            <View style={style.buttonView}>
                <TouchableOpacity style={style.button}  onPress={() => navigation.push('itemUsuario', {id: item.id, navigation:navigation, item:item })}>
                    <Text style={style.buttonLabel}>Saiba mais</Text>
                    <Image style={style.arrow} source={require('../../Assets/arrow.png')} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
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