import Storage from './storageModel';
import get from 'lodash/get';

class LocalStorage {
  static isHideVisionBoardDescription = async () => {
    let result = null;
    try {
      result = await Storage.getItem('visionBoardVisible');
    } catch (e) {
      console.info('err isShowVisionBoardDescription', e);
    }
    return result === 'true';
  };

  static setInVisionBoardVisible = async () => {
    try {
      await Storage.setItem('visionBoardVisible', 'true');
    } catch (e) {
      console.info('err setVisionBoardVisible', e);
    }
  };

  static saveToken = async (token) => {
    try {
      await Storage.setItem('appToken', token);
    } catch (e) {
      console.info('err saveToken', e);
    }
  };

  static getToken = async () => {
    let token = null;
    try {
      token = await Storage.getItem('appToken');
    } catch (e) {
      console.info('err getToken', e);
    }
    return token;
  };

  static clearToken = async () => {
    try {
      await Storage.removeItem('appToken');
    } catch (e) {
      console.info('err removeToken', e);
    }
  };

  static setLanguage = async (lang) => {
    try {
      await Storage.setItem('appLanguage', lang);
    } catch (e) {
      console.info('err setLanguage', e);
    }
  };

  static getCurrentLang = async () => {
    let lang = null;
    try {
      lang = await Storage.getItem('appLanguage');
    } catch (e) {
      console.info('err getCurrentLang', e);
    }
    return lang || 'en';
  };

  static setRoutineSaveTime = async (type, time) => {
    try {
      let routinesSaveTime = await LocalStorage.getRoutinesSaveTime();
      if (routinesSaveTime) {
        routinesSaveTime[type] = time;
      } else {
        routinesSaveTime = { [type]: time };
      }
      await Storage.setJSON('routinesSaveTime', routinesSaveTime);
    } catch (e) {
      console.info('err setRoutineSaveTime', e);
    }
  };

  static getRoutinesSaveTime = async () => {
    let routinesSaveTimes = null;
    try {
      routinesSaveTimes = await Storage.getJSON('routinesSaveTime');
    } catch (e) {
      console.info('err getRoutinesSaveTime', e);
    }
    return routinesSaveTimes;
  };
}

export default LocalStorage;
