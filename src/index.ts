import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const app = express();

const costumers = [];

app.use(express.json());

app.post("/account", (req, res) => {
    const { cpf, name } = req.body;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
    const id = uuidv4();
    costumers.push({ 
        id, 
        cpf, 
        name, 
        statement: []
    });
    return res.status(201).send();
});

app.listen(3333);