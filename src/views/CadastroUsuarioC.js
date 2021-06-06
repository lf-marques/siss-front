import { NavigationContainer } from '@react-navigation/native'
import React, { useState, useEffect } from 'react'
import { Alert } from 'react-native'
import { View, Animated, Keyboard, KeyboardAvoidingView, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { Input } from 'react-native-elements'
import { TextInputMask } from 'react-native-masked-text'
import { RadioButton } from 'react-native-paper'

export default props => {

    const [offset] = useState(new Animated.ValueXY({ x: 0, y: 95 }))
    const [opacity] = useState(new Animated.Value(0))
    const [logo] = useState(new Animated.ValueXY({ x: 330, y: 127 }))
    
    const [usuario, setUsuario] = useState(null)
    const [email, setEmail] = useState(null)
    const [senha, setSenha] = useState(null)
    const [senhaConfirmacao, setSenhaConfirmacao] = useState(null)

    const proximaPagina = () => {
        if(validar()) {
            const userPageData = {
                user: {
                    usuario: usuario,
                    email: email,
                    senha: senha
                }
            }
            props.navigation.navigate("PessoaFisica", userPageData)
        }
    }

    const validar = () => {
        let valid = true
        let message = 'preecha o campo '

        if(!usuario) {
            valid = false
            message += '"usuário"'
        }else if(!email) {
            valid = false
            message += '"e-mail"'
        }else if(!senha) {
            valid = false
            message += '"senha"'
        }else if(!senhaConfirmacao) {
            valid = false
            message += '"confirmar senha"'
        }else if(senha != senhaConfirmacao) {
            valid = false
            message = 'Senhas diferentes, por favor verifique'
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
                    Insira suas informações.
                </Text>
            </View>

                <Input
                    style={styles.input}
                    autoCorrect={false}
                    placeholder='Usuário'
                    leftIcon={{ type: 'font-awesome', name: 'user', color: '#B8B8B8' }}
                    onChangeText={usuario => setUsuario(usuario)}
                />

                <Input
                    style={styles.input}
                    autoCorrect={false}
                    placeholder='E-mail'
                    leftIcon={{ type: 'font-awesome', name: 'envelope', color: '#B8B8B8' }}
                    keyboardType='email-address'
                    onChangeText={email => setEmail(email)}
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
                    onChangeText={senhaConfirmacao => setSenhaConfirmacao(senhaConfirmacao)}
                />
                
                <TouchableOpacity
                    style={styles.btnSubmit}
                    onPress={() => {
                        proximaPagina()
                    }}
                >
                    <Text style={styles.submitText}
                    >Próximo</Text>
                </TouchableOpacity>
        </KeyboardAvoidingView>

    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFF'
    },
    input: {
        color: '#222',
        fontSize: 17,
        height: 15,
        paddingTop: 10
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
    maskedInput: {
        flexGrow: 1,
        height: 40,
        fontSize: 18,
        borderBottomColor: "#999",
        borderBottomWidth: 1,
        borderStyle: "solid",
        alignSelf: "flex-start"
    },
    containerMask: {
        flexDirection: "row",
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 10
    },
})


