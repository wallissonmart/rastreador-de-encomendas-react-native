import React, { useState } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { css } from '../assets/css/Css';
import config from '../config/config';

export default function Rastreio({ navigation }) {

    const [code, setCode] = useState(null);
    const [response, setResponse] = useState(null);

    //Envia os dados do formulário
    async function sendForm() {
        let response = await fetch(config.urlRoot + 'rastreio', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code: code
            })
        });
        let json = await response.json();
        setResponse(json);
    }

    return (
        <View style={css.container}>
            <Image source={require('../assets/img/location.png')} />
            <TextInput
                placeholder='Digite o código de rastreio:'
                onChangeText={text => setCode(text)}
                style={[css.login__input2, css.rastreio__inputMargin]}
            />

            <TouchableOpacity style={css.login__button} onPress={() => sendForm()}>
                <Text style={css.login__buttonText}>Rastrear</Text>
            </TouchableOpacity>

            <Text>{response}</Text>
        </View>
    );
}