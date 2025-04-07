import { useMemo } from 'react';

const useNumberFormatter = (num: number) => {
    const formattedNumber = useMemo(() => {
        if (num >= 1000000000) {
            return (num / 1000000000).toFixed(1) + ' млрд';
        } else if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + ' млн';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + ' тыс'; 
        } else {
            return num; 
        }
    }, [num]);

    return formattedNumber;
};

export default useNumberFormatter;
