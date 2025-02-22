import React from 'react';
import { Image, StyleSheet } from 'react-native';

interface DynamicImageProps {
  uri: string;
}

const DynamicImage: React.FC<DynamicImageProps> = ({ uri }) => {
  return (
    <Image 
      source={{ uri }} 
      style={styles.cardImage} 
      resizeMode="cover" 
    />
  );
};

const styles = StyleSheet.create({
  cardImage: {
    width: '100%',
    height: 200, // Alto fijo
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default DynamicImage;
