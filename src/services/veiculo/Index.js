import Api from '../Api'
import OauthToken from '../oauthToken/Token'
import PFAbstract from '../pessoaFisica/Abstract'
import Helper from '../Helper'

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
                        cor: veiculo.cor,
                        renavam: veiculo.renavam,
                        placa: veiculo.placa ? veiculo.placa.toUpperCase() : null,
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

export default Veiculo;