const express = require("express")
const CORS = require("cors")
const app = express()
const port = 8080

app.use(CORS())
app.use(express.json())
const mongo = require("mongodb")
const mongoClient = mongo.MongoClient
const connectionString = "mongodb+srv://admin:admin@clustercursomicroservic.gws1x.mongodb.net/BBDD1?retryWrites=true&w=majority"


mongoClient.connect(connectionString, { useUnifiedTopology: true }).then(client => {
    console.log("Conectados a la base de datos")

    let facturas = client.db("BBDD1").collection("facturas")

    // crear factura
    app.post("/facturas", (req, res) => {
        
        let factura =  req.body
        facturas.insertOne(factura).then(result => {
            console.log(result)
            
        }).catch(error => {
            console.error(error)
        })
        res.send('OK Post')
    })

    // recuperar factura id 
    app.get("/facturas/:id", (req, res) => {
        var id  = req.params.id
        var mongoObject_id = new mongo.ObjectId(id)
        console.log(id)
        var q = {_id: mongoObject_id}
        facturas.findOne(q).then(factura =>{
            res.json(factura)
            console.log(typeof(factura))
        }).catch(error =>{
            console.error(error)
        })
    })

    // recuperar todas las facturas
    app.get("/facturas", (request, response) => {
        // recuperar la factura de la base de datos
        facturas.find().toArray().then(facturas => {
            response.json(facturas);
            console.log(typeof(result))
        }).catch(err => {
            console.error(err);
        });
    });


    app.put("/facturas/:id", (req, res) => {
        var id = req.params.id
        let body_json = req.body
        var q_1 = {"id": Number.parseInt(id)}

        facturas.updateOne(q_1, {$set: body_json}).then(factura => {
            res.send("Update OK")
        }).catch(error =>{
            console.error(error)
        })
    })

    // eliminar factura id
    app.delete("/facturas/:id", (req, res) => {
        var id = req.params.id
        facturas.deleteOne({"id": Number.parseInt(id)}).then(result => {
            res.send("Delete OK")
        }).catch(error => {
            console.error(error)
        })
    })

    app.listen(port, () => {
        console.log(`API listening at http://localhost:${port}`)
    });

}).catch(error => console.log(error))

