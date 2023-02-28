
//Using JavaScript 

// const http = require("http")

// const server = http.createServer((req, res) => {
//     res.statusCode = 400
//     res.end()
// }) 
// server.listen(3000, () => {console.log("server ready")})


// node express
require('dotenv').config()
const cors = require('cors')
const { response, request } = require("express")
const express = require("express")
const fruits = require("./fruit")
const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.json())

//Routes
app.get('/', (request, response) => {
    response.send("Hello...!")
})


//parsing parameters
app.get('/cat', (request, response) => {
    response.send("A cute cat...!")
})

//parsing parameters

app.get('/cat/:name&:age', (request, res) => {
    response.send(req.params)
})

//using query parameters
app.get('cat/:name', (request, response) => {
    res.send(request.query)
})

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})




//sub-route

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