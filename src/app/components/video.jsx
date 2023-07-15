'use client'

import YouTube, {YouTubePlayer} from 'react-youtube'
import React, { useEffect, useState } from 'react';

let videoElement = null;

export default function Video({videoID}) {
  
  const [isPaused, setIsPaused] = useState(false);
  const [forward, setForward] = useState(null);
  const [backward, setBackward] = useState(null);

  const fastforward = () => {
    if (videoElement) {
      setForward(videoElement.target.getCurrentTime());
    }
  }

  const rewind = () => {
    if (videoElement) {
      setBackward(videoElement.target.getCurrentTime());
    }
  }

  const pause = () => {
    setIsPaused(true);
  };

  const play = () => {
    setIsPaused(false);
  };

  const opts = {
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        controls: 1,
      },
    };
    useEffect(() => {
      if (videoElement) {
        // Pause and Play video
        if (isPaused) {
          videoElement.target.pauseVideo();
        } else {
          videoElement.target.playVideo();
        }
      }
    }, [isPaused, videoElement]);

    useEffect(() => {
      if (videoElement) {
        videoElement.target.seekTo(forward + 2);
      }

    }, [forward]);

    useEffect(() => {
      if (videoElement) {
        videoElement.target.seekTo(backward - 2);
      }

    }, [backward]);
      
    const onReady = (event) => {
      event.target.seekTo(300);
      videoElement = event;
    }

      return (
        <div className='ytplayer'>
            <YouTube iframeClassName="video"  videoId={videoID} opts={opts} onReady={onReady} />
            <div class='mediaControls'>
              <button onClick={rewind} className='mediaButton'><img className='mediaIcon' src='rewind-button.png'/></button>
              <button onClick={play} className='mediaButton'><img className='mediaIcon' src='play.png'/></button>
              <button onClick={pause} className='mediaButton'><img className='mediaIcon' src='pause.png'/></button>
              <button onClick={fastforward} className='mediaButton'><img className='mediaIcon' src='fast-forward.png'/></button>
            </div>
        </div>
        
      )
}