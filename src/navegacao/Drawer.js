import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import TelaAposLogin from '../views/TelaAposLogin'
import TelaAlergias from '../views/alergias/TelaAlergias'
import TelaContatos from '../views/contatos/TelaContatos'
import TelaDoencas from '../views/doencas/TelaDoencas'
import TelaVeiculos from '../views/veiculos/TelaVeiculos'
import TelaConfigs from '../views/configuracoes/TelaConfigs'

const Drawer = createDrawerNavigator()
const Stack = createStackNavigator()
let comum = false


export default props => (
    <Drawer.Navigator initialRouteName="Inicio">
        <Drawer.Screen name="Inicio" component={TelaAposLogin} />
        <Drawer.Screen name="Doencas" component={TelaDoencas} />
        <Drawer.Screen name="Alergias" component={TelaAlergias} />
        <Drawer.Screen name="Contatos" component={TelaContatos} />
        <Drawer.Screen name="Veiculos" component={TelaVeiculos} />
        <Drawer.Screen name="Configurações" component={TelaConfigs} />
    </Drawer.Navigator>
)

