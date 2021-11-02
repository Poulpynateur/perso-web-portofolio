let beforeSend = null;
let onError = null;

function request(http, path, data, headers = {})
{
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                let resp;
                try {
                    resp = JSON.parse(xhr.responseText);
                }
                catch(err) {
                    resp = xhr.response
                }

                if (Math.floor(xhr.status / 100) == 2) {
                    resolve(resp);
                } else {
                    if (onError) onError(xhr, resp);
                    reject(resp);
                }
            }
        };
        xhr.open(http, path);
        xhr.withCredentials = true;
        xhr.setRequestHeader('Content-Type', 'application/json');

        for (const prop in headers)
        {
            xhr.setRequestHeader(prop, headers[prop]);
        }

        if (beforeSend) beforeSend(xhr);

        if (data) xhr.send(JSON.stringify(data));
        else xhr.send();
    });
}

module.exports = {
    request,
    setBeforeSend(func) {
        beforeSend = func;
    }, 
    setOnError(func) {
        onError = func;
    }
};