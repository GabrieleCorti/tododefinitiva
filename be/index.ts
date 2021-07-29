const express = require('express')
const app = express()
const port = 5000
const mongoUrl = 'mongodb://127.0.0.1:27017/todoDb'
const { MongoClient } = require('mongodb');
const cors = require('cors');
import { Request, Response, NextFunction } from "express";
const client = new MongoClient(mongoUrl);

//interfacecce
interface User {
    name:string,
    password:string,
    email:string
}

app.use(cors());
app.use(express.json());

app.get('/', (req:Request, res:Response) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port port!`))

app.post('/login/addUser', (req:Request, res:Response)=>{
    const Body:User = req.body;
    if (Body) {

        const NewUser:User = {
            name: Body.name,
            password: Body.password,
            email: Body.email
        }
        //connessione mongo
        client.connect();
        const id = client.db('todoDb').collection('users').insertOne(NewUser);
        console.log(id);
        
        res.json({
            isRegistered: true 
        });
        return;
    }
    res.json({
        isRegistered: false 
    }) 
    return;  
})