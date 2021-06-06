import React, { useState } from 'react'
import { Alert } from 'react-native'
import { View, Text, Image, KeyboardAvoidingView, TouchableOpacity, StyleSheet, Character } from 'react-native'
import { Button, Input, Icon } from 'react-native-elements'


export default props => {
    const [digBusca, setdigBusca] = useState('12545687587')

    const entrar = () => {
        if (digBusca != '') {
            if (digBusca.length == 11 && !isNaN(parseFloat(digBusca)) && isFinite(digBusca)) {
                props.navigation.navigate
                ("ListaBuscaCPF")
            } else if (digBusca.length == 7 &&
                isNaN(digBusca.charAt(0)) &&
                isNaN(digBusca.charAt(1)) &&
                isNaN(digBusca.charAt(2)) &&
                !isNaN(parseFloat(digBusca.charAt(3))) &&
                !isNaN(parseFloat(digBusca.charAt(5))) &&
                !isNaN(parseFloat(digBusca.charAt(6)))) {
                props.navigation.navigate("ListaBuscaPlaca")
            } else {
                Alert.alert('Valor digitado inválido!')
            }

        } else {
            Alert.alert('Preencha o campo')
        }


    }

    return (
        <KeyboardAvoidingView style={styles.background}>
            <View style={styles.containerLogo}>
                <Image
                    style={{
                        width: 330,
                        height: 127
                    }}
                    source={require('../assets/LogoSis.png')}
                />
            </View>
            <View style={{
                alignItems: 'center',
                backgroundColor: '#AD0E3D',
                borderBottomRightRadius: 20,
            }}>
                <Text style={{ marginTop: 10, fontSize: 30, color: '#FFF', fontWeight: 'bold' }}>
                    Buscar por Vitima
                </Text>
                <Text style={{ marginBottom: 10, fontSize: 15, color: '#FFF' }}>
                    Digite somente letras ou números.
                </Text>
            </View >
            <View style={styles.views}>
                <Input
                    style={styles.input, { paddingTop: 30 }}
                    autoCorrect={false}
                    placeholder='Digite CPF ou Placa do veículo'
                    onChangeText={text => setdigBusca(text.replace(/[^a-zA-Z0-9]/, ''))}
                    value={digBusca}
                />
                <TouchableOpacity
                    style={styles.btnSubmit}
                    onPress={() => { entrar({ digBusca }) }}
                >
                    <Text style={styles.submitText}
                    >Buscar</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView >
    )
}
const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    input: {
        color: '#222',
        fontSize: 17,
        backgroundColor: '#FFF',

    },
    views: {
        flex: 2,
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    containerLogo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnSubmit: {
        backgroundColor: '#AD0E3D',
        width: '90%',
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
    },
    submitText: {
        color: '#FFF',
        fontSize: 22,
        fontWeight: 'bold'
    },
})



