const bodyParser = require('body-parser');
const express = require('express');
const app = express()
//interpretar o formulario do arquivo do upload
const multer = require('multer')


app.use(express.static('.'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


//multer.diskStorage recebe um objeto para configurar ou 
//personalizar a pasta onde vc vai salvar os arquivos ou o nome.


const storage = multer.diskStorage({
    destination:  function(req, file, callback){
        callback(null, './upload')
    },
    filename: function(req, file, callback){
        callback(null, `${Date.now()}_${file.originalname}`)
    }
})


const upload = multer({storage}).single('arquivo')


app.post('/upload', (req, res)=>{
    upload(req,res,err  => {
        if(err) {
            return res.end('Ocorreu um erro.')
        }

        res.end('Concluído com sucesso.')
    })
})

// app.get('/teste', (req,res)=> res.send(new Date))

app.post('/formulario', (req,res) =>{
    res.send({
        ...req.body,
        id: 1
    })
})

app.get('/parOuImpar/',(req,res) =>{
    // req.body
    // req.query
    // req.params
    const par = parseInt(req.query.numero) % 2 === 0
    res.send( {resultado: par ? 'par' : 'impar'} )
})


app.listen(8080, () => console.log('Servidor executando'))