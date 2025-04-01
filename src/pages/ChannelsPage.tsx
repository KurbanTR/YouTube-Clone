import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchChannelById, fetchChannelVideos } from "../api/searchSlice"; // Используем правильный экспорт
import useNumberFormatter from "../hooks/useNumberFormatter";
import DateFormatter from "../hooks/DateFormatter";
import { useQuery } from "@tanstack/react-query";
import CardVideo from "../others/CardVideo";
import { Modal } from "antd";
import '../styles/antdModel.css';

interface Channel {
  snippet: {
    title: string;
    customUrl: string;
    description: string;
    thumbnails: {
      high: {
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
          high: {
              url: string;
          };
      };
  };
}

const ChannelsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
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


    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

  return (
    <div className="w-11/12 m-auto pt-7 700res:pt-2">
      <div
        className="h-[15vw] 540res:h-[22vw] rounded-3xl 1480res:rounded-xl 700res:rounded-md"
        style={{
          backgroundImage: `url(${channel?.brandingSettings?.image?.bannerExternalUrl})`,
          backgroundPosition: "center",
          backgroundSize: 'cover',
        }}
      />
      <div className="mt-12 450res:mt-5 flex gap-x-8 540res:gap-x-5 450res:gap-x-3">
        <img
          src={channel?.snippet?.thumbnails?.high?.url}
          alt="AvatarImg"
          className="rounded-full w-60 h-60 1650res:w-56 1650res:h-56 1100res:w-40 1100res:h-40 800res:w-32 800res:h-32 450res:w-20 450res:h-20"
        />
        <div className="m-3 450res:m-1">
          <h3 className="text-[2.7em] 1650res:text-[2.4em] 1320res:text-[2.1em] 800res:text-2xl 450res:text-base font-semibold text-white">
            {channel?.snippet?.title}
          </h3>
          <div className="mt-3 450res:mt-[1px] flex flex-col gap-1 800res:text-[10px] 540res:text-[8px]">
            <h4>
              {`${channel?.snippet?.customUrl} ‧ ${formattedSubscribers} подписчиков ‧ ${channel?.statistics?.videoCount} видео`}
            </h4>
            <h4 className="540res:hidden">
              {`${formattedViews} просмотров ‧ Канал создан ${formattedDate}`}
            </h4>
            <h4 className="flex gap-1">
              <p>{channel?.snippet?.description.slice(0, 30)}</p>
              <button onClick={showModal} className="hover:text-white cursor-pointer">еще...</button> 
            </h4>
          </div>
        </div>
      </div>
      <div className="my-12 450res:my-5 h-[1px] bg-[#aaaaaa]" />
      <div className={`grid grid-cols-4 500res:grid-cols-1 700res:grid-cols-2 1200res:grid-cols-3 gap-4`}>
        {channelVideos?.map((item) => 
          item?.id?.kind !== 'youtube#channel' && (
            <CardVideo item={item} type="video"/>
          )
        )}
      </div>
      <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
        <h2 className="text-white text-[2vw] 540res:text-[3vw]">{channel?.snippet?.description}</h2>
      </Modal>
    </div>
  );
};

export default ChannelsPage;