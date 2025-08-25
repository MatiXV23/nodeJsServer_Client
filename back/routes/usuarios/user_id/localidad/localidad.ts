import { IncomingMessage, ServerResponse } from 'node:http';


const f = ({user_id}: {user_id: number}, request : IncomingMessage, response : ServerResponse<IncomingMessage>) => {
    const { method } = request

    if (method == "GET"){
        response.writeHead(200, {'Content-Type': 'aplication/json'})
        response.end(JSON.stringify({localidad: (user_id%2 === 0) ? "Montevideo" : "Salto"}))
    }
}

export default { f }