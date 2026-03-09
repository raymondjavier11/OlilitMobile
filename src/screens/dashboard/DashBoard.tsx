import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  Platform,
  StatusBar,
  StyleSheet,
} from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import images from '../../constant/images';

// ─── Types ────────────────────────────────────────────────────────────────────
type FilterOption = 'Day' | 'Week' | 'Month' | 'MTD' | 'YTD' | 'Custom';

// ─── Single source of truth ───────────────────────────────────────────────────
const PAYOUT_DATA = [
  { label: 'Issued',   value: 140,  amount: '$129,300',  color: '#7352BF' },
  { label: 'Rejected', value: 50,  amount: '$10,300',   color: '#FF8950' },
  { label: 'Pending',  value: 128, amount: '$101,300', color: '#157347' },
];

// ─── Donut Chart ──────────────────────────────────────────────────────────────
const RADIUS = 54;
const STROKE = 14;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const DonutChart = ({ data }: { data: typeof PAYOUT_DATA }) => {
  const total = data.reduce((sum, s) => sum + s.value, 0);
  let accumulated = 0;

  const segments = data.map((seg) => {
    const dash = (seg.value / total) * CIRCUMFERENCE;
    const offset = -(accumulated / total) * CIRCUMFERENCE;
    accumulated += seg.value;
    return { ...seg, dash, offset };
  });

  return (
    <View className="w-[140px] h-[140px]">
      <Svg width={140} height={140} viewBox="0 0 140 140">
        <G rotation={-90} origin="70,70">
          {segments.map((seg, i) => (
            <Circle
              key={i}
              cx={70}
              cy={70}
              r={RADIUS}
              fill="none"
              stroke={seg.color}
              strokeWidth={STROKE}
              strokeDasharray={`${seg.dash} ${CIRCUMFERENCE - seg.dash}`}
              strokeDashoffset={seg.offset}
            />
          ))}
        </G>
      </Svg>
      {/* Center label — needs absolute, use StyleSheet for this */}
      <View style={StyleSheet.absoluteFillObject} className="justify-center items-center">
        <Text className="text-[10px] text-gray-400 leading-4">Total</Text>
        <Text className="text-[10px] text-gray-400 leading-4">Payouts</Text>
        <Text className="text-[18px] font-bold text-[#1A1D2E]">{total}</Text>
      </View>
    </View>
  );
};

// ─── Filter Dropdown ──────────────────────────────────────────────────────────
const FILTERS: FilterOption[] = ['Day', 'Week', 'Month', 'MTD', 'YTD', 'Custom'];

const FilterDropdown = ({
  visible,
  selected,
  onSelect,
  onClose,
  anchor,
}: {
  visible: boolean;
  selected: FilterOption;
  onSelect: (f: FilterOption) => void;
  onClose: () => void;
  anchor: { x: number; y: number; width: number };
}) => {
  if (!visible) return null;
  return (
    <Modal transparent animationType="fade" onRequestClose={onClose}>
      <TouchableOpacity style={StyleSheet.absoluteFill} onPress={onClose} activeOpacity={1} />
      <View
        className="absolute bg-white rounded-xl py-1 min-w-[90px] shadow-lg"
        style={{ top: anchor.y + 28, right: 16, elevation: 16 }}
      >
        {FILTERS.map((f) => (
          <TouchableOpacity
            key={f}
            className={`py-2 px-4 ${f === selected ? 'bg-green-50' : ''}`}
            onPress={() => { onSelect(f); onClose(); }}
          >
            <Text className={`text-[13px] ${f === selected ? 'text-green-500 font-semibold' : 'text-gray-500'}`}>
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </Modal>
  );
};

// ─── Main Dashboard ──────
const DashBoard = () => {
  const [filter, setFilter] = useState<FilterOption>('Week');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [anchor, setAnchor] = useState({ x: 0, y: 0, width: 0 });
  const filterRef = useRef<View>(null);

  const openDropdown = () => {
    filterRef.current?.measureInWindow((x, y, width) => {
      setAnchor({ x, y, width });
      setDropdownVisible(true);
    });
  };

  return (
    <View className="flex-1 bg-[#F8F9FA]">
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />

      {/* Header */}
      <View
        className="flex-row items-center justify-between px-5 pb-3 bg-[#F8F9FA]"
        style={{ paddingTop: Platform.OS === 'ios' ? 56 : 24 }}
      >
        <TouchableOpacity className="flex-row items-center">
          <Text className="text-[20px] font-bold text-[#1A1D2E] tracking-tight">Dashboard</Text>
          <Text className="text-[14px] text-gray-500 ml-1">▾</Text>
        </TouchableOpacity>
        <TouchableOpacity className="w-9 h-9 rounded-lg bg-white-100 justify-center items-center">
          <Image source={images.filterIcon} className="w-5 h-5" resizeMode="contain" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Payouts Overview Card */}
        <View className="bg-white rounded-2xl p-4 mb-3 shadow-sm" style={{ elevation: 3 }}>

          {/* Card Header */}
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-[15px] font-semibold text-[#1A1D2E]">Payouts Overview</Text>
            <View ref={filterRef}>
              <TouchableOpacity
                className="flex-row items-center bg-green-500 rounded-full px-3 py-1"
                onPress={openDropdown}
                activeOpacity={0.8}
              >
                <Text className="text-white text-[12px] font-semibold">{filter}</Text>
                <Text className="text-white text-[10px] ml-0.5">▾</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Chart + Legend */}
          <View className="flex-row items-center gap-5">
            <DonutChart data={PAYOUT_DATA} />

            <View className="flex-1 gap-2">
              {PAYOUT_DATA.map((item) => (
                <View key={item.label} className="flex-row items-center gap-2">
                  <View
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <View>
                    <Text className="text-[12px] text-gray-400">{item.label}</Text>
                    <Text className="text-[13px] font-semibold text-[#1A1D2E]">
                      {item.amount}
                      <Text className="text-[12px] font-normal text-gray-400"> ({item.value})</Text>
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Claimed & Retracted */}
        <View className="flex-row gap-3">

          <View className="flex-1 bg-white rounded-2xl p-4 shadow-sm" style={{ elevation: 3 }}>
            <View className="flex-row items-center gap-1.5 mb-2">
              <View className="w-2.5 h-2.5 rounded-full bg-green-500" />
              <Text className="text-[13px] text-gray-500 font-medium">Claimed</Text>
            </View>
            <Text className="text-[32px] font-bold text-[#1A1D2E] mb-1">123</Text>
            <Text className="text-[10px] text-gray-400">Last Updated: Feb 12, 2025</Text>
          </View>

          <View className="flex-1 bg-white rounded-2xl p-4 shadow-sm" style={{ elevation: 3 }}>
            <View className="flex-row items-center gap-1.5 mb-2">
              <View className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <Text className="text-[13px] text-gray-500 font-medium">Retracted</Text>
            </View>
            <Text className="text-[32px] font-bold text-[#1A1D2E] mb-1">98</Text>
            <Text className="text-[10px] text-gray-400">Last Updated: Feb 02, 2025</Text>
          </View>

        </View>
      </ScrollView>

      <FilterDropdown
        visible={dropdownVisible}
        selected={filter}
        onSelect={setFilter}
        onClose={() => setDropdownVisible(false)}
        anchor={anchor}
      />
    </View>
  );
};

export default DashBoard;