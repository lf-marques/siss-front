import Api from '../Api'
import OauthToken from '../oauthToken/Token'
import PFAbstract from '../pessoaFisica/Abstract'
import Helper from '../Helper'

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
            return Helper.getResponseError(error)
        }
    }
}

export default CondicaoClinica;