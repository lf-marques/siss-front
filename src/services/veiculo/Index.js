import Api from '../Api';
import OauthToken from '../oauthToken/Token'
import PFAbstract from '../pessoaFisica/Abstract';

const Veiculo = {
    async deletar(id){
        try {
            const tokenData = await OauthToken.getTokenStorage();
            const response = await Api.delete(`api/veiculo/excluir/${id}`,
                {headers: {"Authorization" : tokenData.token}},
            );
            return response.data;
        }catch(error) {
            return error.response.data;
        } 
    },
    async salvar(veiculo) {
        try {
            const usrData = await PFAbstract.getByCurrentToken();
            const tokenData = await OauthToken.getTokenStorage();

            if(veiculo) {
                await Api.post('api/veiculo',
                    {
                        id: veiculo.id > 0  && veiculo.id != null ? veiculo.id : null,
                        modelo: veiculo.modelo,
                        marca: veiculo.marca,
                        renavam: veiculo.renavam,
                        placa: veiculo.placa,
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

export default Veiculo;