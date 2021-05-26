function getPostData(req) {
    return new Promise((resolve, reject) => {
        try {
            let body = '';
            req.on('data', (chunk) => {
                body += chunk.toString();
            });
            req.on('end', () => {
                resolve(body);
            });
        } catch (error) {
            reject(error);
        }
    });
}

function between(min, max) {
    return Math.floor(
        Math.random() * (max - min) + min
    )
}

module.exports = { getPostData, between };