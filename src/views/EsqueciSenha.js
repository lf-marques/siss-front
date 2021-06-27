import React, { useState } from 'react'
import { Alert } from 'react-native'
import { View, KeyboardAvoidingView, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { Input } from 'react-native-elements'
import CadastroUsuario from '../services/cadastroUsuario/Index'

export default props => {   
    const [email, setEmail] = useState(null)
    const [visibleLoader, setVisibleLoader] = useState(false)

    const enviarCodigo = () => {
        if(email && email != "") {
            setVisibleLoader(true)
            CadastroUsuario.enviarCodigoRecuperacao(email).then((response) => {
                if(response['success']) {
                    setVisibleLoader(false)
                    Alert.alert('Código enviado com sucesso, prossiga para próxima tela.')
                    props.navigation.navigate("SenhaRecuperar", {info: response.data})
                }else if(response['error']) {
                    setVisibleLoader(false)
                    Alert.alert(response.message)
                }
            })
        }else {
            Alert.alert('Informe o e-mail')
        }
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
                onChangeText={email => setEmail(email)}
            />

            { !visibleLoader && 
                <TouchableOpacity style={styles.btnSubmit}
                    onPress={() => {
                        enviarCodigo()
                    }}
                >
                    <Text style={styles.submitText}>Enviar Código</Text>
                </TouchableOpacity>
            }
            { visibleLoader &&
                <ActivityIndicator size="large" color="#e0000a"/>
            }
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



