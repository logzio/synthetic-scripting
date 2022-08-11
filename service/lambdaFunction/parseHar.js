const convertNameValueArraysToObject = (headers) => {
    const obj = {};
    for (const item of headers) {
        if (item.name.charAt(0) !== ':') {
            obj[item.name] = item.value;
        }
    }

    return obj;
};

const parsePostData = (postData) => {
    if (!postData) {
        return {};
    }

    if (postData.mimeType === 'application/json') {
        return JSON.parse(postData.text);
    }

    return postData.text;
};

const parseHarFile = (fileContents) => {
    // Read file from filepath

    try {
        const harJson = fileContents;
        const harRequest = harJson.log.entries.map((entry) => ({
            method: entry.request.method,
            url: entry.request.url,
            headers: convertNameValueArraysToObject(entry.request.headers),
            params: convertNameValueArraysToObject(entry.request.queryString),
            body: parsePostData(entry.request.postData),
        }));

        const harConfig = {
            probes: [
                {
                    requests: harRequest,
                },
            ],
        };

        return harConfig;
    } catch (error) {
        if (error.name === 'SyntaxError') {
            throw new Error('Har file is in invalid JSON format!');
        }

        throw new Error(error.message);
    }
};
module.exports = parseHarFile;
