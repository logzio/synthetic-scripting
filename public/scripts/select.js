class Select {
    constructor(parameters, rootClassName) {
        this.parameters = parameters;
        this.rootClassName = rootClassName;
    }
    renderSelect = () => {};

    openClose = () => {};

    onClickHandler = () => {};

    onChange = () => {};

    init = () => {};
}

const select = new Select(
    [
        { name: 'Playwright', default: true },
        { name: 'Selenium', default: false },
        { name: 'Pupeeter', default: false },
    ],
    'select-code-snippet',
);
