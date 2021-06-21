import { NavigationContainer } from '@react-navigation/native'
import React, { useState, useEffect } from 'react'
import { Alert } from 'react-native'
import { View, Animated, ScrollView, KeyboardAvoidingView, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { Input } from 'react-native-elements'   
import { TextInputMask } from 'react-native-masked-text'
import { RadioButton } from 'react-native-paper'
import CadastroUsuario from '../services/cadastroUsuario/Index'

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
            CadastroUsuario.checkExists(usuario, email, 'n', 'n').then((response) => {
                if(response['error']) {
                    Alert.alert(response.message)
                }else {
                    const userPageData = {
                        user: {
                            usuario: usuario,
                            email: email,
                            senha: senha
                        }
                    }
                    props.navigation.navigate('PessoaFisica', userPageData)
                }
            })
        }
    }

    const validar = () => {
        let valid = true
        let message = 'preecha o campo '

        if(!usuario || usuario.length < 5) {
            valid = false
            message += '"usuário (5 a 100 caracteres)"'
        }else if(!email || email.length < 10 || !email.includes('@')) {
            valid = false
            message += '"e-mail  (10 a 100 caracteres)"'
        }else if(!senha || senha.length < 8) {
            valid = false
            message += '"senha (8 a 25 caracteres)"'
        }else if(!senhaConfirmacao || senhaConfirmacao.length < 8) {
            valid = false
            message += '"confirmar senha (8 a 25 caracteres)"'
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
        <ScrollView>

            <KeyboardAvoidingView style={styles.background}>
                <View style={{ backgroundColor: '#AD0E3D', width: '100%', height: 40, borderBottomRightRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 25, color: '#FFF', fontWeight: 'bold', }}>
                        Insira suas informações.
                    </Text>
                </View>

                    <Input
                        style={styles.input}
                        autoCorrect={false}
                        placeholder='Usuário, ex: SisSalvandoVidas123'
                        leftIcon={{ type: 'font-awesome', name: 'user', color: '#B8B8B8' }}
                        value={usuario}
                        onChangeText={usuario => setUsuario(usuario.trim())}
                    />

                    <Input
                        style={styles.input}
                        autoCorrect={false}
                        placeholder='E-mail'
                        leftIcon={{ type: 'font-awesome', name: 'envelope', color: '#B8B8B8' }}
                        keyboardType='email-address'
                        value={email}
                        onChangeText={email => setEmail(email.trim())}
                    />

                    <Input
                        style={styles.input}
                        autoCorrect={false}
                        placeholder='Senha'
                        leftIcon={{ type: 'font-awesome', name: 'lock', color: '#B8B8B8' }}
                        secureTextEntry={true}
                        value={senha}
                        onChangeText={senha => setSenha(senha)}
                    />

                    <Input
                        style={styles.input}
                        autoCorrect={false}
                        placeholder='Confirmar Senha'
                        leftIcon={{ type: 'font-awesome', name: 'lock', color: '#B8B8B8' }}
                        secureTextEntry={true}
                        value={senhaConfirmacao}
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
        </ScrollView>
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



