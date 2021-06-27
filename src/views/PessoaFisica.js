import React, { useState, useEffect } from 'react'
import { View, Animated, ScrollView, KeyboardAvoidingView, TouchableOpacity, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native'
import { Input } from 'react-native-elements'
import { TextInputMask } from 'react-native-masked-text'
import CadastroUsuario from '../services/cadastroUsuario/Index'
import PFAbstract from '../services/pessoaFisica/Abstract'

export default props => {

    const userPageData = props.route.params ? props.route.params : {}

    const [offset] = useState(new Animated.ValueXY({ x: 0, y: 95 }))
    const [opacity] = useState(new Animated.Value(0))
    const [logo] = useState(new Animated.ValueXY({ x: 330, y: 127 }))
    const [visibleLoader, setVisibleLoader] = useState(false)
    
    const [nomeCompleto, setNomeCompleto] = useState(null)
    const [cpf, setCpf] = useState(null)
    const [rg, setRg] = useState(null)
    const [dataNascimento, setDataNascimento] = useState(null)
    const [telefone, setTelefone] = useState(null)
    const [celular, setCelular] = useState(null)
    

    const proximaPagina = () => {
        if (validar()) {
            setVisibleLoader(true)
            CadastroUsuario.checkExists('n', 'n', cpf, rg).then((response) => {
                setVisibleLoader(false)
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
            valid = false
            message += '"cpf"'
        }else if(!rg  || rg.length != 12) {
            valid = false
            message += '"rg"'
        }else if(!dataNascimento  || dataNascimento.length != 10) {
            valid = false
            message += '"data de nascimento"'
        }else if(!telefone || telefone.length != 14) {
            valid = false
            message += '"telefone"'
        }else if(!celular  || celular.length != 15) {
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
                        placeholder='Nome Completo'
                        placeholderTextColor="#999999"
                        value={nomeCompleto}
                        onChangeText={nomeCompleto => setNomeCompleto(nomeCompleto)}
                    />

                    <View style={styles.containerMask}>
                        <TextInputMask
                            placeholder="CPF"
                            placeholderTextColor="#999999"
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
                            placeholderTextColor="#999999"
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
                            placeholderTextColor="#999999"
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
                            placeholderTextColor="#999999"
                            type={'custom'}
                            options={{mask: '(99) 9999-9999'}}
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
                            placeholderTextColor="#999999"
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

                    {!visibleLoader &&
                        <TouchableOpacity
                            style={styles.btnSubmit}
                            onPress={() => {
                                proximaPagina()
                            }}
                        >
                            <Text style={styles.submitText}
                            >Próximo</Text>
                        </TouchableOpacity>
                    }
                    { visibleLoader &&
                        <ActivityIndicator size="large" color="#e0000a" />
                    }
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
        color: 'black',
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
        alignSelf: "flex-start",
        color: 'black'
    },
    containerMask: {
        flexDirection: "row",
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 10
    }
})