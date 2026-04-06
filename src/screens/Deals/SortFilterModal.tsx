import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  Pressable,
  Platform,
} from "react-native";
import Svg, { Path, Rect, Line } from "react-native-svg";



type SortDirection = "Ascending" | "Descending";
type CaseIdSort = "Newest" | "Oldest";

type SortState = {
  lawFirm: SortDirection | null;
  dealName: SortDirection | null;
  caseId: CaseIdSort | null;
};

type StatusOption =
  | "Hold"
  | "Lead"
  | "Sent IP Intake"
  | "Received IP Intake"
  | "IP Convo"
  | "Sent Atty Intake";

type ClientType = "All" | "New Client" | "Follow On";

type FilterState = {
  amountMin: string;
  amountMax: string;
  status: StatusOption[];
  clientType: ClientType;
  dateOfReceived: string;
  stageTime: string;
};

type SortFilterModalProps = {
  visible: boolean;
  onClose: () => void;
  onApply: (sort: SortState, filter: FilterState) => void;
};



const DEFAULT_SORT: SortState = {
  lawFirm: null,
  dealName: null,
  caseId: null,
};

const DEFAULT_FILTER: FilterState = {
  amountMin: "",
  amountMax: "",
  status: [],
  clientType: "All",
  dateOfReceived: "",
  stageTime: "",
};

const STATUS_OPTIONS: StatusOption[] = [
  "Hold",
  "Lead",
  "Sent IP Intake",
  "Received IP Intake",
  "IP Convo",
  "Sent Atty Intake",
];

const CLIENT_TYPE_OPTIONS: ClientType[] = ["All", "New Client", "Follow On"];



const CalendarIcon = () => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
    <Rect x={3} y={4} width={18} height={18} rx={3} stroke="#AAAAAA" strokeWidth={1.8} />
    <Line x1={3} y1={10} x2={21} y2={10} stroke="#AAAAAA" strokeWidth={1.8} />
    <Line x1={8} y1={2} x2={8} y2={6} stroke="#AAAAAA" strokeWidth={1.8} strokeLinecap="round" />
    <Line x1={16} y1={2} x2={16} y2={6} stroke="#AAAAAA" strokeWidth={1.8} strokeLinecap="round" />
  </Svg>
);

const ChevronDownIcon = () => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
    <Path
      d="M6 9l6 6 6-6"
      stroke="#AAAAAA"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const RefreshIcon = () => (
  <Svg width={13} height={13} viewBox="0 0 24 24" fill="none">
    <Path d="M1 4v6h6" stroke="#8BC240" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M3.51 15a9 9 0 1 0 .49-4.5" stroke="#8BC240" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);



const SectionTitle = ({ label }: { label: string }) => (
  <Text className="text-sm font-bold text-[#8BC240] mb-3">{label}</Text>
);

const FieldLabel = ({ label }: { label: string }) => (
  <Text className="text-xs font-medium text-[#212121] mb-2">{label}</Text>
);

/** Ascending / Descending — deselectable */
const AscDescToggle = ({
  value,
  onChange,
}: {
  value: SortDirection | null;
  onChange: (val: SortDirection | null) => void;
}) => {
  const options: SortDirection[] = ["Ascending", "Descending"];
  return (
    <View className="flex-row gap-x-2">
      {options.map((opt) => {
        const active = value === opt;
        return (
          <TouchableOpacity
            key={opt}
            activeOpacity={0.75}
            onPress={() => onChange(active ? null : opt)}
            className={`flex-1 py-2.5 rounded-xl items-center border ${
              active
                ? "bg-[#8BC240] border-[#8BC240]"
                : "bg-white border-[#E0E0E0]"
            }`}>
            <Text
              className={`text-sm font-semibold ${
                active ? "text-white" : "text-[#555555]"
              }`}>
              {opt}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

/** Newest / Oldest toggle for Case ID */
const NewestOldestToggle = ({
  value,
  onChange,
}: {
  value: CaseIdSort | null;
  onChange: (val: CaseIdSort | null) => void;
}) => {
  const options: CaseIdSort[] = ["Newest", "Oldest"];
  return (
    <View className="flex-row gap-x-2">
      {options.map((opt) => {
        const active = value === opt;
        return (
          <TouchableOpacity
            key={opt}
            activeOpacity={0.75}
            onPress={() => onChange(active ? null : opt)}
            className={`flex-1 py-2.5 rounded-xl items-center border ${
              active
                ? "bg-[#8BC240] border-[#8BC240]"
                : "bg-white border-[#E0E0E0]"
            }`}>
            <Text
              className={`text-sm font-semibold ${
                active ? "text-white" : "text-[#555555]"
              }`}>
              {opt}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

/** Multi-select status chips */
const StatusChips = ({
  value,
  onChange,
}: {
  value: StatusOption[];
  onChange: (val: StatusOption[]) => void;
}) => {
  const toggle = (opt: StatusOption) => {
    if (value.includes(opt)) {
      onChange(value.filter((v) => v !== opt));
    } else {
      onChange([...value, opt]);
    }
  };

  return (
    <View className="flex-row flex-wrap gap-2">
      {STATUS_OPTIONS.map((opt) => {
        const active = value.includes(opt);
        return (
          <TouchableOpacity
            key={opt}
            activeOpacity={0.75}
            onPress={() => toggle(opt)}
            className={`px-4 py-2 rounded-xl border ${
              active
                ? "bg-[#8BC240] border-[#8BC240]"
                : "bg-white border-[#E0E0E0]"
            }`}>
            <Text
              className={`text-xs font-semibold ${
                active ? "text-white" : "text-[#555555]"
              }`}>
              {opt}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

/** Client Type dropdown with inline popover */
const ClientTypeDropdown = ({
  value,
  onChange,
}: {
  value: ClientType;
  onChange: (val: ClientType) => void;
}) => {
  const [open, setOpen] = useState(false);

  const displayLabel = value === "All" ? "New client" : value;

  return (
    <View className="z-10">
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setOpen((v) => !v)}
        className={`flex-row items-center justify-between px-4 h-11 rounded-xl border bg-white ${
          open ? "border-[#8BC240]" : "border-[#E0E0E0]"
        }`}>
        <Text className="text-sm text-[#212121]">{displayLabel}</Text>
        <ChevronDownIcon />
      </TouchableOpacity>

      {open && (
        <View
          className="absolute left-0 right-0 bg-white rounded-xl border border-[#E0E0E0] overflow-hidden"
          style={{
            top: 46,
            elevation: 8,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 6,
          }}>
          {CLIENT_TYPE_OPTIONS.map((opt) => {
            const selected = value === opt;
            return (
              <TouchableOpacity
                key={opt}
                activeOpacity={0.7}
                onPress={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className={`px-4 py-3 ${selected ? "bg-[#F4FAE8]" : "bg-white"}`}>
                <Text
                  className={`text-sm ${
                    selected
                      ? "text-[#8BC240] font-semibold"
                      : "text-[#212121] font-normal"
                  }`}>
                  {opt}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};

/** Date range input with calendar icon */
const DateRangeInput = ({
  value,
  onChangeText,
}: {
  value: string;
  onChangeText: (val: string) => void;
}) => (
  <View className="flex-row items-center h-11 px-3 rounded-xl border border-[#E0E0E0] bg-white">
    <TextInput
      className="flex-1 text-sm text-[#212121]"
      placeholder="DD/MM/YYYY - DD/MM/YYYY"
      placeholderTextColor="#AAAAAA"
      value={value}
      onChangeText={onChangeText}
    />
    <CalendarIcon />
  </View>
);

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SortFilterModal({
  visible,
  onClose,
  onApply,
}: SortFilterModalProps) {
  const [sort, setSort] = useState<SortState>(DEFAULT_SORT);
  const [filter, setFilter] = useState<FilterState>(DEFAULT_FILTER);

  const handleReset = () => {
    setSort(DEFAULT_SORT);
    setFilter(DEFAULT_FILTER);
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  const handleApply = () => {
    onApply(sort, filter);
    onClose();
  };

  const updateSort = (key: keyof SortState, val: any) =>
    setSort((prev) => ({ ...prev, [key]: val }));

  const updateFilter = <K extends keyof FilterState>(key: K, val: FilterState[K]) =>
    setFilter((prev) => ({ ...prev, [key]: val }));

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}>

      {/* Backdrop */}
      <Pressable className="flex-1 bg-black/40" onPress={handleClose} />

      {/* Sheet */}
      <View
        className="bg-white rounded-t-3xl px-5 pt-3"
        style={{
          paddingBottom: Platform.OS === "ios" ? 36 : 24,
          maxHeight: "88%",
          elevation: 20,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
        }}>

        {/* Drag handle */}
        <View className="w-9 h-1 rounded-full bg-[#E0E0E0] self-center mb-4" />

        {/* Header */}
        <View className="flex-row items-center justify-between mb-5">
          <Text className="text-base font-bold text-[#212121]">Sort & Filter</Text>
          <TouchableOpacity
            onPress={handleReset}
            activeOpacity={0.7}
            className="flex-row items-center gap-x-1">
            <RefreshIcon />
            <Text className="text-xs font-semibold text-[#8BC240]">Reset Filter</Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>

          {/* ── SORT ── */}
          <SectionTitle label="Sort" />

          <View className="mb-4">
            <FieldLabel label="Law Firm" />
            <AscDescToggle
              value={sort.lawFirm}
              onChange={(val) => updateSort("lawFirm", val)}
            />
          </View>

          <View className="mb-4">
            <FieldLabel label="Deal Name" />
            <AscDescToggle
              value={sort.dealName}
              onChange={(val) => updateSort("dealName", val)}
            />
          </View>

          <View className="mb-4">
            <FieldLabel label="Case ID" />
            <NewestOldestToggle
              value={sort.caseId}
              onChange={(val) => updateSort("caseId", val)}
            />
          </View>

          <View className="mb-5">
            <FieldLabel label="Status" />
            <StatusChips
              value={filter.status}
              onChange={(val) => updateFilter("status", val)}
            />
          </View>

          {/* Divider */}
          <View className="h-px bg-[#E0E0E0] mb-5" />

          {/* ── FILTER ── */}
          <SectionTitle label="Filter" />

          {/* Amount */}
          <View className="mb-4">
            <FieldLabel label="Amount" />
            <View className="flex-row items-center gap-x-3">
              <TextInput
                className="flex-1 border border-[#E0E0E0] rounded-xl px-3 h-11 text-sm text-[#212121] bg-white"
                placeholder="Min"
                placeholderTextColor="#AAAAAA"
                keyboardType="numeric"
                value={filter.amountMin}
                onChangeText={(val) => updateFilter("amountMin", val)}
              />
              <TextInput
                className="flex-1 border border-[#E0E0E0] rounded-xl px-3 h-11 text-sm text-[#212121] bg-white"
                placeholder="Max"
                placeholderTextColor="#AAAAAA"
                keyboardType="numeric"
                value={filter.amountMax}
                onChangeText={(val) => updateFilter("amountMax", val)}
              />
            </View>
          </View>

          {/* Client Type */}
          <View className="mb-4 z-10">
            <FieldLabel label="Client Type" />
            <ClientTypeDropdown
              value={filter.clientType}
              onChange={(val) => updateFilter("clientType", val)}
            />
          </View>

          {/* Date of Received */}
          <View className="mb-4">
            <FieldLabel label="Date of Received" />
            <DateRangeInput
              value={filter.dateOfReceived}
              onChangeText={(val) => updateFilter("dateOfReceived", val)}
            />
          </View>

          {/* Stage Time */}
          <View className="mb-6">
            <FieldLabel label="Stage Time" />
            <DateRangeInput
              value={filter.stageTime}
              onChangeText={(val) => updateFilter("stageTime", val)}
            />
          </View>

        </ScrollView>

        {/* ── Buttons ── */}
        <View className="gap-y-2.5 mt-2">
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleApply}
            className="bg-[#8BC240] rounded-xl py-4 items-center">
            <Text className="text-sm font-bold text-white">Save</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.75}
            onPress={handleClose}
            className="bg-[#F5F5F5] rounded-xl py-4 items-center">
            <Text className="text-sm font-semibold text-[#555555]">Cancel</Text>
          </TouchableOpacity>
        </View>

      </View>
    </Modal>
  );
}