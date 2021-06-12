import { NavigationContainer } from '@react-navigation/native'
import React, { useState, useEffect } from 'react'
import { View, Animated, Keyboard, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native'
import { Button, Input, Icon } from 'react-native-elements'
import { TextInputMask } from 'react-native-masked-text'
import CadastroUsuario from '../../services/cadastroUsuario/Index'

export default props => {
    const [senha, setSenha] = useState(null)
    const [cSenha, setCSenha] = useState(null)
    const [codigo, setCodigo] = useState(null)

    const info = props.route.params ? props.route.params.info : {}

    const redefinirSenha = () => {
        if(validar() && info) {
            let request = {
                idUsuario: info.idUsuario, 
                codigo: codigo, 
                senha: senha
            }
            CadastroUsuario.redefinirSenha(request).then((response) => {
                if(response['success']) {
                    Alert.alert('Senha redefinida com sucesso!')
                    props.navigation.navigate("login")
                }else if(response['error']) {
                    Alert.alert(response.message)
                }
            })
        }
    }

    const validar = () => {
        let valid = true
        let message = 'Preecha o campo '
        
        if(!codigo) {
            valid = false
            message += '"codigo"'
        }else if(!senha) {
            valid = false
            message += '"senha"'
        }else if(!cSenha) {
            valid = false
            message += '"confirmação senha"'
        }else if(senha != cSenha) {
            valid = false
            message = 'As senhas estão diferentes'
        }

        if(!valid) {
            Alert.alert(message)
        }
        return valid
    }

    return (
        <KeyboardAvoidingView style={styles.background}>
            <View style={{ backgroundColor: '#AD0E3D', width: '100%', height: 40, borderBottomRightRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 25, color: '#FFF', fontWeight: 'bold', }}>
                    Preencha os campos!
                </Text>
            </View>
            <Input
                style={styles.input}
                autoCorrect={false}
                placeholder='Código de Verificação'
                leftIcon={{ type: 'font-awesome', name: 'user', color: '#B8B8B8' }}
                onChangeText={codigo => setCodigo(codigo)}
            />

            <Input
                style={styles.input}
                autoCorrect={false}
                placeholder='Senha'
                leftIcon={{ type: 'font-awesome', name: 'lock', color: '#B8B8B8' }}
                secureTextEntry={true}
                onChangeText={senha => setSenha(senha)}
            />

            <Input
                style={styles.input}
                autoCorrect={false}
                placeholder='Confirmar Senha'
                leftIcon={{ type: 'font-awesome', name: 'lock', color: '#B8B8B8' }}
                secureTextEntry={true}
                onChangeText={cSenha => setCSenha(cSenha)}
            />

            <TouchableOpacity
                style={styles.btnSubmit}
                onPress={() => {
                    redefinirSenha()
                }}
            >
                <Text style={styles.submitText}
                >Salvar</Text>
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



