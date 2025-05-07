const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://penitenteswines:Penitentes+7412374123@inventory.8ma9uuz.mongodb.net/?retryWrites=true&w=majority&appName=inventory';

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000
})
    .then(() => {
        console.log('Conexión exitosa a MongoDB Atlas');
        mongoose.connection.close();
    })
    .catch(err => {
        console.error('Error al conectar con MongoDB Atlas:', err);
    });