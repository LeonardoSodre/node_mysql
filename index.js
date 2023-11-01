const { request, response } = require("express")
const express = require("express")
const exphbs = require("express-handlebars")
const mysql = require("mysql2")
const app = express()


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

app.get("/cadastrar", (requisicao, resposta) =>{
    resposta.render("cadastrar")
} )

app.get('/', (requisicao, resposta) =>{
    resposta.render("home")
})

app.post('/cadastrar/save', (requisicao, resposta) =>{

    const {title, pageqty} = request.body
    const query = ` INSERT INTO books(title, pageqty)
                   VALUES('${book.title}', '${book.pageqty}') `

    conn.query(query, (error) =>{
        if(error){
            console.log(error)
            return
        }

        response.redirect("/")
    })               
})




// Conexão Mysql
const conn = mysql.createConnection({
    database: 'nodemysql',
    port: '3306',
    user: 'root',
    password:'root',
    host: 'localhost' 
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


