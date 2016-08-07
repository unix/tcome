/**
 * Created by WittBulter on 16/8/4.
 */

const express = require('express')
const bodyParser = require ('body-parser')
const http = require('http')
const debug = require ('debug') ('itsmycar:server')
const logger = require ('morgan')
const routes = require ('./routes')
const app = express()

// 全局路径
global.__APP_PATH = __dirname



const port = (process.env.PORT || 3000)
app.set ('port', port)
const server = http.createServer (app)
server.listen (port, _ => console.log(
	`--------    Express Message    --------
this Service is started, PORT => ${port}
**`))

server.on('error', error =>{
	if (error.syscall !== 'listen') throw error
	const bind = typeof port === 'string'? 'Pipe ' + port: 'Port ' + port

	switch (error.code) {
		case 'EACCES':
			console.error (bind + ' requires elevated privileges')
			process.exit (1)
			break;
		case 'EADDRINUSE':
			console.error (bind + ' is already in use')
			process.exit (1)
			break;
		default:
			throw error;
	}
})
server.on ('listening', _ =>{
	const addr = server.address ()
	const bind = typeof addr === 'string'? 'pipe ' + addr: 'port ' + addr.port
	debug('Listening on ' + bind)
})



app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use('/public', express.static (__dirname + '/public'))
app.use('/', express.static (__dirname + '/public/dist'))
app.use('/node_modules', express.static (__dirname + '/node_modules'))

routes(app)