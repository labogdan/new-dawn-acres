import axios from 'axios'

axios.defaults.headers.common = {
    "Content-Type": "application/json"
}

const baseUrl = 'feed/users'

/* type user = {
    first_name: string,
    last_name: string,
    age: number,
    grade: number
} */

// type user = [string, string, number, number]

const getAllAUsers = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const createUser = (user: any) => {
    const request = axios.post('feed/user', user)
    return request.then(response => {
        console.log('this got sent back from the backend', response)
        return response.data
    })

}

export default { getAllAUsers, createUser }
