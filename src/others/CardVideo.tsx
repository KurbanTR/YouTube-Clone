import { Link } from 'react-router-dom';
import DateFormatter from '../hooks/DateFormatter';
import { useEffect, useRef, useState } from 'react';

interface VideoItem {
    id: {
        videoId?: string;
        playlistId?: string;
    };
    snippet: {
        title: string;
        channelId: string;
        channelTitle: string;
        publishTime: string;
        thumbnails: {
            high: {
                url: string;
            };
        };
    };
}

interface CardVideoProps {
    item?: VideoItem;
    type: string;
    isLoad?: boolean;
}

const CardVideo: React.FC<CardVideoProps> = ({ item, type, isLoad }) => {
    const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

    const myElementRef = useRef<HTMLDivElement>(null);
    const [elementHeight, setElementHeight] = useState<number | undefined>(undefined);

    useEffect(() => {
        const updateHeight = () => {
            if (myElementRef.current) {
                setElementHeight(myElementRef.current.offsetWidth / 1.8);
            }
        };
        updateHeight();
        window.addEventListener('resize', updateHeight);
        return () => window.removeEventListener('resize', updateHeight);
    }, []);

    const handleMouseEnter = (videoId?: string) => {
        if (videoId) setActiveVideoId(videoId);
    };

    const handleMouseLeave = () => {
        setActiveVideoId(null);
    };

    if (isLoad) {
        return (
            <div className="cursor-pointer animate-pulse">
                <div className="rounded-2xl bg-gray-700 w-full h-[8vw]" style={{ height: `${elementHeight}px` }} ref={myElementRef} />
                <div className="h-6 bg-gray-700 mt-3 w-5/6 rounded-lg" />
                <div className="h-5 bg-gray-700 mt-2 w-2/3 rounded-md" />
            </div>
        );
    }

    if (!item) return null;

    const videoId = item.id.videoId;
    const playlistId = item.id.playlistId;

    return (
        <div
            onMouseEnter={() => handleMouseEnter(videoId)}
            onMouseLeave={handleMouseLeave}
            className="cursor-pointer"
        >
            <Link to={type === 'video' ? `/watch?v=${videoId}` : `playlist?list=${playlistId}`}>
                <div
                    className="rounded-2xl 1580res:rounded-xl 1000res:rounded-md overflow-hidden"
                    style={{ height: `${elementHeight}px` }}
                    ref={myElementRef}
                >
                    {activeVideoId === videoId && type === 'video' ? (
                        <iframe
                            frameBorder="0"
                            allowFullScreen
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            referrerPolicy="strict-origin-when-cross-origin"
                            className="w-full h-full z-[2] pointer-events-none"
                            src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&mute=0&controls=0`}
                        />
                    ) : (
                        <img src={item.snippet.thumbnails.high.url} className="w-full h-full object-cover" alt={item.snippet.title} />
                    )}
                </div>
                <h3 className="text-[.8vw] 2230res:text-[1vw] 1900res:text-[1.3vw] 1580res:text-[1.5vw] 1000res:text-[2.5vw] 500res:text-[4vw] 500res:pt-2 font-[550] text-white">
                    {item.snippet.title}
                </h3>
                <div className="text-[.6vw] 2230res:text-[1vw] 1900res:text-[1.3vw] 1580res:text-[1.2vw] 1000res:text-[2.2vw] 500res:text-[3vw]">
                    <Link to={`/channels/${item.snippet.channelId}`} className="hover:text-white">
                        {item.snippet.channelTitle}
                    </Link>
                    <h4>{DateFormatter(item.snippet.publishTime)}</h4>
                </div>
            </Link>
        </div>
    );
};

export default CardVideo;
