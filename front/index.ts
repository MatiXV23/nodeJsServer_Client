export const baseUrl = "http://localhost:3000"

await getUsers()
await postUser("Matias")
await getUsers()
await getUserById(1)
await putUserById(1, "Pedro")
await postUser("Matias")
await getUsers()
await deleteUser(2)
await getUsers()
await noRuth()

async function noRuth(){
    const options : RequestInit = { method: "GET"} 
    try{
        const response = await fetch(baseUrl+"/home", options)
        const body = await response.json()
        console.log("Status Code:",response.status, body)
    } catch (error:any) {
        console.log(error)
    }
}


async function getUsers(){
    const options : RequestInit = { method: "GET"} 
    try{
        const reponse = await fetch(baseUrl+"/usuarios", options)
        const body = await reponse.json()
        console.log(body)
    } catch (error:any) {
        console.log(error)
    }
}

async function postUser(name:string){
    const options : RequestInit = { 
        method: "POST",
        body: JSON.stringify({name:`${name}`})
    } 
    try{
        const reponse = await fetch(baseUrl+"/usuarios", options)
        const body = await reponse.json()
        console.log(body)
    } catch (error:any) {
        console.log(error)
    }
}

async function getUserById(user_id) {
    const options : RequestInit = { method: "GET"} 
    try{
        const reponse = await fetch(baseUrl+`/usuarios/${user_id}`, options)
        const body = await reponse.json()
        console.log(body)
    } catch (error:any) {
        console.log(error)
    }
}

async function putUserById(user_id, name) {
    const options : RequestInit = { 
        method: "PUT",
        body: JSON.stringify({name:`${name}`})
    } 
    try{
        const reponse = await fetch(baseUrl+`/usuarios/${user_id}`, options)
        const body = await reponse.json()
        console.log(body)
    } catch (error:any) {
        console.log(error)
    }
}

async function deleteUser(user_id) {
    const options : RequestInit = { 
        method: "DELETE"
    } 
    try{
        const response = await fetch(baseUrl+`/usuarios/${user_id}`, options)
        if (response.status !== 204) console.log(await response.json())
    } catch (error:any) {
        console.log(error)
    }
}
export default {}