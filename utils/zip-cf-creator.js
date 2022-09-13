const fs = require('fs');
const archiver = require('archiver');
const path = require('path');
const { logger } = require('./logger');

const sourceDir = path.join(__dirname, '..', 'service', 'lambdaFunction');
const sourceDirCF = path.join(__dirname, '..', 'output');

const compressLambdaFunction = async () => {
    const outPath = path.join(__dirname, '..', 'output', 'lambdaFunction.zip');

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

exports.fileToZipCF = async () => {
    const outPathCF = path.join(__dirname, '..', `cloudFormation.zip`);

    try {
        const archive = archiver('zip', { zlib: { level: 9 } });
        const streamCF = fs.createWriteStream(outPathCF);

        const lambdaZip = await compressLambdaFunction();

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
