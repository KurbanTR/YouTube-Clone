import { useState, useEffect } from 'react';

interface VideoData {
  [id: string]: {time: number, duration: number};
}

const useVideoManager = () => {
  const [videoTimes, setVideoTimes] = useState<VideoData>({});

  useEffect(() => {
    const data = localStorage.getItem('videoTimes');
    if (data) {
      setVideoTimes(JSON.parse(data));
    }
  }, []);

  const setVideo = (id: string, time: number, duration: number) => {
    const updatedVideoTimes = { ...videoTimes, [id]: {time, duration} };
    setVideoTimes(updatedVideoTimes);
    localStorage.setItem('videoTimes', JSON.stringify(updatedVideoTimes));
  };

  const removeVideo = (id: string) => {
    const updatedVideoTimes = Object.fromEntries(
      Object.entries(videoTimes).filter(([key]) => key !== id)
    );
  
    setVideoTimes(updatedVideoTimes);
    localStorage.setItem('videoTimes', JSON.stringify(updatedVideoTimes));
  };

  return { videoTimes, setVideo, removeVideo };
};

export default useVideoManager;