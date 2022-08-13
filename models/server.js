const express = require('express');
const cors = require('cors');

class Server
{
	constructor()
	{
		this.app = express();
		this.port = process.env.PORT;

		//Middlewares
		this.middlewares();

		//Rutas
		this.usersPath = '/api/users';
		this.routes();
	}

	middlewares()
	{	
		//CORS
		this.app.use(cors());
		//Directorio público
		this.app.use(express.static('public'));
	}

	routes()
	{
		this.app.use(this.usersPath, require('../routes/user'));
	}

	listen()
	{
		this.app.listen(this.port, () => {
			console.log(`Servidor corriendo en el puerto: ${this.port}`);
		});
	}
}

module.exports = Server;