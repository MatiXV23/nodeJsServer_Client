import { IncomingMessage, ServerResponse } from 'node:http';


let user_id = 0
type User = {
    user_id: number;
    name: string
}

const users: User[] = [] 
const handleUsers = (request : IncomingMessage, response : ServerResponse<IncomingMessage>) => {
    const { method } = request

    if (method == "GET"){
        response.writeHead(200, {'Content-Type': 'aplication/json'})
        response.end(JSON.stringify(users))
    }

    if (method == "POST"){
        let body = "";
        request.on("data", chunk => {
            body += chunk.toString()
        })

        request.on("end", () => {
            response.writeHead(201, {'Content-Type': 'aplication/json'})
            const new_user = JSON.parse(body);
            user_id++
            new_user.user_id = user_id;
            users.push(new_user);
            response.end(JSON.stringify(new_user))
        })
        
    }


}


const handleUser = (user_id: number, request : IncomingMessage, response : ServerResponse<IncomingMessage>) => {
    const { method } = request

    if (!users) {
        response.writeHead(404, {'Content-Type': 'aplication/json'})
        response.end(JSON.stringify({message:"Pagina no encontrada"}))
    }

    const user_idx = users.findIndex(u => u.user_id === user_id)


    if (method == "GET"){
        response.writeHead(200, {'Content-Type': 'aplication/json'})
        response.end(JSON.stringify(users[user_id-1]))
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

export default { handleUser, handleUsers}