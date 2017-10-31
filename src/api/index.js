import qs from 'qs'

export default {
    async search(q) {
        return fetch(
            `http://127.0.0.1:5000/search?${qs.stringify({q: encodeURIComponent(q), count: 10})}`,
        {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        })
    },

    async request(q) {
        console.log({count: 10, ...q})

        return fetch(
            `http://127.0.0.1:5000/search?${qs.stringify({count: 10, ...q, q: encodeURIComponent(q.q)})}`,
        {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        })
    }
}