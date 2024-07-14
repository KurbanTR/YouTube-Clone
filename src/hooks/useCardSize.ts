import { useEffect, useState } from "react";

const useCardSize = () => {
    const [cardWidth, setCardWidth] = useState<number>(0);
    const [cardHeight, setCardHeight] = useState<number>(0);
    const [currentWidth, setCurrentWidth] = useState<number>(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setCurrentWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        
        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        const newWidth = (currentWidth - 70 - 20) / 3;
        setCardWidth(newWidth);
        setCardHeight(newWidth / 1.77);
    }, [currentWidth]);
    return {cardWidth, cardHeight}
}

export const useSize = () => {
    const [cardWidth, setCardWidth] = useState(0);
    const [cardHeight, setCardHeight] = useState(0);
    const [currentWidth, setCurrentWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setCurrentWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        
        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
            const newWidth = (currentWidth - 70 - 20) / 3;
            setCardWidth(newWidth);
            setCardHeight(newWidth/2);
    }, [currentWidth]);
    return {cardWidth, cardHeight}
}

export default useCardSize
