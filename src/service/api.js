import _, { isEqual } from 'lodash';
import { apiModels } from './apiModel';
import { LocalStorage } from '../utils'

let apiToken = null;

export async function setToken(_apiToken) {
  apiToken = _apiToken;
  await LocalStorage.saveToken(_apiToken);
}

export async function login(email, password) {
  return apiModels('login', 'POST', { email, password }, null);
}

export async function forgotPassword(email, lang) {
  return apiModels(`forgot-password?lang=${lang}`, 'POST', { email }, null);
}

export async function getMe(token) {
  if (token) {
    setToken(token);
  }
  return apiModels('me', 'GET', null, apiToken );
}


export async function getActiveStatement() {
  return apiModels('statements/active', 'GET', null, apiToken);
}

export async function getBoard() {
  return apiModels(`boards/my`, 'GET', null, apiToken);
}

export async function getActiveRoutine(routineType, lang) {
  return apiModels(`routines/active?type=${routineType}&lang=${lang}`, 'GET', null, apiToken);
}

export async function getRoutineTemplate(routineType) {
  return apiModels(`routines/template/${routineType}`, 'GET', null, apiToken);
}

export async function getRoutineStatistics(routineType) {
  return apiModels(`statistics/routines/${routineType}`, 'GET', null, apiToken, true);
}

export async function saveNotification(hours, minutes, timezone, fcm_token, lang, routineType, enabled) {
  return apiModels(`notifications`, 'POST', { hours, minutes, timezone, fcm_token, lang, routineType, enabled }, apiToken, true);
}

export async function getNotification(routineType) {
  return apiModels(`notifications/my?type=${routineType}`, 'GET', null, apiToken, true);
}

export async function createRoutine(answers, type) {
  const now = new Date();
  const time = new Date(now);
  let expires = null;
  if (now.getHours() < 3 && now.getHours() >= 0) {
    const time = new Date(now);
    time.setHours(3, 0, 0);
    expires = (time - now) / 1000;
  } else {
    time.setDate(time.getDate() + 1);
    time.setHours(3, 0, 0);
    expires = (time - now) / 1000;
  }
  const body = {
    answers,
    type,
    expires
  };
  return apiModels('routines', 'POST', body, apiToken);
}

/* get stories list  */
export async function getStoriesList() {
  return apiModels(`stories`, 'GET', null, apiToken, true);
}

export async function getStoryById(storyId) {
  return apiModels(`stories/${storyId}`, 'GET', null, apiToken, true);
}

export async function getDailyStorys(lang) {
  return apiModels(`stories/daily?lang=${lang}`, 'GET', null, apiToken, true);
}

export async function getAllStatements(lang) {
  return apiModels(`statements?lang=${lang}`, 'GET', null, apiToken);
}

export async function createStatement(title, text) {
  return apiModels('statements','POST', { title, text }, apiToken);
}

export async function getStatementById(id, lang) {
  return apiModels(`statements/${id}?lang=${lang}`, 'GET', null, apiToken);
}

export async function updateStatement(id, title, text) {
  return apiModels(`statements/${id}`, 'PUT', { title, text }, apiToken);
}

export async function selectStatement(statementId) {
  return apiModels(`statements/${statementId}/select`, 'POST', null, apiToken);
}

export async function updateRoutine(routineId, answers) {
  return apiModels(`routines/${routineId}`, 'PUT', { answers }, apiToken);
}

export async function getRoutinesForUser() {
  return apiModels('routines', 'GET', null, apiToken);
}

export async function getRoutineById(id, lang) {
  return apiModels(`routines/${id}?lang=${lang}`, 'GET', null, apiToken);
}

export async function deleteStatement(id) {
  return apiModels(`statements/${id}`, 'DELETE', null, apiToken);
}

export async function generateAWSImageURL(boardId, position, filename) {
  return apiModels(`boards/${boardId}`, 'PUT', { position, filename }, apiToken);
}

export async function uploadFile(url, fileUrl, fileName) {
  return new Promise((resolve) => {
    // eslint-disable-next-line
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', url);
    xhr.onerror = this.onUploadFailed;
    xhr.onreadystatechange = () => {
      // eslint-disable-next-line
      if (xhr.readyState !== XMLHttpRequest.DONE) {
        return;
      }
      if (xhr.status === 200) {
        resolve(xhr.responseText);
      }
    };
    xhr.setRequestHeader('Content-type', 'image/jpeg');
    xhr.send({
      uri: fileUrl,
      type: 'image/jpeg',
      name: fileName,
    });
  });
}

export async function uploadImages(boardId, images) {
  const newImages = _.cloneDeep(images);
  try {
    const generateAWSURL = [];
    for (let i = 0; i < images.length; i += 1) {
      generateAWSURL.push(generateAWSImageURL(boardId, images[i].position, images[i].fileName))
    }
    const res = await Promise.all(generateAWSURL);
    const uploadImage = [];
    for (let index = 0; index < images.length; index += 1) {
     uploadImage.push(uploadFile(res[index].uploadUrl, images[index].image, images[index].fileName));
    }
    const retUploadImage = await Promise.all(uploadImage);
    return { success: true };
  } catch (e) {
    console.info('err uploadImages', e);
  }
  return { success: false };
}
