import { Alert, AlertIOS } from 'react-native';
import FlurryAnalytics from 'react-native-flurry-analytics';
import { imagePicker as ImagePicker } from './ImagePicker';
import LocalStorage from './localStorage';
import _, { isEqual } from 'lodash';

export {
  ImagePicker,
  LocalStorage
};

export const logFlurryEvent = (logName) => {
  if (__DEV__) {
  } else {
    FlurryAnalytics.logEvent(logName);
  }
};

export const showAlert = (title, phrase, onClick = () => null) => {
  Alert.alert(
    title,
    phrase,
    [
      { text: 'OK', onPress: onClick },
    ],
    { cancelable: false }
  );
};

export const checkEmail = (email: String) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase());
};

export const checkPass = (phrase: String) => {
  // const passRe = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[0-9a-zA-Z!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;
  // return passRe.test(phrase);
  return phrase.length >= 6;
};

export const showPromptWithCancel = (title, message, submitName, onSubmit = () => null) => {
  AlertIOS.prompt(
    title,
    message,
    [
      {
        text: submitName,
        onPress: onSubmit,
      },
    ],
    'plain-text',
    '',
    'email-address'
  );
};

export const showPrompt = (title, message, cancelName, submitName, onSubmit = () => null) => {
  AlertIOS.prompt(
    title,
    message,
    [
      {
        text: cancelName,
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: submitName,
        onPress: onSubmit,
      },
    ],
    'plain-text',
    '',
    'email-address'
  );
};

export const sortImages = (images) => {
  const sortedImages = [...images];
  return sortedImages.sort((a, b) => {
    if (a.position < b.position)
      return -1;
    if (a.position > b.position)
      return 1;
    return 0;
  });
};

export const getImagesToUpload = (images, originalImages) => {
  const imagesToUpload = [];
  for (let index = 0; index < images.length; index += 1) {
    let isExisted = false;
    for (let i = 0; i < originalImages.length; i += 1) {
      if (images[index].image === originalImages[i].image) {
        isExisted = true;
      }
    }
    if (!isExisted) {
      imagesToUpload.push(images[index]);
    }
  }
  return imagesToUpload;
};

export const isArrayEqual = function(x, y) {
  return _(x).xorWith(y, _.isEqual).isEmpty();
};
