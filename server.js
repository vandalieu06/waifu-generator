import express from 'express';

const PORT = 3000;
const app = express();

app.use('/', express.static('./'))
app.listen(PORT,() => {
    console.log('Hola, el servidor wif esta funcionando');
    console.log('http://localhost:3000/');
})