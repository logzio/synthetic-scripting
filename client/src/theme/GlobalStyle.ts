import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
* {
    box-sizing: border-box;
    margin: 0;

}

html,
body {
    height: 100%;

    box-sizing: border-box;
    margin: 0;
    font-family: 'Roboto', sans-serif;
    background: rgb(231, 231, 231) 30%;
}
#root {
    height: 100%;
}
.body_wrapper {
    box-sizing: border-box;
}
@keyframes pulse-dot {
    0% {
        transform: scale(2);
        opacity: 0.7;
    }
    30% {
        transform: scale(1);
        opacity: 1;
    }
    50% {
        transform: scale(0.8);
        opacity: 1;
    }
    70% {
        transform: scale(1.2);
        opacity: 1;
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}
`;

export default GlobalStyle;