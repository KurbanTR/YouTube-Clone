import { Link } from 'react-router-dom';
import {DateFormatter, useVideoManager} from '@/hooks';
import { useEffect, useRef, useState } from 'react';
import { useColorCard, useTrimText } from '@/hooks';
import { VideoItemType } from '@/types';

const CardVideo: React.FC<{item?: VideoItemType; type: string; isLoad?: boolean; index?: number}> = ({ item, type, isLoad, index }) => {
    const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
    const { color } = useColorCard({index})
    const { trimText } = useTrimText({text: item?.snippet?.title})
    const { videoTimes } = useVideoManager()
    const [isLoading, setLoading] = useState(true)
    const [precent, setPercent] = useState<number>(0)
    const [time, setTime] = useState<number>(0)
    const videoId = item?.id.videoId;    
    const myElementRef = useRef<HTMLDivElement>(null);
    const [elementHeight, setElementHeight] = useState<number | undefined>(undefined);

    useEffect(() => {
    const videoData = videoId ? videoTimes?.[videoId] : null;
    console.log(videoId, videoTimes);
    
    const time = videoData?.time || 0;
    const duration = videoData?.duration || 0;
    const percentTime = (duration > 0) ? (time / duration) * 100 : 0;
    setPercent(percentTime)
    setTime(time)
    }, [precent, time, videoId, videoTimes])

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
        if (window.innerWidth >= 540 && videoId) {
            setActiveVideoId(videoId||null)
        }
    };

    const handleMouseLeave = () => {
        setTimeout(() => setActiveVideoId(null), 300)    
        setTimeout(() => setLoading(true), 450)   
    };

    if (isLoad) {
        return (
            <div className="cursor-pointer animate-pulse p-[10px] 1580res:p-[6px] 1000res:p-[2px]">
                <div className="rounded-2xl 500res:rounded-none bg-gray-700 w-full h-[8vw]" style={{ height: `${elementHeight}px` }} ref={myElementRef} />
                <div className="h-6 bg-gray-700 mt-3 w-5/6 rounded-lg" />
                <div className="h-5 bg-gray-700 mt-2 w-2/3 rounded-md" />
            </div>
        );
    }

    if (!item) return null;

    const onHandleVideo = () => {
        setTimeout(() => setLoading(false), 420)
    }

    const playlistId = item.id.playlistId;

    return (
        <div
            onMouseEnter={() => handleMouseEnter(videoId)}
            onMouseLeave={handleMouseLeave}
            className='cursor-pointer video-card overflow-hidden rounded-[17px] 1580res:rounded-[13px] 1000res:rounded-[7px] 500res:rounded-none p-[10px] 1580res:p-[6px] 1000res:p-[4px] 500res:p-0 pb-5 1580res:pb-4 1000res:pb-3 500res:pb-2 transition-all duration-700 ease-custom-ease'
            style={{ backgroundColor: activeVideoId ? color : 'transparent' }}
        >
            <Link to={type === 'video' ? `/watch?v=${videoId}${time !== 0 ? `&t=${time}s` : ''}` : `playlist?list=${playlistId}`}>
                <div
                    className="500res:rounded-none overflow-hidden"
                    style={{ height: `${elementHeight}px` }}
                    ref={myElementRef}
                >
                    {type === 'video' && activeVideoId === videoId ? (
                        <div className='relative w-full h-full'>
                            <iframe
                                onLoad={onHandleVideo}
                                id="yt-video"
                                frameBorder="0"
                                allowFullScreen
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                referrerPolicy="strict-origin-when-cross-origin"
                                className="w-full h-full z-[2] pointer-events-none"
                                src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&fs=0&disablekb=1`}
                            />
                            {isLoading && <img src={item.snippet.thumbnails.high.url} className="absolute top-0 left-0 w-full h-full object-cover" alt={item.snippet.title} />}               
                        </div>
                    ) : (
                        <div className="relative w-full h-full">
                            <img src={item.snippet.thumbnails.high.url} className="w-full h-full object-cover rounded-2xl 1580res:rounded-xl 1000res:rounded-md" alt={item.snippet.title} />

                            {precent > 0 && (
                                <div className="w-full h-1 bg-black bg-opacity-20 absolute bottom-0 left-0">
                                    <div className="h-1 bg-red-600" style={{ width: `${precent}%` }} />
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <div className='px-[.2vw] 2230res:px-[.3vw] 1900res:px-[.4vw] 1580res:px-[.5vw] 1000res:px-[.6vw] 500res:px-[2vw] pt-[.3vw] 2230res:pt-[.4vw] 1900res:pt-[.5vw] 1580res:pt-[.6vw] 1000res:pt-[.7vw] 500res:pt-[1vw]'>                    
                    <h3 className="text-[.5vw] 2230res:text-[.7vw] 1900res:text-[.9vw] 1580res:text-[1.1vw] 1000res:text-[1.3vw] 500res:text-[2.5vw] leading-[16px] font-[500] text-white">
                        {trimText}
                    </h3>
                    <div className="text-[.4vw] 2230res:text-[.6vw] 1900res:text-[.8vw] 1580res:text-[1vw] 1000res:text-[1.1vw] 500res:text-[2.2vw] pt-[.1vw] 2230res:pt-[.2vw] 1900res:pt-[.3vw] 1580res:pt-[.4vw] 1000res:pt-[.5vw] flex">
                        <Link to={`/channels/${item.snippet.channelId}`} className="hover:text-white font-semibold">
                            {item.snippet.channelTitle}
                        </Link>
                        <p className='px-[.1vw] 2230res:px-[.2vw] 1900res:px-[.3vw] 1580res:px-[.4vw] 1000res:px-[.5vw] 500res:px-[.6vw]'> ‧ </p>
                        <h4>{DateFormatter(item.snippet.publishTime)}</h4>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default CardVideo;