const BigNumber = (num: number): string => {
    const array = num.toString().split('');
    array.reverse();
    const bigNum: string[] = [];
    for (let i = 0; i < array.length; i++) {
        if (i > 0 && i % 3 == 0) bigNum.push(' ');
        bigNum.push(array[i]);
    }
    return bigNum.reverse().join('');
}
export default BigNumber;