import { NavigationContainer } from '@react-navigation/native'
import React, { useState, useEffect } from 'react'
import { Alert } from 'react-native'
import { View, Animated, Keyboard, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { Button, Input, Icon } from 'react-native-elements'
import CadastroUsuario from '../services/cadastroUsuario/Index'

export default props => {
    const [email, setEmail] = useState(null)

    const enviarCodigo = () => {
        CadastroUsuario.enviarCodigoRecuperacao(email).then((response) => {
            if(response['success']) {
                Alert.alert('Código enviado com sucesso, prossiga para próxima tela.')
                props.navigation.navigate("SenhaRecuperar", {info: response.data})
            }else if(response['error']) {
                Alert.alert(response.message)
            }
        })
    }

    return (
        <KeyboardAvoidingView style={styles.background}>
            <View style={{ backgroundColor: '#AD0E3D', width: '100%', height: 90, borderBottomRightRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 15, color: '#FFF', fontWeight: 'bold', }}>
                    Informe o e-mail da conta para enviarmos o código.
                </Text>
            </View>
            <Input
                style={styles.input}
                autoCorrect={false}
                placeholder='E-mail'
                leftIcon={{ type: 'font-awesome', name: 'user', color: '#B8B8B8' }}
                onChangeText={email => setEmail(email)}
            />

            <TouchableOpacity
                style={styles.btnSubmit}
                onPress={() => {
                    enviarCodigo()
                }}
            >
                <Text style={styles.submitText}
                >Enviar Código</Text>
            </TouchableOpacity>

        </KeyboardAvoidingView>

    )
}

const styles = StyleSheet.create({
    background: {
        alignItems: 'center',
        backgroundColor: '#FFF',
    },

    input: {
        color: '#222',
        fontSize: 17,
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
    }
})



