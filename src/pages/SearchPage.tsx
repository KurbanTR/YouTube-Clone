import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { fetchVideos } from "../api/searchSlice";
import chek from '../assets/chek.svg';
import DateFormatter from "../hooks/DateFormatter";
import { useQuery } from "@tanstack/react-query";

interface VideoItem {
    id: {
        kind: string;
        videoId?: string;
        playlistId?: string;
        channelId?: string;
    };
    snippet: {
        title: string;
        thumbnails: {
            medium: {
                url: string;
            };
        };
        publishTime: string;
        channelId?: string;
        channelTitle: string;
        description: string;
    };
}

const SearchPage = () => {  
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search_query') || '';

    const { data: videos, isLoading, error } = useQuery<{ items: VideoItem[] }>({
        queryKey: ['search', { searchQuery }],
        queryFn: () => fetchVideos(searchQuery),
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        document.title = `${searchQuery} - YouTube Clone`;
    }, [searchQuery]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex justify-center">
                <div className="flex flex-col gap-4 540res:gap-3 w-[55%] 1480res:w-[70%] 1100res:w-[80%] 800res:w-[95%]">                
                    {[...Array(12)].map((_, index) =>
                        <div className="flex gap-5 540res:gap-3 500res:flex-col cursor-pointer animate-pulse" key={index}>
                            <div className="w-[44%] h-[14vw] 500res:w-full rounded-2xl bg-gray-700"/>
                            <div className="w-[75%] flex flex-col gap-[.5vw]">
                                <div className="h-6 bg-gray-700 mt-1 w-11/12 rounded-md"/>
                                <div>
                                    <div className="h-4 bg-gray-700 mt-2 w-1/5 rounded-[4px]"/>
                                    <div className="h-11 bg-gray-700 mt-3 w-8/12 rounded-md"/>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
    if (error) {
        return (
            <div className="flex items-center justify-center h-[85vh]">
                <p className="text-white">Error: {error?.message || 'An error occurred'}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex justify-center">
            <div className={`flex flex-col gap-4 540res:gap-3 w-[55%] 1480res:w-[70%] 1100res:w-[80%] 800res:w-[95%]`}>
                {videos?.items?.map((item, index) => (
                    item?.id?.kind !== 'youtube#channel' && item?.id?.kind !== 'youtube#playlist' ? (
                        <Link to={`/watch?v=${item.id.videoId || item.id.playlistId}`} key={index}>
                            <div className="flex gap-5 540res:gap-3 500res:flex-col">
                                <div className="w-[44%] 500res:w-full">
                                    <img
                                        src={item.snippet.thumbnails.medium.url}
                                        style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
                                        className={`rounded-xl 540res:rounded-md w-full`}
                                        alt={item.snippet.title}
                                    />
                                </div>
                                <div className="w-[75%] flex flex-col gap-[.5vw]">
                                    <h3 className="text-[1vw] 1900res:text-[1.3vw] 1580res:text-[1.5vw] 1000res:text-[2vw] 500res:text-[3vw] font-[550] text-white">{item.snippet.title}</h3>
                                    <div className='text-[.8vw] 1900res:text-[1vw] 1580res:text-[1.2vw] 1000res:text-[1.8vw] 500res:text-[2.5vw] flex flex-col 500res:flex-row gap-[.3vw]'>
                                        <Link to={`/channels/${item.snippet.channelId}`} className='hover:text-white'>{item.snippet.channelTitle}</Link>
                                        <p className="hidden 500res:block"> ‧ </p>
                                        <h4>{DateFormatter(item.snippet.publishTime)}</h4>
                                        <h4 className="500res:hidden">{item.snippet.description}</h4>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ) : (item?.id?.kind == 'youtube#playlist' ? (
                        <Link to={`/playlist?list=${item.id.playlistId}`} key={index}>
                            <div className="flex gap-5 540res:gap-3 500res:flex-col">
                                <div className="w-[44%] 500res:w-full">
                                    <img
                                        src={item.snippet.thumbnails.medium.url}
                                        style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
                                        className={`rounded-xl 540res:rounded-md w-full`}
                                        alt={item.snippet.title}
                                    />
                                </div>
                                <div className="w-[75%] flex flex-col gap-[.5vw]">
                                    <h3 className="text-[1vw] 1900res:text-[1.3vw] 1580res:text-[1.5vw] 1000res:text-[2vw] 500res:text-[3vw] font-[550] text-white">{item.snippet.title}</h3>
                                    <div className='text-[.8vw] 1900res:text-[1vw] 1580res:text-[1.2vw] 1000res:text-[1.8vw] 500res:text-[2.5vw] flex flex-col gap-[.3vw]'>
                                        <Link to={`/channels/${item.snippet.channelId}`} className='hover:text-white'>{item.snippet.channelTitle}</Link>
                                        <p className="hidden 500res:block"> ‧ </p>
                                        <h4>{DateFormatter(item.snippet.publishTime)}</h4>
                                        <h4 className="500res:hidden">{item.snippet.description}</h4>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ) : (
                        <Link to={`/channels/${item.id.channelId}`} key={index}>
                            <div className="flex gap-5 540res:gap-3">
                                <div className="w-[44%] flex justify-center">
                                    <img
                                        src={item.snippet.thumbnails.medium.url}
                                        className={`rounded-full w-1/2`}
                                        alt={item.snippet.title}
                                    />
                                </div>
                                <div className="flex flex-col gap-[.4vw] 500res:gap-0 text-[#aaaaaa] w-[75%] mt-2 text-[.8vw] 1900res:text-[1vw] 1580res:text-[1.2vw] 1000res:text-[1.8vw]">
                                    <div className="flex items-center gap-1 mb-[.7vw] 500res:mb-0">
                                        <h2 className="text-[1.2vw] 1900res:text-[1.5vw] 1580res:text-[1.7vw] 1000res:text-[2.2vw] font-[550] text-white">{item.snippet.title}</h2>
                                        <img src={chek} alt="chek" className="w-[.9vw] 2230res:w-[1.1vw] 1900res:w-[1.4vw] 1580res:w-[1.6vw] 1000res:w-[2.2vw]" />
                                    </div>
                                    <h2 className="mb-[.5vw] 500res:mb-0">{`Канал был создан: ${DateFormatter(item.snippet.publishTime)}`}</h2>
                                    <h2>{item.snippet.description}</h2>
                                </div>
                            </div>
                        </Link>
                    ))
                ))}
            </div>
        </div>
    );
};

export default SearchPage;
