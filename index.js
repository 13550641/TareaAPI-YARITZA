'use strict'

const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Gema = require('./models/gemas')

const app = express ()
const port = process.env.PORT || 3001

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

app.get('/api/fgemproduct', (req, res) =>{
 Gema.find({}, (err, gema)=>{
    if(err) return res.status(500).send({
        message:`Error al realizar la peticion ${err}`})
        if (!gema) return res.status(404).send({message: 'No existen los productos'})
            res.status(200).send({gema});
    })
})

app.get('/api/fgemproduct/:productId', (req, res) =>{
let productId = req.params.productId

    Gema.findById(productId, (err,gema)=>{
        if(err) return res.status(500)
            .send({message: `Error al realizar la 
                peticion ${err}` })
        if(!gema) return res.status(400)
            .send ({message: `El producto no existe`})

        res.send(200, {gema});
    })
})

app.post('/api/fgemproduct', (req,res)=>{
 console.log('POST/api/fgemproduct')
 console.log(req.body)

 let gema = new Gema()
 gema.name = req.body.name;
 gema.price = req.body.price;
 gema.description = req.body.description;
 gema.images = req.body.images;
 gema.stock = req.body.stock;
 gema.discounts = req.body.discounts;
 gema.stars = req.body.stars;
 gema.comments = req.body.comments;
 gema.author = req.body.author;

 gema.save((err, gemaStored)=>{
    	if(err) res.status(500).send({message: `Error al salvar la joya 
    		en la BD: ${err}`})
    		res.status(200).send({gema: gemaStored})
        })
})


app.delete('/api/fgemproduct/:productId', (req,res)=>{
	let productId = req.params.productId

    Gema.findById(productId, (err, gema)=>{
     if(err) res.status(500).send({message: `Error al eliminar el producto 
        en la BD: ${err}`})

         gema.remove(err=>{
           if(err) res.status(500).send({message: `Error al eliminar el producto 
            en la BD: ${err}`})


             res.status(200).send({message: `El producto ha sido eliminado
                en la BD`})

         })
     })
})


mongoose.connect('mongodb://localhost:27017/gemproducts',(err, res)=>{
	if(err){
		return console.log(`Error al conectar con la base de datos: ${err}`)
	}
	console.log('La conexion con la BD fue exitosa')

app.listen(port,()=>{
		console.log(`API REST corriendo en localhost: ${port}`)
	})
})