// config. inicial
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// forma de ler JSON / middlewares
app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// rotas da API
const personRoutes = require('./routes/personRoutes');
app.use('/person', personRoutes);

// rota inicial / endpoint
app.get('/', (req, res) => {
    res.json({message: 'Oi Express!'});
});

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);

mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.bfcyujh.mongodb.net/bancodaapi?retryWrites=true&w=majority`,
)
.then(() => {
    console.log('Conectamos ao MongoDB!');    
    // entregar uma porta
    app.listen(3000);
})
.catch((err) => console.log(err));
