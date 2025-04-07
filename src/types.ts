export type VideoIdType = {
    kind: string;
    videoId?: string;
    playlistId?: string;
    channelId?: string;
};

export type VideoItemType = {
    id: VideoIdType;
    snippet: {
        title: string;
        channelId: string;
        channelTitle: string;
        publishTime: string;
        publishedAt: string;
        description: string;
        resourceId?: {
            videoId: string;
        }
        thumbnails: {
            high: {
                url: string;
            };
        };
    };
};

export type VideoDataType = {
    nextPageToken: string | null;
    items: VideoItemType[];
};
  
export type CommentItemType = {
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

export type CommentPropsType = {
    item: CommentItemType;
}

export type ChannelType =  {
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
  
export type VideoType = {
    snippet: {
        title: string;
        channelId: string;
        channelTitle: string;
        publishedAt: string,
        description: string,
        thumbnails: {
            maxres: {
                url: string
            }   
        }
    };
    statistics: {
        viewCount: string,
        likeCount: string,
    }
}