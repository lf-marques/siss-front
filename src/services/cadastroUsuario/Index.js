import Api from '../Api'
import OauthToken from '../oauthToken/Token'
import PFAbstract from '../pessoaFisica/Abstract'
import CondicaoClinica from '../condicaoClinica/Index'
import Helper from '../Helper'

const CadastroUsuario = {
    async cadastrar(data) {
        try {
            const valid = await CadastroUsuario.checkExists(data.user.usuario, data.user.email, data.pf.cpf,data.pf.rg)
            
            if(!valid.error) {
                const usrResponse = await Api.post('api/usuario/registrar',
                {
                    usuario: data.user.usuario, 
                    email: data.user.email,
                    senha: data.user.senha,
                    executante: 0
                })

                if(usrResponse.data.dados) {
                    await OauthToken.getTokenByUsername(data.user.usuario, data.user.senha)
                    
                    const pfResponse = await PFAbstract.salvar(data.pf)
                    if(pfResponse['success']) {
                        const condicaoClinicaResponse = await CondicaoClinica.salvar(data.cdClinica)
                        if(condicaoClinicaResponse['success']) {
                            await OauthToken.clearToken()
                            return {success: true, message: 'Cadastro realizado com sucesso, prossiga para o login!'}
                        }else {
                            return condicaoClinicaResponse
                        }
                    }else {
                        return pfResponse
                    }
                }
            }else {
                return {error: true, message: valid.message}
            }

        }catch(error) {
            return Helper.getResponseError(error)
        }
    },
    async enviarCodigoRecuperacao(email) {
        try {
            const response = await Api.post('api/usuario/enviarCodigo',{email: email})
            return {success: true, data: response.data.dados}
        }catch(error) {
            return Helper.getResponseError(error)
        }
    },
    async redefinirSenha(data) {
        try {
            const response = await Api.post('api/usuario/redefinirSenha',
                {idUsuario: data.idUsuario, 
                    codigo: data.codigo, 
                    novaSenha: data.senha
                })
                return {success: true, data: response.data.dados}
            }catch(error) {
            return Helper.getResponseError(error)
        }
    },
    async checkExists(username, email, cpf, rg) {
        try {
            if(cpf != 'n') {
                cpf = Helper.removeSpecialCharacters(cpf)
            }
            if(rg != 'n') {
                rg = Helper.removeSpecialCharacters(rg)
            }

            const response = await Api.post('api/pessoaFisica/checkExistente',
            {
                username: username, 
                email: email,
                cpf: cpf,
                rg: rg

            })

            if(response.data == 'ok') {
                return {success: true};
            }else {
                let stringErrors = ''
                response.data.split('/').forEach((error) => {
                    stringErrors += `${error}\n`
                })
                return {error: true, message: stringErrors}
            }
        }catch(error) {
            return {error: true, message: "erro interno"}
        }
    },
    async alterarSenha(senhaAtual, novaSenha) {
        try {
            const tokenData = await OauthToken.getTokenStorage();
            const response = await Api.post('api/usuario/alterarSenha',
                {idUsuario: tokenData.usrId, 
                    novaSenha: novaSenha, 
                    senhaAtual: senhaAtual
                },
                {headers: {"Authorization" : tokenData.token}}
            );
            
            return {success: true, data: response.data.dados}
            }catch(error) {
            return Helper.getResponseError(error)
        }
    }
}

export default CadastroUsuario;