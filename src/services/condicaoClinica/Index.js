import Api from '../Api';
import OauthToken from '../oauthToken/Token'
import PFAbstract from '../pessoaFisica/Abstract';

const CondicaoClinica = {
    async salvar(condicaoClinica) {
        try {
            const usrData = await PFAbstract.getByCurrentToken();
            const tokenData = await OauthToken.getTokenStorage();

            if(condicaoClinica) {
                await Api.post('api/condicaoClinica',
                    {
                        id: condicaoClinica.id > 0  && condicaoClinica.id != null ? condicaoClinica.id : null,
                        convenioMedico: condicaoClinica.convenioMedico,
                        tipoSanguineo: condicaoClinica.tipoSanguineo,
                        pessoaFisicaId: usrData.data.id
                    },
                    {headers: {"Authorization" : tokenData.token}}
                );   
            }

            return {success: true, message: "Dados salvos com sucesso!"};
        }catch(error) {
            console.log('condicao clinciaaaa')
            console.log(error)
            console.log('condicao clinciaaaa')
            // return getResponseError(error)
        }
    }
}

const getResponseError = (error) => {
    if(error['response']['data']['erros']) {
        const msg =  error.response.data.erros.reduce((result, item) => {
            return `${item}\n`
        }, "");
    }else {
        msg = 'erro interno'
    }
    return {error: true, message: msg};
}

export default CondicaoClinica;