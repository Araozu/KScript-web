/*
 * Modificador es una función que toma como parametros datos de la linea,
 * y devuelve una nueva linea y una posicion para el cursor
 *
 * modificadores: [
 *      string {linea: string, posicionCursor: number}
 *      -> {linea: string, posicion: number}
 * ]
 *
 * Parametros: {
 *      linea: string           -  La linea donde se introdujo un caracter
 *      posicionCursor: number  -  La posicion en la que está el cursor
 * }
 *
 * Retorno: string              -  La nueva linea con las modificaciones hechas
 *
 */

export const modificadorComilla = (
    {
        linea,
        posicionCursor
    }
) => {
    const nuevoCaracter = "\"";

    const lineaArr = linea.split("");

    if (lineaArr[posicionCursor] === "\"") {
        lineaArr.splice(posicionCursor, 1);
        return lineaArr.join("");
    }

    lineaArr.splice(posicionCursor, 0, nuevoCaracter);

    return lineaArr.join("");
};

export const modificadorParentesisAb = (
    {
        linea,
        posicionCursor
    }
) => {
    const lineaArr = linea.split("");

    lineaArr.splice(posicionCursor, 0, ")");

    return lineaArr.join("");
};

export const modificadorParentesisCer = (
    {
        linea,
        posicionCursor
    }
) => {
    const lineaArr = linea.split("");

    if (lineaArr[posicionCursor] === ")") {
        lineaArr.splice(posicionCursor, 1);
        return lineaArr.join("");
    }

    return linea;
};

export const modificadorLlaveAb = (
    {
        linea,
        posicionCursor
    }
) => {
    const lineaArr = linea.split("");

    lineaArr.splice(posicionCursor, 0, "}");

    return lineaArr.join("");
};

export const modificadorLlaveCer = (
    {
        linea,
        posicionCursor
    }
) => {
    const lineaArr = linea.split("");

    if (lineaArr[posicionCursor] === "}") {
        lineaArr.splice(posicionCursor, 1);
        return lineaArr.join("");
    }

    return linea;
};

export const modificadorCorcheteAb = (
    {
        linea,
        posicionCursor
    }
) => {
    const lineaArr = linea.split("");

    lineaArr.splice(posicionCursor, 0, "]");

    return lineaArr.join("");
};

export const modificadorCorcheteCer = (
    {
        linea,
        posicionCursor
    }
) => {
    const lineaArr = linea.split("");

    if (lineaArr[posicionCursor] === "]") {
        lineaArr.splice(posicionCursor, 1);
        return lineaArr.join("");
    }

    return linea;
};

