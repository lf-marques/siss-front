import { NavigationContainer } from '@react-navigation/native'
import React, { useState, useEffect } from 'react'
import { View, Animated, Keyboard, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { Button, Input, Icon } from 'react-native-elements'
import { TextInputMask } from 'react-native-masked-text'

export default props => {
    const [senha, setSenha] = useState(null)
    const [csenha, setCSenha] = useState(null)
    const [codigo, setCodigo] = useState(null)



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
                onChange={() => { }}
            />

            <Input
                style={styles.input}
                autoCorrect={false}
                placeholder='Senha'
                leftIcon={{ type: 'font-awesome', name: 'lock', color: '#B8B8B8' }}
                secureTextEntry={true}
                onChange={() => { }}
            />

            <Input
                style={styles.input}
                autoCorrect={false}
                placeholder='Confirmar Senha'
                leftIcon={{ type: 'font-awesome', name: 'lock', color: '#B8B8B8' }}
                secureTextEntry={true}
                onChange={() => { }}
            />

            <TouchableOpacity
                style={styles.btnSubmit}
                onPress={() => {
                    props.navigation.navigate("login")
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



