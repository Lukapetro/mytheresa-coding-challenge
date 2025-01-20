import React, {memo} from 'react';
import {Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';
import {CATEGORY_STYLES, MovieCategory} from '../../types/movie';

const {width: screenWidth} = Dimensions.get('window');
const BACKDROP_HEIGHT = screenWidth * 0.5625; // 16:9 aspect ratio

interface MovieHeaderProps {
  backdropPath: string;
  category: MovieCategory;
}

export const MovieHeader = memo(
  ({backdropPath, category}: MovieHeaderProps) => {
    const style = CATEGORY_STYLES[category];

    return (
      <HeaderContainer>
        <BackdropImage
          testID="backdrop-image"
          source={{
            uri: `https://image.tmdb.org/t/p/w780${backdropPath}`,
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <Gradient
          testID="header-gradient"
          colors={['transparent', style.backgroundColor]}
          locations={[0, 1]}
        />
      </HeaderContainer>
    );
  },
);

MovieHeader.displayName = 'MovieHeader';

const HeaderContainer = styled.View`
  height: ${BACKDROP_HEIGHT}px;
  width: ${screenWidth}px;
`;

const BackdropImage = styled(FastImage)`
  height: ${BACKDROP_HEIGHT}px;
  width: ${screenWidth}px;
`;

const Gradient = styled(LinearGradient)`
  position: absolute;
  bottom: 0;
  height: ${BACKDROP_HEIGHT / 2}px;
  width: 100%;
`;
