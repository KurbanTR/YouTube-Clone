import { useVideoManager } from '@/hooks'
import { useState, useRef, useEffect } from 'react'
import ReactPlayer from 'react-player/youtube'

const YouTubePlayer: React.FC<{ videoId: string | null, videoTime: number }> = ({ videoId, videoTime = 0 }) => {
  const [percentTime, setPercentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [hasSeeked, setHasSeeked] = useState(false)
  const [isLoadVideo, setLoadVideo] = useState<boolean>(false)
  const [isLoad, setLoad] = useState<boolean>(true)
  const playerRef = useRef<ReactPlayer>(null)
  const { setVideo, videoTimes } = useVideoManager()
  const videoData = videoId ? videoTimes?.[videoId] : null
  const start = videoData?.time || 0

  if(!videoId) return;

  const handleProgress = (state: { playedSeconds: number }) => {
    const time = Math.round(state.playedSeconds)
    if (time === 0) return
    const percent = (time / duration) * 100
    setPercentTime(percent)
    if(!isLoadVideo){
      setLoadVideo(true)
      setVideo(videoId, time, duration)
      console.log(time);      
      setTimeout(() => {
        setLoadVideo(false)
      }, 5000)
    }
  }

  const handleDuration = (dur: number) => {
    setDuration(dur)
  }

  useEffect(() => {
    if (!playerRef.current || hasSeeked || start <= 0) return;
    const startTime = videoTime == 0 ? start : videoTime
    // console.log(startTime, start, videoTime);
    setLoad(false)
    playerRef.current.seekTo(startTime, 'seconds');
    setHasSeeked(true);
}, [start, hasSeeked, videoTime]);

  return (
    <div className="relative w-full h-full">
      <ReactPlayer
        ref={playerRef}
        url={`https://www.youtube.com/watch?v=${videoId}`}
        playing
        controls={false}
        onProgress={handleProgress}
        onDuration={handleDuration}
        width="100%"
        height="100%"
        config={{
          playerVars: {
            autoplay: 1,
            rel: 0,
            controls: 0,
            fs: 0,
          }
        }}
      />

      <div className="w-full h-1 bg-black bg-opacity-20 absolute bottom-0 left-0">
        <div className="h-1 bg-red-600" style={{ width: `${percentTime}%` }} />
      </div>
    </div>
  )
}

export default YouTubePlayer