import React, { useState } from 'react'
import { TextInput, View, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Alert, ScrollView, ActivityIndicator } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import RNPickerSelect from 'react-native-picker-select';
import Contato from '../../services/contato/Index'

export default ({ route, navigation }) => {
    const [contato, setContato] = useState(route.params ? route.params : {})
    const [visibleLoader, setVisibleLoader] = useState(false)

    const salvar = () => {
        if(contato) {
            setVisibleLoader(true)
            Contato.salvar(contato).then((response => {
                setVisibleLoader(false)
                if(response['success']) {
                    Alert.alert(response.message);
                    navigation.navigate('ContatoList', {goBack: true})
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
                    <Text>Nome *</Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#999999"
                        onChangeText={nome => setContato({ ...contato, nome })}
                        placeholder='Informe o nome do Contato'
                        value={contato.nome}
                    />
                    <Text>Parentesco *</Text>
                    <RNPickerSelect
                        value={contato.parentesco}
                        style={pickerStyle}
                        placeholder={{
                            label: 'Selecione...',
                            value: null,
                        }}
                        onValueChange={parentesco => setContato({ ...contato, parentesco })}
                        items={[
                            { label: 'Pai', value: 'pai' },
                            { label: 'Mãe', value: 'mãe' },
                            { label: 'Irmão(a)', value: 'irmão(a)' },
                            { label: 'Tio(a)', value: 'tio(a)' },
                            { label: 'Avô(a)', value: 'avô(a)' },
                            { label: 'Primo(a)', value: 'primo(a)' },
                            { label: 'Amigo(a)', value: 'amigo(a)' },
                            { label: 'Namorado(a)', value: 'namorado(a)' },
                            { label: 'Esposo(a)', value: 'esposo(a)' },
                            { label: 'Outros', value: 'outros' },
                        ]}
                    />
                    <Text>Telefone</Text>
                    <View style={styles.containerMask}>
                        <TextInputMask
                            placeholderTextColor="#999999"
                            placeholder="Telefone"
                            type={'custom'}
                            options={{mask: '(99) 9999-9999'}}
                            value={contato.telefone}
                            onChangeText={telefone => setContato({ ...contato, telefone})}
                            keyboardType="number-pad"
                            returnKeyType="done"
                            style={styles.maskedInput}
                        />
                    </View>
                    <Text>Celular</Text>
                    <View style={styles.containerMask}>
                        <TextInputMask
                            placeholderTextColor="#999999"
                            placeholder="Celular"
                            type={'cel-phone'}
                            options={{
                                maskType: 'BRL',
                                withDDD: true,
                                dddMask: '(99) '
                            }}
                            value={contato.celular}
                            onChangeText={celular => setContato({...contato, celular})}
                            keyboardType="number-pad"
                            returnKeyType="done"
                            style={styles.maskedInput}
                        />
                    </View>
                    {!visibleLoader &&
                        <View style={{alignItems: 'center'}}>
                            <TouchableOpacity
                                style={styles.btnSubmit}
                                onPress={() => {salvar()}}
                            >
                                <Text style={styles.submitText}>
                                    {contato.id ? 'Editar' : 'Cadastrar'}
                                </Text>
                            </TouchableOpacity>
                        </View>
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

const pickerStyle = {
    inputIOS: {
        color: 'Black',
    },
    placeholder: {
        color: 'Black',
      },
    inputAndroid: {
        color: 'Black'
    },
}