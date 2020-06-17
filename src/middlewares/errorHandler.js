const joiErrorMessages = require(`./../utils/joiErrorMessages`)

module.exports = async (err, req, res, next) => {

    // Check if a validation error
    if (err.details) return res.status(422).json({message: joiErrorMessages(err.details[0]), error: err})

    // Check if a mongo error
    if (err.name === 'MongoError' && err.driver) {
        // Duplicate field in database
        if (err.code === 11000) return res.status(422).json({message: `El correo ingresado ya se encuentra registrado.`})
    }

    next(err)
}