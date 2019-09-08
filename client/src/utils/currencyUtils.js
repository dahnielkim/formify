/**
 * Rounds currency to the nearest cent.
 * @param {*} amount
 * @returns {Float}
 */
export function roundCurrency(amount) {
    if (typeof amount === 'number') {
        return Math.round(amount * 100) / 100;
    }

    return Math.round(parseFloat(amount, 10) * 100) / 100;
}
