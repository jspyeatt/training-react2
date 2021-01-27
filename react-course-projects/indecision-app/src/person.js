export const isAdult = (age) => {
    return age >= 18;
}
export const canDrink = (age) => {
    return age >= 21;
}

const isSenior = (age) => {
    return age >= 65;
}
export default isSenior;