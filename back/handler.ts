import { IncomingMessage, ServerResponse } from 'node:http';
import path from './paths/usuarios/usuarios.ts'


export const handler = (request : IncomingMessage, response : ServerResponse<IncomingMessage>) => {
    const { url } = request;
    if (url === "/usuarios") return path.handleUsers(request, response);
    const match = url!.match(/^\/usuarios\/(\d+)$/)
    if (match) return path.handleUser(Number(match[1]), request, response)

    response.writeHead(404, {'Content-Type': 'aplication/json'})
    response.end(JSON.stringify({message:"Pagina no encontrada"}))
}