import React, { useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Alert } from "react-native";
import { CheckBox } from "react-native-elements";
import Doenca from '../../services/condicaoClinica/doencas/Index';

export default ({ navigation }) => {
    const [checkDiabetes, setCheckDiabetes] = useState(false);
    const [checkHipertensao, setCheckHipertensao] = useState(false);
    const [checkAsma, setCheckAsma] = useState(false);

    const salvar = () => {
        if(checkDiabetes || checkHipertensao || checkAsma) {
            const requestData = {
                diabetes: checkDiabetes,
                hipertensao: checkHipertensao,
                asma: checkAsma,
            };
            
            Doenca.salvarLista(requestData).then((response => {
                if(response['success']) {
                    Alert.alert(response.message);
                    navigation.navigate('DoencaList', {goBack: true})
                }else if(response['error']) {
                    Alert.alert(response.message);
                }else {
                    Alert.alert('Tente novamente mais tarde.');
                }
            }));
        }else {
            Alert.alert('selecione ao menos 1(uma) opção.')
        }
    }

    return (
        <View style={styles.container}>
            <Text style={{ alignItems: 'center', fontSize: 20, padding: 20 }}>
                Possui alguma dessas doenças?
            </Text>

            <CheckBox
                style={styles.checkBox}
                title='Diabetes'
                checkedIcon='check'
                uncheckedIcon='square-o'
                checked={checkDiabetes}
                onPress={() => setCheckDiabetes(!checkDiabetes)}
            />
            <CheckBox
                style={styles.checkBox}
                title='Hipertensão'
                checkedIcon='check'
                uncheckedIcon='square-o'
                checked={checkHipertensao}
                onPress={() => setCheckHipertensao(!checkHipertensao)}
            />
            <CheckBox
                style={styles.checkBox}
                title='Asma'
                checkedIcon='check'
                uncheckedIcon='square-o'
                checked={checkAsma}
                onPress={() => setCheckAsma(!checkAsma)}
            />
            <View style={{ flex: 1, alignItems: 'center', padding: 20 }}>
                <TouchableOpacity
                    style={styles.btnSubmit}
                    onPress={() => {salvar()}}
                ><Text style={styles.submitText} >
                    Salvar
                </Text>
                </TouchableOpacity>
            </View>
        </View>
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