const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql');
const app = express();

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
//consigurando utilização de arquivos css
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.render('home');
})
const conn = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'clientes'
});
conn.connect((erro) => {
    if (erro) {
        console.log(erro);
        return
    }
    console.log("Conectou no banco de dados");
    app.listen(3000);
})
app.use(
    express.urlencoded({
    extended: true
    })
    );
    app.use(express.json());
        
   

    app.post('/usuario/salvar', (req,res) => {
        const nome = req.body.nome;
        const idade = req.body.idade;
        const dataNascimento = req.body.dataNascimento;
        const email = req.body.email;
        const sql = `INSERT INTO cadastro (Nome, email, data_nascimento,
        idade) VALUES ('${nome}', '${email}', '${dataNascimento}', '${idade}')`;
        
        conn.query(sql, (erro) => {
        if (erro){
        console.log(erro);
        }
        res.render('home');
        })
        });

        app.get('/', (req, res) => {
            const sql = `SELECT * FROM cadastro`;
            conn.query(sql, (erro, dados) => {
            if (erro){
            console.log(erro);
            return
            }
           
            res.render('main',dados);
            })
            });