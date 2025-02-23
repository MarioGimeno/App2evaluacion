// src/components/VideoPlayer.tsx
import React, { forwardRef } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Video, ResizeMode, VideoProps } from 'expo-av';

type VideoPlayerProps = VideoProps & {
  style?: StyleProp<ViewStyle>;
};

const VideoPlayer = forwardRef<Video, VideoPlayerProps>(({ style, ...props }, ref) => {
  return (
    <Video
      ref={ref}
      style={style}
      resizeMode={props.resizeMode || ResizeMode.COVER}
      {...props}
    />
  );
});

export default VideoPlayer;
