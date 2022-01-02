import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, Image, Button } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import MenuAreaRestrita from "../../assets/components/MenuAreaRestrita";
import config from '../../config/config';
import { css } from '../../assets/css/Css';
import Logomarca from '../../assets/img/logo.gif';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';


export default function Cadastro({ navigation }) {

    const address = config.origin;
    const [code, setCode] = useState(null);
    const [user, setUser] = useState(null);
    const [product, setProduct] = useState(null);
    const [response, setResponse] = useState(null);

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        randomCode();
        setProduct('');
    }, [response]);

    //Pegar o id do usuário
    async function getUser() {
        let response = await AsyncStorage.getItem('userData');
        let json = JSON.parse(response);
        setUser(json.id);
    }

    //Gerar um código randômico
    async function randomCode() {
        let result = '';
        let length = 20;
        let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        setCode(result);
    }

    //Envio do formulário
    async function sendForm() {
        let response = await fetch(config.urlRoot + 'create', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: user,
                code: code,
                product: product,
                local: address
            })
        });
        let json = await response.json();
        setResponse(json);
    }

    //Compartilhar o QRCode
    async function shareQR() {
        const image = config.urlRoot + 'img/code.png';
        FileSystem.downloadAsync(
            image,
            FileSystem.documentDirectory + '.png'
        ).then(({ uri }) => {
            Sharing.shareAsync(uri);
        });
        await Sharing.shareAsync();
    }

    return (
        <View>
            <MenuAreaRestrita title='Cadastro' navigation={navigation} />
            {response && (
                <View>
                    <Image style={{ alignSelf: 'center' }} source={{ uri: response, height: 180, width: 180 }} />
                    <Button title='Compartilhar' onPress={shareQR()} />
                </View>
            )}

            <View style={css.login__input}>
                <Image style={{ alignSelf: 'center' }} source={Logomarca} />
                <TextInput style={css.inputText}
                    placeholder='Nome do produto:'
                    onChangeText={text => setProduct(text)}
                    value={product}
                />
            </View>
            <TouchableOpacity style={css.login__button} onPress={() => sendForm()}>
                <Text style={css.login__buttonText}>Cadastrar</Text>
            </TouchableOpacity>

        </View>
    );
}