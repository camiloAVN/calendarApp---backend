const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
    
        
        await mongoose.connect(process.env.DB_CNN);
        
        console.log('✅ Base de datos conectada exitosamente');

    } catch (error) {
        console.error('❌ === ERROR COMPLETO ===');
        console.error('Error completo:', error);
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        console.error('Error code:', error.code);
        console.error('Error stack:', error.stack);
        
        // Tipos específicos de error
        if (error.name === 'MongoServerSelectionError') {
            console.error('🔍 Error de selección de servidor - problema de red o DNS');
        } else if (error.name === 'MongooseServerSelectionError') {
            console.error('🔍 Error de conexión de Mongoose - verificar string de conexión');
        } else if (error.name === 'MongoParseError') {
            console.error('🔍 Error de parsing - string de conexión malformado');
        } else if (error.name === 'MongoNetworkTimeoutError') {
            console.error('🔍 Timeout de red - problemas de conectividad');
        }
        
        // Re-lanzar con más información
        throw new Error(`Error detallado de BD: ${error.name} - ${error.message}`);
    }
}

module.exports = {
    dbConnection
}