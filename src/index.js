import http from 'http'

const server = http.createServer(async (req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        res.end()
    }
})

server.listen(3001, () => {
    console.log('Server on http://localhost:3001');
})