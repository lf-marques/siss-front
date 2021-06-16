import React, { useState, useEffect } from 'react'
import { Alert } from 'react-native'
import { View, TextInput, Animated, Keyboard, KeyboardAvoidingView, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { Input } from 'react-native-elements'
import OauthToken from '../services/oauthToken/Token'

export default props => {
    const [offset] = useState(new Animated.ValueXY({ x: 0, y: 95 }))
    const [opacity] = useState(new Animated.Value(0))
    const [logo] = useState(new Animated.ValueXY({ x: 330, y: 127 }))
    const [login, setLogin] = useState(null)
    const [senha, setSenha] = useState(null)

    const entrar = () => {
        if(login &&  login != '' && senha && senha !=''){
            
            //Obtem o token de acesso de API com base nos dados de login
            OauthToken.login(login, senha).then((response => {
                console.log(response)
                if(response['success']) {
                    Alert.alert('Logado com sucesso')
                    redirectByType(response.tokenData.executante)                  
                }else if(response['error']) {
                    Alert.alert(response.message)
                }else {
                    Alert.alert('Tente novamente mais tarde.')
                }
            }))
        }else{
            Alert.alert('Preencha os campos')
        }
    }

    const redirectByType = (type) => {
        if(type == 0) {
            props.navigation.reset({
                index: 0,
                routes: [{ name: "Drawer" }]
            })
        }else {
            props.navigation.reset({
                index: 0,
                routes: [{ name: "Busca" }]
            })
        }
    }

    useEffect(() => {
        OauthToken.getTokenStorage().then((response => {
            if(response && response['token']) {
                redirectByType(response.executante)
            }
        }))

        keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow)
        keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide)

        Animated.parallel([
            Animated.spring(offset.y, {
                useNativeDriver: false,
                toValue: 0,
                speed: 4,
                bounciness: 15,
            }),
            Animated.timing(opacity, {
                useNativeDriver: false,
                toValue: 1,
                duration: 300,
            })
        ]).start();
    })

    function keyboardDidShow() {
        Animated.parallel([
            Animated.timing(logo.x, {
                useNativeDriver: false,
                toValue: 220,
                duration: 100,
            }),
            Animated.timing(logo.y, {
                useNativeDriver: false,
                toValue: 85,
                duration: 100,
            }),
        ]).start();
    }
    function keyboardDidHide() {
        Animated.parallel([
            Animated.timing(logo.x, {
                useNativeDriver: false,
                toValue: 330,
                duration: 100,
            }),
            Animated.timing(logo.y, {
                useNativeDriver: false,
                toValue: 127,
                duration: 100,
            }),
        ]).start();
    }


    return (
        <KeyboardAvoidingView style={styles.background}>
            <View style={styles.containerLogo}>
                <Animated.Image
                    style={{
                        width: logo.x,
                        height: logo.y
                    }}
                    source={require('../assets/LogoSis.png')}
                />
            </View>

            <Animated.View style={[
                styles.container,
                {
                    flex: 1,
                    justifyContent: 'flex-start',
                    opacity: opacity,
                    transform: [
                        { translateY: offset.y }
                    ]
                }
            ]}>

                <Input
                    placeholder='usuário ou email'
                    leftIcon={{ type: 'font-awesome', name: 'user', color: '#B8B8B8' }}
                    onChangeText={text => setLogin(text)}
                    value={login}

                />

                <Input
                    placeholder='Senha'
                    leftIcon={{ type: 'font-awesome', name: 'lock', color: '#B8B8B8' }}
                    secureTextEntry={true}
                    onChangeText={senha => setSenha(senha)}
                    value={senha}
                />

                <TouchableOpacity
                    style={styles.btnSubmit}
                    onPress={() => { entrar({ login, senha }) }}
                >
                    <Text style={styles.submitText}
                    >Acessar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnRegister}>
                    <Text style={styles.registerText}
                        onPress={() => {
                            props.navigation.navigate("CadUserC")
                        }}
                    >Cadastre-se</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnRegister}>
                    <Text style={styles.registerText}
                        onPress={() => {
                            props.navigation.navigate("Esqueci")
                        }}
                    >Esqueci minha senha</Text>
                </TouchableOpacity>
            </Animated.View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF'
    },
    containerLogo: {
        flex: 1,
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        paddingBottom: 50
    },
    input: {
        backgroundColor: '#E6E6E6',
        width: '90%',
        marginBottom: 15,
        color: '#222',
        fontSize: 17,
        borderRadius: 30,
        padding: 10,
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

    btnRegister: {
        marginTop: 10,
    },
    registerText: {
        color: '#AD0E3D',
        fontSize: 20,
        fontWeight: 'bold'
    }
})



