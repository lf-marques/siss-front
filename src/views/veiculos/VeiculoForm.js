import React, { useState } from 'react'
import { TextInput, View, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Alert, ScrollView, ActivityIndicator } from 'react-native'
import Veiculo from '../../services/veiculo/Index'
import RNPickerSelect from 'react-native-picker-select';

export default ({ route, navigation }) => {
    const [veiculo, setVeiculo] = useState(route.params ? route.params : {})
    const [visibleLoader, setVisibleLoader] = useState(false)

    const salvar = () => {
        if(veiculo) {
            setVisibleLoader(true)
            Veiculo.salvar(veiculo).then((response => {
                setVisibleLoader(false)
                if(response['success']) {
                    Alert.alert(response.message);
                    navigation.navigate('VeiculoList', {goBack: true})
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
        <ScrollView>
            <KeyboardAvoidingView style={styles.background}>
                <View style={styles.form}>
                    <Text>Modelo</Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#999999"
                        onChangeText={modelo => setVeiculo({ ...veiculo, modelo })}
                        placeholder='Informe o modelo do veículo'
                        value={veiculo.modelo}
                    />
                    <Text>Marca</Text>
                    <RNPickerSelect
                        value={veiculo.marca}
                        style={pickerStyle}
                        placeholder={{
                            label: 'Selecione...',
                            value: null,
                        }}
                        onValueChange={marca => setVeiculo({ ...veiculo, marca })}
                        items={[
                            { label: 'Audi ', value: 'audi' },
                            { label: 'BMW ', value: 'BMW' },
                            { label: 'Chery ', value: 'chery' },
                            { label: 'Chevrolet ', value: 'chevrolet' },
                            { label: 'Citroën', value: 'citroën' },
                            { label: 'Fiat  ', value: 'fiat' },
                            { label: 'Ford ', value: 'ford' },
                            { label: 'Hyundai ', value: 'hyundai' },
                            { label: 'Honda ', value: 'honda' },
                            { label: 'Jeep ', value: 'jeep' },
                            { label: 'Kia', value: 'kia' },
                            { label: 'Land Rover ', value: 'land rover' },
                            { label: 'Mitsubishi ', value: 'mitsubishi' },
                            { label: 'Nissan', value: 'Nissan' },
                            { label: 'Peugeot ', value: 'peugeot' },
                            { label: 'Renault  ', value: 'renault' },
                            { label: 'Toyota', value: 'toyota' },
                            { label: 'Volkswagen  ', value: 'volkswagen' },
                            { label: 'Volvo ', value: 'volvo' }
                        ]}
                    />
                    <Text>Cor</Text>
                    <RNPickerSelect
                        value={veiculo.cor}
                        style={pickerStyle}
                        placeholder={{
                            label: 'Selecione...',
                            value: null,
                        }}
                        onValueChange={cor => setVeiculo({ ...veiculo, cor })}
                        items={[
                            { label: 'Branco', value: 'branco' },
                            { label: 'Prata', value: 'prata' },
                            { label: 'Cinza', value: 'cinza' },
                            { label: 'Preto', value: 'preto' },
                            { label: 'Vermelho', value: 'vermelho' },
                            { label: 'Outra', value: 'outra' }
                        ]}
                    />
                    <Text>Renavam</Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#999999"
                        onChangeText={renavam => setVeiculo({ ...veiculo, renavam })}
                        placeholder='Informe o renavam'
                        value={veiculo.renavam}
                    />
                    <Text>Placa</Text>
                    <TextInput
                        autoCapitalize='characters' 
                        style={styles.input}
                        placeholderTextColor="#999999"
                        onChangeText={placa => setVeiculo({ ...veiculo, placa })}
                        placeholder='Informe a placa'
                        value={veiculo.placa}
                    />

                    {!visibleLoader &&
                        <TouchableOpacity
                            style={styles.btnSubmit}
                            onPress={() => {salvar()}}
                        >
                            <Text style={styles.submitText}>
                                {veiculo.id ? 'Editar' : 'Cadastrar'}
                            </Text>
                        </TouchableOpacity>
                    }
                    { visibleLoader &&
                        <ActivityIndicator size="large" color="#e0000a" />
                    }
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
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

const pickerStyle = {
    inputIOS: {
        color: 'Black'
    },
    placeholder: {
        color: 'Black',
      },
    inputAndroid: {
        color: 'Black'
    },
}