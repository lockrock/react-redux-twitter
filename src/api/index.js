import qs from 'qs'

export default {
    async search(query) {
        console.log(query)
        console.log(qs.stringify(query))
        return fetch(
            `http://127.0.0.1:5000/search?${qs.stringify(query)}`,
        {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        })
    }
}