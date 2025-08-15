const expresss = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');
const { generalLimiter } = require('./middlewares/rate-limit');
require('dotenv').config();

//console.log(process.env);

// crear el servidor de express
const app = expresss();

//database
dbConnection();

//CORS
app.use(cors())

// Limitar peticiones generales
app.use('/api', generalLimiter);

//directorio publico
app.use(expresss.static('public'));

app.use(expresss.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));


// escuchar peticiones

app.listen(process.env.PORT, () => {
    console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
})