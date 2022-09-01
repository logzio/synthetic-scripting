const { SUCCESS_MESSAGE } = require('../constants');

const statusErrorHandler = (err = '') => {
    let status;
    if (err) {
        const arrErr = err.split('\n');
        if (arrErr.length > 1) {
            status = arrErr
                .map((message) => (message.split('')[0] !== '=' ? message : ''))
                .join(' ');
        } else {
            status = arrErr[0];
        }
    } else {
        status = SUCCESS_MESSAGE;
    }

    return status;
};

module.exports = statusErrorHandler;
