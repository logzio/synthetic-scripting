const editor = ace.edit('editor');
editor.setTheme('ace/theme/monokai');
editor.session.on('changeMode', function (e, session) {
    if ('ace/mode/javascript' === session.getMode().$id) {
        if (!!session.$worker) {
            session.$worker.send('setOptions', [
                {
                    esversion: 9,
                    esnext: false,
                },
            ]);
        }
    }
});
editor.session.setMode('ace/mode/javascript');

const BASE_URL = 'http://localhost:8080';

const typeOfNotification = {
    warning: 'warning',
    success: 'success',
};

const settings = {
    notificationLoaded: '.loaded',
    notificationFailed: '.loaded-fail',
    statusName: {
        functionCreated: 'Function Created',
        zipCreated: 'Zip Created',
        zipUploaded: 'Zip Uploaded',
        lambdaCreated: 'Lambda Created',
        rangeTimeAdded: 'Range time added',
    },
    endPointUrls: {
        modifyFileUrl: '/api/modify-file',
        createZipUrl: '/api/create-zip',
        uploadZipUrl: '/api/uploadZip',
        createLambdaUrl: '/api/create-lambda',
        addEventBridgeUrl: '/api/add-eventbridge',
        modifyFileLocalUrl: '/api/modify-file-local',
        createCfZip: '/api/create-cf-zip',
    },
};

const notificationSideStatus = document.querySelector(
    '.notification-container',
);

const progressBar = document.querySelector('.bar');
const notificationFileModify = document.querySelector('.fileCreated');
const notificationZipCreate = document.querySelector('.fileZip');
const notificationZipUpload = document.querySelector('.zipUploaded');
const notificationLambdaCreate = document.querySelector('.functionCreated');
const notificationAddRange = document.querySelector('.timeoutAdded');
const inputLambdaName = document.querySelector('#name');
const inputLambdaDescription = document.querySelector('#description');
const allTabs = document.querySelectorAll('.tab-control-item');
const configForm = document.querySelector('.config-form');
const allConfigInputs = document.querySelectorAll('.config-form input');
const wrapperEnvVariables = document.querySelector(
    '.env-variables-controls-list',
);
const buttonAddEnvVariable = document.querySelector('.button-add');
const formEnvVariable = document.querySelector('.env_variables');
const generalForm = document.querySelector('.general-form');
const allGeneralInputs = document.querySelectorAll('.general-form input');

const startTestButton = document.querySelector('.submission-test');
const startTestLocallyButton = document.querySelector('.test-locally');

const downloadCFButton = document.querySelector('.download-template');

class PageBuilder {
    constructor() {
        this.awsAccessKey = null;
        this.awsSecretKey = null;
        this.awsBucketName = null;
        this.shippingToken = null;
        this.awsRegion = null;
        this.listenerUrl = null;
        this.createNewOne = null;

        this.rangeTime = 1;
        this.nameLambda = null;
        this.descriptionLambda = null;
        this.envVariableCounter = 1;
        this._listOfEnvVariables = [];
        this._listOfFields = {
            access_key: 'awsAccessKey',
            name: 'nameLambda',
            description: 'descriptionLambda',
            secret_key: 'awsSecretKey',
            bucket_name: 'awsBucketName',
            region: 'awsRegion',

            shipping_token: 'shippingToken',
            range_time: 'rangeTime',
            listener_url: 'listenerUrl',
        };
    }
    customFetch = async (bodyToSend, url) => {
        return await fetch(`${BASE_URL}${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            ...(Object.keys(bodyToSend).length > 0
                ? { body: JSON.stringify(bodyToSend) }
                : {}),
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw res;
                }
            })
            .catch((err) => {
                console.log(err);
                //display error
                return err.json();
            });
    };
    tabLogic = () => {
        allTabs.forEach((tab) => {
            tab.addEventListener('click', (e) => {
                e.stopPropagation();
                if (!e.target.classList.contains('active')) {
                    document
                        .querySelector('.tab-control-item.active')
                        .classList.remove('active');
                    e.target.classList.add('active');
                    document
                        .querySelector('.tab-body-item.active')
                        .classList.remove('active');
                    document
                        .querySelector(
                            `[isTabBody=${e.target.attributes['istab'].nodeValue}]`,
                        )
                        .classList.add('active');
                }
            });
        });
    };
    errorDisplay = (errorMessage) => {
        try {
            const errorContainer = document.querySelector('.errorStatus');
            const errorText = document.querySelector('.errorMessage');
            errorContainer.style.display = 'block';
            errorContainer.style.bottom = '10px';
            if (errorMessage.err && errorMessage.err.code) {
                errorText.textContent = `${errorMessage.err.code}: ${errorMessage.err.message}`;
            } else {
                errorText.textContent = errorMessage;
            }
            setTimeout(() => {
                errorContainer.style.bottom = '-20px';
                errorContainer.style.display = 'none';
                errorText.textContent = '';
            }, 10000);
        } catch (err) {}
    };

    displayGoodStatus = (notification, notificationNext, buttonText) => {
        if (notificationNext) {
            notificationNext.style.display = 'flex';
        }
        notification.querySelector('.title-h4-white').textContent = buttonText;
        notification.querySelector('.loading').style.display = 'none';
        notification.querySelector('.loaded').style.display = 'block';
    };
    displayFailedStatus = (notification) => {
        notification.querySelector('.loading').style.display = 'none';
        notification.querySelector('.loaded-fail').style.display = 'block';
    };
    initPage = async () => {
        document
            .querySelector('.submission-test')
            .addEventListener('click', async (e) => {
                e.preventDefault();

                notificationFileModify.style.display = 'flex';
                const responseModify = await this.customFetch(
                    { code: editor.getValue() },
                    settings.endPointUrls.modifyFileUrl,
                );
                if (!responseModify.error) {
                    this.displayGoodStatus(
                        notificationFileModify,
                        notificationZipCreate,
                        'Function Created',
                    );
                } else {
                    this.errorDisplay(responseModify.errorData);
                    this.displayFailedStatus(notificationFileModify);
                    return false;
                }
                const responseToZip = await this.customFetch(
                    { name: this.nameLambda },
                    settings.endPointUrls.createZipUrl,
                );
                if (!responseToZip.error) {
                    this.displayGoodStatus(
                        notificationZipCreate,
                        notificationZipUpload,
                        'Zip Created',
                    );
                } else {
                    this.errorDisplay(responseToZip.errorData);
                    this.displayFailedStatus(notificationZipCreate);
                    return false;
                }

                const responseUploadZip = await this.customFetch(
                    {
                        accessKey: this.awsAccessKey,
                        secretKey: this.awsSecretKey,
                        bucketName: this.awsBucketName,
                        name: this.nameLambda,
                    },
                    settings.endPointUrls.uploadZipUrl,
                );
                if (!responseUploadZip.error) {
                    this.displayGoodStatus(
                        notificationZipUpload,
                        notificationLambdaCreate,
                        'Zip Uploaded',
                    );
                    const response = await this.customFetch(
                        {
                            name: this.nameLambda,
                            description: this.descriptionLambda,
                            accessKey: this.awsAccessKey,
                            secretKey: this.awsSecretKey,
                            bucketName: this.awsBucketName,
                            token: this.shippingToken,
                            region: this.awsRegion,
                            listEnvVariables: this._listOfEnvVariables,
                            listenerUrl: this.listenerUrl,
                        },
                        settings.endPointUrls.createLambdaUrl,
                    );

                    if (!response.error) {
                        this.displayGoodStatus(
                            notificationLambdaCreate,
                            notificationAddRange,
                            'Lambda Created',
                        );
                    } else {
                        this.errorDisplay(response.errorData);
                        this.displayFailedStatus(notificationLambdaCreate);
                        return false;
                    }
                } else {
                    this.errorDisplay(responseUploadZip.errorData);
                    this.displayFailedStatus(notificationZipUpload);
                    return false;
                }
                const cloudBridgeEventResp = await this.customFetch(
                    {
                        name: this.nameLambda,
                        rangeTime: this.rangeTime,
                        accessKey: this.awsAccessKey,
                        secretKey: this.awsSecretKey,
                        region: this.awsRegion,
                    },
                    settings.endPointUrls.addEventBridgeUrl,
                );
                if (!cloudBridgeEventResp.error) {
                    this.displayGoodStatus(
                        notificationAddRange,
                        null,
                        'Range time added',
                    );
                    //update progressBar
                    this.updateProgressBar('code', 'add');
                } else {
                    this.errorDisplay(cloudBridgeEventResp.errorData);
                    this.displayFailedStatus(notificationAddRange);
                    return false;
                }
            });
    };
    setDefault = () => {
        editor.setValue(`const playwright = require('playwright-aws-lambda');
const readSendData = require('./rsData');

const handler = async () => {
	let context = null;
	let browser = null;
	try {
	browser = await playwright.launchChromium(false);
	context = await browser.newContext({
		recordHar: {
			path: './capture-hars/example.har',
			mode: 'full',
			content: 'omit',
		},
    });
	const page = await context.newPage();
	//////////////////////////////////
	//// add your code from here ////
	///////////////////////////////////
					
	///////////////////////////////////
	//// add your code to here ////
	//////////////////////////////////
				
	} catch (error) {
		throw error;
	} finally {
		if (browser) {
			await context.close();
			await browser.close();
		}
	}
	
	readSendData();
	return true;
};`);
    };
    disableButtonConfig = () => {
        allConfigInputs.forEach((input) => {
            input.addEventListener('input', (e) => {
                if (startTestButton.disabled === false) {
                    startTestButton.disabled = true;
                }
            });
        });
    };
    configFormHandler = () => {
        configForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const {
                access_key,
                secret_key,
                bucket_name,

                region,
            } = e.target;

            if (
                access_key.value === '' ||
                secret_key.value === '' ||
                bucket_name.value === '' ||
                region.value === ''
            ) {
                startTestButton.disabled = true;
                this.addNotification(
                    'Please fill all the fields in Config Form',
                    typeOfNotification.warning,
                );
            } else {
                this.awsAccessKey = access_key.value;
                this.awsBucketName = bucket_name.value;
                this.awsSecretKey = secret_key.value;
                this.awsRegion = region.value;

                startTestButton.disabled = false;
                this.addNotification(
                    'AWS configuration submitted',
                    typeOfNotification.success,
                );
                this.updateProgressBar('general', 'add');
            }
        });
    };
    generalFormHandler = () => {
        generalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const {
                name,
                description,
                range_time,
                shipping_token,
                listener_url,
            } = e.target;

            if (
                name.value === '' ||
                description.value === '' ||
                listener_url.value === '' ||
                shipping_token.value === ''
            ) {
                startTestButton.disabled = true;
                this.addNotification(
                    'Please fill all the fields in General Form',
                    typeOfNotification.warning,
                );
            } else {
                this.nameLambda = name.value;
                this.descriptionLambda = description.value;
                this.rangeTime = range_time.value;
                this.shippingToken = shipping_token.value;
                this.listenerUrl = listener_url.value;
                this.addNotification(
                    'General Form submitted',
                    typeOfNotification.success,
                );
                this.updateProgressBar('aws', 'add');
                startTestLocallyButton.disabled = false;
                // startTestButton.disabled = false;
            }
        });
    };
    init = () => {
        this.initPage();
        this.submitEnvVariables();
        this.envVariablesAddButton();
        this.onInputUpdate();
        this.tabLogic();
        this.testLocal();
        this.configFormHandler();
        this.generalFormHandler();

        this.setDefault();
        this.downloadCFTemplate();
        // this.onChangeEditor();
    };
    testLocal = async () => {
        startTestLocallyButton.addEventListener('click', async (e) => {
            const responseLocal = await this.customFetch(
                {
                    code: editor.getValue(),
                    token: document.querySelector('#shipping_token').value,
                    name: this.nameLambda,
                    listenerUrl: document.querySelector('#listener_url').value,
                },
                settings.endPointUrls.modifyFileLocalUrl,
            );
            if (!responseLocal.error) {
                this.addNotification(
                    'Local Test successfuly ended',
                    typeOfNotification.success,
                );
            } else {
                this.addNotification(
                    'Something went wrong please check data what you provided',
                    typeOfNotification.warning,
                );
                this.errorDisplay(responseLocal.errorData);
                return false;
            }
        });
    };
    onInputUpdate = () => {
        const keysArr = Object.keys(this._listOfFields);
        keysArr.forEach((key) => {
            document
                .querySelector(`[name='${key}']`)
                .addEventListener('input', (e) => {
                    this[this._listOfFields[key]] = e.target.value;
                });
        });
    };
    validationFields = () => {};

    createEnvVariable = (id) => {
        const buttonAdd = document.createElement('div');
        buttonAdd.classList.add('button-add');
        buttonAdd.addEventListener('click', this.buttonAddClickHandler);
        buttonAdd.setAttribute('envVariable', id);
        const iconDiv = document.createElement('div');
        iconDiv.classList.add('icon_plus');
        const iconEl = document.createElement('p');
        iconEl.classList.add('icon-content');
        iconEl.textContent = '+';
        iconDiv.appendChild(iconEl);
        buttonAdd.appendChild(iconDiv);
        const divFormControlVarialbe = document.createElement('div');
        divFormControlVarialbe.classList.add('form-control-variable');
        const divControlKey = this.createInputField(
            id,
            'form-control-key',
            'Key',
        );
        const divControlValue = this.createInputField(
            id,
            'form-control-value',
            'Value',
        );

        divFormControlVarialbe.appendChild(divControlKey);
        divFormControlVarialbe.appendChild(divControlValue);
        divFormControlVarialbe.appendChild(buttonAdd);

        wrapperEnvVariables.appendChild(divFormControlVarialbe);
    };
    createInputField = (id, classWrapper, labelContent) => {
        const divWrapper = document.createElement('div');

        divWrapper.classList.add(classWrapper);
        const labelControl = document.createElement('label');
        labelControl.textContent = labelContent;
        labelControl.classList.add('form_label_variable');

        const inputControl = document.createElement('input');
        inputControl.setAttribute('id', `${labelContent.toLowerCase()}_${id}`);
        inputControl.setAttribute(
            'name',
            `${labelContent.toLowerCase()}_${id}`,
        );
        inputControl.classList.add('form_input_variable');

        divWrapper.appendChild(labelControl);
        divWrapper.appendChild(inputControl);
        return divWrapper;
    };
    buttonAddClickHandler = (e) => {
        const inputEnvKey = document.querySelector(
            `[name='key_${this.envVariableCounter}']`,
        ).value;
        const inputEnvValue = document.querySelector(
            `[name='value_${this.envVariableCounter}']`,
        ).value;
        if (inputEnvKey === '') {
            this.errorDisplay('Please fill input Key');
            return;
        }
        if (inputEnvValue === '') {
            this.errorDisplay('Please fill input Value');
            return;
        }
        this.addNotification(
            `Key: ${inputEnvKey} with Value: ${inputEnvValue} added to Lambda configuration`,
            typeOfNotification.success,
        );
        this._listOfEnvVariables.push({
            [inputEnvKey]: inputEnvValue,
        });
        this.envVariableCounter = this.envVariableCounter + 1;
        this.createEnvVariable(this.envVariableCounter);
    };
    envVariablesAddButton = () => {
        document
            .querySelector('.button-add')
            .addEventListener('click', this.buttonAddClickHandler);
    };
    submitEnvVariables = () => {
        formEnvVariable.addEventListener('submit', (e) => {
            e.preventDefault();

            this.addNotification(
                `Enviroment variables added to the lambda function.`,
                typeOfNotification.success,
            );
        });
    };

    addNotification = (message, type) => {
        const divNotification = document.createElement('div');
        divNotification.classList.add('notification-message');
        divNotification.classList.add(type);
        const elementParagraph = document.createElement('p');
        elementParagraph.textContent = message;
        elementParagraph.classList.add('notification-message-element');

        divNotification.appendChild(elementParagraph);
        notificationSideStatus.appendChild(divNotification);

        setTimeout(() => {
            divNotification.remove();
        }, 10000);
        // <div class="notification-message success">
        // 	<p class="notification-message-element">Submitted General Form </p>
        // </div>
        // clearTimeout(displayMessageRight);
    };

    updateProgressBar = (step, status) => {
        switch (step) {
            case 'general':
                progressBar.style.width = `${
                    +progressBar.style.width.replace('%', '') + 33
                }%`;
                break;
            case 'aws':
                progressBar.style.width = `${
                    +progressBar.style.width.replace('%', '') + 33
                }%`;
                break;
            case 'code':
                progressBar.style.width = `${
                    +progressBar.style.width.replace('%', '') + 34
                }%`;
                break;
            default:
                progressBar.style.width = 0;
        }
    };
    downloadCFTemplate = async () => {
        downloadCFButton.addEventListener('click', async (e) => {
            e.preventDefault();

            notificationFileModify.style.display = 'flex';
            const responseModify = await this.customFetch(
                { code: editor.getValue() },
                settings.endPointUrls.modifyFileUrl,
            );
            if (!responseModify.error) {
                this.displayGoodStatus(
                    notificationFileModify,
                    notificationZipCreate,
                    'Function Created',
                );
            } else {
                this.errorDisplay(responseModify.errorData);
                this.displayFailedStatus(notificationFileModify);
                return false;
            }
            const responseToZip = await this.customFetch(
                { name: this.nameLambda, envList: this._listOfEnvVariables },
                settings.endPointUrls.createCfZip,
            );

            if (!responseToZip.error) {
                this.displayGoodStatus(
                    notificationZipCreate,
                    null,
                    'Zip Downloaded',
                );
                this.downloadZip(responseToZip.zip);
            } else {
                this.errorDisplay(responseToZip.errorData);
                this.displayFailedStatus(notificationZipCreate);
                return false;
            }
        });
    };
    downloadZip = (zip) => {
        let elem = window.document.createElement('a');
        elem.href = 'data:application/zip;base64,' + zip;
        elem.download = 'cloudFormation.zip';
        document.body.appendChild(elem);
        elem.click();
        document.body.removeChild(elem);
    };
}

const pageBuilder = new PageBuilder();
pageBuilder.init();
