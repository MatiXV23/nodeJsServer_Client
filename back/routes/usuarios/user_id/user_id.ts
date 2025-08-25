import { IncomingMessage, ServerResponse } from 'node:http';
import { users } from '../usuarios.ts';

// user_id pasado como objeto para poder facilitar el pasado como parametros de forma general

const f = ({user_id}: {user_id: number}, request : IncomingMessage, response : ServerResponse<IncomingMessage>) => {

    const { method } = request

    console.log({method, "/users/user_id": user_id})
    if (!users) {
        response.writeHead(404, {'Content-Type': 'aplication/json'})
        response.end(JSON.stringify({message:"Pagina no encontrada"}))
    }

    const user_idx = users.findIndex(u => u.user_id == user_id)
    console.log(user_idx)

    if (user_idx === -1){
        response.writeHead(404, {'Content-Type': 'aplication/json'})
        response.end(JSON.stringify({message:"Pagina no encontrada"}))
        return
    }

    if (method == "GET"){
        response.writeHead(200, {'Content-Type': 'aplication/json'})
        response.end(JSON.stringify(users[user_idx]))
    }

    if (method == "PUT"){
        let body = "";
        request.on("data", chunk => {
            body += chunk.toString()
        })

        request.on("end", () => {
            response.writeHead(201, {'Content-Type': 'aplication/json'})
            const data = JSON.parse(body);
            users[user_idx]!.name = data.name
            
            response.end(JSON.stringify(users[user_idx]))
        })
        
    }

    if (method == "DELETE"){
        response.writeHead(204, {'Content-Type': 'aplication/json'})
        users.splice(user_id-1)
        response.end()
    }
}

export default { f }