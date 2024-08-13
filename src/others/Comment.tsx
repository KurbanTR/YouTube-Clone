import { Link } from "react-router-dom";

interface CommentItem {
    snippet: {
        topLevelComment?: {
            snippet?: {
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
    }
}

interface CommentProps {
    item: CommentItem;
}

const Comment: React.FC<CommentProps> = ({item}) => {  
  return (
    <div className="flex gap-3 w-full">
      <img src={item?.snippet?.topLevelComment?.snippet?.authorProfileImageUrl} alt="" className="rounded-full w-12 h-12" />
      <div className="relative bottom-1">
        <Link to={`/channels/${item?.snippet?.topLevelComment?.snippet?.authorChannelId?.value}`} className="font-[550] text-lg 1480res:text-base 1000res:text-sm 500res:text-xs">{item?.snippet?.topLevelComment?.snippet?.authorDisplayName}</Link>
        <p className="text-[.8em] 1480res:text-[1vw] 1000res:text-[2vw] 500res:text-[2.5vw]">{item?.snippet?.topLevelComment?.snippet?.textDisplay}</p>
      </div>
    </div>
  )
}

export default Comment
