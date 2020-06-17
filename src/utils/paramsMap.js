module.exports = param => {
  const paramsMap = {
    "name": `nombre`,
    "last_name": `apellido`,
    "email": `correo electronico`,
    "password_confirmation": `confirmacion de password`,
    "phone": `teléfono`
  }

  return param in paramsMap ? paramsMap[param] : param
}