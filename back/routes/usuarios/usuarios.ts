import { IncomingMessage, ServerResponse } from 'node:http';


let user_id = 0
export type User = {
    user_id: number;
    name: string
}

export const users: User[] = [] 
const f = (request : IncomingMessage, response : ServerResponse<IncomingMessage>) => {
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

export default { f }