import React, { useState } from 'react'
import { TextInput, View, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Alert } from 'react-native'
import { Button, Input, Icon } from 'react-native-elements'
import { TextInputMask } from 'react-native-masked-text'
import Contato from '../../services/contato/Index'

export default ({ route, navigation }) => {
    const [contato, setContato] = useState(route.params ? route.params : {})

    const salvar = () => {
        if(contato) {
            Contato.salvar(contato).then((response => {
                if(response['success']) {
                    Alert.alert(response.message);
                    navigation.setParams({refrestList: true})
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
                <Text>Nome</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={nome => setContato({ ...contato, nome })}
                    placeholder='Informe o nome do Contato'
                    value={contato.nome}
                />
                <Text>Parentesco</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={parentesco => setContato({ ...contato, parentesco })}
                    placeholder='Informe o grau parentesco'
                    value={contato.parentesco}
                />
                <Text>Telefone</Text>
                <View style={styles.containerMask}>
                    <TextInputMask
                        placeholder="Telefone"
                        type={'cel-phone'}
                        options={{
                            maskType: 'BRL',
                            withDDD: true,
                            dddMask: '(99) '
                        }}
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

                <TouchableOpacity
                    style={styles.btnSubmit}
                    onPress={() => {salvar()}}
                >
                    <Text style={styles.submitText}>
                        {contato.id ? 'Editar' : 'Cadastrar'}
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