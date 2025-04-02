import { videoApi } from "../api/searchApi";

export const fetchVideos = async (query: string) => {
    try {
        const response = await videoApi.getMainVideos({
            part: 'snippet',
            maxResults: 50,
            regionCode: 'RU',
            order: 'relevance',
            q: query
        });
        window.scrollTo({top:0})
        return response.data
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error fetching video by ID:', error.message);
        } else {
            console.error('Error fetching video by ID:', error);
        }
        throw error;
    }
};

export const fetchMoreVideos = async (query: string, nextPageToken: string) => {
    try {
        const response = await videoApi.getMainVideos({
            part: 'snippet',
            maxResults: 50,
            q: query,
            pageToken: nextPageToken,
            regionCode: 'RU'
        });
        return response.data
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error fetching video by ID:', error.message);
        } else {
            console.error('Error fetching video by ID:', error);
        }
        throw error;
    }
};

export const fetchVideoById = async (videoId: string) => {
    try {
        const response = await videoApi.getVideo({
            part: 'contentDetails,snippet,statistics',
            id: videoId
        });
        return response.data?.items?.[0];
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error fetching video by ID:', error.message);
        } else {
            console.error('Error fetching video by ID:', error);
        }
        throw error;
    }
};

export const fetchVideoVideos = async (id: string) => {
    try {
        const response = await videoApi.getChannelVideo({
            relatedToVideoId: id,
            part: "id,snippet",
            type: "video",
            maxResults: 50,
            regionCode: "RU",
        });
        return response.data.items;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error fetching video by ID:', error.message);
        } else {
            console.error('Error fetching video by ID:', error);
        }
        throw error;
    }
};

export const fetchChannelById = async (channelId: string) => {
    try {
        const response = await videoApi.getChannel({
            part: 'snippet,statistics',
            id: channelId
        });
        return response.data?.items?.[0];
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error fetching video by ID:', error.message);
        } else {
            console.error('Error fetching video by ID:', error);
        }
        throw error;
    }
};

export const fetchChannelVideos = async (id: string) => {
    try {
        const response = await videoApi.getChannelVideo({
            part: 'snippet',
            channelId: id,
            maxResults: 50,
            order: 'date'
        });
        return response.data.items;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error fetching video by ID:', error.message);
        } else {
            console.error('Error fetching video by ID:', error);
        }
        throw error;
    }
};

export const fetchPleylistVideos = async (id: string) => {
    try {
        const response = await videoApi.getPlaylistItems({
            part: 'snippet',
            playlistId: id,
            maxResults: 50,
        });
        return response.data.items;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error fetching video by ID:', error.message);
        } else {
            console.error('Error fetching video by ID:', error);
        }
        throw error;
    }
};
export const fetchComments = async (id: string) => {
    try {
        const response = await videoApi.getComments({
            part: 'snippet',
            videoId: id,
            maxResults: 100,
        });
        return response.data.items;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error fetching video by ID:', error.message);
        } else {
            console.error('Error fetching video by ID:', error);
        }
        throw error;
    }
};
