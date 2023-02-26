const { getHarFile } = require('./getHarFile');
const { writeFileSync } = require('fs');
const path = require('path');

module.exports = pageHandler = async (page, count) => {
    const result = await getHarFile(page.url());
    if (count) {
        writeFileSync(
            path.join(__dirname, '..', '..', 'tmp', `${count}.har`),
            JSON.stringify(result),
        );
    } else {
        return harObject;
    }
};
