import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  Pressable,
  Platform,
  Animated,
} from "react-native";
import Svg, { Path, Line } from "react-native-svg";

// ─── Types ────────────────────────────────────────────────────────────────────

type StatusOption =
  | "Hold"
  | "Lead"
  | "Sent IP Intake"
  | "Received IP Intake"
  | "IP Convo"
  | "Sent Atty Intake"
  | "Received Atty Intake"
  | "Attorney Convo"
  | "UW Review"
  | "Approved"
  | "IP Completed Docs"
  | "Atty Completed Docs"
  | "Olilit Completed Docs"
  | "Ready to Fund"
  | "Decline";

type StatusModalProps = {
  visible: boolean;
  currentStatus?: StatusOption | null;
  onClose: () => void;
  onSave: (status: StatusOption) => void;
};

// ─── Constants ────────────────────────────────────────────────────────────────

const STATUS_OPTIONS: StatusOption[] = [
  "Hold",
  "Lead",
  "Sent IP Intake",
  "Received IP Intake",
  "IP Convo",
  "Sent Atty Intake",
  "Received Atty Intake",
  "Attorney Convo",
  "UW Review",
  "Approved",
  "IP Completed Docs",
  "Atty Completed Docs",
  "Olilit Completed Docs",
  "Ready to Fund",
  "Decline",
];

// Status options that span full width (single per row)
const FULL_WIDTH_STATUSES: StatusOption[] = ["Decline"];

// ─── Icons ────────────────────────────────────────────────────────────────────

const CloseIcon = ({ color = "#FFFFFF" }: { color?: string }) => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
    <Path
      d="M18 6L6 18M6 6l12 12"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const CheckCircleIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Path
      d="M22 11.08V12a10 10 0 1 1-5.93-9.14"
      stroke="#FFFFFF"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M22 4L12 14.01l-3-3"
      stroke="#FFFFFF"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// ─── Toast Component ──────────────────────────────────────────────────────────

const StatusToast = ({
  visible,
  onHide,
}: {
  visible: boolean;
  onHide: () => void;
}) => {
  const translateY = React.useRef(new Animated.Value(-80)).current;
  const opacity = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          tension: 80,
          friction: 10,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      const timer = setTimeout(() => {
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: -80,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start(() => onHide());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View
      style={{ transform: [{ translateY }], opacity }}
      className="absolute top-12 left-4 right-4 z-50">
      <View className="bg-[#8BC240] rounded-xl px-4 py-3 flex-row items-center justify-between">
        <View className="flex-row items-center gap-x-2.5">
          <CheckCircleIcon />
          <Text className="text-sm font-semibold text-white">Status Updated</Text>
        </View>
        <TouchableOpacity onPress={onHide} activeOpacity={0.7} className="p-1">
          <CloseIcon color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

// ─── Confirmation Dialog ──────────────────────────────────────────────────────

const ConfirmDialog = ({
  visible,
  selectedStatus,
  onCancel,
  onConfirm,
}: {
  visible: boolean;
  selectedStatus: StatusOption | null;
  onCancel: () => void;
  onConfirm: () => void;
}) => {
  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}>
      <Pressable
        className="flex-1 bg-black/50 items-center justify-end pb-10 px-5"
        onPress={onCancel}>
        <Pressable onPress={(e) => e.stopPropagation()}>
          <View
            className="bg-white rounded-2xl px-5 pt-6 pb-5 w-full"
            style={{
              elevation: 20,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.15,
              shadowRadius: 12,
            }}>
            {/* Drag handle */}
            <View className="w-9 h-1 rounded-full bg-[#E0E0E0] self-center mb-5" />

            <Text className="text-base font-bold text-[#212121] mb-1.5">
              Are you sure you want to save this status?
            </Text>
            <Text className="text-xs text-[#888888] mb-6">
              Saving will update the current case status.
            </Text>

            <View className="gap-y-2.5">
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={onConfirm}
                className="bg-[#8BC240] rounded-xl py-4 items-center">
                <Text className="text-sm font-bold text-white">Confirm & Save</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.75}
                onPress={onCancel}
                className="bg-[#F5F5F5] rounded-xl py-4 items-center">
                <Text className="text-sm font-semibold text-[#555555]">Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

// ─── Main Status Modal ────────────────────────────────────────────────────────

export default function StatusModal({
  visible,
  currentStatus,
  onClose,
  onSave,
}: StatusModalProps) {
  const [selected, setSelected] = useState<StatusOption | null>(
    currentStatus ?? null
  );
  const [showConfirm, setShowConfirm] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Sync if currentStatus changes from outside
  useEffect(() => {
    if (visible) setSelected(currentStatus ?? null);
  }, [visible, currentStatus]);

  const handleSavePress = () => {
    if (!selected) return;
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    onSave(selected!);
    onClose();
    // Show toast after modal closes
    setTimeout(() => setShowToast(true), 350);
  };

  const handleClose = () => {
    setSelected(currentStatus ?? null);
    onClose();
  };

  // Build rows: pair chips side-by-side, except FULL_WIDTH_STATUSES
  const buildRows = () => {
    const rows: StatusOption[][] = [];
    let i = 0;
    while (i < STATUS_OPTIONS.length) {
      const opt = STATUS_OPTIONS[i];
      if (FULL_WIDTH_STATUSES.includes(opt)) {
        rows.push([opt]);
        i++;
      } else {
        const next = STATUS_OPTIONS[i + 1];
        if (next && !FULL_WIDTH_STATUSES.includes(next)) {
          rows.push([opt, next]);
          i += 2;
        } else {
          rows.push([opt]);
          i++;
        }
      }
    }
    return rows;
  };

  const rows = buildRows();

  return (
    <>
      {/* ── Toast (rendered outside modal so it overlays everything) ── */}
      <StatusToast visible={showToast} onHide={() => setShowToast(false)} />

      {/* ── Confirmation Dialog ── */}
      <ConfirmDialog
        visible={showConfirm}
        selectedStatus={selected}
        onCancel={() => setShowConfirm(false)}
        onConfirm={handleConfirm}
      />

      {/* ── Status Sheet ── */}
      <Modal
        visible={visible && !showConfirm}
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
            maxHeight: "85%",
            elevation: 20,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.1,
            shadowRadius: 12,
          }}>

          {/* Drag handle */}
          <View className="w-9 h-1 rounded-full bg-[#E0E0E0] self-center mb-4" />

          {/* Header */}
          <Text className="text-base font-bold text-[#212121] mb-4">Status</Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="gap-y-2 mb-6">
              {rows.map((row, rowIdx) => (
                <View key={rowIdx} className="flex-row gap-x-2">
                  {row.map((opt) => {
                    const active = selected === opt;
                    const isFullWidth =
                      FULL_WIDTH_STATUSES.includes(opt) || row.length === 1;
                    return (
                      <TouchableOpacity
                        key={opt}
                        activeOpacity={0.75}
                        onPress={() => setSelected(active ? null : opt)}
                        className={`py-2.5 rounded-xl items-center border ${
                          isFullWidth ? "flex-1" : "flex-1"
                        } ${
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
              ))}
            </View>
          </ScrollView>

          {/* Buttons */}
          <View className="gap-y-2.5 mt-2">
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handleSavePress}
              disabled={!selected}
              className="rounded-xl py-4 items-center"
              style={{ backgroundColor: selected ? "#8BC240" : "#C8E6A0" }}>
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
    </>
  );
}