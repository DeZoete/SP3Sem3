import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 16px;
}

#root {
    width: 100%;
    height: 100%;
    display: contents;
}

:root {
    font-size: 18px;
    --text-color-light: black;
    --text-color-dark: white;
    --small-device: 640px;
    --medium-device: 968px;

}

/* Wireframe */

body {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid red;
    width: 100%;
}

header {
    padding: 1rem;
    width: 100%;
    max-width: var(--small-device);
    border-bottom: 1px solid silver;
}

main {
    padding: 2rem 1rem;
    width: 100%;
    max-width: var(--small-device);
    min-height: 80vh;
}

footer {
    padding: 1rem;
    width: 100%;
    max-width: var(--small-device);
    display: flex;
    justify-content: space-evenly;
    border-top: 1px solid silver;

}

h1 {
    font-size: 2rem;
    color: var(--text-color-light)
}

h2 {
    font-size: 1.5rem;
}

p { font-size: 1rem;}

`;

export default GlobalStyle;
