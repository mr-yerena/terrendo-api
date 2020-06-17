const paramsMap = require(`./paramsMap`)

module.exports = joiErrorMessages => {
  const { path, type, context } = joiErrorMessages
  const fieldName = paramsMap(path[0]).split(`_`).join(` `)

  const messages = {
    "any.required": `El campo ${fieldName} es requerido.`,
    "string.base": `El campo ${fieldName} debería ser una cadena.`,
    "string.email": `El campo ${fieldName} no es una dirección de correo válida.`,
    "string.min": `El campo ${fieldName} debe poseer al menos ${context.limit} carácteres.`,
    "string.pattern.base": (fieldName === `password`) ? `El campo ${fieldName} debe poseer al menos 1 letra en mayúsculas, 1 número and 1 carácter especial.` : `El campo ${fieldName} no concuerda con el patrón`,
    "any.only": `El campo ${fieldName} no es igual al campo de password`
  }

  return messages[type]
}