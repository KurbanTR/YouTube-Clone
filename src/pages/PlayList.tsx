import { Link, useSearchParams } from "react-router-dom";
import {DateFormatter} from "../hooks";
import { useQuery } from "@tanstack/react-query";
import { fetchPleylistVideos } from "../api/searchSlice";
import { VideoItemType } from "@/types";

const PlayList = () => {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('list');

    const { data: videos } = useQuery<VideoItemType[]>({
        queryKey: ['playlist', { searchQuery }],
        queryFn: () => fetchPleylistVideos(searchQuery || ''),
        refetchOnWindowFocus: false,
    });
    return (
        <div className="min-h-screen flex justify-center">
            <div className={`flex flex-col gap-4 w-[55%] 1480res:w-[70%] 1100res:w-[80%] 800res:w-[95%]`}>
                {videos?.map((item, index) => (
                    <Link to={`/watch?v=${item.id.videoId || item.id.playlistId || item.snippet.resourceId?.videoId}`} key={index}>
                        <div className="flex gap-5">
                            <div className="w-[44%]">
                                <img
                                    src={item.snippet.thumbnails.high.url}
                                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
                                    className={`rounded-xl w-full`}
                                    alt={item.snippet.title}
                                />
                            </div>
                            <div className="w-[75%]">
                                <h3 className="text-[.8vw] 2230res:text-[1vw] 1900res:text-[1.3vw] 1580res:text-[1.5vw] 1000res:text-[2vw] font-[550] text-white">{item.snippet.title}</h3>
                                <div className='text-[.6vw] 2230res:text-[.8vw] 1900res:text-[1vw] 1580res:text-[1.2vw] 1000res:text-[1.8vw]'>
                                    <h4>{DateFormatter(item.snippet.publishedAt)}</h4>
                                    <Link to={`/channels/${item.snippet.channelId}`} className='hover:text-white'>{item.snippet.channelTitle}</Link>
                                    <h4>{item.snippet.description.slice(0, 100)}</h4>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default PlayList