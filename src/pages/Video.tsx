import { useEffect, useState } from "react";
import { fetchVideoById, fetchVideoVideos, fetchComments } from "../api/searchSlice";
import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useCardSize from "../hooks/useCardSize";
import DateFormatter from "../hooks/DateFormatter";
import BigNumber from "../hooks/BigNumber";
import Comment from "../others/Comment";

interface Video {
    snippet: {
        title: string;
        channelId: string;
        channelTitle: string;
        publishedAt: string,
        description: string,
        thumbnails: {
            maxres: {
                url: string
            }   
        }
    };
    statistics: {
        viewCount: string,
        likeCount: string,
    }
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

interface CommentsItem {
    snippet: {
        topLevelComment: {
            snippet: {
                textDisplay?: string;
                publishedAt?: string;
                likeCount?: number;
                authorProfileImageUrl?: string;
                authorDisplayName?: string;
                authorChannelId: {
                    value: string;
                };
            }
        }
    };
}

const Video = () => {
    const { cardWidth, cardHeight } = useCardSize();
    const [searchParams, setSearchParams] = useSearchParams();
    const [visibleDescription, setVisibleDescription] = useState<boolean>(false)
    
    const videoId = searchParams.get('v');
    const time = searchParams.get("t");

  useEffect(() => {
    if (!time || !/^\d+s$/.test(time)) {
        const newParams = new URLSearchParams(searchParams);
        newParams.delete("t");
        setSearchParams(newParams, { replace: true });
      }
  }, [time, setSearchParams, searchParams]);

  const videoTime = time && /^\d+s$/.test(time) ? parseInt(time, 10) : 0;

    const { data: video } = useQuery<Video>({
        queryKey: ['video', { videoId }],
        queryFn: () => fetchVideoById(videoId || ''),
        refetchOnWindowFocus: false,
    });
    const { data: videos } = useQuery<VideoItem[]>({
        queryKey: ['videos', { videoId }],
        queryFn: () => fetchVideoVideos(videoId || ''),
        refetchOnWindowFocus: false,
    });
    const { data: comments } = useQuery<CommentsItem[]>({
        queryKey: ['comments', { videoId }],
        queryFn: () => fetchComments(videoId || ''),
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (video?.snippet?.title) {
            document.title = `${video.snippet.title} - YouTube`;
        }        
    }, [video]);

    const isDescription = () => {
        setVisibleDescription(!visibleDescription)
    }

    return (    
        <div className="flex justify-center">
            <div className={`flex gap-x-[1vw] gap-y-[3vw] w-[1440px] 1480res:w-[95%] 1000res:flex-col`}>
                <div>
                    <div style={window.innerWidth >= 1480 ? {width: '57em'} : (window.innerWidth <= 1000 ? {width: '93vw'} : {width: cardWidth * 2})} className="flex flex-col gap-y-4">
                        <div style={window.innerWidth >= 1480 ? {height: '35em'} : (window.innerWidth <= 1000 ? {height: '50vw'} : {height: cardHeight * 2})} className="rounded-xl overflow-hidden relative">
                                <iframe
                                    frameBorder="0"
                                    allowFullScreen
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    title="Embedded Video"
                                    width="100%"
                                    height="100%"                       
                                    className="z-10"
                                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&controls=1&playsinline=1&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=3&start=${videoTime}`}
                                />
                                <div className="absolute top-0 left-0 w-full h-[5em] pointer-events-auto z-20" style={{ cursor: 'default' }}/>
                            </div>
                        <div className="text-white font-[550]">
                            <h2 className="text-[1.7em] 1480res:text-[2vw] 1000res:text-[2.5vw] 500res:text-[3vw] 500res:relative 500res:top-2">{video?.snippet?.title}</h2>
                            <Link to={`/channels/${video?.snippet?.channelId}`} className="text-[1.5em] 1480res:text-[1.5vw] 1000res:text-[2vw] 500res:text-[2.7vw]">{video?.snippet?.channelTitle}</Link>
                        </div>
                        <div className="bg-[rgba(255,255,255,.1)] rounded-xl text-white p-4 540res:p-2 w-full">
                            <p className="font-[550] text-[.9em] 1480res:text-[1.1vw] 1000res:text-[2.1vw] 500res:text-[2.6vw]">{`${BigNumber(video?.statistics?.viewCount)} просмотров ${DateFormatter(video?.snippet?.publishedAt)}`}</p>
                            <div className="text-[.8em] 1480res:text-[1vw] 1000res:text-[2vw] 500res:text-[2.5vw]">
                                <p>{!visibleDescription ? video?.snippet?.description.slice(0, 100) : video?.snippet?.description}</p>
                                <button className={`font-[550] ${visibleDescription && 'hidden'}`} onClick={isDescription}>...еще</button>
                                <button className={`font-[550] ${!visibleDescription && 'hidden'}`} onClick={isDescription}>Свернуть</button>
                            </div>
                        </div>
                        <div className="text-white p-4 540res:p-2 w-full flex flex-col gap-7 1480res:gap-3 1000res:gap-2 500res:gap-1">
                            {
                                comments?.map((item, index) => (
                                    <Comment item={item} key={index}/>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col gap-4">
                    {videos?.map((item, index) => (
                        item?.id?.kind !== 'youtube#channel' && (
                            <Link to={`/watch?v=${item?.id?.videoId || item?.id?.playlistId}`} key={index}>
                                <div className="flex gap-[.5vw] 1000res:gap-[1vw]  500res:gap-3">
                                    <div className="w-[55%] 1650res:w-[50%] 1000res:w-1/3 500res:w-1/2">
                                        <img
                                            src={item?.snippet?.thumbnails?.medium?.url}
                                            style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
                                            className={`rounded-md w-full`}
                                            alt={item?.snippet?.title}
                                        />
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
                        )
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Video;