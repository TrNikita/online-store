export function letters(name) {
    const userNameArr = name.split(' ');
    return userNameArr.length === 2
        ? userNameArr[0][0] + userNameArr[1][0]
        : userNameArr[0][0];
}
