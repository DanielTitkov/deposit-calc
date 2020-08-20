export const asMoney = (n) => {
    return parseFloat(n).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, String.fromCharCode(160)).replace('.', ',');
}

export const asPerc = (n) => {
    return n * 100 + "%"
}

export const asFormat = (n, format) => {
    const formats = {
        money: asMoney,
        perc: asPerc,
    }
    const result = formats[format] ? formats[format](n) : n

    return String(result);
}