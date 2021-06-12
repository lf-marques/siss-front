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
    }
}
export default Helper;