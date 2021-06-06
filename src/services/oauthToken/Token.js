import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../Api';

const OauthToken = {
    async getTokenByUsername(username, senha){
        try {
            const response = await Api.post("auth/username", {usuario: username, senha: senha })
            return getResponseToken(response)
        }catch(error) {
            return getResponseError(error); 
        } 
    },
    async getTokenByEmail(email, senha){
        try {
            const response = await Api.post("auth/email", {email: email, senha: senha })
            return getResponseToken(response)
        }catch(error) {
            return getResponseError(error); 
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

const saveTokenInStorage = async (tokenData) => {
    try {
        await AsyncStorage.setItem("@TokenData", JSON.stringify(tokenData));
    }catch(e) {
        console.log(e.message)
    }
}

const getResponseError = (error) => {
    const msg =  error.response.data.erros.reduce((result, item) => {
        return `${item}\n`
    }, "");
    return {error: true, message: msg};
}

const getResponseToken = (response) => {
    const responseDados = response.data.dados;
    const tokenData = {
        token: 'Bearer ' + responseDados.token,
        usrId: responseDados.usuarioId,
        executante: responseDados.executante
    };

    saveTokenInStorage(tokenData)
    return {success: true, tokenData: tokenData}
}

export default OauthToken;