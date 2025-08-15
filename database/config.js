const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async() => {
    try {
        // Debug completo para Railway
        console.log('🔍 === DEBUG INFO ===');
        console.log('NODE_ENV:', process.env.NODE_ENV);
        console.log('PORT:', process.env.PORT);
        console.log('DB_CNN definido:', !!process.env.DB_CNN);
        console.log('SECRET_JWT_SEED definido:', !!process.env.SECRET_JWT_SEED);
        
        if (process.env.DB_CNN) {
            console.log('DB_CNN preview:', process.env.DB_CNN.substring(0, 30) + '...');
        } else {
            console.error('❌ DB_CNN no está definido!');
            throw new Error('Variable DB_CNN no configurada');
        }

        console.log('🔄 Intentando conectar a MongoDB...');
        
        await mongoose.connect(process.env.DB_CNN);
        
        console.log('✅ Base de datos conectada exitosamente');
        
        // Test rápido de la conexión
        const adminDb = mongoose.connection.db.admin();
        const result = await adminDb.ping();
        console.log('✅ Ping a BD exitoso:', result);

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