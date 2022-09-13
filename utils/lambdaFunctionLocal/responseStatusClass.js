const createResponseStatusClass = (responseStatus) => {
    return `${responseStatus.split('')[0]}xx`;
};

module.exports = createResponseStatusClass;
