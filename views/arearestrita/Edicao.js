import React, { useState, useEffect } from 'react';
import { Text, View, Button, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import MenuAreaRestrita from "../../assets/components/MenuAreaRestrita";
import { BarCodeScanner } from 'expo-barcode-scanner';
import { css } from '../../assets/css/Css';
import config from '../../config/config';
import * as Location from "expo-location";
import Geocoder from "react-native-geocoding";

export default function Edicao({ navigation }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [displayQR, setDisplayQR] = useState('flex');
    const [displayForm, setDisplayForm] = useState('none');
    const [code, setCode] = useState(null);
    const [product, setProduct] = useState(null);
    const [localization, setLocalization] = useState(null);
    const [response, setResponse] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    //Leitura do código QR
    async function handleBarCodeScanned({ type, data }) {
        setScanned(true);
        setDisplayQR('none');
        setDisplayForm('flex');
        setCode(data);
    }

    async function searchProduct(codigo) {
        let response = await fetch(config.urlRoot + 'searchProduct', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code: codigo
            })
        });
        let json = await response.json();
        setProduct(json.Products[0].name);
    }

    async function sendForm() {

    }

    //Nova leitura do QRCode
    async function readAgain() {
        setScanned(false);
        setDisplayQR('flex');
        setDisplayForm('none');
        setCode(null);
        setProduct(null);
        setLocalization(null);
    }

    /*useEffect(() => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
            }
        })();
    });*/

    /*//Retorna a posição e endereço do usuário
    async function getLocation() {
        let location = await Location.getCurrentPositionAsync({});
        Geocoder.init(config.geocodingAPI);
        Geocoder.from(location.coords.latitude, location.coords.longitude)
            .then(json => {
                let number = json.results[0].address_components[0].short_name;
                let street = json.results[0].address_components[1].short_name;
                setLocalization(`${street} - ${number}`);
            })
            .catch(error => console.warn(error));
    }*/

    //Envia o formulário com os dados para edição
    async function sendForm() {
        let response = await fetch(config.urlRoot + 'update', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                code: code,
                product: product,
                local: localization
            })
        });
        let json = await response.json();
        setResponse(json);
    }

    return (
        <View style={css.contaneredicao}>
            <MenuAreaRestrita title='Edição' navigation={navigation} />
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 25, padding: 30, textAlign: 'center' }}>Leia o produto que deseja editar com o QR Code{response}</Text>

            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : value => handleBarCodeScanned(value)}
                style={css.qr__code(displayQR)}
            />

            <View style={css.qr__form(displayForm)}>
                <Text>Código do Produto: {code}</Text>

                <View style={css.login__input}>
                    <TextInput
                        placeholder='Nome do Produto:'
                        onChangeText={text => setProduct(text)}
                        value={product}
                    />
                </View>

                <View style={css.login__input}>
                    <TextInput
                        placeholder='Localização do Produto:'
                        onChangeText={text => setLocalization(text)}
                        value={localization}
                    />
                </View>

                <TouchableOpacity style={css.login__button} onPress={() => sendForm()}>
                    <Text style={{ textAlign: 'center' }}>Atualizar</Text>
                </TouchableOpacity>

                {scanned &&
                    <View style={{ textAlign: 'center', paddingTop: 20 }}>
                        <Button
                            title='Escanear Novamente'
                            onPress={() => readAgain()}
                        />
                    </View>
                }
            </View>
        </View>
    );
}
