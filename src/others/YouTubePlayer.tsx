import { useVideoManager } from '@/hooks'
import { useState, useRef, useEffect } from 'react'
import ReactPlayer from 'react-player/youtube'

const YouTubePlayer: React.FC<{ videoId: string, videoTime: number }> = ({ videoId, videoTime = 0 }) => {
  // const [percentTime, setPercentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [hasSeeked, setHasSeeked] = useState(false)
  const [isLoadVideo, setLoadVideo] = useState<boolean>(false)
  const playerRef = useRef<ReactPlayer>(null)
  const { setVideo, videoTimes } = useVideoManager()
  const videoData = videoId ? videoTimes?.[videoId] : null
  const start = videoData?.time || 0

  const handleProgress = (state: { playedSeconds: number }) => {
    const time = Math.round(state.playedSeconds)
    if (time === 0) return
    // const percent = (time / duration) * 100
    // setPercentTime(percent)
    if(!isLoadVideo){
      setLoadVideo(true)
      setVideo(videoId, time, duration)
      setTimeout(() => setLoadVideo(false), 7000)
    }
  }

  const handleDuration = (dur: number) => {
    setDuration(Math.round(dur))
  }

  useEffect(() => {
    if (!playerRef.current || hasSeeked || start <= 0) return;
    const startTime = videoTime == 0 ? start : videoTime
    
    playerRef.current.seekTo(startTime, 'seconds');
    setHasSeeked(true);
}, [start, hasSeeked, videoTime]);

  return (
    <>
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
              controls: 1,
            }
          }}
        />
        {/* <div className="w-full h-1 bg-black bg-opacity-20 absolute bottom-0 left-0">
          <div className="h-1 bg-red-600" style={{ width: `${percentTime}%` }} />
        </div> */}
      </div>
      <div className="absolute top-0 left-0 w-full h-[4em] pointer-events-auto z-20" style={{ cursor: 'default' }}/>
    </>
  )
}

export default YouTubePlayer