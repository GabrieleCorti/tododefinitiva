"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
const port = 5000;
const mongoUrl = "mongodb://127.0.0.1:27017/todoDb";
const { MongoClient } = require("mongodb");
const cors = require("cors");
const dayjs = require("dayjs");
const jwt = require("jsonwebtoken");
const client = new MongoClient(mongoUrl);
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
    console.log(AuteticationHead);
    const token = AuteticationHead && AuteticationHead.split(" ")[1];
    console.log(token);
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
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port port!`));
app.post("/login/addUser", (req, res) => {
    const Body = req.body;
    if (Body.name && Body.password && Body.email) {
        const NewUser = {
            name: Body.name,
            password: Body.password,
            email: Body.email,
        };
        //connessione mongo
        try {
            client
                .connect()
                .then(() => {
                client.db("todoDb").collection("users").insertOne(NewUser);
            })
                .then(() => {
                const token = generateToken("h", NewUser.name, "seecret");
                res.json({
                    isRegistered: true,
                    err: "",
                    data: {
                        token: token,
                        name: NewUser.name,
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
    console.log(req.body);
    console.log(Body.email, Body.password);
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
    console.log(res.locals.name);
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
