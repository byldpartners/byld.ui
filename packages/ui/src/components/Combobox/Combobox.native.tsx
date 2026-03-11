import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
  type ViewProps,
} from "react-native";
import { ChevronDown, Search, Check } from "lucide-react-native";
import type { ComboboxOption, ComboboxProps } from "./Combobox.types";
import { useCombobox } from "./useCombobox";
import { Icon } from "../Icon/Icon.native";
import { cn } from "../../utils/cn";

interface ComboboxNativeProps extends ComboboxProps, ViewProps {}

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
  const {
    onValueChange: handleSelect,
    open,
    setOpen,
    search,
    setSearch,
    filteredItems: filtered,
  } = useCombobox<ComboboxOption>({
    items: options,
    value,
    onValueChange,
    filterFn: (item, search) =>
      item.label.toLowerCase().includes(search.toLowerCase()),
  });

  const selectedOption = options.find((o) => o.value === value);

  return (
    <View {...props}>
      <Pressable
        onPress={() => !disabled && setOpen(true)}
        disabled={disabled}
        className={cn(
          "flex-row items-center justify-between h-9 w-full rounded-md border border-input px-3 py-2 shadow-sm elevation-1",
          disabled && "opacity-50",
        )}
      >
        <Text
          className={cn(
            "text-sm leading-none flex-1",
            selectedOption ? "text-foreground" : "text-muted-foreground",
          )}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
        <View className="ml-2 opacity-50">
          <Icon icon={ChevronDown} size={16} className="text-muted-foreground" />
        </View>
      </Pressable>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <TouchableWithoutFeedback onPress={() => setOpen(false)}>
          <View className="flex-1 justify-center items-center bg-black/50">
            <View
              onStartShouldSetResponder={() => true}
              className="bg-popover rounded-lg min-w-[250px] max-h-[400px] shadow-md elevation-3"
            >
            <View className="flex-row items-center border-b border-border px-3">
              <View className="mr-3 opacity-50">
                <Icon icon={Search} size={16} className="text-muted-foreground" />
              </View>
              <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder={searchPlaceholder}
                placeholderTextColor="#a3a3a3"
                className="flex-1 h-9 text-sm text-foreground leading-tight"
                autoFocus
              />
            </View>
            {filtered.length === 0 ? (
              <View className="p-6 items-center">
                <Text className="text-sm text-muted-foreground">
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
                        "flex-row items-center py-1.5 pl-2 pr-8 rounded-sm",
                        isSelected ? "bg-accent" : "bg-transparent",
                      )}
                    >
                      <Text
                        className={cn(
                          "text-sm flex-1",
                          isSelected
                            ? "text-accent-foreground"
                            : "text-foreground",
                        )}
                      >
                        {item.label}
                      </Text>
                      {isSelected && (
                        <View className="absolute right-2">
                          <Icon icon={Check} size={16} className="text-foreground" />
                        </View>
                      )}
                    </Pressable>
                  );
                }}
              />
            )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

Combobox.displayName = "Combobox";

export { Combobox };
export type { ComboboxNativeProps };
