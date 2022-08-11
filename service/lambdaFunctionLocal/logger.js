const logger = (token)=>{

	require('logzio-nodejs').createLogger({
		token: process.env.TOKEN,
		protocol: 'https',
		host: 'listener.logz.io',
		port: '8071',
		type: 'syntetic-scripting', // OPTIONAL (If none is set, it will be 'nodejs')
		sendIntervalMs: 1000,
	});
} 
module.exports = logger;
