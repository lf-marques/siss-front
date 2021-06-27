import React, { useState, useEffect} from 'react'
import { Alert } from 'react-native'
import { View, Text, Image, KeyboardAvoidingView, TouchableOpacity, StyleSheet } from 'react-native'
import { Button, Input, Icon } from 'react-native-elements'
import { TextInputMask } from 'react-native-masked-text'
import { RadioButton } from 'react-native-paper'
import OauthToken from '../services/oauthToken/Token'
import { BackHandler } from 'react-native';


export default props => {
    const [searchBy, setSearchBy] = useState(null);
    const [searchValue, setSearchValue] = useState(null);

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', validateToken);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', validateToken);
        };
    }, [])

    const validateToken = () => {
        OauthToken.getTokenStorage().then((response => {
            if(!response || !response['token']) {
                props.navigation.navigate("login")
            }
        }))
    }

    const sair = () => {
        OauthToken.clearToken().then((status => {
            if(status) {
                props.navigation.navigate("login")
            }
        }))
    }

    const buscar = () => {
        if (searchBy && searchBy != '' && searchValue && searchValue != '') {
            let request = {searchParams: {key: searchBy, value: searchValue}}
            props.navigation.navigate("ListaBuscaDocumento", request)
        }else {
            Alert.alert('Selecione o tipo de busca e preencha o campo')
        }
    }

    const searchByClick = (key) => {
        setSearchBy(key)
        setSearchValue(null)
    }

    return (
        <KeyboardAvoidingView style={styles.background}>
            <View style={styles.containerLogo}>
                <Image
                    style={{
                        width: 330,
                        height: 127
                    }}
                    source={require('../assets/LogoSis.png')}
                />
            </View>
            <View style={{
                alignItems: 'center',
                backgroundColor: '#AD0E3D',
                borderBottomRightRadius: 20,
            }}>
                <Text style={{ marginTop: 10, fontSize: 30, color: '#FFF', fontWeight: 'bold' }}>
                    Buscar por Vitima
                </Text>
                <Text style={{ marginBottom: 10, fontSize: 15, color: '#FFF' }}>
                    Digite somente letras ou números.
                </Text>
            </View >
            <View style={styles.views}>
                <Button
                    onPress={() => { sair() }}
                    type="exit"
                    title="Clique aqui para encerrar a sessão"
                    style={{marginBottom:10, marginTop:10}}
                />
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <RadioButton
                        value="CPF"
                        status={ searchBy === 'CPF' ? 'checked' : 'unchecked' }
                        onPress={() => searchByClick('CPF')}
                    />
                     <Text style={{ fontSize: 15 }}>CPF</Text>
                    <RadioButton
                        value="RG"
                        status={ searchBy === 'RG' ? 'checked' : 'unchecked' }
                        onPress={() => searchByClick('RG')}
                    />
                     <Text style={{ fontSize: 15 }}>RG</Text>
                    <RadioButton
                        value="Placa"
                        status={ searchBy === 'Placa' ? 'checked' : 'unchecked' }
                        onPress={() => searchByClick('Placa')}
                    />
                     <Text style={{ fontSize: 15 }}>Placa</Text>
                </View>

                <View style={styles.containerMask}>
                    <TextInputMask
                        placeholderTextColor="#999999"
                        placeholder={searchBy}
                        type={'custom'}
                        options={{
                            mask: 
                            searchBy == 'CPF' ? '999.999.999-99' : 
                            (searchBy == 'RG' ? '99.999.999-9' : 
                            (searchBy == 'Placa' ? '********' : '*'))
                        }}
                        value={searchValue}
                        onChangeText={searchValue => setSearchValue(searchValue)}
                        keyboardType={searchBy != "Placa" ? "number-pad" : "default"}
                        returnKeyType="done"
                        style={styles.maskedInput}
                    />
                </View>

                <TouchableOpacity
                    style={styles.btnSubmit}
                    onPress={() => { buscar() }}
                >
                    <Text style={styles.submitText}
                    >Buscar</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView >
    )
}
const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    input: {
        color: '#222',
        fontSize: 17,
        backgroundColor: '#FFF',

    },
    views: {
        flex: 2,
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    containerLogo: {
        flex: 1,
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



