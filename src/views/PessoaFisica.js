import { NavigationContainer } from '@react-navigation/native'
import React, { useState, useEffect } from 'react'
import { View, Animated, Keyboard, KeyboardAvoidingView, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native'
import { Input } from 'react-native-elements'
import { TextInputMask } from 'react-native-masked-text'
import { RadioButton } from 'react-native-paper'
import CadastroUsuario from '../services/cadastroUsuario/Index'
import PFAbstract from '../services/pessoaFisica/Abstract'

export default props => {

    const userPageData = props.route.params ? props.route.params : {}

    const [offset] = useState(new Animated.ValueXY({ x: 0, y: 95 }))
    const [opacity] = useState(new Animated.Value(0))
    const [logo] = useState(new Animated.ValueXY({ x: 330, y: 127 }))

    
    const [nomeCompleto, setNomeCompleto] = useState('Luan Felipe Marques')
    const [cpf, setCpf] = useState('484.922.800-34')
    const [rg, setRg] = useState('41.105.316-4')
    const [dataNascimento, setDataNascimento] = useState('05/04/2001')
    const [telefone, setTelefone] = useState('(43) 3357-4186')
    const [celular, setCelular] = useState('(43) 98477-6675')
    

    const proximaPagina = () => {
        if (validar()) {
            CadastroUsuario.checkExists('n', 'n', cpf, rg).then((response) => {
                if(response['error']) {
                    Alert.alert(response.message)
                }else {
                    let userAndPfPageDate = {
                        user: userPageData.user,
                        pf: {
                            nome: nomeCompleto,
                            cpf: cpf,
                            rg: rg,
                            dataNascimento: dataNascimento,
                            telefone: telefone,
                            celular
                        }
                    }
                    props.navigation.navigate("Sangue", userAndPfPageDate)
                }
            })
        }
    }

    const validar = () => {
        let valid = true
        let message = 'Preencha o campo '
        
        if(!nomeCompleto) {
            valid = false
            message += '"nome"'
        }else if(!cpf) {
            message += '"cpf"'
        }else if(!rg) {
            valid = false
            message += '"rg"'
        }else if(!dataNascimento) {
            valid = false
            message += '"data de nascimento"'
        }else if(!telefone) {
            valid = false
            message += '"telefone"'
        }else if(!celular) {
            valid = false
            message += '"celular"'
        }else if(!PFAbstract.validarCpf(cpf)) {
            valid = false
            message += '"CPF" com um valor válido'
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
                    placeholder='Nome Completo'
                    value={nomeCompleto}
                    leftIcon={{ type: 'font-awesome', name: 'user', color: '#B8B8B8' }}
                    onChangeText={nomeCompleto => setNomeCompleto(nomeCompleto)}
                />

                <View style={styles.containerMask}>
                    <TextInputMask
                        placeholder="CPF"
                        type={'cpf'}
                        value={cpf}
                        onChangeText={cpf => setCpf(cpf)}
                        keyboardType="number-pad"
                        returnKeyType="done"
                        style={styles.maskedInput}
                    />
                </View>

                <View style={styles.containerMask}>
                    <TextInputMask
                        placeholder="RG"
                        type={'custom'}
                        options={{mask: '99.999.999-9'}}
                        value={rg}
                        onChangeText={rg => setRg(rg)}
                        keyboardType="number-pad"
                        returnKeyType="done"
                        style={styles.maskedInput}
                    />
                </View>

                <View style={styles.containerMask}>
                    <TextInputMask
                        placeholder="Data de Nascimento"
                        type={'datetime'}
                        options={{ format: 'DD/MM/YYYY' }}
                        value={dataNascimento}
                        onChangeText={dataNascimento => setDataNascimento(dataNascimento)}
                        keyboardType="number-pad"
                        returnKeyType="done"
                        style={styles.maskedInput}
                    />
                </View>

                <View style={styles.containerMask}>
                    <TextInputMask
                        placeholder="Telefone"
                        type={'cel-phone'}
                        options={{
                            maskType: 'BRL',
                            withDDD: true,
                            dddMask: '(99) '
                        }}
                        value={telefone}
                        onChangeText={telefone => setTelefone(telefone)}
                        keyboardType="number-pad"
                        returnKeyType="done"
                        style={styles.maskedInput}
                    />
                </View>

                <View style={styles.containerMask}>
                    <TextInputMask
                        placeholder="Celular"
                        type={'cel-phone'}
                        options={{
                            maskType: 'BRL',
                            withDDD: true,
                            dddMask: '(99) '
                        }}
                        value={celular}
                        onChangeText={celular => setCelular(celular)}
                        keyboardType="number-pad"
                        returnKeyType="done"
                        style={styles.maskedInput}
                    />
                </View>

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
    }
})