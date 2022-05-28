import React, { Component } from 'react';
import { Text, View } from 'react-native';
import axios from 'axios';
import GlobalVar from "./GlobalVar";
import AsyncStorage from '@react-native-async-storage/async-storage'

import FA from 'react-native-vector-icons/FontAwesome'
import GlobalStyles from './GlobalStyles';
import Toast from 'react-native-toast-message';

export async function refreshToken() {
  let secret = await getStorage('secret')
  let form = {
    secret
  }
  const response = await postRequest('users/refreshToken', form)
  if (response.data) {
    await setStorage('secret', response.data.secret)
    await setStorage('token', response.data.token)
  }
}

export async function getRequest(path) {
  try {
    let token = await getStorage('token')
    const response = await axios.get(GlobalVar.host + path, {
      headers: {
        'authorization': token
      },
    });
    if (response) {
      return response;
    }
  } catch (error) {
    let message = 'Terjadi Kesalahan';
    let title = "Error"
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      message = error.response.data.message
      console.log(error.response.data);
      if (error.response.status == 400) {
        title = "Harap cek kembali"
      } else if (error.response.status == 401) {
        refreshToken().then(async item => {
          return await getRequest(path)
        })

      }
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
      message = error.message;
    }
    console.log(error.config);
    showNotification('error', title, message)
    return { data: null }
  }
}

export async function postRequest(path, data) {
  try {
    let token = await getStorage('token')
    const response = await axios.post(GlobalVar.host + path, data, {
      headers: {
        'authorization': token
      },
    });
    if (response) {
      return response;
    }
  } catch (error) {
    let message = 'Terjadi Kesalahan';
    let title = "Error"
    if (error.response) {
      if (error.response.status == 400) {
        title = "Harap cek kembali"
      } else if (error.response.status == 401) {
        refreshToken().then(async item => {
          return await postRequest(path, data)
        })
      }

      message = error.response.data.message
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
      message = error.message;
    }
    console.log(error.config);
    showNotification('error', title, message)
    return { data: null }
  }
}

export function showNotification(type = 'success', text1 = 'Default Notification', text2 = 'Description') {
  Toast.show({
    type,
    text1,
    text2,
  })
}

export async function setStorage(key, value) {
  await AsyncStorage.setItem(key, JSON.stringify(value))
}

export async function getStorage(key) {
  let s = JSON.parse(await AsyncStorage.getItem(key))
  if (s) return s
  return null
}

export function hideEmail(str) {
  if (str) {
    let s = str.split('@')
    let s1 = str.substr(0, 3)
    return s1 + '****@' + s[1]
  }
  return null
}