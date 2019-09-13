import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';

const settings = {
  title: 'Select Photo',
  cancelButtonTitle: 'Cancel',
  takePhotoButtonTitle: 'Take Photo...',
  chooseFromLibraryButtonTitle: 'Choose from Library...',
  cameraType: 'back',
  mediaType: 'photo',
  maxWidth: 250,
  maxHeight: 250,
  quality: 1,
  allowsEditing: false,
  noData: true,
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export const imagePicker = {
  show(options = {}) {
    return new Promise((resolve, reject) => {
      ImagePicker.showImagePicker(Object.assign(settings, options), (response) => {
        const result = {
          source: null,
          type: null,
          message: '',
        };
        if (response.didCancel) {
          result.type = 'UserCancel';
          result.message = 'User cancelled image picker';
        } else if (response.error) {
          return reject({
            type: 'Error',
            message: response.error,
          });
        } else if (response.customButton) {
        } else {
          const { originalRotation, height, width, fileName } = response;
          let rotation = 0;

          if (originalRotation === 90) {
            rotation = 90;
          } else if (originalRotation === 270) {
            rotation = -90;
          }
          result.source = {
            uri: response.uri,
            isStatic: true,
            fileName
          };
          return resolve(result);
          // return ImageResizer.createResizedImage(response.uri, width, height, 'JPEG', 100, rotation)
          //   .then(({ uri }) => {
          //     result.source = {
          //       // uri: `data:image/jpeg;base64,${response.data}`,
          //       uri,
          //       isStatic: true,
          //       fileName
          //     };
          //     return resolve(result);
          //   })
          //   .catch((e) => {
          //     console.info('e', e);
          //     return reject({
          //       type: 'Error',
          //       message: '',
          //     });
          //   });
        }
      });
    });
  },
};
