import { useMemo } from 'react';

const useTrimText = ({ text = '', maxLength = 70 }) => {
    const trimText = useMemo(() => {
        if (text.length <= maxLength) return text;

        const trimmed = text.slice(0, maxLength);
        const lastSpaceIndex = trimmed.lastIndexOf(' ');

        if (lastSpaceIndex === -1) {
            return trimmed + '...';
        }

        return trimmed.slice(0, lastSpaceIndex) + '...';
    }, [text, maxLength]);

    return { trimText };
};

export default useTrimText;
