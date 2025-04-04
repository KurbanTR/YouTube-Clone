import { Link } from "react-router-dom";
import DateFormatter from "../hooks/DateFormatter";

interface CommentItem {
    snippet: {
        topLevelComment?: {
            snippet?: {
                textDisplay?: string;
                publishedAt?: string;
                updatedAt?: string;
                likeCount?: number;
                authorProfileImageUrl?: string;
                authorDisplayName?: string;
                authorChannelId: {
                  value: string;
                };
            }
        }
    }
}

interface CommentProps {
    item: CommentItem;
}

const Comment: React.FC<CommentProps> = ({item}) => {  
  return (
    <div className="flex flex-col">
      <div className="flex gap-3 w-full">
        <img src={item?.snippet?.topLevelComment?.snippet?.authorProfileImageUrl} alt="" className="rounded-full w-12 h-12" />
        <div className="relative bottom-1">
          <div className="flex gap-1 items-center">
            <Link to={`/channels/${item?.snippet?.topLevelComment?.snippet?.authorChannelId?.value}`} className="font-[450] text-[.8em] 1480res:text-[1vw] 1000res:text-[2vw] 500res:text-[2.5vw]">{item?.snippet?.topLevelComment?.snippet?.authorDisplayName}</Link>
            <p className="text-[.6em] 1480res:text-[.7vw] 1000res:text-[1.7vw] 500res:text-[2.3vw] text-white text-opacity-50 cursor-default">{DateFormatter(item?.snippet?.topLevelComment?.snippet?.updatedAt)}</p>
          </div>
          <p className="text-[.8em] 1480res:text-[1vw] 1000res:text-[2vw] 500res:text-[2.5vw] cursor-default">{item?.snippet?.topLevelComment?.snippet?.textDisplay}</p>
          <div className="flex gap-2 1480res:gap-1 items-center">
            <img className="w-[1em] 1480res:w-[1vw] 1000res:w-[2vw] 500res:w-[2.5vw]"  src='/like.svg' alt="like" />
            <p className="text-[.8em] 1480res:text-[1vw] 1000res:text-[2vw] 500res:text-[2.5vw] font-thin cursor-default text-white text-opacity-50">{item?.snippet?.topLevelComment?.snippet?.likeCount}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Comment
