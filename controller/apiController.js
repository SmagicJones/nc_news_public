const {
    fetchApi,
} = require('../model/apiModel')



exports.getApi = (req, res, next) => {
    fetchApi().then((result) => {
        const parsedResult = JSON.parse(result)
        res.status(200).send(parsedResult)
    }).catch((err) => {
        next(err)
    })
}



