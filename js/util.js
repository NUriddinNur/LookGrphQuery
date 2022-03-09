const API = 'https://look-graphql-backend.herokuapp.com/graphql'
const API_IMG = 'https://look-graphql-backend.herokuapp.com/'


async function request(query, variables){
    try {
        const response = await fetch(API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query,
                variables
            })
        })
        const {data} = await response.json()
        return data
    }catch(error) {
        alert(error.message)
    }
}

function creatElements(...args){
    return args.map(el => document.createElement(el))
}