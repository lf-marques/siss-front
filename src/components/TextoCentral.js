import React from 'react'
import { View, Text, StyleSheet, SafeAreaView } from 'react-native'

import { Button, Icon } from 'react-native-elements'

export default props => (
  <SafeAreaView style={{ flex: 1 , backgroundColor: props.corFundo || '#000'}}>

    <View style={styles.botao}>
      <Button
        
        icon={<Icon name="menu" size={25} color="white" />}
        onPress={() => {
          props.navigation.openDrawer()
        }}
      />
    </View>

    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
      <Text style={{ fontSize: 50, color: props.corTexto || '#FFF' }}>
        {props.children}
      </Text>
    </View>
  </SafeAreaView>
)

const styles = StyleSheet.create({
  botao:{
    width: 60
  }
})