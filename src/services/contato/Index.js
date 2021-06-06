import Api from '../Api';
import OauthToken from '../oauthToken/Token'
import PFAbstract from '../pessoaFisica/Abstract';

const Contato = {
    async deletar(id){
        try {
            const tokenData = await OauthToken.getTokenStorage();
            const response = await Api.delete(`api/contato/excluir/${id}`,
                {headers: {"Authorization" : tokenData.token}},
            );
            return response.data;
        }catch(error) {
            return error.response.data;
        } 
    },
    async salvar(contato) {
        try {
            const usrData = await PFAbstract.getByCurrentToken();
            const tokenData = await OauthToken.getTokenStorage();

            if(contato) {
                await Api.post('api/contato',
                    {
                        id: contato.id > 0  && contato.id != null ? contato.id : null,
                        nome: contato.nome,
                        parentesco: contato.parentesco,
                        telefone: contato.telefone,
                        celular: contato.celular,
                        pessoaFisicaId: usrData.data.id
                    },
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

export default Contato;