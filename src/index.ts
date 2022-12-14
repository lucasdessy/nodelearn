import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const app = express();
interface Customer {
  id: string;
  name: string;
  cpf: string;
  statement: string[];
}
const customers: Customer[] = [];

app.use(express.json());

//middlewares
function verifyIfExistsAccountCPF(req: express.Request, res: express.Response, next: express.NextFunction) {
  const { cpf } = req.headers;

  const customer = customers.find(
    customer => customer.cpf === cpf );
    
  if (!customer) {
    return res.status(400).json({ error: "Costumer not found" });
  }

  req.body.customer = customer;
  return next();
}
interface AccountRequest {
  cpf: string;
  name: string;
}
app.post("/account", (req, res) => {
    const { cpf, name } = req.body as AccountRequest;; 
    
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

interface StatementRequest {
  customer: Customer;
}
  app.get("/statement", verifyIfExistsAccountCPF, (req, res) => { 
  const { customer } = req.body as StatementRequest;
  return res.json(customer.statement);
});
app.listen(3333);