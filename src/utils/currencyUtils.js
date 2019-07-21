/**
 * Rounds currency to the nearest cent.
 * @param {*} amount
 * @returns {Float}
 */
export function roundCurrency(amount) {
    const isNumber = typeof amount === 'number';

    if (isNumber) {
        return Math.round(amount * 100) / 100;
    }

    return Math.round(parseFloat(amount, 10) * 100) / 100;
}
