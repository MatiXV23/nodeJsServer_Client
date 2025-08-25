import http, { IncomingMessage, Server, ServerResponse } from 'node:http';
import type { ListenOptions } from 'node:net';
import { handler } from './handler.ts';

const options: ListenOptions = {
    port: 3000,
    host: "::",
}

const server: Server = http.createServer();

server.on('request', handler)
server.listen(options)

const logRequest = (request : IncomingMessage, response : ServerResponse<IncomingMessage>) => {
    const { url, method, httpVersion } = request;
    console.log("Request: ", {url, method, httpVersion})
}

server.on("request", logRequest)

server.on("request", ()=>{
    console.log("Listening...")
})


export default {}