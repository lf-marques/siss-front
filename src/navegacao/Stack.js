import React, { Component } from 'react'
import { createStackNavigator} from '@react-navigation/stack'
import Welcome from '../views/Welcome'
import Login from '../views/Login'
import CadastroUsuarioC from '../views/CadastroUsuarioC'
import Esqueci from '../views/EsqueciSenha'
import Drawer from '../navegacao/Drawer'
import Busca from '../views/Busca'
import ListaBuscaPlaca from '../views/ListaBuscaPlaca'
import ListaBuscaCPF from '../views/ListaBuscaCPF'
import Sangue from '../views/Sangue'

const Stack= createStackNavigator()

export default props=> (
    <Stack.Navigator initialRouteName="welcome" screenOptions={{headerShown: false}}>
        <Stack.Screen name="welcome"  options={{title: 'Bem-Vindo'}} component={Welcome}/>
        <Stack.Screen name="login"  options={{title: 'Login'}} component={Login}/>
        <Stack.Screen name="CadUserC" options={{title: 'Cadastro'}} component={CadastroUsuarioC}/>
        <Stack.Screen name="Sangue" options={{title: 'Sangue'}} component={Sangue}/>
        <Stack.Screen name="Esqueci" options={{title: 'Esqueci Senha'}} component={Esqueci}/>
        <Stack.Screen name="Drawer"  options={{title: 'Inicial'}} component={Drawer}/>
        <Stack.Screen name="Busca"  options={{title: 'Busca'}} component={Busca}/>  
        <Stack.Screen name="ListaBuscaCPF"  options={{title: 'BuscaCPF'}} component={ListaBuscaCPF}/>  
        <Stack.Screen name="ListaBuscaPlaca"  options={{title: 'BuscaPlaca'}} component={ListaBuscaPlaca}/>  
    </Stack.Navigator>
)