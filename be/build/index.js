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
                const token = generateToken("1h", NewUser.name, "seecret");
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
                console.log(item);
                if (item) {
                    const token = generateToken("1h", item.name, "seecret");
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
