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
    const [checked, setChecked] = useState('NP');
    const [checked2, setChecked2] = useState('Nao');

    const entrar = () => {
        props.navigation.reset({
            index: 0,
            routes: [{ name: "Drawer" }]

        })
    }
    function mostrar(checked2) {
        if (checked2 === 'Sim') {
            return (
                <Input
                    style={styles.input, { paddingTop: 30 }}
                    autoCorrect={false}
                    placeholder='Digite o nome do Convenio'
                    onChangeText={text => setdigBusca(text.replace(/[^a-zA-Z0-9]/, ''))}
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
                        value="NP"
                        status={checked === 'NP' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('NP')}
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
                        value="Sim"
                        status={checked2 === 'Sim' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked2('Sim')}
                    />
                    <Text style={{ fontSize: 15 }}>Sim</Text>

                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <RadioButton
                        value="Nao"
                        status={checked2 === 'Nao' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked2('Nao')}
                    />
                    <Text style={{ fontSize: 15 }}>Não</Text>

                </View>
                {mostrar(checked2)}
            </View>
            <View>

            </View>
            <View style={{ marginTop: 15, alignItems: 'center' }}>
                <TouchableOpacity
                    style={styles.btnSubmit}
                    onPress={() => {
                        {entrar()}
                    }}
                >
                    <Text style={styles.submitText}
                    >Salvar</Text>
                </TouchableOpacity>
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



