import { instance } from './instance';

type Params = { 
    id?: string | undefined,
    channelId?: string | undefined,
    playlistId?: string | undefined,
    videoId?: string | undefined,
    q?: string | undefined,
    part?: string | undefined,
    regionCode?: string | undefined,
    maxResults?: number,
    order?: string | undefined,
    relatedToVideoId?: string,
    type?: string,
    pageToken?: string,
} 

export const videoApi = {
    getMainVideos(params: Params) {
        return instance.get('search', { params });
    },
    getVideo(params: Params) {
        return instance.get('videos', { params });
    },
    getChannel(params: Params) {
        return instance.get('channels', { params });
    },
    getChannelVideo(params: Params) {
        return instance.get('search', { params });
    },
    getPlaylistItems(params: Params) {
        return instance.get('playlistItems', { params });
    },
    getComments(params: Params) {
        return instance.get('/commentThreads', { params });
    },
};
