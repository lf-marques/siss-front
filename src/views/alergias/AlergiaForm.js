import React, { useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Alert, ScrollView, ActivityIndicator } from "react-native";
import { CheckBox } from "react-native-elements";
import Alergia from '../../services/condicaoClinica/alergias/Index'


export default ({ navigation }) => {
    const [checkAntibioticos, setCheckAntibioticos] = useState(false);
    const [checkAnticonvulsivantes, setCheckAnticonvulsivantes] = useState(false);
    const [checkInsulina, setCheckInsulina] = useState(false);
    const [checkContrasteDeIodo, setCheckContrasteDeIodo] = useState(false);
    const [checkAspirina, setCheckAspirina] = useState(false);
    const [checkAntiInflamatorios, setCheckAntiInflamatorios] = useState(false);
    const [checkRelaxantesMusculares, setCheckRelaxantesMusculares] = useState(false);
    const [checkNaoPossuo, setCheckNaoPossuo] = useState(false);
    const [visibleLoader, setVisibleLoader] = useState(false)

    const salvar = () => {
        if(checkNaoPossuo) {
            navigation.navigate('AlergiaList', {goBack: true})
            return true   
        }
        if(validarSelecionado()) {
            setVisibleLoader(true)
            const requestData = {
                antibioticos: checkAntibioticos,
                anticonvulsivantes: checkAnticonvulsivantes,
                insulina: checkInsulina,
                contrasteDeIodo: checkContrasteDeIodo,
                aspirina: checkAspirina,
                antiInflamatorios: checkAntiInflamatorios,
                relaxantesMusculares: checkRelaxantesMusculares,
            };
            
            Alergia.salvarLista(requestData).then((response => {
                setVisibleLoader(false)
                if(response['success']) {
                    Alert.alert(response.message);
                    navigation.navigate('AlergiaList', {goBack: true})
                }else if(response['error']) {
                    Alert.alert(response.message);
                }else {
                    Alert.alert('Tente novamente mais tarde.');
                }
            }));
        }else {
            Alert.alert('selecione ao menos 1(uma) op????o.')
        }
    }

    const validarSelecionado = () => {
        if(
            checkAntibioticos ||
            checkAnticonvulsivantes ||
            checkInsulina ||
            checkContrasteDeIodo ||
            checkAspirina ||
            checkAntiInflamatorios ||
            checkRelaxantesMusculares
        ) {
            return true;
        }
        return false;
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={{ alignItems: 'center', fontSize: 20, padding: 20 }}>
                    Possui alergia a algum desses itens?
                </Text>

                <CheckBox
                    style={styles.checkBox}
                    title='Antibi??ticos'
                    checkedIcon='check'
                    uncheckedIcon='square-o'
                    checked={checkAntibioticos}
                    onPress={() => setCheckAntibioticos(!checkAntibioticos)}
                />
                <CheckBox
                    style={styles.checkBox}
                    title='Anticonvulsivantes'
                    checkedIcon='check'
                    uncheckedIcon='square-o'
                    checked={checkAnticonvulsivantes}
                    onPress={() => setCheckAnticonvulsivantes(!checkAnticonvulsivantes)}
                />
                <CheckBox
                    style={styles.checkBox}
                    title='Insulina'
                    checkedIcon='check'
                    uncheckedIcon='square-o'
                    checked={checkInsulina}
                    onPress={() => setCheckInsulina(!checkInsulina)}
                />
                <CheckBox
                    style={styles.checkBox}
                    title='Contraste De Iodo'
                    checkedIcon='check'
                    uncheckedIcon='square-o'
                    checked={checkContrasteDeIodo}
                    onPress={() => setCheckContrasteDeIodo(!checkContrasteDeIodo)}
                />
                <CheckBox
                    style={styles.checkBox}
                    title='Aspirina'
                    checkedIcon='check'
                    uncheckedIcon='square-o'
                    checked={checkAspirina}
                    onPress={() => setCheckAspirina(!checkAspirina)}
                />
                <CheckBox
                    style={styles.checkBox}
                    title='Anti Inflamat??rios'
                    checkedIcon='check'
                    uncheckedIcon='square-o'
                    checked={checkAntiInflamatorios}
                    onPress={() => setCheckAntiInflamatorios(!checkAntiInflamatorios)}
                />
                <CheckBox
                    style={styles.checkBox}
                    title='Relaxantes Musculares'
                    checkedIcon='check'
                    uncheckedIcon='square-o'
                    checked={checkRelaxantesMusculares}
                    onPress={() => setCheckRelaxantesMusculares(!checkRelaxantesMusculares)}
                />
                <CheckBox
                    style={styles.checkBox}
                    title='N??o possuo'
                    checkedIcon='check'
                    uncheckedIcon='square-o'
                    checked={checkNaoPossuo}
                    onPress={() => setCheckNaoPossuo(!checkNaoPossuo)}
                />
                <View style={{ flex: 1, alignItems: 'center', padding: 20 }}>
                    {!visibleLoader &&
                        <TouchableOpacity
                            style={styles.btnSubmit}
                            onPress={() => {salvar()}}
                        >
                            <Text style={styles.submitText}
                                >Salvar
                            </Text>
                        </TouchableOpacity>
                    }
                    { visibleLoader &&
                        <ActivityIndicator size="large" color="#e0000a" />
                    }
                </View>
            </View>
        </ScrollView>
    )
}




const styles = StyleSheet.create({
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
    checkBox: {
        fontSize: 25,
        color: '#AD0E3D'
    }

})