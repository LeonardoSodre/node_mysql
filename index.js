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

app.get("/cadastrar", (request, response) =>{
    resposta.render("cadastrar")
} )


app.get("/edit/:id", (request, response) =>{
    const id = request.params.id
    
    const sql = `
    
        SELECT * FROM books WHERE id = ${id}
    `

    conn.query(sql, (error, data)=>{
        if(error){
            return console.log(error)
        }

        const book = data[0]

        response.render('edit', {book})
    }) 
})

app.get("/book/:id", (request, response) =>{
    const id = request.params.id
    
    const sql = `SELECT * FROM books WHERE id = ${id}`

    conn.query(sql, (error, data) =>{
        if (error){
            return console.log(error)
        }

        const book = data[0]

        response.render("book", {book})
    })
})

app.get('/', (request, response) =>{

    const sql = 'SELECT * FROM  books'

    conn.query(sql, (error, data) =>{
        if(error){
            return console.log(error)
        }
        const books = data
        
        console.log(books)

        resposta.render("home", {books })
    })
    
})

app.post("/edit/save", (request, response) =>{
    const {id, title, pageqty} = request.body

    const sql = `UPDATE books SET title = '${title}', pageqty = '${pageqty}' WHERE id = ${id}`

    conn.query(sql, (error) =>{
        if(error){
            return console.log(error)
        }
        response.redirect("/")
    })
})

app.post('/cadastrar/save', (request, response) =>{

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


