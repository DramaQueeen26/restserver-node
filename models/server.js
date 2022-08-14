const express = require('express');
const cors = require('cors');
const {dbConnection} = require('../database/config');


class Server
{
	constructor()
	{
		this.app = express();
		this.port = process.env.PORT;

		//Conectar a base de datos
		this.database();

		//Middlewares
		this.middlewares();

		//Rutas
		this.usersPath = '/api/users';
		this.routes();
	}

	async database()
	{
		await dbConnection();
	}

	middlewares()
	{	
		//CORS
		this.app.use(cors());
		//Lectura y parseo del body (POST)
		this.app.use(express.json());
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