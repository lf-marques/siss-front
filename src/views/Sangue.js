import { NavigationContainer } from '@react-navigation/native'
import React, { useState, useEffect } from 'react'
import { Alert } from 'react-native'
import { View, Animated, Keyboard, KeyboardAvoidingView, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { Input } from 'react-native-elements'
import { RadioButton } from 'react-native-paper'
import CadastroUsuario from '../services/cadastroUsuario/Index'

export default props => {
    
    const userAndPfPageDate = props.route.params ? props.route.params : {}
    
    const [offset] = useState(new Animated.ValueXY({ x: 0, y: 95 }))
    const [opacity] = useState(new Animated.Value(0))
    const [logo] = useState(new Animated.ValueXY({ x: 330, y: 127 }))
    const [visibleLoader, setVisibleLoader] = useState(false)
    
    const [checked, setChecked] = useState(null);
    const [checked2, setChecked2] = useState(null);
    const [convenioMedico, setConvenioMedico] = useState(null);

    const cadastrar = () => {
        if(validar()) {
            setVisibleLoader(true)
            let allPageDate = {
                user: userAndPfPageDate.user,
                pf: userAndPfPageDate.pf,
                cdClinica: {
                    tipoSanguineo: checked,
                    convenioMedico: checked2 == 'sim' ? convenioMedico : 'NP',
                }
            }
            CadastroUsuario.cadastrar(allPageDate).then((response => {
                if(response['success']) {
                    setVisibleLoader(false)
                    Alert.alert(response.message)
                    props.navigation.navigate("login")
                }else if(response['error']) {
                    setVisibleLoader(false)
                    Alert.alert(response.message)
                }
                setVisibleLoader(false)
            }))
        }
    }

    const validar = () => {
        let valid = true
        let message = 'Preencha o campo '

        if(!checked) {
            valid = false
            message += '"Tipo Sanguíneo"'
        }else if((checked2 == 'sim' && !convenioMedico) || (!checked || !checked2)) {
            valid = false
            message += '"Convênio Médico"'
        }

        if(!valid) {
            Alert.alert(message)
        }
        return valid
    }

    function mostrar(checked2) {
        if (checked2 === 'sim') {
            return (
                <Input
                    style={styles.input, { paddingTop: 30 }}
                    autoCorrect={false}
                    placeholder='Digite o nome do Convenio'
                    value={convenioMedico}
                    onChangeText={convenioMedico => setConvenioMedico(convenioMedico)}
                />
            )
        }
    }

    return (
        <KeyboardAvoidingView style={styles.background}>
            <View style={{ backgroundColor: '#AD0E3D', width: '100%', height: 40, borderBottomRightRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 25, color: '#FFF', fontWeight: 'bold', }}>
                    Qual seu tipo sanguineo?
                    </Text>
            </View>
            <View style={{ padding: 15 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <RadioButton
                        value="A+"
                        status={checked === 'A+' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('A+')}
                    />
                    <Text style={{ fontSize: 15 }}>A Positivo</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <RadioButton
                        value="A-"
                        status={checked === 'A-' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('A-')}
                    />
                    <Text style={{ fontSize: 15 }}>A Negativo</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <RadioButton
                        value="B+"
                        status={checked === 'B+' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('B+')}
                    />
                    <Text style={{ fontSize: 15 }}>B Positivo</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <RadioButton
                        value="B-"
                        status={checked === 'B-' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('B-')}
                    />
                    <Text style={{ fontSize: 15 }}>B Negativo</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <RadioButton
                        value="AB+"
                        status={checked === 'AB+' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('AB+')}
                    />
                    <Text style={{ fontSize: 15 }}>AB Positivo</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <RadioButton
                        value="AB-"
                        status={checked === 'AB-' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('AB-')}
                    />
                    <Text style={{ fontSize: 15 }}>AB Negativo</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <RadioButton
                        value="O+"
                        status={checked === 'O+' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('O+')}
                    />
                    <Text style={{ fontSize: 15 }}>O Positivo</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <RadioButton
                        value="O-"
                        status={checked === 'O-' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('O-')}
                    />
                    <Text style={{ fontSize: 15 }}>O Negativo</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <RadioButton
                        value="NI"
                        status={checked === 'NI' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('NI')}
                    />
                    <Text style={{ fontSize: 15 }}>Não sei informar</Text>
                </View>

            </View>
            <View style={{ marginTop: 15, backgroundColor: '#AD0E3D', width: '100%', height: 40, borderBottomRightRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 25, color: '#FFF', fontWeight: 'bold', }}>
                    Possui Convenio Médico?
                    </Text>
            </View>
            <View style={{ padding: 15 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <RadioButton
                        value="sim"
                        status={checked2 === 'sim' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked2('sim')}
                    />
                    <Text style={{ fontSize: 15 }}>Sim</Text>

                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <RadioButton
                        value="nao"
                        status={checked2 === 'nao' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked2('nao')}
                    />
                    <Text style={{ fontSize: 15 }}>Não</Text>

                </View>
                {mostrar(checked2)}
            </View>
            <View>

            </View>
            {!visibleLoader &&
                <View style={{ marginTop: 15, alignItems: 'center' }}>
                    <TouchableOpacity
                        style={styles.btnSubmit}
                        onPress={() => {
                            {cadastrar()}
                        }}
                    >
                        <Text style={styles.submitText}
                        >Salvar</Text>
                    </TouchableOpacity>
                </View>
            }
            { visibleLoader &&
                <ActivityIndicator size="large" color="#e0000a" />
            }
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
})



