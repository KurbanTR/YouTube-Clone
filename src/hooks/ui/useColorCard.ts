const useColorCard = ({ index = 5 }) => {
    const generateColorFromIndex = (index: number) => {
        const r = Math.floor((index * 30) % 256);
        const g = Math.floor((index * 60) % 256);
        const b = Math.floor((index * 90) % 256);
        return `rgb(${r}, ${g}, ${b})`;
    };

    // Генерация цвета с прозрачностью 50%
    const color = `${generateColorFromIndex(index).replace('rgb', 'rgba').replace(')', ', .2)')}`;

    return { color };
}

export default useColorCard;
