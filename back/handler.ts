import { IncomingMessage, ServerResponse } from 'node:http';
import route from './routes/imports.ts'

// HANDLER CREADO PARA LA MEJOR FACILIDAD A LA HORA DE DIRECCIONAR URLS CON SU RUTA

type PathRoute  = {
    path: string,
    function: Function
}


// UNICAMENTE AGREGAR UN OBJETO TIPO (PathRoute) AQUI, SI SE ESPERA UNA VARIABLE EN LA URL COLOCAR EL NOMBRE DENTRO DE {{}}
const pathRoutes: PathRoute[] = 
[
    {
        path: "/usuarios",
        function: route.usuarios.f
    },
    {
        path: "/usuarios/{{user_id}}",
        function: route.user_id.f
    }
]


export const handler = (request : IncomingMessage, response : ServerResponse<IncomingMessage>) => {
    const { url } = request;
    console.log(url)

    return matchRoutes(url!, request, response)
}



function matchRoutes(url: string, request : IncomingMessage, response : ServerResponse<IncomingMessage>){
    for (const route of pathRoutes) {
        let match = matchRoute(route.path, url)
        if (match.matched){
            return callRouthFunction(route.function, match.params, request, response)
        }
    }
    response.writeHead(404, {'Content-Type': 'aplication/json'})
    response.end(JSON.stringify({message:"Pagina no encontrada"}))
}


function callRouthFunction(f: Function, params: Record<string, string>, request: IncomingMessage, response: ServerResponse<IncomingMessage>){
    if (Object.keys(params).length === 0) return f(request, response)
    return f(params, request, response)
}



type MatchResult = {
  matched: boolean;
  params: Record<string, string>;
};


function matchRoute(pathPattern: string, url: string): MatchResult {
  // Crea un patron de re y donde busca y reemplaza los valres dentro de {{var}} para, al intentar matchear con la url, pueda guardar los valores de las variables

  const rePattern = pathPattern.replace(/{{(\w+)}}/g, (_, key) => `(?<${key}>[^/]+)`);
  const re = new RegExp(`^${rePattern}$`);
  

  // Verifica si matchea con la url este nuevo 
  const match = url.match(re);

  return {
    matched: !!match,
    params: match?.groups ?? {},
  };
}