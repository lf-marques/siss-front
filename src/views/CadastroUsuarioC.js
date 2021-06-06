import { NavigationContainer } from '@react-navigation/native'
import React, { useState, useEffect } from 'react'
import { View, Animated, Keyboard, KeyboardAvoidingView, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { Input } from 'react-native-elements'
import { TextInputMask } from 'react-native-masked-text'
import { RadioButton } from 'react-native-paper'

export default props => {
    const [offset] = useState(new Animated.ValueXY({ x: 0, y: 95 }))
    const [opacity] = useState(new Animated.Value(0))
    const [logo] = useState(new Animated.ValueXY({ x: 330, y: 127 }))
    const [cpf, setCpf] = useState(null)
    const [checked, setChecked] = React.useState('A+');

    let cpfField = null

    const validar = () => {
        let error = false
        setErrorCpf(null)

        if (!cpfField.isValid()) {
            setErrorCpf("Preencha seu CPF corretamente")
            error = true
        }
        return !error
    }

    const salvar = () => {
        if (validar()) {

            let data = {
                cpf: cpf
            }

            usuarioService.cadastrar(data)
                .then((response) => {
                    setLoading(false)
                    const titulo = (response.data.status) ? "Sucesso" : "Erro"
                    showDialog(titulo, response.data.mensagem, "SUCESSO")
                    //Alert.alert(titulo, response.data.mensagem)          
                })
                .catch((error) => {
                    setLoading(false)
                    showDialog("Erro", "Houve um erro inesperado", "ERRO")
                    //Alert.alert("Erro", "Houve um erro inesperado")
                })
        }
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

                <Input
                    style={styles.input}
                    autoCorrect={false}
                    placeholder='Nome'
                    leftIcon={{ type: 'font-awesome', name: 'user', color: '#B8B8B8' }}
                    onChange={() => { }}
                />

                <Input
                    style={styles.input}
                    autoCorrect={false}
                    placeholder='Sobrenome'
                    leftIcon={{ type: 'font-awesome', name: 'user', color: '#B8B8B8' }}
                    onChange={() => { }}
                />

                <Input
                    style={styles.input}
                    autoCorrect={false}
                    placeholder='E-mail'
                    leftIcon={{ type: 'font-awesome', name: 'envelope', color: '#B8B8B8' }}
                    keyboardType='email-address'
                    onChange={() => { }}
                />
                <View style={styles.containerMask}>
                    <TextInputMask
                        placeholder="CPF"
                        type={'cpf'}
                        value={cpf}
                        onChangeText={value => {
                            setCpf(value)
                            setErrorCpf(null)
                        }}
                        keyboardType="number-pad"
                        returnKeyType="done"
                        style={styles.maskedInput}
                        ref={(ref) => cpfField = ref}
                    />
                </View>

                <Input
                    style={styles.input}
                    autoCorrect={false}
                    placeholder='Data de Nascimento'
                    leftIcon={{ type: 'font-awesome', name: 'calendar', color: '#B8B8B8' }}
                    onChange={() => { }}
                />
                <TouchableOpacity
                    style={styles.btnSubmit}
                    onPress={() => {
                        props.navigation.navigate("Sangue")
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



