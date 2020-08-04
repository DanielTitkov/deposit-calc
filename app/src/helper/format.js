const asMoney = (n) => {
    return parseFloat(n).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1 ").replace('.', ',');
}

const asPerc = (n) => {
    return n * 100 + "%"
}

export const asFormat = (n, format) => {
    const formats = {
        money: asMoney,
        perc: asPerc,
    }

    return formats[format] ? formats[format](n) : n 
}