import Api from '../../Api';
import OauthToken from '../../oauthToken/Token'
import PFAbstract from '../../pessoaFisica/Abstract';

const Alergias = {
    async deletar(id){
        try {
            const tokenData = await OauthToken.getTokenStorage();
            const response = await Api.delete(`api/alergia/excluir/${id}`,
                {headers: {"Authorization" : tokenData.token}},
            );
            return response.data;
        }catch(error) {
            return error.response.data;
        } 
    },
    async salvarLista(lstAlergias) {
        try {
            const usrData = await PFAbstract.getByCurrentToken();
            const tokenData = await OauthToken.getTokenStorage();

            if(lstAlergias.antibioticos) {
                await Api.post('api/alergia',
                    {condicaoClinicaId: usrData.data.condicaoClinica.id, tipo: "Antibióticos"},
                    {headers: {"Authorization" : tokenData.token}}
                );
            }

            if(lstAlergias.anticonvulsivantes) {
                await Api.post('api/alergia',
                    {condicaoClinicaId: usrData.data.condicaoClinica.id, tipo: "Anticonvulsivantes"},
                    {headers: {"Authorization" : tokenData.token}}
                );
            }   

            if(lstAlergias.insulina) {
                await Api.post('api/alergia',
                    {condicaoClinicaId: usrData.data.condicaoClinica.id, tipo: "insulina"},
                    {headers: {"Authorization" : tokenData.token}}
                );
            }   

            if(lstAlergias.contrasteDeIodo) {
                await Api.post('api/alergia',
                    {condicaoClinicaId: usrData.data.condicaoClinica.id, tipo: "Contraste De Iodo"},
                    {headers: {"Authorization" : tokenData.token}}
                );
            }   

            if(lstAlergias.aspirina) {
                await Api.post('api/alergia',
                    {condicaoClinicaId: usrData.data.condicaoClinica.id, tipo: "Aspirina"},
                    {headers: {"Authorization" : tokenData.token}}
                );
            }   

            if(lstAlergias.antiInflamatorios) {
                await Api.post('api/alergia',
                    {condicaoClinicaId: usrData.data.condicaoClinica.id, tipo: "Anti-Inflamatórios"},
                    {headers: {"Authorization" : tokenData.token}}
                );
            }

            if(lstAlergias.relaxantesMusculares) {
                await Api.post('api/alergia',
                    {condicaoClinicaId: usrData.data.condicaoClinica.id, tipo: "Relaxantes Musculares"},
                    {headers: {"Authorization" : tokenData.token}}
                );
            }

            return {success: true, message: "Dados salvos com sucesso!"};
        }catch(error) {
            return getResponseError(error)
        }
    }
}

const getResponseError = (error) => {
    const msg =  error.response.data.erros.reduce((result, item) => {
        return `${item}\n`
    }, "");
    return {error: true, message: msg};
}

export default Alergias;