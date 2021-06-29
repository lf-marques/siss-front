import React, { useState } from 'react'
import { View, KeyboardAvoidingView, TouchableOpacity, Text, StyleSheet, Alert, ActivityIndicator, TextInput } from 'react-native'
import CadastroUsuario from '../../services/cadastroUsuario/Index'

export default props => {

    const [senhaAtual, setSenhaAtual] = useState(null)
    const [novaSenha, setNovaSenha] = useState(null)
    const [novaSenhaConfirm, setNovaSenhaConfirm] = useState(null)
    const [visibleLoader, setVisibleLoader] = useState(false)

    const salvar = () => {
        if(validar()) {
            setVisibleLoader(true)
            CadastroUsuario.alterarSenha(senhaAtual, novaSenha).then((response => {
                if(response['success']) {
                    setVisibleLoader(false)
                    Alert.alert('Senha alterada com sucesso!')
                    props.navigation.reset({
                        index: 0,
                        routes: [{ name: "Drawer" }]
                    })
                }else if(response['error']) {
                    setVisibleLoader(false)
                    Alert.alert(response.message)
                }else {
                    setVisibleLoader(false)
                    Alert.alert('Ocorreu um erro na aplicação.')
                }
            }))
        }
    }

    const validar = () => {
        let valid = true
        let message = 'Preencha o campo '
        
        if(!senhaAtual || !senhaAtual.trim()) {
            valid = false
            message += '"senha atual"'
        }else if(!novaSenha || !novaSenha.trim()) {
            valid = false
            message += '"nova senha"'
        }else if(!novaSenhaConfirm || !novaSenhaConfirm.trim()) {
            valid = false
            message += '"confirmação nova senha"'
        }else if(novaSenha != novaSenhaConfirm) {
            valid = false
            message = 'Confirmação da senha está incorreta'
        }else if(novaSenha.length < 8 || novaSenha.length > 25) {
            valid = false
            message = 'Nova senha deve conter entre 8 a 25 caracteres'
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
                    Altere sua senha.
                </Text>
            </View>

            <View style={styles.form}>
                <Text>Senha atual *</Text>
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#999999"
                    autoCorrect={false}
                    placeholder='Senha atual'
                    value={senhaAtual}
                    secureTextEntry={true}
                    onChangeText={senhaAtual => setSenhaAtual(senhaAtual)}
                />

                <Text>Nova senha *</Text>
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#999999"
                    autoCorrect={false}
                    placeholder='Nova Senha'
                    value={novaSenha}
                    secureTextEntry={true}
                    onChangeText={novaSenha => setNovaSenha(novaSenha)}
                />

                <Text>Confirme a nova senha *</Text>
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#999999"
                    autoCorrect={false}
                    placeholder='Confirme a nova senha'
                    value={novaSenhaConfirm}
                    secureTextEntry={true}
                    onChangeText={novaSenhaConfirm => setNovaSenhaConfirm(novaSenhaConfirm)}
                />

                {!visibleLoader &&
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity
                            style={styles.btnSubmit}
                            onPress={() => { salvar() }}
                        >
                            <Text style={styles.submitText}>
                                Alterar senha
                            </Text>
                        </TouchableOpacity>
                    </View>
                }
                { visibleLoader &&
                    <ActivityIndicator size="large" color="#e0000a" />
                }
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    form: {
        padding: 12,
    },
    input: {
        height: 40,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        marginBottom: 10,
        color: 'black'
    },
    buttonsContainer: {
        width: '100%',
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
    }
})