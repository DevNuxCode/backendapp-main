require('dotenv').config(); // Load environment variables

const app = require('./app');

app.listen(app.get('port'), ()=> {
    console.log("Servidor on localhost escuchando puerto ", app.get("port"));
});
module.exports = index