import moment from 'moment';

const Helper = {
    getResponseError(error) {
        let msg = ''
        if(
            error && 
            error['response'] &&
            error['response']['data'] &&
            error['response']['data']['erros']
        ) {
            msg =  error.response.data.erros.reduce((result, item) => {
                return `${item}\n`
            }, "");
        }else {
            console.log(error)
            msg = 'Aplicação indisponível no momento.'
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
        try {
            return moment(date).format('DD/MM/YYYY')
        }catch(err){
            console.log(err)
        }
    },
    parseDateToSave(date) {
        try {
            let darr = date.split('/');
            let ISOFormat = new Date(parseInt(darr[2]),parseInt(darr[1])-1,parseInt(darr[0]));
            return ISOFormat.toISOString().split('T')[0]
        }catch(err){
            console.log(err)
        }
    },
    isEmailValid(email) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    }
}
export default Helper;