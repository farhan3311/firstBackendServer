//Setup
const cors = require('cors')
const express = require("express")
const app = express()

//fruit data
const fruits = require("./fruit")

const logger = require('./logger')

app.use(cors())
app.use(express.json())


//logger
app.use(logger)

//Routes
app.get('/', (request, response) => {
    response.send("Hello...Fruit API")
})

//sub-route

app.use('/fruits', (request, response, next) => {
    console.log(`Request type: ${request.method}`)
    next()
})
app.get ('/fruits', (request, response) => {
    response.send(fruits)

})

//parsing parameters

const getFruit = (name) => {
     return fruits.find((fruit) => fruit.name.toLowerCase() == name)

}
//fetch 


app.get ('/fruits/:name', (request, response) => {
    //response.send(request.params)
    const name = request.params.name.toLowerCase()
    const fruit = getFruit(name)
    if(fruit == undefined) {
        response.status = 400
    }
    else {
        response.send(fruit)
    }
})
const getMaxID = () => {
    const ids = fruits.map((fruits) => fruits.id)
    return Math.max(...ids)
}

//post/add
app.post('/fruits', (request, response) => {
     
    //check if exist
    const fruit = getFruit(request.body.name)

    if (fruit != undefined) {
        response.status(409).send()
    }
    else {
        let maxID = getMaxID() + 1
        request.body.id = maxID
        fruits.push(request.body)
        response.status(201).send(request.body)
    }
    

})

//delete
app.delete('/fruits/:name', (request, response) => {
    const name = request.params.name.toLowerCase()
    const fruit = getFruit(name)
    const fruitIndex = fruits.indexOf(fruit)
    if (fruitIndex == -1) {
        response.status(404).send()
    }
    else {
        fruits.splice(fruitIndex, 1)
        response.status(204).send()
    }

})

module.exports = app