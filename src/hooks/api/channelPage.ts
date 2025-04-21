import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchChannelById, fetchChannelVideos } from "../../api/searchSlice";
import {DateFormatter, useNumberFormatter} from "../../hooks";
import { useQuery } from "@tanstack/react-query";
import { ChannelType, VideoItemType } from "@/types";

export const useChannel = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const params = useParams<{ id: string }>();

    const { data: channel, isError: isErrorChannel } = useQuery<ChannelType>({
        queryKey: ['channel', params.id],
        queryFn: () => fetchChannelById(params.id as string),
    });

    const { data: channelVideos, isError: isErrorVideos } = useQuery<VideoItemType[]>({
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

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return {channel, isModalOpen, isErrorChannel, channelVideos, isErrorVideos, formattedSubscribers, formattedViews, formattedDate, showModal, handleCancel}
}