async function errorHandler(error, req, res, next) {
    
    res.status(400).send({error: error.message});
}

module.exports = errorHandler;