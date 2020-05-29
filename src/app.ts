import express from 'express';
import bodyParser from 'body-parser';
import { employeeRouter } from './routers/employee.router';
import { financeManagerRouter } from './routers/financeManager.router';
import { db } from './daos/db';

// Initialize express app
const app = express();

// Gets port environment variable value
const port = process.env.PORT || 3000;

app.set('port', port);

// Parses body of request
app.use(bodyParser.json());

app.use((request, response, next) => {
    console.log('Request received - processing at middleware 1');
    next();
})

app.use('/employee', employeeRouter)
app.use('/financeManager', financeManagerRouter)

process.on('unhandledRejection', () => {
    db.end().then(() => {
        console.log('Database pool closed');
    });
});

// Begin listening on the designated port
app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`)
});

