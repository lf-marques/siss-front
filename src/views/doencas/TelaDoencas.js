import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import DoencaList from './DoencaList'
import DoencaForm from './DoencaForm'
import { Button, Icon } from 'react-native-elements'


const Stack = createStackNavigator()
export default props => {

    return (
        <NavigationContainer independent={true}>

            <Stack.Navigator
                initialRouteName="DoencaList"
                screenOptions={screenOptions}

            >
                <Stack.Screen
                    name="DoencaList"
                    component={DoencaList}
                    options={({ navigation }) => {

                        return {
                            title: "Doenças",
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
                                    onPress={() => navigation.navigate("DoencaForm")}
                                    type='clear'
                                    icon={<Icon name="add" size={25} color="white" />}
                                />
                            )
                        }
                    }}
                />
                <Stack.Screen
                    name="DoencaForm"
                    component={DoencaForm}
                    options={{
                        title: "Formulário Doenças"
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