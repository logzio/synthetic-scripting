const fs = require('fs');
const archiver = require('archiver');
const path = require('path');
const { logger } = require('./logger');

const sourceDir = path.join(__dirname, '..', 'service', 'lambdaFunction');
const sourceDirCF = path.join(__dirname, '..', 'output');

const compressLambdaFunction = async (name) => {
    const zipNameString = `${name.replace(/[^a-zA-Z0-9 ]/g, '')}.zip`;

    const outPath = path.join(__dirname, '..', 'output', zipNameString);

    const archive = archiver('zip', { zlib: { level: 9 } });
    const stream = fs.createWriteStream(outPath);
    return new Promise((resolve, reject) => {
        try {
            archive
                .directory(sourceDir, false)
                .on('error', (err) => {
                    logger(err);
                    return reject({
                        error: true,
                        err,
                    });
                })
                .pipe(stream);

            stream.on('close', () =>
                resolve({ error: false, message: 'Zip Created' }),
            );
            archive.finalize();
        } catch (err) {
            logger(err);

            reject({
                error: true,
                err,
            });
        }
    });
};

exports.fileToZipCF = async (name) => {
    const outPathCF = path.join(__dirname, '..', `cloudFormation.zip`);

    try {
        const archive = archiver('zip', { zlib: { level: 9 } });
        const streamCF = fs.createWriteStream(outPathCF);

        const lambdaZip = await compressLambdaFunction(name);

        if (lambdaZip.message != 'Zip Created') {
            throw lambdaZip.err;
        }
        return new Promise((resolve, reject) => {
            try {
                archive
                    .directory(sourceDirCF, false)
                    .on('error', (err) => {
                        return reject({
                            error: true,
                            err,
                        });
                    })
                    .pipe(streamCF);

                streamCF.on('close', () =>
                    resolve({ error: false, message: 'Zip Created' }),
                );
                archive.finalize();
            } catch (err) {
                logger(err);

                reject({
                    error: true,
                    err,
                });
            }
        });
    } catch (err) {
        logger(err);
        return {
            error: true,
            err,
        };
    }
};
