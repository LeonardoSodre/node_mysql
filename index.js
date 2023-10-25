const express = require("express")

const exphbs = require("express-handlebars")

const mysql = require("mysql2")

// definindo handlebars
app.engine(" handlebars", exphbs.engine())
app.set("view engine", "handlebars")


// pasta de arquivos estáticos
app.use(express.static("public"))

app.use(express.urlencoded({
    extended:true
}))

// trabalhar com Json
app.use(express.json())

app.get('/', (requisicao, resposta) =>{
    resposta.rander("home")
})

// Conexão Mysql

const conn = mysql.createConnection({
    database: 'nodemysql',
    port: '3306',
    user: 'root',
    password:'root',
    hots: 'localhost' 
})


conn.connect((error) =>{
    if(error){
        console.log(error)
        return
    }
    console.log("Connectou!! ")
    app.listen(3000, () =>{
        console.log(' Servidor rodando na porta 3000')
    })
})