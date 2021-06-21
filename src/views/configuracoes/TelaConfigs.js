import React, { useState } from 'react'
import { View, KeyboardAvoidingView, TouchableOpacity, Text, StyleSheet, Alert, ActivityIndicator, TextInput, ScrollView } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import RNPickerSelect from 'react-native-picker-select';
import PFAbstract from '../../services/pessoaFisica/Abstract'
import CondicaoClinica from '../../services/condicaoClinica/Index'
import Helper from '../../services/Helper'

export default props => {

    const [nomeCompleto, setNomeCompleto] = useState(null)
    const [cpf, setCpf] = useState(null)
    const [rg, setRg] = useState(null)
    const [dataNascimento, setDataNascimento] = useState(null)
    const [telefone, setTelefone] = useState(null)
    const [celular, setCelular] = useState(null)

    const [tipoSanguineo, setTipoSanguineo] = useState(null)
    const [convenioMedico, setConvenioMedico] = useState(null)
    
    const [pfId, setPfId] = useState(null)
    const [cdId, setCdId] = useState(null)
    const [dataLoaded, setDataLoaded] = useState(false)

    const [visibleLoader, setVisibleLoader] = useState(false)

    const init = (refresh = false) => {
        if(!dataLoaded || refresh) {
            PFAbstract.getByCurrentToken().then((response => {
                if(response['success']) {
                    let data = response.data
                    setDataLoaded(true)
                    setPfId(data.id)
                    setCdId(data.condicaoClinica.id)

                    setNomeCompleto(data.nome)
                    setCpf(data.cpf)
                    setRg(data.rg)
                    setDataNascimento(Helper.formatDateAndRemoveTime(data.dataNascimento))
                    setTelefone(data.telefone)
                    setCelular(data.celular)
                    
                    setTipoSanguineo(data.condicaoClinica.tipoSanguineo)
                    setConvenioMedico(data.condicaoClinica.convenioMedico)
                }else if(response['error']){
                    Alert.alert(response.message)
                }
            }))
        }
    }

    const salvar = () => {
        if(validar()) {
            setVisibleLoader(true)
            let requestPf = {
                id: pfId,
                nome: nomeCompleto,
                cpf: cpf,
                rg: rg,
                dataNascimento: dataNascimento,
                telefone: telefone,
                celular: celular
            }
            let requestCd = {
                id: cdId,
                tipoSanguineo: tipoSanguineo,
                convenioMedico: convenioMedico ? convenioMedico : 'NP'
            }
            PFAbstract.salvar(requestPf).then((response => {
                if(response['success']) {
                    CondicaoClinica.salvar(requestCd).then((respondeCd => {
                        if(respondeCd['success']) {
                            setVisibleLoader(false)
                            Alert.alert(response.message)
                            init(true)
                        }
                    }))
                }else if(response['error']) {
                    setVisibleLoader(false)
                    Alert.alert(response.message)
                }else {
                    setVisibleLoader(false)
                    Alert.alert('Ocorreu um erro na aplicação.')
                }
            }))
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
        }else if(!rg  || rg.length < 9) {
            valid = false
            message += '"rg"'
        }else if(!dataNascimento  || dataNascimento.length < 10) {
            valid = false
            message += '"data de nascimento"'
        }else if(!telefone || telefone.length < 14) {
            valid = false
            message += '"telefone"'
        }else if(!celular  || celular.length != 15) {
            valid = false
            message += '"celular"'
        }else if(!PFAbstract.validarCpf(cpf)) {
            valid = false
            message += '"CPF" com um valor válido'
        }else if (!tipoSanguineo) {
            valid = false
            message += '"Tipo Sanguineo"'
        }

        if(!valid) {
            Alert.alert(message)
        }
        return valid
    }
    
    return (
        <ScrollView>
            
            <KeyboardAvoidingView style={styles.background}>
                {init()}
                <View style={{ backgroundColor: '#AD0E3D', width: '100%', height: 40, borderBottomRightRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 25, color: '#FFF', fontWeight: 'bold', }}>
                        Edite suas informações.
                    </Text>
                </View>

                <View style={styles.form}>
                    <Text>Nome Completo</Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#999999"
                        autoCorrect={false}
                        placeholder='Nome Completo'
                        value={nomeCompleto}
                        onChangeText={nomeCompleto => setNomeCompleto(nomeCompleto)}
                    />

                    <Text>CPF</Text>
                    <View style={styles.containerMask}>
                        <TextInputMask
                            placeholderTextColor="#999999"
                            placeholder="CPF"
                            type={'cpf'}
                            value={cpf}
                            onChangeText={cpf => setCpf(cpf)}
                            keyboardType="number-pad"
                            returnKeyType="done"
                            style={styles.maskedInput}
                        />
                    </View>

                    <Text>RG</Text>
                    <View style={styles.containerMask}>
                        <TextInputMask
                            placeholderTextColor="#999999"
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

                    <Text>Data de Nascimento</Text>
                    <View style={styles.containerMask}>
                        <TextInputMask
                            placeholderTextColor="#999999"
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

                    <Text>Telefone</Text>
                    <View style={styles.containerMask}>
                        <TextInputMask
                            placeholderTextColor="#999999"
                            placeholder="Telefone"
                            type={'custom'}
                            options={{mask: '(99) 9999-9999'}}
                            value={telefone}
                            onChangeText={telefone => setTelefone(telefone)}
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
                            value={celular}
                            onChangeText={celular => setCelular(celular)}
                            keyboardType="number-pad"
                            returnKeyType="done"
                            style={styles.maskedInput}
                        />
                    </View>

                    <Text>Tipo Sanguíneo</Text>
                    <RNPickerSelect
                        value={tipoSanguineo}
                        style={pickerStyle}
                        placeholder={{
                            label: 'Selecione...',
                            value: null,
                        }}
                        onValueChange={tipoSanguineo => setTipoSanguineo(tipoSanguineo)}
                        items={[
                            { label: 'A+ ', value: 'A+' },
                            { label: 'A- ', value: 'A-' },
                            { label: 'B+ ', value: 'B+' },
                            { label: 'B- ', value: 'B-' },
                            { label: 'AB+ ', value: 'AB+' },
                            { label: 'AB- ', value: 'AB-' },
                            { label: 'O+ ', value: 'O+' },
                            { label: 'O- ', value: 'O-' },
                            { label: 'Não sei informar ', value: 'NI' },
                        ]}
                    />

                    <Text>Convênio Médico</Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#999999"
                        autoCorrect={false}
                        placeholder='Convênio Médico'
                        value={convenioMedico}
                        onChangeText={convenioMedico => setConvenioMedico(convenioMedico)}
                    />

                    {!visibleLoader &&
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity
                                style={styles.btnSubmit}
                                onPress={() => { salvar() }}
                            >
                                <Text style={styles.submitText}>
                                    Editar
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.btnAlterarSenha}
                                onPress={() => { 
                                    props.navigation.navigate("SenhaAlterar") 
                                }}
                                >
                                <Text style={styles.alterarSenhaText}>
                                    Alterar Senha
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
    buttonsContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnSubmit: {
        backgroundColor: '#AD0E3D',
        width: '90%',
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
    },
    btnAlterarSenha: {
        marginTop: 10,
        backgroundColor: '#AD0E3D',
        width: '70%',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
    },
    submitText: {
        color: '#FFF',
        fontSize: 22,
        fontWeight: 'bold'
    },
    alterarSenhaText: {
        color: '#FFF',
        fontSize: 18,
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
        color: 'Black'
    },
    placeholder: {
        color: 'Black',
      },
    inputAndroid: {
        color: 'Black'
    },
}