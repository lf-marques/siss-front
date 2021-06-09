import React, { useState } from 'react'
import { TextInput, View, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Alert } from 'react-native'
import { Button, Input, Icon } from 'react-native-elements'
import Veiculo from '../../services/veiculo/Index'

export default ({ route, navigation }) => {
    const [veiculo, setVeiculo] = useState(route.params ? route.params : {})

    const salvar = () => {
        if(veiculo) {
            Veiculo.salvar(veiculo).then((response => {
                if(response['success']) {
                    Alert.alert(response.message);
                    navigation.goBack();
                }else if(response['error']) {
                    Alert.alert(response.message);
                }else {
                    Alert.alert('Tente novamente mais tarde.');
                }
            }));
        }else {
            Alert.alert('Preencha os campos.')
        }
    }

    return (
        <KeyboardAvoidingView style={styles.background}>
            <View style={styles.form}>
                <Text>Modelo</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={modelo => setVeiculo({ ...veiculo, modelo })}
                    placeholder='Informe o modelo do veículo'
                    value={veiculo.modelo}
                />
                <Text>Marca</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={marca => setVeiculo({ ...veiculo, marca })}
                    placeholder='Informe a marca'
                    value={veiculo.marca}
                />
                <Text>Cor</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={cor => setVeiculo({ ...veiculo, cor })}
                    placeholder='Informe a cor'
                    value={veiculo.cor}
                />
                <Text>Renavam</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={renavam => setVeiculo({ ...veiculo, renavam })}
                    placeholder='Informe o renavam'
                    value={veiculo.renavam}
                />
                <Text>Placa</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={placa => setVeiculo({ ...veiculo, placa })}
                    placeholder='Informe a placa'
                    value={veiculo.placa}
                />

                <TouchableOpacity
                    style={styles.btnSubmit}
                    onPress={() => {salvar()}}
                >
                    <Text style={styles.submitText}>
                        {veiculo.id ? 'Editar' : 'Cadastrar'}
                    </Text>
                </TouchableOpacity>




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