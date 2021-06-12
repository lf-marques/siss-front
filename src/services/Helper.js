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
    }
}
export default Helper;