import Api from '../Api';
import OauthToken from '../oauthToken/Token'
import PFAbstract from '../pessoaFisica/Abstract';

const CadastroUsuario = {
    async cadastrar(data) {
        try {

            console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
            console.log(data)
            console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')

            // const usrResponse = await Api.post('api/usuario/registrar',
            //     {
            //         usuario: data.user.usuario, 
            //         email: data.user.email,
            //         senha: data.user.senha,
            //         executante: 0
            //     }
            // );

            // console.log('responseeeeeeeeeee')
            // console.log(usrResponse)
            // console.log('responseeeeeeeeeee')

            // return {success: true, message: "Dados salvos com sucesso!"};
        }catch(error) {
            console.log('deu ruim')
            console.log(error.response.data)
            console.log('deu ruim')
            // return getResponseError(error)
        }
    }
}

const getResponseError = (error) => {
    const msg =  error.response.data.erros.reduce((result, item) => {
        return `${item}\n`
    }, "");
    return {error: true, message: msg};
}

export default CadastroUsuario;