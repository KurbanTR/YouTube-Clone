import { useEffect } from "react";
import { fetchVideoById, fetchVideoVideos } from "../app/searchSlice";
import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useCardSize from "../hooks/useCardSize";
import DateFormatter from "../hooks/DateFormatter";

interface Video {
    snippet: {
        title: string;
        channelId: string;
        channelTitle: string;
    };
}

interface VideoItem {
    id: {
        kind: string;
        videoId?: string;
        playlistId?: string;
        channelId?: string;
    };
    snippet: {
        title: string;
        channelId: string;
        channelTitle: string;
        publishTime: string;
        description: string;
        thumbnails: {
            medium: {
                url: string;
            };
        };
    };
}

const Video = () => {
    const { cardWidth, cardHeight } = useCardSize();
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('v');

    const { data: video } = useQuery<Video>({
        queryKey: ['video', { searchQuery }],
        queryFn: () => fetchVideoById(searchQuery || ''),
    });
    const { data: videos } = useQuery<VideoItem[]>({
        queryKey: ['videos', { searchQuery }],
        queryFn: () => fetchVideoVideos(searchQuery || ''),
    });

    useEffect(() => {
        if (video?.snippet?.title) {
            document.title = `${video.snippet.title} - YouTube`;
        }
    }, [video]);

    return (
        <div className="flex justify-center">
            <div className={`flex gap-x-[1vw] gap-y-[3vw] w-[1440px] 1480res:w-[95%] 1000res:flex-col`}>
                <div className="flex flex-col gap-y-[.8vw]">
                    <div style={window.innerWidth >= 1480 ? {width: '62em', height: '39em'} : (window.innerWidth <= 1000 ? {width: '95vw', height: '50vw'} : {width: cardWidth * 2, height: cardHeight * 2})}>
                        <iframe
                            frameBorder="0"
                            allowFullScreen
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            title="Embedded Video"
                            width="100%"
                            height="100%"
                            className="rounded-xl"
                            src={`https://www.youtube.com/embed/${searchQuery}?autoplay=1&mute=0&controls=1&origin=https%3A%2F%2Fwhimsical-jalebi-4d17fe.netlify.app&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=3`}
                        />
                    </div>
                    <div className="text-white font-[550]">
                        <h2 className="text-[1.7em] 1480res:text-[2vw] 1000res:text-[2.5vw] 500res:text-[3vw] 500res:relative 500res:top-2">{video?.snippet?.title}</h2>
                        <Link to={`/channels/${video?.snippet?.channelId}`} className="text-[1.5em] 1480res:text-[1.5vw] 1000res:text-[2vw] 500res:text-[2.7vw]">{video?.snippet?.channelTitle}</Link>
                    </div>
                </div>
                <div className="w-full flex flex-col gap-4">
                    {videos?.map((item, index) => (
                        item?.id?.kind !== 'youtube#channel' && (
                            <Link to={`/watch?v=${item?.id?.videoId || item?.id?.playlistId}`} key={index}>
                                <div className="flex gap-5 500res:gap-3">
                                    <div className="w-[50%] 1000res:w-1/3 500res:w-1/2">
                                        <img
                                            src={item?.snippet?.thumbnails?.medium?.url}
                                            style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
                                            className={`rounded-md w-full`}
                                            alt={item?.snippet?.title}
                                        />
                                    </div>
                                    <div className="w-[75%]">
                                        <h3 className="text-[.8vw] 1000res:text-[2vw] 500res:text-[2.5vw] font-[550] text-white">{item.snippet.title}</h3>
                                        <div className='text-[.6vw] 1000res:text-[1.7vw] 500res:text-[2.2vw]'>
                                            <h4>{DateFormatter(item?.snippet?.publishTime)}</h4>
                                            <Link to={`/channels/${item?.snippet?.channelId}`} className='hover:text-white'>{item.snippet.channelTitle}</Link>
                                            <h4>{item?.snippet?.description}</h4>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Video;
