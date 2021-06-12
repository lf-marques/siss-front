import Api from '../Api'
import OauthToken from '../oauthToken/Token'
import Helper from '../Helper'

const Abstract = {
    async getByCurrentToken(){
        try {
            const tokenData = await OauthToken.getTokenStorage();
            const response = await Api.get(`api/pessoaFisica/usuarioId/${tokenData.usrId}`,
                {headers: {"Authorization" : tokenData.token}}
            );
            return getReponseSuccess(response)
        }catch(error) {
            return Helper.getResponseError(error)
        } 
    },
    async getBy(key, value){
        try {
            if(key == 'CPF' || key == 'RG') {
                key = key.toLowerCase()
                value = Helper.removeSpecialCharacters(value)
            }else {
                key = 'placaVeiculo'
            }
            const tokenData = await OauthToken.getTokenStorage();
            const response = await Api.get(`api/pessoaFisica/${key}/${value}`,
                {headers: {"Authorization" : tokenData.token}}
            );
            return getReponseSuccess(response)
        }catch(error) {
            return Helper.getResponseError(error)
        } 
    },
    async salvar(pf) {
        try {
            const tokenData = await OauthToken.getTokenStorage();

            if(pf) {
                await Api.post('api/pessoaFisica',
                    {
                        id: pf.id > 0  && pf.id != null ? pf.id : null,
                        usuarioId: tokenData.usrId,
                        nome: pf.nome,
                        cpf: pf.cpf,
                        rg: pf.rg,
                        dataNascimento: pf.dataNascimento,
                        telefone: pf.telefone,
                        celular: pf.celular
                    },
                    {headers: {"Authorization" : tokenData.token}}
                );   
            }

            return {success: true, message: "Dados salvos com sucesso!"};
        }catch(error) {
            return Helper.getResponseError(error)
        }
    },
    validarCpf(cpf) {
        if (typeof cpf !== "string") return false
        cpf = cpf.replace(/[\s.-]*/igm, '')
        if (
            !cpf ||
            cpf.length != 11 ||
            cpf == "00000000000" ||
            cpf == "11111111111" ||
            cpf == "22222222222" ||
            cpf == "33333333333" ||
            cpf == "44444444444" ||
            cpf == "55555555555" ||
            cpf == "66666666666" ||
            cpf == "77777777777" ||
            cpf == "88888888888" ||
            cpf == "99999999999" 
        ) {
            return false
        }
        var soma = 0
        var resto
        for (var i = 1; i <= 9; i++) 
            soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i)
        resto = (soma * 10) % 11
        if ((resto == 10) || (resto == 11))  resto = 0
        if (resto != parseInt(cpf.substring(9, 10)) ) return false
        soma = 0
        for (var i = 1; i <= 10; i++) 
            soma = soma + parseInt(cpf.substring(i-1, i)) * (12 - i)
        resto = (soma * 10) % 11
        if ((resto == 10) || (resto == 11))  resto = 0
        if (resto != parseInt(cpf.substring(10, 11) ) ) return false
        return true
    }
}

const getReponseSuccess = (response) => {
    return {success: true, data: response.data.dados};
}

export default Abstract;