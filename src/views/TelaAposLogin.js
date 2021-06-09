import React, { useState } from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Image, Alert } from 'react-native'
import { Button, Icon } from 'react-native-elements'
import PessoaFisicaAbstract from '../services/pessoaFisica/Abstract'


export default props => {

    const pVeiculo = false
    const pContato = false
    const pAlergia = false
    const pDoenca = false

    const [usrData, setUsrData] = useState(null)

    function init() {
        if(!usrData) {
            PessoaFisicaAbstract.getByCurrentToken().then((response => {
                if(response['success']) {
                    setUsrData(response.data)
                }else if(response['error']){
                    Alert.alert(response.message)
                }
            }))
        }
    }

    function CadVeiculo() {
        if (usrData && !usrData.veiculos) {
            return (
                <View style={styles.condicional}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.aviso}>Nenhum veículo cadastrado!</Text>
                        <Text style={styles.subAviso}>Insira um veiculo para completar seu cadastro</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity
                            style={styles.btnSubmit}
                            onPress={() => {
                                { props.navigation.navigate("Veiculos") }
                            }}
                        >
                            <Text style={styles.submitText}
                            >Cadastrar Veículo</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            )
        }
    }
    function CadContato() {
        if (usrData && !usrData.contatos) {
            return (
                <View style={styles.condicional}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.aviso}>Nenhum contato cadastrado!</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity
                            style={styles.btnSubmit}
                            onPress={() => {
                                { props.navigation.navigate("Contatos") }
                            }}
                        >
                            <Text style={styles.submitText}
                            >Cadastrar Contato</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            )
        }
    }
    function CadDoenca() {
        if (usrData && (!usrData.condicaoClinica || !usrData.condicaoClinica.doencas)) {
            return (
                <View style={styles.condicional}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.aviso}>Atualizar Doenças</Text>
                        <Text style={styles.subAviso}>Informe se possui ou não alguma doença.</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity
                            style={styles.btnSubmit}
                            onPress={() => {
                                { props.navigation.navigate("Doencas") }
                            }}
                        >
                            <Text style={styles.submitText}
                            >Informar</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            )
        }
    }
    function CadAlergia() {
        if (usrData && (!usrData.condicaoClinica || !usrData.condicaoClinica.alergias)) {
            return (
                <View style={styles.condicional}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.aviso}>Atualizar Alergias</Text>
                        <Text style={styles.subAviso}>Informe se possui ou não alguma alergia.</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity
                            style={styles.btnSubmit}
                            onPress={() => {
                                { props.navigation.navigate("Alergias") }
                            }}
                        >
                            <Text style={styles.submitText}
                            >Informar</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            )
        }
    }

    return (
        <KeyboardAvoidingView style={styles.background}>
            <View style={{ backgroundColor: '#AD0E3D', alignItems: 'center', flexDirection: 'row', borderBottomRightRadius: 20 }}>
                <Button
                    onPress={() => {
                        props.navigation.openDrawer()
                    }}
                    type='clear'
                    icon={<Icon name="menu" size={25} color="white" />}
                />
                <Text style={{ fontSize: 20, color: '#FFF' }}>
                    Menu
            </Text>
            </View>
            <View style={styles.containerLogo}>
                <Image
                    style={{
                        width: 330,
                        height: 127
                    }}
                    source={require('../assets/LogoSis.png')}
                />
            </View>
            <View style={{ flex: .5, backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 30, color: '#AD0E3D', fontWeight: 'bold' }}>Bem vindo ao S.I.S</Text>
            </View>
            <View style={{ backgroundColor: '#FFF' }}>
                {init()}
                {CadVeiculo()}
                {CadContato()}
                {CadAlergia()}
                {CadDoenca()}
            </View>
        </KeyboardAvoidingView >
    )
}
const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    btnSubmit: {
        backgroundColor: '#AD0E3D',
        width: '60%',
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
    },
    submitText: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'bold'
    },
    condicional: {
        marginTop: 5,
        marginBottom: 5
    },
    aviso: {
        fontSize: 25,
        color: '#AD0E3D',
    },
    subAviso: {
        fontSize: 15,
        marginBottom: 10
    },
    containerLogo: {
        marginBottom: 15,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
})
