const Joi = require(`@hapi/joi`)
const User = require(`./../../../models/user`)
const encrypt = require(`./../../../utils/encrypt`)

module.exports = async (req, res) => {
  let userData = await schema.validateAsync(req.body)
  userData.password = await encrypt(userData.password)

  delete userData.password_confirmation

  let user = new User(userData)
  await user.save()

  // Log new user
  const token = await user.generateAuthToken()

  return res.header('x-auth-token', token).status(201).json({message: "Nueva cuenta de usuariro creada."})
}

const schema = Joi.object({
  name: Joi.string().min(4).required(),
  last_name: Joi.string().min(4),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required()
            .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/),
  password_confirmation: Joi.any().valid(Joi.ref(`password`)).required()
})