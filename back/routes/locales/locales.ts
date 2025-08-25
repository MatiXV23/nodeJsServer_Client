import { IncomingMessage, ServerResponse } from 'node:http';


export type Local = {
    local_id: number;
    name: string
}

export const locales: Local[] = 
[
    {
        local_id: 1,
        name: "Local - Salto" 
    },
    {
        local_id: 2,
        name: "Local - Montevideo" 
    },
    {
        local_id: 3,
        name: "Local - Artigas" 
    }
] 
const f = (request : IncomingMessage, response : ServerResponse<IncomingMessage>) => {
    const { method } = request

    if (method == "GET"){
        response.writeHead(200, {'Content-Type': 'aplication/json'})
        response.end(JSON.stringify(locales))
    }
}

export default { f }