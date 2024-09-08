import {
  forwardRef,
  PropsWithChildren,
  useImperativeHandle,
  useState
} from "react";

import { BlurView } from "expo-blur";
import { Modal as RNModal, TouchableWithoutFeedback } from "react-native";
import Animated, { SlideInDown, SlideOutDown } from "react-native-reanimated";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

type ModalProps = PropsWithChildren<{
  containerClassName?: string;
  onClose?: () => void;
  onOpen?: () => void;
}>;

export type ModalRef = {
  close: () => void;
  open: () => void;
};

export const Modal = forwardRef<ModalRef, ModalProps>(
  ({ children, containerClassName, onClose, onOpen }, ref) => {
    const [isVisible, setIsVisible] = useState(false);

    const close = () => {
      setIsVisible(false);

      onClose?.();
    };

    const open = () => {
      setIsVisible(true);

      onOpen?.();
    };

    useImperativeHandle(ref, () => ({
      close,
      open
    }));

    return (
      <RNModal animationType="fade" transparent visible={isVisible}>
        <SafeAreaProvider>
          <TouchableWithoutFeedback onPress={close}>
            <BlurView
              className="flex-1"
              experimentalBlurMethod="dimezisBlurView"
              intensity={100}
              tint="dark"
            >
              <SafeAreaView className="flex-1 justify-end p-6">
                {isVisible && (
                  <TouchableWithoutFeedback onPress={() => {}}>
                    <Animated.View
                      className={`bg-white p-6 rounded-2xl ${containerClassName}`}
                      entering={SlideInDown}
                      exiting={SlideOutDown}
                    >
                      {children}
                    </Animated.View>
                  </TouchableWithoutFeedback>
                )}
              </SafeAreaView>
            </BlurView>
          </TouchableWithoutFeedback>
        </SafeAreaProvider>
      </RNModal>
    );
  }
);

Modal.displayName = "Modal";
