const baseUrl = "http://localhost:3000"
await getLocalidad(1)
await getLocalidad(2)
await getLocales()

async function getLocales(){
    const options : RequestInit = { method: "GET"} 
    try{
        const response = await fetch(baseUrl+"/locales", options)
        const body = await response.json()
        console.log("Status Code:",response.status, body)
    } catch (error:any) {
        console.log(error)
    }
}

async function getLocalidad(user_id: number){
    const options : RequestInit = { method: "GET"} 
    try{
        const response = await fetch(baseUrl+`/usuarios/${user_id}/localidad`, options)
        const body = await response.json()
        console.log("Status Code:",response.status, body)
    } catch (error:any) {
        console.log(error)
    }
}

export default {}