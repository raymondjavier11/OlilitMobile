import React, { JSX } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Svg, { Path, Rect, Circle, Line } from 'react-native-svg';

// ─── Icons ────────────────────────────────────────────────────────────────────
const DealsIcon = ({ color }: { color: string }) => (
  <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
    <Path
      d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
      stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
    />
    <Path
      d="M14 2v6h6M16 13H8M16 17H8M10 9H8"
      stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
    />
  </Svg>
);

const PayoutsIcon = ({ color }: { color: string }) => (
  <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={12} r={9} stroke={color} strokeWidth={1.8} />
    <Path
      d="M12 6v2M12 16v2M9 9.5c0-1 1-1.5 3-1.5s3 .5 3 1.5-1 1.5-3 1.5-3 .5-3 1.5 1 1.5 3 1.5 3-.5 3-1.5"
      stroke={color} strokeWidth={1.8} strokeLinecap="round"
    />
  </Svg>
);

const DashboardIcon = ({ color }: { color: string }) => (
  <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
    <Rect x={3} y={3} width={7} height={7} rx={1} stroke={color} strokeWidth={1.8} />
    <Rect x={14} y={3} width={7} height={7} rx={1} stroke={color} strokeWidth={1.8} />
    <Rect x={3} y={14} width={7} height={7} rx={1} stroke={color} strokeWidth={1.8} />
    <Rect x={14} y={14} width={7} height={7} rx={1} stroke={color} strokeWidth={1.8} />
  </Svg>
);

const MoreIcon = ({ color }: { color: string }) => (
  <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
    <Line x1={3} y1={6} x2={21} y2={6} stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    <Line x1={3} y1={12} x2={21} y2={12} stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    <Line x1={3} y1={18} x2={21} y2={18} stroke={color} strokeWidth={1.8} strokeLinecap="round" />
  </Svg>
);

const TAB_ICONS: Record<string, (color: string) => JSX.Element> = {
  Deals:     (color) => <DealsIcon color={color} />,
  Payouts:   (color) => <PayoutsIcon color={color} />,
  DashBoard: (color) => <DashboardIcon color={color} />,
  More:      (color) => <MoreIcon color={color} />,
};

const ACTIVE_COLOR   = '#2DC653';
const INACTIVE_COLOR = '#A0A8B0';

// ─── Component ────────────────────────────────────────────────────────────────
const BottomNavBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  return (
    <View
      className="absolute bottom-0 left-0 right-0 flex-row bg-white rounded-3xl mx-4 px-2 py-2.5"
      style={{
        marginBottom: Platform.OS === 'ios' ? 28 : 16,
        elevation: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.12,
        shadowRadius: 16,
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel ?? options.title ?? route.name;
        const isFocused = state.index === index;
        const color = isFocused ? ACTIVE_COLOR : INACTIVE_COLOR;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            activeOpacity={0.7}
            className="flex-1 items-center justify-center gap-0.5"
          >
            <View className={`w-10 h-8 items-center justify-center rounded-xl ${isFocused ? 'bg-green-50' : ''}`}>
              {TAB_ICONS[route.name]?.(color)}
            </View>
            <Text
              className="text-[10px] font-medium tracking-wide"
              style={{ color }}
            >
              {typeof label === 'string' ? label : route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomNavBar;