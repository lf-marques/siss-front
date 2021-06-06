import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import VeiculoList from './VeiculoList'
import VeiculoForm from './VeiculoForm'
import { Button, Icon } from 'react-native-elements'


const Stack = createStackNavigator()
export default props => {

    return (
        <NavigationContainer independent={true}>

            <Stack.Navigator
                initialRouteName="VeiculoList"
                screenOptions={screenOptions}

            >
                <Stack.Screen
                    name="VeiculoList"
                    component={VeiculoList}
                    options={({ navigation }) => {

                        return {
                            title: "Veículos",
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
                                    onPress={() => navigation.navigate("VeiculoForm")}
                                    type='clear'
                                    icon={<Icon name="add" size={25} color="white" />}
                                />
                            )
                        }
                    }}
                />
                <Stack.Screen
                    name="VeiculoForm"
                    component={VeiculoForm}
                    options={{
                        title: "Formulário de Veículos"
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