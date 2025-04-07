import { useVideoManager } from '@/hooks'
import React, { useState, useEffect, useRef } from 'react'
import ReactPlayer from 'react-player/youtube'

const YouTubePlayer: React.FC<{ videoId: string }> = ({ videoId }) => {
  const [percentTime, setPercentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [hasSeeked, setHasSeeked] = useState(false)

  const playerRef = useRef<ReactPlayer>(null)
  const { setVideo, videoTimes } = useVideoManager()
  const videoData = videoId ? videoTimes?.[videoId] : null
  const start = videoData?.time || 0

  const handleProgress = (state: { playedSeconds: number }) => {
    const time = Math.round(state.playedSeconds)
    if (time === 0) return
    const percent = (time / duration) * 100
    setPercentTime(percent)
    setVideo(videoId, time, duration)
  }

  const handleDuration = (dur: number) => {
    setDuration(dur)
  }

  useEffect(() => {
    if (playerRef.current && start > 0 && !hasSeeked) {
        playerRef.current.seekTo(start, 'seconds')
        setHasSeeked(true)
    }
}, [start, hasSeeked])

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
            rel: 0,
            controls: 0,
            fs: 0,
            disablekb: 1,
            modestbranding: 1
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
