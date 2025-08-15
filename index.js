const expresss = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');
require('dotenv').config();

//console.log(process.env);

// crear el servidor de express
const app = expresss();

//database
dbConnection();

//CORS
app.use(cors())

//directorio publico
app.use(expresss.static('public'));

app.use(expresss.json());

app.use('/api/auth', require('./routes/auth'));


// escuchar peticiones

app.listen(process.env.PORT, () => {
    console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
})