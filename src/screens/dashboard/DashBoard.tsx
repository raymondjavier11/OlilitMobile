import React, {
  useState,
  useRef,
  useMemo,
  useCallback,
  memo,
} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  StatusBar,
  StyleSheet,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, G } from 'react-native-svg';
import images from '../../constant/images';

// Types 
type FilterOption = 'Day' | 'Week' | 'Month' | 'MTD' | 'YTD' | 'Custom';
type PayoutItem   = { label: string; value: number; amount: string; color: string };

const FILTERS: FilterOption[]  = ['Day', 'Week', 'Month', 'MTD', 'YTD', 'Custom'];
const WEEKDAY_LABELS           = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const MONTH_NAMES              = ['January','February','March','April','May','June','July','August','September','October','November','December'];


const C_FOLLOW    = '#60C3F5';  // blue
const C_NEW       = '#F5C842';  // yellow/gold
const C_SETTLED   = '#FC8AA1';  // pink/red for settled

const C_ISSUED    = '#7352BF';
const C_REJECTED  = '#FF8950';
const C_PENDING   = '#22C55E';


// Chart 1 — counts
type BarRow = { label: string; follow: number; newClient: number };

const FUNDED_DEALS_DATA: BarRow[] = [
  { label: 'Apr\n2025', follow: 8,  newClient: 30 },
  { label: 'May\n2025', follow: 27, newClient: 24 },
  { label: 'Jun\n2025', follow: 23, newClient: 25 },
  { label: 'Jul\n2025', follow: 30, newClient: 31 },
  { label: 'Aug\n2025', follow: 26, newClient: 44 },
  { label: 'Sep\n2025', follow: 9,  newClient: 10 },
];

// Chart 2 — dollar amounts 
type BarRowAmt = { label: string; follow: number; newClient: number };
const FUNDED_DEALS_DATA2: BarRowAmt[] = [
  { label: 'Apr\n2025', follow: 16,  newClient: 81  },
  { label: 'May\n2025', follow: 53,  newClient: 53  },
  { label: 'Jun\n2025', follow: 64,  newClient: 64  },
  { label: 'Jul\n2025', follow: 53,  newClient: 128 },
  { label: 'Aug\n2025', follow: 66,  newClient: 128 },
  { label: 'Sep\n2025', follow: 1,   newClient: 6   },
];

// Chart 3 — settled deals count 
type SettledRow = { label: string; val: number };
const SETTLED_DEALS_DATA: SettledRow[] = [
  { label: 'Jan\n2025', val: 25 },
  { label: 'Feb\n2025', val: 25 },
  { label: 'Mar\n2025', val: 28 },
  { label: 'Apr\n2025', val: 40 },
  { label: 'May\n2025', val: 51 },
  { label: 'Jun\n2025', val: 48 },
  { label: 'July\n2025', val: 61 },
  { label: 'Aug\n2025', val: 70 },
];

// Chart 4 — settled deals $ 
type SettledRow2 = { label: string; val: number; color: string };
const SETTLED_DEALS_DATA2: SettledRow2[] = [
  { label: 'Jan\n2025', val: 46,  color: '#8979FF' },
  { label: 'Feb\n2025', val: 94,  color: '#8979FF' },
  { label: 'Mar\n2025', val: 64,  color: '#8979FF' },
  { label: 'Apr\n2025', val: 103, color: '#8979FF' },
  { label: 'May\n2025', val: 106, color: '#8979FF' },
  { label: 'Jun\n2025', val: 123, color: '#8979FF' },
  { label: 'Jul\n2025', val: 174, color: '#8979FF' },
  { label: 'Aug\n2025', val: 194, color: '#8979FF' },
];

const PAYOUT_DATA: PayoutItem[] = [
  { label: 'Issued',   value: 54,  amount: '$12,300',  color: '#FB923C' },
  { label: 'Rejected', value: 13,  amount: '$1,300',   color: '#EF4444' },
  { label: 'Pending',  value: 128, amount: '$101,300', color: '#22C55E' },
];

// Pre-computed donut segments
const RADIUS        = 54;
const STROKE        = 14;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const PAYOUT_TOTAL  = PAYOUT_DATA.reduce((s, d) => s + d.value, 0);
const DONUT_SEGMENTS = (() => {
  let acc = 0;
  return PAYOUT_DATA.map((seg) => {
    const dash   = (seg.value / PAYOUT_TOTAL) * CIRCUMFERENCE;
    const offset = -(acc / PAYOUT_TOTAL) * CIRCUMFERENCE;
    acc += seg.value;
    return { ...seg, dash, offset };
  });
})();

// Shadow constants
const CARD_SHADOW = { elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.07, shadowRadius: 6 } as const;
const EDGE_SHADOW = { elevation: 4, shadowColor: '#22C55E', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.4, shadowRadius: 6 } as const;
const DONE_SHADOW = { elevation: 4, shadowColor: '#22C55E', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 8 } as const;
const CAL_SHADOW  = { elevation: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.2, shadowRadius: 24 } as const;

// ─── Date helpers 
function getDaysInMonth(y: number, m: number)   { return new Date(y, m + 1, 0).getDate(); }
function getFirstDayOfMonth(y: number, m: number) { return new Date(y, m, 1).getDay(); }
function isBetween(t: number, s: number, e: number) { return t > s && t < e; }
function toMidnight(y: number, m: number, d: number) { return new Date(y, m, d).setHours(0, 0, 0, 0); }
function formatDate(d: Date | null) {
  if (!d) return '—';
  return `${MONTH_NAMES[d.getMonth()].slice(0, 3)} ${d.getDate()}, ${d.getFullYear()}`;
}


// SECTION HEADER
type SectionHeaderProps = {
  title: string;
  recordCount?: string;
  filterLabel: string;
  onOpenDropdown: () => void;
};

const SectionHeader = memo(({ title, recordCount, filterLabel, onOpenDropdown }: SectionHeaderProps) => (
  <View className="mb-2">
    <View className="flex-row items-center justify-between">
      <Text className="text-[14px] font-semibold text-[#1A1D2E]">{title}</Text>
      <TouchableOpacity
        className="flex-row items-center bg-green-500 rounded-full px-3 py-1"
        onPress={onOpenDropdown}
        activeOpacity={0.8}
      >
        <Text className="text-white text-[11px] font-semibold">{filterLabel}</Text>
        <Text className="text-white text-[10px] ml-0.5">▾</Text>
      </TouchableOpacity>
    </View>
    {recordCount ? (
      <View className="flex-row items-center mt-1 gap-1">
        <Text className="text-[11px] text-gray-400">Record Count:</Text>
        <View className="bg-green-500 rounded-md px-2 py-0.5">
          <Text className="text-white text-[11px] font-bold">{recordCount}</Text>
        </View>
      </View>
    ) : null}
  </View>
));


const ChartLegend = memo(({ items }: { items: { label: string; color: string }[] }) => (
  <View className="flex-row gap-4 mt-3 flex-wrap">
    {items.map((item) => (
      <View key={item.label} className="flex-row items-center gap-1.5">
        <View className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
        <Text className="text-[10px] text-gray-500">{item.label}</Text>
      </View>
    ))}
  </View>
));


// CHART 1 & 2 — 
const BAR_LEGENDS_COUNT = [
  { label: 'Follow – On Client', color: C_FOLLOW },
  { label: 'New Client',         color: C_NEW    },
];

const X_TICKS_100  = [0, 20, 40, 60, 80, 100];
const X_TICKS_250  = [0, 50, 100, 150, 200, 250];
const Y_LABEL_W    = 44; 

type HBarChartProps = {
  data: BarRow[];
  maxVal: number;
  xTicks: number[];
  isDollar?: boolean;
};

const HBarChart = memo(({ data, maxVal, xTicks, isDollar = false }: HBarChartProps) => {
  const fmt = (v: number) => isDollar ? `$${v}K` : `${v}`;

  return (
    <View className="mt-2">
      {/* X-axis tick labels */}
      <View style={{ marginLeft: Y_LABEL_W, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 }}>
        {xTicks.map((t) => (
          <Text key={t} className="text-[9px] text-gray-400" style={{ minWidth: 0 }}>{isDollar ? t : t}</Text>
        ))}
      </View>

      {/* Chart area with grid lines behind bars */}
      <View style={{ marginLeft: Y_LABEL_W }}>
        {/* Grid lines */}
        <View style={StyleSheet.absoluteFill} className="flex-row justify-between" pointerEvents="none">
          {xTicks.map((_, i) => (
            <View key={i} className="w-px bg-gray-100 h-full" />
          ))}
        </View>

        {/* Rows */}
        {data.map((row) => {
          const followPx  = (row.follow    / maxVal) * 100;
          const newClPx   = (row.newClient / maxVal) * 100;
          const total     = row.follow + row.newClient;

          return (
            <View key={row.label} className="flex-row items-center mb-3">
              {/* Month label — pulled left of chart area */}
              <Text
                className="text-[9px] text-gray-500 text-right"
                style={{ position: 'absolute', right: '100%', width: Y_LABEL_W - 4, lineHeight: 13 }}
              >
                {row.label}
              </Text>

              {/* Two bars stacked vertically */}
              <View className="flex-1 gap-0.5">
                {/* Follow bar */}
                <View className="flex-row items-center">
                  <View
                    className="h-[18px] rounded-sm justify-center items-center overflow-hidden"
                    style={{ width: `${followPx}%`, backgroundColor: C_FOLLOW, minWidth: row.follow > 0 ? 24 : 0 }}
                  >
                    {row.follow > 0 && (
                      <Text className="text-[9px] font-semibold text-white px-1" numberOfLines={1}>
                        {fmt(row.follow)}
                      </Text>
                    )}
                  </View>
                </View>

                {/* New Client bar */}
                <View className="flex-row items-center">
                  <View
                    className="h-[18px] rounded-sm justify-center items-center overflow-hidden"
                    style={{ width: `${newClPx}%`, backgroundColor: C_NEW, minWidth: row.newClient > 0 ? 24 : 0 }}
                  >
                    {row.newClient > 0 && (
                      <Text className="text-[9px] font-semibold text-white px-1" numberOfLines={1}>
                        {fmt(row.newClient)}
                      </Text>
                    )}
                  </View>
                  {/* Total at end of row */}
                  <Text className="text-[9px] text-gray-400 ml-1">{isDollar ? `$${total}K` : total}</Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>

      <Text className="text-[10px] text-gray-400 text-center mt-1">Closing Date</Text>
      <ChartLegend items={BAR_LEGENDS_COUNT} />
    </View>
  );
});

const FundedDealsCard1 = memo(({ filterLabel, onOpen }: { filterLabel: string; onOpen: () => void }) => (
  <View className="bg-white rounded-2xl p-4 mb-3" style={CARD_SHADOW}>
    <SectionHeader title="Recent Funded Deals" recordCount="287" filterLabel={filterLabel} onOpenDropdown={onOpen} />
    <HBarChart data={FUNDED_DEALS_DATA} maxVal={100} xTicks={X_TICKS_100} />
  </View>
));

const FundedDealsCard2 = memo(({ filterLabel, onOpen }: { filterLabel: string; onOpen: () => void }) => (
  <View className="bg-white rounded-2xl p-4 mb-3" style={CARD_SHADOW}>
    <SectionHeader title="Recent Funded Deals" recordCount="$732k" filterLabel={filterLabel} onOpenDropdown={onOpen} />
    <HBarChart data={FUNDED_DEALS_DATA2} maxVal={250} xTicks={X_TICKS_250} isDollar />
  </View>
));


// CHART 3 — Recent Settled Deals count 

const HSinglePinkChart = memo(({ data }: { data: SettledRow[] }) => {
  const maxVal = Math.max(...data.map(d => d.val));
  const xTicks = [0, 20, 40, 60, 80, 100];
  return (
    <View className="mt-2">
      {/* X tick labels */}
      <View style={{ marginLeft: Y_LABEL_W, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 }}>
        {xTicks.map((t) => (
          <Text key={t} className="text-[9px] text-gray-400">{t}</Text>
        ))}
      </View>
      <View style={{ marginLeft: Y_LABEL_W }}>
        {/* Vertical grid lines */}
        <View style={StyleSheet.absoluteFill} className="flex-row justify-between" pointerEvents="none">
          {xTicks.map((_, i) => <View key={i} className="w-px bg-gray-100 h-full" />)}
        </View>
        {data.map((row) => {
          const pct = (row.val / 100) * 100; // x-axis max = 100
          return (
            <View key={row.label} className="flex-row items-center mb-3">
              <Text
                className="text-[9px] text-gray-500 text-right"
                style={{ position: 'absolute', right: '100%', width: Y_LABEL_W - 4, lineHeight: 13 }}
              >
                {row.label}
              </Text>
              <View className="flex-1 flex-row items-center">
                <View
                  className="h-[22px] rounded-sm"
                  style={{ width: `${pct}%`, backgroundColor: C_SETTLED, minWidth: 4 }}
                />
                <Text className="text-[9px] text-gray-500 ml-1.5 font-medium">{row.val}</Text>
              </View>
            </View>
          );
        })}
      </View>
      <Text className="text-[10px] text-gray-400 text-center mt-1">Closing Date</Text>
    </View>
  );
});

const SettledDealsCard1 = memo(({ filterLabel, onOpen }: { filterLabel: string; onOpen: () => void }) => (
  <View className="bg-white rounded-2xl p-4 mb-3" style={CARD_SHADOW}>
    <SectionHeader title="Recent Settled Deals" recordCount="287" filterLabel={filterLabel} onOpenDropdown={onOpen} />
    <HSinglePinkChart data={SETTLED_DEALS_DATA} />
  </View>
));


// CHART 4 — Recent Settled Deals $ 

const HSingleAmtChart = memo(({ data }: { data: SettledRow2[] }) => {
  const maxVal = 250;
  const xTicks = [0, 50, 100, 150, 200, 250];
  return (
    <View className="mt-2">
      {/* X tick labels */}
      <View style={{ marginLeft: Y_LABEL_W, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 }}>
        {xTicks.map((t) => (
          <Text key={t} className="text-[9px] text-gray-400">{t === 0 ? '0K' : `${t}K`}</Text>
        ))}
      </View>
      <View style={{ marginLeft: Y_LABEL_W }}>
        {/* Vertical grid lines */}
        <View style={StyleSheet.absoluteFill} className="flex-row justify-between" pointerEvents="none">
          {xTicks.map((_, i) => <View key={i} className="w-px bg-gray-100 h-full" />)}
        </View>
        {data.map((row) => {
          const pct = (row.val / maxVal) * 100;
          return (
            <View key={row.label} className="flex-row items-center mb-3">
              <Text
                className="text-[9px] text-gray-500 text-right"
                style={{ position: 'absolute', right: '100%', width: Y_LABEL_W - 4, lineHeight: 13 }}
              >
                {row.label}
              </Text>
              <View className="flex-1 flex-row items-center">
                <View
                  className="h-[22px] rounded-sm flex-row items-center justify-end pr-1 overflow-hidden"
                  style={{ width: `${pct}%`, backgroundColor: row.color, minWidth: 32 }}
                >
                  <Text className="text-[9px] font-semibold text-white" numberOfLines={1}>${row.val}K</Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>
      <Text className="text-[10px] text-gray-400 text-center mt-1">Closing Date</Text>
    </View>
  );
});

const SettledDealsCard2 = memo(({ filterLabel, onOpen }: { filterLabel: string; onOpen: () => void }) => (
  <View className="bg-white rounded-2xl p-4 mb-3" style={CARD_SHADOW}>
    <SectionHeader title="Recent Settled Deals $" recordCount="$287K" filterLabel={filterLabel} onOpenDropdown={onOpen} />
    <HSingleAmtChart data={SETTLED_DEALS_DATA2} />
  </View>
));

// PAYOUTS OVERVIEW — donut + legend matching screen 4

const DonutChart = memo(() => (
  <View style={{ width: 110, height: 110 }}>
    <Svg width={110} height={110} viewBox="0 0 140 140">
      <G rotation={-90} origin="70,70">
        {DONUT_SEGMENTS.map((seg, i) => (
          <Circle
            key={i} cx={70} cy={70} r={RADIUS}
            fill="none" stroke={seg.color} strokeWidth={STROKE}
            strokeDasharray={`${seg.dash} ${CIRCUMFERENCE - seg.dash}`}
            strokeDashoffset={seg.offset}
          />
        ))}
      </G>
    </Svg>
    <View style={StyleSheet.absoluteFillObject} className="justify-center items-center">
      <Text className="text-[8px] text-gray-400 leading-3 text-center">Total{'\n'}Payouts</Text>
      <Text className="text-[15px] font-bold text-[#1A1D2E]">{PAYOUT_TOTAL}</Text>
    </View>
  </View>
));

const LegendItem = memo(({ item }: { item: PayoutItem }) => (
  <View className="flex-row items-start gap-1.5 mb-2">
    <View className="w-2 h-2 rounded-full mt-0.5" style={{ backgroundColor: item.color }} />
    <View>
      <Text className="text-[11px] font-semibold text-[#1A1D2E]">{item.label}</Text>
      <Text className="text-[10px] text-gray-400">{item.amount} ({item.value})</Text>
    </View>
  </View>
));

const PayoutsCard = memo(({ filterLabel, onOpenDropdown }: { filterLabel: string; onOpenDropdown: () => void }) => (
  <View className="bg-white rounded-2xl p-4 mb-3" style={CARD_SHADOW}>
    <View className="flex-row items-center justify-between mb-3">
      <Text className="text-[14px] font-semibold text-[#1A1D2E]">Payouts Overview</Text>
      <TouchableOpacity
        className="flex-row items-center bg-green-500 rounded-full px-3 py-1"
        onPress={onOpenDropdown} activeOpacity={0.8}
      >
        <Text className="text-white text-[11px] font-semibold">{filterLabel}</Text>
        <Text className="text-white text-[10px] ml-0.5">▾</Text>
      </TouchableOpacity>
    </View>
    <View className="flex-row items-center gap-4">
      <DonutChart />
      <View className="flex-1">
        {PAYOUT_DATA.map((item) => <LegendItem key={item.label} item={item} />)}
      </View>
    </View>
  </View>
));

// STAT CARDS — matching screen 4 layout

const StatCards = memo(() => (
  <View className="flex-row gap-3 mb-3">
    <View className="flex-1 bg-white rounded-2xl p-4" style={CARD_SHADOW}>
      <View className="flex-row items-center gap-1.5 mb-1">
        <View className="w-2.5 h-2.5 rounded-full bg-green-400" />
        <Text className="text-[12px] text-gray-500 font-semibold">Claimed</Text>
      </View>
      <Text className="text-[30px] font-bold text-[#1A1D2E] my-1">123</Text>
      <Text className="text-[9px] text-gray-400">Last Updated: Feb 12, 2025</Text>
    </View>
    <View className="flex-1 bg-white rounded-2xl p-4" style={CARD_SHADOW}>
      <View className="flex-row items-center gap-1.5 mb-1">
        <View className="w-2.5 h-2.5 rounded-full bg-red-400" />
        <Text className="text-[12px] text-gray-500 font-semibold">Retracted</Text>
      </View>
      <Text className="text-[30px] font-bold text-[#1A1D2E] my-1">98</Text>
      <Text className="text-[9px] text-gray-400">Last Updated: Feb 12, 2025</Text>
    </View>
  </View>
));


// CALENDAR

type DayCellProps = {
  day: number; type: 'prev' | 'current' | 'next';
  isStart: boolean; isEnd: boolean; inRange: boolean;
  isToday: boolean; showStrip: boolean; onPress: () => void;
};

const DayCell = memo(({ day, type, isStart, isEnd, inRange, isToday, showStrip, onPress }: DayCellProps) => {
  const isEdge    = isStart || isEnd;
  const isCurrent = type === 'current';
  return (
    <Pressable onPress={onPress} className="flex-1 h-9 items-center justify-center">
      {showStrip && (
        <View className="absolute top-1 bottom-1 bg-green-100"
          style={{ left: isStart ? '50%' : 0, right: isEnd ? '50%' : 0 }} />
      )}
      <View className={`w-[30px] h-[30px] rounded-full items-center justify-center z-10${isEdge ? ' bg-green-500' : ''}`}
        style={isEdge ? EDGE_SHADOW : undefined}>
        <Text className={`text-[12px] ${
          !isCurrent ? 'text-gray-300' : isEdge ? 'text-white font-bold' :
          isToday ? 'text-green-500 font-bold' : inRange ? 'text-[#1A1D2E] font-medium' : 'text-[#1A1D2E]'
        }`}>{day}</Text>
      </View>
    </Pressable>
  );
});

type CalState = { rangeStart: Date | null; rangeEnd: Date | null; selectingEnd: boolean };

const CalendarModal = memo(({ visible, onClose, onConfirm }: {
  visible: boolean; onClose: () => void; onConfirm: (s: Date, e: Date) => void;
}) => {
  const todayRef   = useRef(new Date());
  const today      = todayRef.current;
  const [viewYear,  setViewYear]  = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [cal, setCal] = useState<CalState>({ rangeStart: null, rangeEnd: null, selectingEnd: false });

  const rows = useMemo(() => {
    const dim    = getDaysInMonth(viewYear, viewMonth);
    const first  = getFirstDayOfMonth(viewYear, viewMonth);
    const prev   = getDaysInMonth(viewYear, viewMonth === 0 ? 11 : viewMonth - 1);
    const cells: { day: number; type: 'prev' | 'current' | 'next' }[] = [];
    for (let i = 0; i < first; i++)  cells.push({ day: prev - first + 1 + i, type: 'prev' });
    for (let d = 1; d <= dim; d++)   cells.push({ day: d, type: 'current' });
    for (let d = 1, r = 42 - cells.length; d <= r; d++) cells.push({ day: d, type: 'next' });
    const rs: typeof cells[] = [];
    for (let i = 0; i < cells.length; i += 7) rs.push(cells.slice(i, i + 7));
    return rs;
  }, [viewYear, viewMonth]);

  const prevMonth = useCallback(() => setViewMonth(m => { if (m === 0) { setViewYear(y => y - 1); return 11; } return m - 1; }), []);
  const nextMonth = useCallback(() => setViewMonth(m => { if (m === 11) { setViewYear(y => y + 1); return 0; } return m + 1; }), []);

  const handleDayPress = useCallback((day: number) => {
    const tapped = new Date(viewYear, viewMonth, day);
    setCal(prev => {
      if (!prev.selectingEnd) return { rangeStart: tapped, rangeEnd: null, selectingEnd: true };
      const [s, e] = tapped < (prev.rangeStart as Date) ? [tapped, prev.rangeStart as Date] : [prev.rangeStart as Date, tapped];
      return { rangeStart: s, rangeEnd: e, selectingEnd: false };
    });
  }, [viewYear, viewMonth]);

  const handleClear = useCallback(() => setCal({ rangeStart: null, rangeEnd: null, selectingEnd: false }), []);
  const handleDone  = useCallback(() => { if (cal.rangeStart && cal.rangeEnd) onConfirm(cal.rangeStart, cal.rangeEnd); onClose(); }, [cal, onConfirm, onClose]);

  const startTs   = cal.rangeStart ? toMidnight(cal.rangeStart.getFullYear(), cal.rangeStart.getMonth(), cal.rangeStart.getDate()) : null;
  const endTs     = cal.rangeEnd   ? toMidnight(cal.rangeEnd.getFullYear(),   cal.rangeEnd.getMonth(),   cal.rangeEnd.getDate())   : null;
  const todayTs   = toMidnight(today.getFullYear(), today.getMonth(), today.getDate());
  const canConfirm = !!(cal.rangeStart && cal.rangeEnd);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={StyleSheet.absoluteFill} className="bg-black/40" onPress={onClose} />
      <View className="absolute left-4 right-4 top-[22%] bg-white rounded-[20px] p-4" style={CAL_SHADOW}>
        {/* Range row */}
        <View className="flex-row items-center justify-center bg-gray-50 rounded-xl p-2.5 mb-4 gap-3">
          <View className="flex-1 items-center">
            <Text className="text-[9px] text-gray-400 font-semibold tracking-widest mb-0.5">FROM</Text>
            <Text className={`text-[11px] font-bold ${cal.rangeStart ? 'text-green-500' : 'text-gray-400'}`}>{formatDate(cal.rangeStart)}</Text>
          </View>
          <Text className="text-gray-300 text-base">→</Text>
          <View className="flex-1 items-center">
            <Text className="text-[9px] text-gray-400 font-semibold tracking-widest mb-0.5">TO</Text>
            <Text className={`text-[11px] font-bold ${cal.rangeEnd ? 'text-green-500' : 'text-gray-400'}`}>
              {cal.rangeEnd ? formatDate(cal.rangeEnd) : (cal.selectingEnd ? 'Pick end...' : '—')}
            </Text>
          </View>
        </View>
        {/* Month nav */}
        <View className="flex-row items-center justify-between mb-3">
          <TouchableOpacity onPress={prevMonth} className="w-7 h-7 rounded-full bg-gray-100 justify-center items-center">
            <Text className="text-gray-500 text-base">‹</Text>
          </TouchableOpacity>
          <Text className="text-[14px] font-bold text-[#1A1D2E]">{MONTH_NAMES[viewMonth]} {viewYear}</Text>
          <TouchableOpacity onPress={nextMonth} className="w-7 h-7 rounded-full bg-gray-100 justify-center items-center">
            <Text className="text-gray-500 text-base">›</Text>
          </TouchableOpacity>
        </View>
        {/* Weekday headers */}
        <View className="flex-row mb-1">
          {WEEKDAY_LABELS.map((d, i) => <Text key={i} className="flex-1 text-center text-[11px] font-semibold text-gray-400 py-1">{d}</Text>)}
        </View>
        {/* Grid */}
        {rows.map((row, ri) => (
          <View key={ri} className="flex-row mb-0.5">
            {row.map((cell, ci) => {
              const isCurrent = cell.type === 'current';
              const cellTs    = isCurrent ? toMidnight(viewYear, viewMonth, cell.day) : 0;
              const isStart   = isCurrent && !!startTs && cellTs === startTs;
              const isEnd     = isCurrent && !!endTs   && cellTs === endTs;
              const inRange   = isCurrent && !!startTs && !!endTs && isBetween(cellTs, startTs, endTs);
              const isToday   = isCurrent && cellTs === todayTs;
              const showStrip = isCurrent && (inRange || (isStart && !!endTs) || (isEnd && !!startTs));
              return (
                <DayCell key={ci} day={cell.day} type={cell.type}
                  isStart={isStart} isEnd={isEnd} inRange={inRange}
                  isToday={isToday} showStrip={showStrip}
                  onPress={isCurrent ? () => handleDayPress(cell.day) : () => {}} />
              );
            })}
          </View>
        ))}
        {cal.selectingEnd && <Text className="text-center text-[10px] text-gray-400 mt-1">Tap a date to set end of range</Text>}
        <View className="flex-row gap-2.5 mt-4">
          <TouchableOpacity onPress={handleClear} className="flex-1 py-3 rounded-xl bg-gray-200 items-center">
            <Text className="text-[13px] font-semibold text-gray-500">Clear</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDone} disabled={!canConfirm}
            className={`flex-1 py-3 rounded-xl bg-green-500 items-center${!canConfirm ? ' opacity-50' : ''}`}
            style={DONE_SHADOW}>
            <Text className="text-[13px] font-bold text-white">Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
});

// FILTER DROPDOWN
const FilterDropdown = memo(({
  visible, selected, onSelect, onClose, anchorY,
}: {
  visible: boolean; selected: FilterOption;
  onSelect: (f: FilterOption) => void; onClose: () => void; anchorY: number;
}) => {
  if (!visible) return null;
  return (
    <>
      <Pressable style={[StyleSheet.absoluteFill, { zIndex: 99 }]} onPress={onClose} />
      <View style={[styles.dropdown, { top: anchorY + 28 }]}>
        {FILTERS.map((f) => (
          <TouchableOpacity key={f}
            className={`py-2 px-4${f === selected ? ' bg-green-50' : ''}`}
            onPress={() => { onSelect(f); onClose(); }}>
            <Text className={`text-[13px]${f === selected ? ' text-green-500 font-semibold' : ' text-gray-500'}`}>{f}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
});


// MAIN DASHBOARD
const DashBoard = () => {
  const [filter,          setFilter]          = useState<FilterOption>('Week');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [customRange,     setCustomRange]     = useState<{ start: Date; end: Date } | null>(null);
  const [anchorY,         setAnchorY]         = useState(0);
  const anchorRef = useRef<View>(null);

  const handleAnchorLayout = useCallback(() => {
    anchorRef.current?.measureInWindow((_x, y) => setAnchorY(y));
  }, []);

  const openDropdown  = useCallback(() => setDropdownVisible(true), []);
  const closeDropdown = useCallback(() => setDropdownVisible(false), []);
  const closeCalendar = useCallback(() => setCalendarVisible(false), []);

  const handleFilterSelect = useCallback((f: FilterOption) => {
    setFilter(f);
    setDropdownVisible(false);
    if (f === 'Custom') setCalendarVisible(true);
  }, []);

  const handleCalendarConfirm = useCallback((start: Date, end: Date) => {
    setCustomRange({ start, end });
  }, []);

  const filterLabel = useMemo(() => {
    if (filter === 'Custom' && customRange) {
      const fmt = (d: Date) => `${d.getDate()}/${d.getMonth() + 1}`;
      return `${fmt(customRange.start)}–${fmt(customRange.end)}`;
    }
    return filter;
  }, [filter, customRange]);

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FA]" edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />

      {/* Header */}
      <View className="flex-row items-center justify-between px-5 pt-3 pb-3 bg-[#F8F9FA]">
        <TouchableOpacity className="flex-row items-center mt-3">
          <Text className="text-[20px] font-bold text-[#1A1D2E] tracking-tight">Dashboard</Text>
          <Text className="text-[14px] text-gray-500 ml-1">▾</Text>
        </TouchableOpacity>
        <TouchableOpacity className="w-9 h-9 rounded-lg bg-white justify-center items-center">
          <Image source={images.filterIcon} className="w-5 h-5" resizeMode="contain" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <FundedDealsCard1 filterLabel={filterLabel} onOpen={openDropdown} />
        <FundedDealsCard2 filterLabel={filterLabel} onOpen={openDropdown} />
        <SettledDealsCard1 filterLabel={filterLabel} onOpen={openDropdown} />
        <SettledDealsCard2 filterLabel={filterLabel} onOpen={openDropdown} />
        <PayoutsCard filterLabel={filterLabel} onOpenDropdown={openDropdown} />
        <StatCards />
      </ScrollView>

      {/* Anchor for dropdown */}
      <View ref={anchorRef} onLayout={handleAnchorLayout} style={styles.anchor} pointerEvents="none" />

      <FilterDropdown
        visible={dropdownVisible} selected={filter}
        onSelect={handleFilterSelect} onClose={closeDropdown} anchorY={anchorY}
      />

      <CalendarModal visible={calendarVisible} onClose={closeCalendar} onConfirm={handleCalendarConfirm} />
    </SafeAreaView>
  );
};

// Static styles 
const styles = StyleSheet.create({
  scrollContent: { paddingHorizontal: 16, paddingBottom: 100 },
  // anchor sits just below the header — SafeAreaView handles the top offset now
  anchor: { position: 'absolute', right: 16, top: 56, width: 1, height: 1 },
  dropdown: {
    position: 'absolute', right: 16, zIndex: 100, elevation: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.12, shadowRadius: 12,
    backgroundColor: '#fff', borderRadius: 12, paddingVertical: 4, minWidth: 90,
  },
});

export default DashBoard;