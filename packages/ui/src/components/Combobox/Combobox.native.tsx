import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  Modal,
  type ViewProps,
} from "react-native";
import type { ComboboxOption, ComboboxProps } from "./Combobox.types";
import { cn } from "../../utils/cn";

interface ComboboxNativeProps extends ViewProps {
  options: ComboboxOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  disabled?: boolean;
}

function Combobox({
  options,
  value,
  onValueChange,
  placeholder = "Select...",
  searchPlaceholder = "Search...",
  emptyMessage = "No results found.",
  disabled = false,
  ...props
}: ComboboxNativeProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const selectedOption = options.find((o) => o.value === value);
  const filtered = options.filter((o) =>
    o.label.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSelect = (val: string) => {
    onValueChange?.(val === value ? "" : val);
    setOpen(false);
    setSearch("");
  };

  return (
    <View {...props}>
      <Pressable
        onPress={() => !disabled && setOpen(true)}
        disabled={disabled}
        className={cn(
          "flex-row items-center justify-between h-9 w-full rounded-md border border-input px-3 py-2",
          disabled && "opacity-50",
        )}
      >
        <Text
          className={cn(
            "text-sm flex-1",
            selectedOption ? "text-foreground" : "text-neutral-400",
          )}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
        <Text className="text-xs text-neutral-400">&#x25BC;</Text>
      </Pressable>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable
          onPress={() => setOpen(false)}
          className="flex-1 justify-center items-center bg-black/50"
        >
          <Pressable
            onPress={(e) => e.stopPropagation()}
            className="bg-background rounded-lg min-w-[250px] max-h-[400px] shadow-lg"
          >
            <View className="flex-row items-center border-b border-border px-3">
              <Text className="text-sm text-neutral-400 mr-2">
                &#x1F50D;
              </Text>
              <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder={searchPlaceholder}
                placeholderTextColor="#a3a3a3"
                className="flex-1 h-9 text-sm text-foreground"
                autoFocus
              />
            </View>
            {filtered.length === 0 ? (
              <View className="p-6 items-center">
                <Text className="text-sm text-neutral-400">
                  {emptyMessage}
                </Text>
              </View>
            ) : (
              <FlatList
                data={filtered}
                keyExtractor={(item: ComboboxOption) => item.value}
                className="max-h-[300px] p-1"
                renderItem={({ item }: { item: ComboboxOption }) => {
                  const isSelected = value === item.value;
                  return (
                    <Pressable
                      onPress={() => handleSelect(item.value)}
                      className={cn(
                        "flex-row items-center py-2 px-3 rounded-sm",
                        isSelected ? "bg-secondary" : "bg-transparent",
                      )}
                    >
                      <Text className="text-sm text-foreground flex-1">
                        {item.label}
                      </Text>
                      {isSelected && (
                        <Text className="text-sm text-foreground">
                          &#x2713;
                        </Text>
                      )}
                    </Pressable>
                  );
                }}
              />
            )}
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

Combobox.displayName = "Combobox";

export { Combobox };
export type { ComboboxNativeProps };
