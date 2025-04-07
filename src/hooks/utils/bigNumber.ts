const BigNumber = (num: number | string | undefined): string => {
    if (num !== undefined) {
        const strNum = num.toString();
        const array = strNum.split('');
        array.reverse();
        const bigNum: string[] = [];
        for (let i = 0; i < array.length; i++) {
            if (i > 0 && i % 3 === 0) bigNum.push(' ');
            bigNum.push(array[i]);
        }
        return bigNum.reverse().join('');
    }
    return '';
};

export default BigNumber;