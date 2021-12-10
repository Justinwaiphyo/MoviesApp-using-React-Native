import React from 'react'
import VideoPlayer from 'react-native-video-controls';

const Video = ({onClose}) => {
        return (
            <VideoPlayer
            fullscreenOrientation = "all"
            onBack = {()=>onClose()}
            onEnd = {() => onClose()}
            source={{uri: 'https://vjs.zencdn.net/v/oceans.mp4'}}
            />
        );
}

export default Video;