import { IncomingMessage, ServerResponse } from 'node:http';
import route from './routes/imports.ts'

// HANDLER CREADO PARA LA MEJOR FACILIDAD A LA HORA DE DIRECCIONAR URLS CON SU RUTA

type PathRoute  = {
    path: string,
    function: Function
    childs?: PathRoute[]
}


// UNICAMENTE AGREGAR UN OBJETO TIPO (PathRoute) AQUI, SI SE ESPERA UNA VARIABLE EN LA URL COLOCAR EL NOMBRE DENTRO DE {{}}
const pathRoutes: PathRoute[] = 
[
    {
        path: "/usuarios",
        function: route.usuarios.f,
        childs: [
            {
                path: "/{{user_id}}",
                function: route.user_id.f,
                childs: [
                    {
                        path: "/localidad",
                        function: route.localidad.f
                    }
                ]
            }
        ]
    },
    
    {
        path: "/locales",
        function: route.locales.f
    }
]


export const handler = (request : IncomingMessage, response : ServerResponse<IncomingMessage>) => {
    const { url } = request;

    matchRoutes(pathRoutes, url!, request, response)
    return 
}



function matchRoutes(routes: PathRoute[], url: string, request : IncomingMessage, response : ServerResponse<IncomingMessage>){
    const match:any = matcher(routes, url, request, response)
    if (match) return

    response.writeHead(404, {'Content-Type': 'aplication/json'})
    response.end(JSON.stringify({message:"Pagina no encontrada"}))
}

function matcher(routes: PathRoute[], url: string, request : IncomingMessage, response : ServerResponse<IncomingMessage>, fatherPath?: string,){
    for (const route of routes) {
        let path = (fatherPath??"") +route.path
        let match = matchRoute(path, url)
        if (match.matched){
            callRouthFunction(route.function, match.params, request, response)
            return true
        }
        if (route.childs) {
            let childMatch: boolean = matcher(route.childs, url, request, response, path)
            if (childMatch) return true
        }
    }
    return false
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