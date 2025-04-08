import { Link } from 'react-router-dom';
import {DateFormatter} from '@/hooks';
import { useState } from 'react';
import { VideoItemType } from '@/types';

const BigCardVideo: React.FC<{item?: VideoItemType; type?: string; isLoad?: boolean; index?: number}> = ({ item, index }) => {
    const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

    const handleMouseEnter = (videoId?: string) => {
        if (videoId) setActiveVideoId(videoId);
    };
    
    const handleMouseLeave = () => {
        setActiveVideoId(null);
    };

    if (!item) return null;

    return (
        <Link to={`/watch?v=${item?.id?.videoId || item?.id?.playlistId}`} key={index} onMouseEnter={() => handleMouseEnter(item?.id?.videoId)} onMouseLeave={handleMouseLeave}>
            <div className="flex gap-[.5vw] 1000res:gap-[1vw] 500res:gap-3">
                <div className="w-[55%] h-[6em] 1650res:w-[50%] 1650res:h-[5em] 1000res:w-1/3 500res:w-1/2 overflow-hidden rounded-md">
                    {activeVideoId === item?.id?.videoId && window.innerWidth >= 540 ? (
                        <iframe
                            frameBorder="0"
                            allowFullScreen
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            referrerPolicy="strict-origin-when-cross-origin"
                            className="w-full h-full z-[2] pointer-events-none"
                            src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&fs=0&disablekb=1`}
                        />
                    ) : (
                        <img
                            src={item?.snippet?.thumbnails?.high?.url}
                            style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
                            className={`w-full h-full object-cover`}
                            alt={item?.snippet?.title}
                        />                                        
                    )}
                </div>
                <div className="w-[75%]">
                    <h3 className="text-[.8em] 1650res:text-[.8vw] 1000res:text-[2vw] 500res:text-[2.5vw] font-[550] text-white">{item.snippet.title}</h3>
                    <div className='text-[.6em] 1650res:text-[.6vw] 1000res:text-[1.7vw] 500res:text-[2.2vw]'>
                        <h4>{DateFormatter(item?.snippet?.publishTime)}</h4>
                        <Link to={`/channels/${item?.snippet?.channelId}`} className='hover:text-white'>{item.snippet.channelTitle}</Link>
                        <h4>{item?.snippet?.description}</h4>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default BigCardVideo;