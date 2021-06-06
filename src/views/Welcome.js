import React from 'react'
import { SafeAreaView, Text, View, StyleSheet, Button, TouchableOpacity, Image, Dimensions } from 'react-native'

export default props => {

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.explicacao}>
                <View style={{ flex: 4 }}>
                    <Text style={styles.text1}>SEJA BEM-VINDO</Text>
                    <Text style={styles.text2}>
                        Plataforma oficial de socorro
                        facilitado, em menos de 5
                        minutos você nos ajuda a
                        garantir um atendimento mais
                        rápido e eficaz, porque cada
                        segundo é valioso para salvar
                        uma vida.
                </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center' }}>

                    {/* <Button title='nome'
                        onPress={() => {
                            props.navigation.navigate("login")
                        }} /> */}
                    <TouchableOpacity style={styles.btnSubmit}
                        onPress={() => {
                            props.navigation.navigate("login")
                        }}>
                        <Text style={styles.submitText}>COMECE</Text>
                    </TouchableOpacity>
                </View>

            </View>
            <SafeAreaView style={styles.imagens}>
                <Image
                    style={{
                        height: Dimensions.get('window').width / 5.2,
                        width: Dimensions.get('window').width / 2,
                    }}
                    source={require('../assets/LogoSis.png')}
                />
                <Image
                    style={{
                        height: Dimensions.get('window').width / 2.5,
                        width: Dimensions.get('window').width / 2.5,
                        marginBottom: 50
                    }}
                    source={require('../assets/medicos.png')}
                />
            </SafeAreaView>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    explicacao: {

        flex: 1,
        backgroundColor: '#AD0E3D',
        borderBottomRightRadius: 40,
    },
    imagens: {
        alignItems: 'center',
        justifyContent: 'space-around',
        flex: 1,
    },
    text1: {
        fontSize: 50,
        color: '#FFF',
        width: '90%',
        paddingLeft: 20,
        paddingTop: 20,
        fontWeight: 'bold',
        fontFamily: 'Fontisto'
    },
    text2: {
        fontSize: 19,
        color: '#FFF',
        width: '95%',
        paddingLeft: 20,
        paddingTop: 15,
    },
    btnSubmit: {

        backgroundColor: '#FFF',
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
    },
    submitText: {

        color: '#AD0E3D',
        fontSize: 35,
        fontWeight: 'bold',
    },
})