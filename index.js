// require your server and launch it here
const server = require('./api/server')
const port = 9000
server.list(port, ()=>{
    console.log(`\n*** Server running on http://localhost:${port} ***\n`)
})