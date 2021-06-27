import AsyncStorage from '@react-native-async-storage/async-storage'
import Api from '../Api'
import Helper from '../Helper'

const OauthToken = {
    async login(login, senha) {
        if(login.includes('@')) {
            return await OauthToken.getTokenByEmail(login, senha)
        }else {
            return await OauthToken.getTokenByUsername(login, senha)
        }
    },
    async clearToken() {
        await removeTokenStorage()
        return true
    },
    async getTokenByUsername(username, senha){
        try {
            const response = await Api.post("auth/username", {usuario: username, senha: senha })
            return getResponseToken(response)
        }catch(error) {
            return Helper.getResponseError(error); 
        } 
    },
    async getTokenByEmail(email, senha){
        try {
            const response = await Api.post("auth/email", {email: email, senha: senha })
            return getResponseToken(response)
        }catch(error) {
            return Helper.getResponseError(error); 
        } 
    },
    async getTokenStorage() {
        try {
            const tokenData = await AsyncStorage.getItem("@TokenData");
            return JSON.parse(tokenData);
        }catch(e) {
            console.log(e.message)
        }    
    }
}

const removeTokenStorage = async() => {
    try {
        await AsyncStorage.removeItem("@TokenData")
    }catch(e) {
        console.log(e)
    }
}

const saveTokenInStorage = async (tokenData) => {
    try {
        await AsyncStorage.setItem("@TokenData", JSON.stringify(tokenData));
        await AsyncStorage.setItem("@sis-initialized", "1");
    }catch(e) {
        console.log(e.message)
    }
}

const getResponseToken = (response) => {
    const responseDados = response.data.dados;
    const tokenData = {
        token: 'Bearer ' + responseDados.token,
        usrId: responseDados.usuarioId,
        executante: responseDados.executante,
        pfExists: responseDados.pfExists,
    }; 

    saveTokenInStorage(tokenData)
    return {success: true, tokenData: tokenData}
}

export default OauthToken;