import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchChannelById, fetchChannelVideos } from "../app/searchSlice"; // Используем правильный экспорт
import useNumberFormatter from "../hooks/useNumberFormatter";
import DateFormatter from "../hooks/DateFormatter";
import { useQuery } from "@tanstack/react-query";
import CardVideo from "../others/CardVideo";

interface Channel {
  snippet: {
    title: string;
    customUrl: string;
    description: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
    publishedAt: string;
  };
  brandingSettings: {
    image: {
      bannerExternalUrl: string;
    };
  };
  statistics: {
    subscriberCount: number;
    videoCount: number;
    viewCount: number;
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

const ChannelsPage = () => {
  const params = useParams<{ id: string }>();

  const { data: channel, isError: isErrorChannel } = useQuery<Channel>({
    queryKey: ['channel', params.id],
    queryFn: () => fetchChannelById(params.id as string),
  });

  const { data: channelVideos, isError: isErrorVideos } = useQuery<VideoItem[]>({
    queryKey: ['channelVideos', params.id],
    queryFn: () => fetchChannelVideos(params.id as string),
  });

  const formattedSubscribers = useNumberFormatter(channel?.statistics?.subscriberCount ?? 0);
  const formattedViews = useNumberFormatter(channel?.statistics?.viewCount ?? 0);
  const formattedDate = DateFormatter(channel?.snippet?.publishedAt ?? "");

  useEffect(() => {
    if (channel) {
      document.title = `${channel.snippet.title} - YouTube`;
    } else {
      document.title = 'Loading...';
    }
  }, [channel]);

  if (isErrorChannel || isErrorVideos) {
    return <div>Error loading data</div>;
  }

  return (
    <div className="w-11/12 m-auto pt-7 700res:pt-2">
      <div
        className="h-[15vw] rounded-3xl 1480res:rounded-xl 700res:rounded-md"
        style={{
          backgroundImage: `url(${channel?.brandingSettings?.image?.bannerExternalUrl})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
      <div className="mt-12 450res:mt-5 flex gap-x-8 540res:gap-x-5 450res:gap-x-3">
        <img
          src={channel?.snippet?.thumbnails?.medium?.url}
          alt="AvatarImg"
          className="rounded-full w-60 h-60 1650res:w-56 1650res:h-56 1100res:w-40 1100res:h-40 800res:w-32 800res:h-32 450res:w-20 450res:h-20"
        />
        <div className="m-3 450res:m-1">
          <h3 className="text-[2.7em] 1650res:text-[2.4em] 1320res:text-[2.1em] 800res:text-2xl 450res:text-base font-semibold text-white">
            {channel?.snippet?.title}
          </h3>
          <div className="mt-3 450res:mt-[1px] flex flex-col gap-1">
            <h4 className="800res:text-[10px] 450res:text-[6px]">
              {`${channel?.snippet?.customUrl} ‧ ${formattedSubscribers} подписчиков ‧ ${channel?.statistics?.videoCount} видео`}
            </h4>
            <h4 className="800res:text-[10px] 450res:text-[6px]">
              {`${formattedViews} просмотров ‧ Канал создан ${formattedDate}`}
            </h4>
            <h4 className="800res:text-[10px] 450res:text-[6px]">
              {channel?.snippet?.description.slice(0, 60)}
            </h4>
          </div>
        </div>
      </div>
      <div className="my-12 450res:my-5 h-[1px] bg-[#aaaaaa]" />
      <div className={`grid grid-cols-4 500res:grid-cols-1 700res:grid-cols-2 1200res:grid-cols-3 gap-4`}>
        {channelVideos?.map((item) => (
          <CardVideo item={item}/>
        ))}
      </div>
    </div>
  );
};

export default ChannelsPage;