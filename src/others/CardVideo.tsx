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
            medium: {
                url: string;
            };
        };
    };
}

interface CardVideoProps {
    item: VideoItem;
    type: string;
}

const CardVideo: React.FC<CardVideoProps> = ({ item, type }) => {
    const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

    const myElementRef = useRef<HTMLDivElement>(null);
    const [elementHeight, setElementHeight] = useState<number | undefined>(undefined);

    useEffect(() => {
        if (myElementRef.current) {
            const width = myElementRef.current.offsetWidth;
            setElementHeight(width / 2);
        }
    }, [myElementRef]);
    
    const handleMouseEnter = (videoId: string) => {
        setActiveVideoId(videoId);
    };

    const handleMouseLeave = () => {
        setActiveVideoId(null);
    };

    const videoId = item.id.videoId
    const playlistId = item.id.playlistId      

    return (
        <div 
            onMouseEnter={() => handleMouseEnter(videoId || '')}
            onMouseLeave={handleMouseLeave}
            className='cursor-pointer'
        >
            <Link to={type == 'video' ? `/watch?v=${videoId}` : `playlist?list=${playlistId}`}>
                <div 
                    className={`rounded-2xl 1580res:rounded-xl 1000res:rounded-md overflow-hidden h-[${elementHeight}]`}
                    style={{height: `${elementHeight}px`}}
                    ref={myElementRef}
                >
                    {(activeVideoId === videoId && type == 'video') ?
                        <iframe
                            frameBorder="0"
                            allowFullScreen
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            referrerPolicy="strict-origin-when-cross-origin"
                            className={`w-full h-full z-[2] pointer-events-none`}
                            style={activeVideoId === videoId ? { borderRadius: '0px' } : undefined}
                            src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&mute=0&controls=0&origin=https%3A%2F%2Fwhimsical-jalebi-4d17fe.netlify.app&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=3`}
                        />
                    :
                        <img
                            src={item?.snippet?.thumbnails?.medium?.url}
                            className='w-full h-full'
                            alt={item?.snippet?.title}
                        />
                    }
                </div>
                <h3 className="text-[.8vw] 2230res:text-[1vw] 1900res:text-[1.3vw] 1580res:text-[1.5vw] 1000res:text-[2.5vw] 500res:text-[4vw] 500res:pt-2 font-[550] text-white">
                    {item?.snippet?.title}
                </h3>
                <div className='text-[.6vw] 2230res:text-[1vw] 1900res:text-[1.3vw] 1580res:text-[1.2vw] 1000res:text-[2.2vw] 500res:text-[3vw]'>
                    <Link to={`/channels/${item?.snippet?.channelId}`} className='hover:text-white'>
                        {item?.snippet?.channelTitle}
                    </Link>
                    <h4>{DateFormatter(item?.snippet?.publishTime)}</h4>
                </div>
            </Link>
        </div>
    );
};

export default CardVideo;