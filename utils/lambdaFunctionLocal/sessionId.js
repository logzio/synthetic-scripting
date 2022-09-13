const crypto = require('crypto');
const uuid = require('node-uuid');

const createSessionId = () => {
    return crypto
        .createHash('sha256')
        .update(uuid.v1())
        .update(crypto.randomBytes(256))
        .digest('hex');
};

module.exports = createSessionId;
