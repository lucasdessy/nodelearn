import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const app = express();

const customers = [];

app.use(express.json());

app.post("/account", (req, res) => {
    const { cpf, name } = req.body; 
    
    const customerAlreadyExists = customers.find(
        costumers => customers.some(
            (customer) => customer.cpf === cpf
        ));
        
        if (customerAlreadyExists) {
            return res.status(400).json({ error: "Costumer already exists" });
        }

    customers.push({ 
        cpf, 
        name, 
        id: uuidv4(),
        statement: []
    });
    return res.status(201).send();
});

app.get("/statement", (req, res) => {
    const { cpf } = req.headers;

    const customer = customers.find(
        customer => customer.cpf === cpf );
    
    if (!customer) {
        return res.status(400).json({ error: "Costumer not found" });
    }
    return res.json(customer.statement);
});
app.listen(3333);