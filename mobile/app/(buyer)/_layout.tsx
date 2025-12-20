import React, { useEffect } from 'react';
import { View, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');

// ADJUSTED: Increased from 10 to 20 for "a little space"
const MARGIN = 20; 
const TAB_BAR_WIDTH = width - (MARGIN * 2);

// Centered icon cluster width
const CONTENT_WIDTH_PERCENT = 0.8; 
const CONTENT_WIDTH = TAB_BAR_WIDTH * CONTENT_WIDTH_PERCENT;
const TAB_WIDTH = CONTENT_WIDTH / 4;

const BAR_HEIGHT = 60;
const RADIUS = 25; // Rounder corners for the padded look
const BUBBLE_SIZE = 44;

const AnimatedPath = Animated.createAnimatedComponent(Path);

function CustomTabBar({ state, descriptors, navigation }: any) {
  const translateX = useSharedValue(0);

  useEffect(() => {
    translateX.value = withSpring(state.index * TAB_WIDTH, {
      damping: 20,
      stiffness: 150,
      mass: 0.8,
    });
  }, [state.index]);

  const animatedProps = useAnimatedStyle(() => {
    const offset = (TAB_BAR_WIDTH - CONTENT_WIDTH) / 2;
    const x = translateX.value + TAB_WIDTH / 2 + offset;
    
    const d = `
      M${RADIUS},0 
      L${x - 45},0 
      C${x - 25},0 ${x - 25},38 ${x},38 
      C${x + 25},38 ${x + 25},0 ${x + 45},0 
      L${TAB_BAR_WIDTH - RADIUS},0 
      Q${TAB_BAR_WIDTH},0 ${TAB_BAR_WIDTH},${RADIUS} 
      L${TAB_BAR_WIDTH},${BAR_HEIGHT - RADIUS} 
      Q${TAB_BAR_WIDTH},${BAR_HEIGHT} ${TAB_BAR_WIDTH - RADIUS},${BAR_HEIGHT} 
      L${RADIUS},${BAR_HEIGHT} 
      Q0,${BAR_HEIGHT} 0,${BAR_HEIGHT - RADIUS} 
      L0,${RADIUS} 
      Q0,0 ${RADIUS},0 
      Z
    `;
    return { d };
  });

  const bubbleStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: -13 }
    ],
  }));

  return (
    <View style={[styles.container, { width: TAB_BAR_WIDTH, left: MARGIN }]}>
      <Svg width={TAB_BAR_WIDTH} height={BAR_HEIGHT + 20} style={styles.svgAbsolute}>
        <AnimatedPath animatedProps={animatedProps as any} fill="#1A1A1A" />
      </Svg>

      <View style={styles.centeredContentWrapper}>
        <Animated.View style={[styles.bubble, bubbleStyle]} />

        <View style={styles.content}>
          {state.routes.map((route: any, index: number) => {
            const isFocused = state.index === index;
            const onPress = () => {
              const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
              if (!isFocused && !event.defaultPrevented) navigation.navigate(route.name);
            };

            let iconName: any = route.name === 'index' ? (isFocused ? 'home' : 'home-outline') : 
                                route.name === 'search' ? 'search' : 
                                route.name === 'orders' ? (isFocused ? 'receipt' : 'receipt-outline') : 
                                (isFocused ? 'person' : 'person-outline');

            return (
              <TouchableOpacity key={index} onPress={onPress} activeOpacity={1} style={styles.tabItem}>
                <Ionicons
                  name={iconName}
                  size={20}
                  color={isFocused ? '#FFFFFF' : '#888888'}
                  style={{ marginTop: isFocused ? -32 : 0 }} 
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
}

export default function BuyerLayout() {
  return (
    <Tabs tabBar={(props) => <CustomTabBar {...props} />} screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="search" />
      <Tabs.Screen name="orders" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 25, 
    height: BAR_HEIGHT,
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 10,
  },
  svgAbsolute: {
    position: 'absolute',
    top: 0,
  },
  centeredContentWrapper: {
    width: CONTENT_WIDTH,
    height: '100%',
    alignSelf: 'center',
  },
  content: {
    flexDirection: 'row',
    height: '100%',
    width: '100%',
    zIndex: 20,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubble: {
    position: 'absolute',
    width: BUBBLE_SIZE,
    height: BUBBLE_SIZE,
    borderRadius: BUBBLE_SIZE / 2,
    backgroundColor: '#367C3D',
    left: (TAB_WIDTH - BUBBLE_SIZE) / 2,
    top: 4, 
    zIndex: 10,
    shadowColor: '#367C3D',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
});