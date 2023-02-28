const logger = (request, response, next) => {
    console.log(`The request method is: ${request.method} and URL is: ${request.url}`)
    next()
} 

module.exports = logger