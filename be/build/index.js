"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
const port = 5000;
const mongoUrl = "mongodb://127.0.0.1:27017/todoDb";
const { MongoClient } = require("mongodb");
const cors = require("cors");
const dayjs = require("dayjs");
const jwt = require("jsonwebtoken");
const mongodb_1 = require("mongodb");
const client = new MongoClient(mongoUrl);
const nodemailer = require("nodemailer");
const cripto = require('crypto');
//token generation
const generateToken = (date, name, seecret) => {
    return jwt.sign({
        exp: dayjs().add(1, date).valueOf(),
        name: name,
    }, seecret);
};
//token verification
const VerifyToken = (req, res, next) => {
    const AuteticationHead = req.header("authorization");
    /* console.log(AuteticationHead); */
    const token = AuteticationHead && AuteticationHead.split(" ")[1];
    /* console.log(token); */
    if (token === undefined) {
        res.json({
            isAuthorised: false
        });
        return;
    }
    ;
    jwt.verify(token, "seecret", (err, token) => {
        if (err) {
            res.json({
                error: err,
                isAuthorised: false
            });
            return;
        }
        if (dayjs().isAfter(token.exp)) {
            res.json({
                err: 'expierd',
                isAuthorised: false
            });
            return;
        }
        res.locals.name = token.name;
        next();
    });
};
//mail function 
function main(mail) {
    return __awaiter(this, void 0, void 0, function* () {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'randy.bergstrom25@ethereal.email',
                pass: 'Q6QEwkQfTAMkyMT2Cz'
            }
        });
        // send mail with defined transport object
        let info = yield transporter.sendMail({
            from: '<noreply@todo.com>',
            to: mail,
            subject: "Hello ✔",
            text: "razie per esserti iscritto a Todo Conferma la tua iscrizione qui",
            html: "<h1>Grazie per esserti iscritto a Todo</h1> <p>Conferma la tua iscrizione <a href='http://localhost:3000/account/verify'>qui<a></p>", // html body
        });
        /* console.log("Message sent: %s", info.messageId); */
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview only available when sending through an Ethereal account
        /* console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info)); */
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
}
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port port!`));
app.post("/login/addUser", (req, res) => {
    const Body = req.body;
    if (Body.name && Body.password && Body.email) {
        var secretUrl = cripto.randomBytes(20).toString('hex');
        const NewUser = {
            name: Body.name,
            password: Body.password,
            email: Body.email,
            secretUrl: secretUrl,
            isActive: false
        };
        //connessione mongo
        try {
            client
                .connect()
                .then(() => {
                client.db("todoDb").collection("users").insertOne(NewUser);
            })
                .then(() => {
                main(NewUser.email);
            })
                .then(() => {
                const token = generateToken("h", NewUser.name, "seecret");
                res.json({
                    isRegistered: true,
                    err: "",
                    data: {
                        token: token,
                        name: NewUser.name,
                        code: NewUser.secretUrl
                    },
                });
                return;
            });
        }
        catch (error) {
            res.json({
                isRegistered: false,
                err: error,
                data: {},
            });
            return;
        }
    }
});
app.post("/login", (req, res) => {
    const Body = req.body;
    /* console.log(req.body);
    
    console.log(Body.email, Body.password); */
    if (Body) {
        try {
            client
                .connect()
                .then(() => {
                return client
                    .db("todoDb")
                    .collection("users")
                    .findOne({ email: Body.email, password: Body.password });
            })
                .then((item) => {
                if (item) {
                    const token = generateToken("h", item.name, "seecret");
                    res.json({
                        isFound: true,
                        data: {
                            name: item.name,
                            email: item.email,
                            token: token
                        },
                    });
                    return;
                }
                else {
                    res.json({
                        isFound: false,
                        data: {},
                    });
                }
            });
        }
        catch (err) {
            console.log(err);
            res.json({
                isFound: false,
                data: {
                    error: err,
                },
            });
            return;
        }
    }
});
app.get('/autorization', VerifyToken, (req, res) => {
    res.json({
        isAuthorized: true
    });
});
app.get('/todos', VerifyToken, (req, res) => {
    /* console.log(res.locals.name); */
    try {
        client.connect()
            .then(() => {
            return client.db('todoDb').collection('todos').find({ belongsTo: res.locals.name }).toArray();
        })
            .then((todos) => {
            res.json({
                isFound: true,
                data: todos
            });
            return;
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            isFound: false,
            err: error
        });
        return;
    }
});
app.post('/addTodo', VerifyToken, (req, res) => {
    const Body = req.body;
    if (Body) {
        const NewTask = {
            title: Body.title,
            body: Body.body,
            expDate: Body.expDate,
            isCompleted: false,
            belongsTo: res.locals.name
        };
        try {
            client.connect()
                .then(() => {
                return client
                    .db("todoDb")
                    .collection("todos")
                    .insertOne(NewTask);
            })
                .then((_) => {
                res.json({
                    isPosted: true
                });
                return;
            });
        }
        catch (error) {
            console.log(error);
            res.json({
                isPosted: false,
                err: error
            });
            return;
        }
    }
});
app.put('/confirm-account', (req, res) => {
    const { code } = req.body;
    console.log(req.body);
    try {
        client.connect()
            .then(() => {
            return client.db('todoDb').collection('users').updateOne({ secretUrl: code }, { $set: { isActive: true } });
        });
        return;
    }
    catch (error) {
        console.log(error);
        return;
    }
});
app.delete('/deleteTodo/:id', VerifyToken, (req, res) => {
    const { id } = req.params;
    const o_id = new mongodb_1.ObjectId(id);
    try {
        client.connect()
            .then(() => {
            return client.db('todoDb').collection('todos').deleteOne({ _id: o_id });
        })
            .then((response) => {
            console.log(response);
            res.json({
                siDeleted: true
            });
            return;
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            isDeleted: false,
            err: error
        });
        return;
    }
});
