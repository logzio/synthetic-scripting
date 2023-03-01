const { getHarFile } = require('./getHarFile');
const { writeFileSync } = require('fs');
const path = require('path');

const pageHandler = async (visitedUrls, count) => {
    return new Promise(async (resolve, reject) => {
        try {
            let count = 0;
            for (let i = 0; i < visitedUrls.length; i++) {
                count++;
                const result = await getHarFile(visitedUrls[i]);

                writeFileSync(
                    path.join(__dirname, '..', '..', 'tmp', `${count}.har`),
                    JSON.stringify(result),
                );
            }
            resolve(true);
        } catch (err) {
            reject(err);
        }
    });
};
module.exports = pageHandler;
