// Type augmentation for uniwind — adds className prop to all React Native components
import "react-native";

declare module "react-native" {
  interface ViewProps {
    className?: string;
  }
  interface TextProps {
    className?: string;
  }
  interface ImageProps {
    className?: string;
  }
  interface ScrollViewProps {
    className?: string;
  }
  interface TextInputProps {
    className?: string;
  }
  interface PressableProps {
    className?: string;
  }
  interface TouchableOpacityProps {
    className?: string;
  }
  interface FlatListProps<T> {
    className?: string;
  }
  interface SectionListProps<T> {
    className?: string;
  }
  interface ModalProps {
    className?: string;
  }
  interface SwitchProps {
    className?: string;
  }
}
