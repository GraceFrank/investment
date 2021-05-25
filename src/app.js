const express = require("express")

const server = express()


server.use(logger('dev'))
server.use(express.json())
server.use(express.urlencoded({ extended: true }));


server.get("*", (req, res)=>{
    return res.status(200).send({message: "welcome to Abudanza"})
})

const PORT = PROCESS.ENV.PORT || 4000

server.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`)
} )

module.exports = server