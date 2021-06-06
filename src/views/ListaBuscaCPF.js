import React, { useState } from 'react'
import { Alert } from 'react-native'
import { View, Text, Image, KeyboardAvoidingView, TouchableOpacity, StyleSheet, Character } from 'react-native'
import { Button, Input, Icon } from 'react-native-elements'


export default props => {

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
                justifyContent: 'center',
                backgroundColor: '#AD0E3D',
                borderBottomRightRadius: 20,
            }}>
                <Text style={{ fontSize: 30, color: '#FFF', fontWeight: 'bold' }}>
                    Veiculo Encontrado!
                </Text>
            </View>
        </KeyboardAvoidingView >
    )
}
const styles = StyleSheet.create({
    background:  {
        backgroundColor: '#FFF',
    },
    input: {
        color: '#222',
        fontSize: 17,
        backgroundColor: '#FFF',

    },
    views: {
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    containerLogo: {
        width: '100%',
        padding:20,
    },
})



