import Api from '../Api';
import OauthToken from '../oauthToken/Token'

const Abstract = {
    async getByCurrentToken(){
        try {
            const tokenData = await OauthToken.getTokenStorage();
            const response = await Api.get(`api/pessoaFisica/usuarioId/${tokenData.usrId}`,
                {headers: {"Authorization" : tokenData.token}}
            );
            return getReponseSuccess(response)
        }catch(error) {
            return getResponseError(error)
        } 
    }
}

const getReponseSuccess = (response) => {
    return {success: true, data: response.data.dados};
}

const getResponseError = (error) => {
    const msg =  error.response.data.erros.reduce((result, item) => {
        return `${item}\n`
    }, "");
    return {error: true, message: msg};
}

export default Abstract;