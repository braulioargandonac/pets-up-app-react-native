import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  WithSpringConfig,
  withTiming,
  Easing,
} from 'react-native-reanimated';

import { PetSummary } from '@/types/pet.types';
import { PetCard } from '@/components/PetCard/PetCard';
import { styles } from './PetDeck.styles';
import { scheduleOnRN } from 'react-native-worklets';

interface PetDeckProps {
  pets: PetSummary[];
  onSwipeOff: () => void;
}

const SWIPE_THRESHOLD = 120;
const springConfig: WithSpringConfig = { damping: 15, stiffness: 100 };
const timingConfig = {
  duration: 300,
  easing: Easing.out(Easing.ease),
};

export function PetDeck({ pets, onSwipeOff }: PetDeckProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const translateX = useSharedValue(0);
  const rotate = useSharedValue(0);

  const goToNextCard = () => {
    if (currentIndex >= pets.length - 1) {
      scheduleOnRN(onSwipeOff);
    }
    setCurrentIndex(currentIndex + 1);
  };

  useEffect(() => {
    translateX.value = 0;
    rotate.value = 0;
  }, [currentIndex, translateX, rotate]);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
      rotate.value = (event.translationX / 300) * 20;
    })
    .onEnd((event) => {
      if (Math.abs(event.translationX) > SWIPE_THRESHOLD) {
        const destination = event.translationX > 0 ? 500 : -500;
        translateX.value = withTiming(
          destination,
          timingConfig,
          (isFinished) => {
            if (isFinished) {
              scheduleOnRN(goToNextCard);
            }
          },
        );
      } else {
        translateX.value = withSpring(0, springConfig);
        rotate.value = withSpring(0, springConfig);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { rotate: `${rotate.value}deg` },
    ],
  }));

  return (
    <View style={styles.container}>
      {pets
        .map((pet, index) => {
          if (index < currentIndex) {
            return null;
          }
          if (index === currentIndex) {
            return (
              <GestureDetector gesture={panGesture} key={pet.id}>
                <Animated.View style={[styles.cardContainer, animatedStyle]}>
                  <PetCard pet={pet} />
                </Animated.View>
              </GestureDetector>
            );
          }
          if (index === currentIndex + 1) {
            return (
              <Animated.View style={[styles.cardContainer]} key={pet.id}>
                <PetCard pet={pet} />
              </Animated.View>
            );
          }
          return null;
        })
        .reverse()}
    </View>
  );
}