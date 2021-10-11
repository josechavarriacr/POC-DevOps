import axios from 'axios'

const ApiToolsDeleteFn = (id, data) => {
        const newdata = data.filter((item) => item.id !== id)
        return newdata
}

const ApiToolsLoadAxios = () => {
    return new Promise((resolve) => {
        const URL = 'https://jsonplaceholder.typicode.com/users'
        axios.get(URL).then((resp) => {
            const data = []
            const dataAxios = resp.data

            dataAxios.map((item) => {
                return data.push({
                    id: item.id,
                    name: item.name.split(' ')[0],
                    lastname: item.name.split(' ')[1],
                    email: item.email,
                    admin: Math.random() < 0.5,
                    language: 'ES',
                })
            })
            resolve(data)
        })
    })
}

export { ApiToolsLoadAxios, ApiToolsDeleteFn }
