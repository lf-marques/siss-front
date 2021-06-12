import Api from '../../Api'
import OauthToken from '../../oauthToken/Token'
import PFAbstract from '../../pessoaFisica/Abstract'
import Helper from '../../Helper'

const Doencas = {
    async deletar(id){
        try {
            const tokenData = await OauthToken.getTokenStorage();
            const response = await Api.delete(`api/doenca/excluir/${id}`,
                {headers: {"Authorization" : tokenData.token}},
            );
            return response.data;
        }catch(error) {
            return error.response.data;
        } 
    },
    async salvarLista(lstDoencas) {
        try {
            const usrData = await PFAbstract.getByCurrentToken();
            const tokenData = await OauthToken.getTokenStorage();

            if(lstDoencas.diabetes) {
                await Api.post('api/doenca',
                    {condicaoClinicaId: usrData.data.condicaoClinica.id, tipo: "Diabetes"},
                    {headers: {"Authorization" : tokenData.token}}
                );   
            }

            if(lstDoencas.hipertensao) {
                await Api.post('api/doenca',
                    {condicaoClinicaId: usrData.data.condicaoClinica.id, tipo: "Hipertensão"},
                    {headers: {"Authorization" : tokenData.token}}
                );   
            }

            if(lstDoencas.asma) {
                await Api.post('api/doenca',
                    {condicaoClinicaId: usrData.data.condicaoClinica.id, tipo: "Asma"},
                    {headers: {"Authorization" : tokenData.token}}
                );   
            }

            return {success: true, message: "Dados salvos com sucesso!"};
        }catch(error) {
            return Helper.getResponseError(error)
        }
    }
}

export default Doencas;