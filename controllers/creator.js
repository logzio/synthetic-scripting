const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const { logger } = require('../utils/logger');
const { uploadFileOnS3 } = require('../utils/upload-to-bucket');
const { fileToZip } = require('../utils/zip-creator');
const { updateFile } = require('../utils/update-function');
const { updateFileLocal } = require('../utils/update-function-local');
const { createLambda } = require('../utils/lambda-creator');
const { cloudWatchEvent } = require('../utils/cloudWatchEvent');
const { setupCFTemplate } = require('../utils/setup-cf-template');
const { fileToZipCF } = require('../utils/zip-cf-creator');

exports.modifyFile = async (req, res) => {
    const { code } = req.body;

    try {
        const data = await updateFile(code);
        if (data.error) {
            throw Error(data.err);
        }
        res.statusCode = 201;
        res.send({ error: false, message: 'File modified' });
    } catch (err) {
        logger(err);
        res.status(400).send({ error: true, errorData: err.toString() });
    }
};

exports.createZip = async (req, res) => {
    const { name } = req.body;

    try {
        const resp = await fileToZip(name)
            .then((result) => {
                return result;
            })
            .catch((err) => err);

        if (resp.error) {
            throw Error(resp.err);
        }
        res.statusCode = 201;
        res.send({ error: false, message: 'Zip Created' });
    } catch (err) {
        logger(err);
        res.status(400).send({ error: true, errorData: err.toString() });
    }
};

exports.uploadZipToS3 = async (req, res) => {
    const { accessKey, secretKey, bucketName, name } = req.body;
    const nameZip =
        name.split(' ').length > 0 ? name.split(' ').join('-') : name;
    const fileRoute = path.join(__dirname, '..', `${nameZip}.zip`);
    try {
        const readData = fs.readFileSync(fileRoute);
        let result;
        if (readData) {
            result = await uploadFileOnS3(
                `${nameZip}.zip`,
                readData,
                accessKey,
                secretKey,
                bucketName,
            );
        } else {
            throw Error('Failed to upload data');
        }
        if (result.error) {
            throw Error(result.err);
        }
        res.statusCode = 201;
        res.send({ error: false, message: 'Upload zip to S3 Bucket' });
    } catch (err) {
        logger(err);
        res.status(400).send({ error: true, errorData: err });
    }
};

exports.createLambda = async (req, res) => {
    const {
        name,
        description,
        token,
        bucketName,
        accessKey,
        secretKey,
        region,
        listEnvVariables,
        listenerUrl,
    } = req.body;
    try {
        const lambdaResp = await createLambda(
            name,
            description,
            token,
            bucketName,
            accessKey,
            secretKey,
            region,
            listEnvVariables,
            listenerUrl,
        );
        if (lambdaResp.error) {
            throw Error(lambdaResp.err);
        }
        res.statusCode = 201;
        res.send({ error: false, message: 'Lambda was created' });
    } catch (err) {
        logger(err);
        res.status(400).send({ error: true, errorData: err });
    }
};

exports.addEventBridge = async (req, res) => {
    const { name, rangeTime, region, accessKey, secretKey } = req.body;

    try {
        const resp = await cloudWatchEvent(
            name,
            rangeTime,
            region,
            accessKey,
            secretKey,
        );
        if (resp.error) {
            throw Error(resp.err);
        }
        if (resp) {
            res.statusCode = 201;
            res.send({ error: false, message: 'Lambda was created' });
        }
    } catch (err) {
        logger(err);
        res.status(400).send({ error: true, errorData: err });
    }
};

exports.modifyFileLocally = async (req, res) => {
    const { code, token, name, listenerUrl } = req.body;

    try {
        const resp = await updateFileLocal(code);
        if (resp) {
            shell.exec(
                `node ./utils/lambdaFunctionLocal/index.js ${token} ${name} ${listenerUrl}`,
            );

            res.statusCode = 201;
            res.send({ error: false, message: 'File was created' });
        }
    } catch (err) {
        logger(err);
        res.status(400).send({ error: true, err });
    }
};

exports.createZipCF = async (req, res) => {
    const { listEnvVariables } = req.body;

    try {
        await setupCFTemplate(listEnvVariables);

        await fileToZipCF();

        const filetext = fs.readFileSync(
            path.join(__dirname, '..', 'cloudFormation.zip'),
        );

        res.status(200).send({
            img: new Buffer.from(filetext).toString('base64'),
        });
    } catch (err) {
        logger(err);
        res.status(400).send({ error: true, errorData: err });
    }
};
