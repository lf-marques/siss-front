import moment from 'moment';

const Helper = {
    getResponseError(error) {
        let msg = ''
        if(error['response']['data']['erros']) {
            msg =  error.response.data.erros.reduce((result, item) => {
                return `${item}\n`
            }, "");
        }else {
            console.log(error)
            msg = 'erro interno'
        }
        return {error: true, message: msg};
    },
    removeSpecialCharacters(str) {
        return str.replace(/[^\w\s]/gi, "")
    },
    isObjsDiff(obj1, obj2) {
        return JSON.stringify(obj1) != JSON.stringify(obj2)
    },
    formatCpf(cpf) {
        try {
            cpf = cpf.replace(/[^\d]/g, "")
            return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
        }catch(error) {
            console.log(error)
        }
    },
    formatRg(rg) {
        try {
            rg = rg.replace(/[^\d]/g, "")
            return rg.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, "$1.$2.$3-$4")
        }catch(error) {
            console.log(error)
        }
    },
    formatDateAndRemoveTime(date) {
        return moment(date).format('DD/MM/YYYY')
    }
}
export default Helper;