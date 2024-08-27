import * as ImagePicker from "expo-image-picker";

type UsePickImageProps = {
  onSuccess: (_asset: ImagePicker.ImagePickerAsset) => void;
};

export const usePickImage = ({ onSuccess }: UsePickImageProps) => {
  const pickImage = async (useCamera = false) => {
    try {
      let result: ImagePicker.ImagePickerResult;

      if (useCamera) {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();

        if (status !== ImagePicker.PermissionStatus.GRANTED) {
          alert("Sorry, we need camera permissions to make this work!");

          return;
        }

        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1
        });
      } else {
        // No permissions request is necessary for launching the image library
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1
        });
      }

      if (!result.canceled) {
        onSuccess?.(result.assets[0]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return { pickImage };
};
