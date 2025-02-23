import React, { useState, useEffect } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

const { width } = Dimensions.get('window');

type DirectYoutubePlayerProps = {
  videoId: string;
};

const DirectYoutubePlayer: React.FC<DirectYoutubePlayerProps> = ({ videoId }) => {
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    setPlaying(true);
  }, []);

  return (
    <View style={styles.videoContainer}>
      <YoutubePlayer
        height={250}
        play={playing}
        mute={true}
        videoId={videoId}
        initialPlayerParams={
          {
            modestbranding: false,
            controls: false,
            rel: false,
            loop: true,         // Activa el loop
            playlist: videoId,    // Necesario para que el loop funcione
          } as any
        }
        onChangeState={(state) => console.log(state)}
        onReady={() => console.log('El video de YouTube está listo')}
      />
    </View>
  );
};

export default DirectYoutubePlayer;

const styles = StyleSheet.create({
  videoContainer: {
    width: width,
    height: 250,
  },
});
