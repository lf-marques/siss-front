import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import AlergiaList from './AlergiaList'
import AlergiaForm from './AlergiaForm'
import { Button, Icon } from 'react-native-elements'


const Stack = createStackNavigator()
export default props => {

    return (
        <NavigationContainer independent={true}>

            <Stack.Navigator
                initialRouteName="AlergiaList"
                screenOptions={screenOptions}

            >
                <Stack.Screen
                    name="AlergiaList"
                    component={AlergiaList}
                    options={({ navigation }) => {

                        return {
                            title: "Alergias",
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
                                    onPress={() => navigation.navigate("AlergiaForm")}
                                    type='clear'
                                    icon={<Icon name="add" size={25} color="white" />}
                                />
                            )
                        }
                    }}
                />
                <Stack.Screen
                    name="AlergiaForm"
                    component={AlergiaForm}
                    options={{
                        title: "Adicionar Alergia"
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