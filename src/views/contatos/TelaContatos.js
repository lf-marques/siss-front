import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import ContatoList from './ContatoList'
import ContatoForm from './ContatoForm'
import { Button, Icon } from 'react-native-elements'


const Stack = createStackNavigator()
export default props => {

    return (
        <NavigationContainer independent={true}>

            <Stack.Navigator
                initialRouteName="ContatoList"
                screenOptions={screenOptions}

            >
                <Stack.Screen
                    name="ContatoList"
                    component={ContatoList}
                    options={({ navigation }) => {

                        return {
                            title: "Contatos",
                            headerLeft: () => (
                                <Button
                                    onPress={() => {
                                        props.navigation.openDrawer()
                                    }}
                                    type='clear'
                                    icon={<Icon name="menu" size={25} color="white" />}
                                />
                            ),
                            headerRight: () => (
                                <Button
                                    onPress={() => navigation.navigate("ContatoForm")}
                                    type='clear'
                                    icon={<Icon name="add" size={25} color="white" />}
                                />
                            )
                        }
                    }}
                />
                <Stack.Screen
                    name="ContatoForm"
                    component={ContatoForm}
                    options={{
                        title: "Formulário Contatos"
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const screenOptions = {

    headerStyle: {
        backgroundColor: '#AD0E3D'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold'
    }


}