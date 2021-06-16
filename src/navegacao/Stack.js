import React, { Component } from 'react'
import { createStackNavigator} from '@react-navigation/stack'
import Welcome from '../views/Welcome'
import Login from '../views/Login'
import CadastroUsuarioC from '../views/CadastroUsuarioC'
import Esqueci from '../views/EsqueciSenha'
import SenhaRecuperar from '../views/recuperarSenha/Recuperar'
import Drawer from '../navegacao/Drawer'
import Busca from '../views/Busca'
import ListaBuscaDocumento from '../views/ListaBuscaDocumento'
import Sangue from '../views/Sangue'
import PessoaFisica from '../views/PessoaFisica'

const Stack= createStackNavigator()

export default props=> (
    <Stack.Navigator initialRouteName="welcome" screenOptions={{headerShown: false}}>
        <Stack.Screen name="welcome"  options={{title: 'Bem-Vindo'}} component={Welcome}/>
        <Stack.Screen name="login"  options={{title: 'Login'}} component={Login}/>
        <Stack.Screen name="CadUserC" options={{title: 'Cadastro'}} component={CadastroUsuarioC}/>
        <Stack.Screen name="PessoaFisica" options={{title: 'PessoaFisica'}} component={PessoaFisica}/>
        <Stack.Screen name="Sangue" options={{title: 'Sangue'}} component={Sangue}/>
        <Stack.Screen name="Esqueci" options={{title: 'Esqueci Senha'}} component={Esqueci}/>
        <Stack.Screen name="SenhaRecuperar" options={{title: 'Recuperar Senha'}} component={SenhaRecuperar}/>
        <Stack.Screen name="Drawer"  options={{title: 'Inicial'}} component={Drawer}/>
        <Stack.Screen name="Busca"  options={{title: 'Busca'}} component={Busca}/>  
        <Stack.Screen name="ListaBuscaDocumento"  options={{title: 'BuscaCPF'}} component={ListaBuscaDocumento}/>  
    </Stack.Navigator>
)