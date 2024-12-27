 // Load environment variables
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }
  
const app = require('./app');

const PORT = process.env.PORT || app.get('port') || 3000;

app.listen(PORT, ()=> {
    console.log(`Servidor ejecutándose en puerto ${PORT}`);
});