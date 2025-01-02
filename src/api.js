export const apiRequest = ({url, method = 'GET',headers = {}, body = null}) => {
    const defHeader = {
        'Content-Type': 'application/json',
        ...headers
    }

    const options = {
        method,
        headers: defHeader,
        body : body ? JSON.stringify(body) : null
    };

    const request = fetch(url, options).then(response => {
        if (!response.ok){
            throw new Error (`Error ${response.status}`);
        }

        return response.json();
    }).catch (err => {
        console.error('An error occured:' + err);
        throw err;
    })

};