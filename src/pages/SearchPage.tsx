import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { fetchVideos } from "../app/searchSlice";
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
    });

    useEffect(() => {
        document.title = `${searchQuery} - YouTube Clone`;
    }, [searchQuery]);

    if (isLoading) return <p className="text-white">Loading...</p>;
    if (error) return <p className="text-white">Error: {error.message}</p>;

    return (
        <div className="min-h-screen flex justify-center">
            <div className={`flex flex-col gap-4 w-[55%] 1480res:w-[70%] 1100res:w-[80%] 800res:w-[95%]`}>
                {videos?.items?.map((item, index) => (
                    item?.id?.kind !== 'youtube#channel' ? (
                        <Link to={`/watch?v=${item.id.videoId || item.id.playlistId}`} key={index}>
                            <div className="flex gap-5">
                                <div className="w-[44%]">
                                    <img
                                        src={item.snippet.thumbnails.medium.url}
                                        style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
                                        className={`rounded-xl w-full`}
                                        alt={item.snippet.title}
                                    />
                                </div>
                                <div className="w-[75%]">
                                    <h3 className="text-[.8vw] 2230res:text-[1vw] 1900res:text-[1.3vw] 1580res:text-[1.5vw] 1000res:text-[2.5vw] font-[550] text-white">{item.snippet.title.slice(0, 40)}</h3>
                                    <div className='text-[.6vw] 2230res:text-[.8vw] 1900res:text-[1vw] 1580res:text-[1.2vw] 1000res:text-[2.2vw]'>
                                        <h4>{DateFormatter(item.snippet.publishTime)}</h4>
                                        <Link to={`/channels/${item.snippet.channelId}`} className='hover:text-white'>{item.snippet.channelTitle}</Link>
                                        <h4>{item.snippet.description}</h4>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ) : (
                        <Link to={`/channels/${item.id.channelId}`} key={index}>
                            <div className="flex gap-5">
                                <div className="w-[44%] flex justify-center">
                                    <img
                                        src={item.snippet.thumbnails.medium.url}
                                        className={`rounded-full w-1/2`}
                                        alt={item.snippet.title}
                                    />
                                </div>
                                <div className="text-[#aaaaaa] text-[1.1vw] w-[75%] mt-2">
                                    <div className="flex items-center gap-1 mb-[.7vw]">
                                        <h2 className="text-[1.4vw] text-white">{item.snippet.title}</h2>
                                        <img src={chek} alt="chek" className="w-[1.4vw]" />
                                    </div>
                                    <h2 className=" mb-[.5vw]">{`Канал был создан: ${DateFormatter(item.snippet.publishTime)}`}</h2>
                                    <h2>{item.snippet.description}</h2>
                                </div>
                            </div>
                        </Link>
                    )
                ))}
            </div>
        </div>
    );
};

export default SearchPage;
