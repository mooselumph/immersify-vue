/* eslint-disable promise/param-names */
import { AUTH_REQUEST, AUTH_ERROR, AUTH_SUCCESS, AUTH_LOGOUT } from '../actions/auth'
import apiCall from '@/utils/api'
import axios from 'axios'
import docCookie from '@/utils/cookies'

import {API_URL} from '@/env'


const state = { 
  token: docCookie.getItem('user-token') || '',
  status: '',
  hasLoadedOnce: false 
}

const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status,
}

const actions = {
  [AUTH_REQUEST]: ({commit, dispatch}, {email,password}) => {
      return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST)
      //apiCall({url: 'auth', data: loginData, method: 'POST'})
      axios.post(API_URL + 'rest-auth/login/',{email:email,password:password})
      .then(({data: resp}) => {
        docCookie.setItem('user-token', resp.token)
        // Here set the header of your ajax library to the token value.
        // example with axios
        // axios.defaults.headers.common['Authorization'] = resp.token
        commit(AUTH_SUCCESS, resp)
        resolve(resp)
      })
      .catch(err => {
        commit(AUTH_ERROR, err)
        docCookie.removeItem('user-token')
        reject(err)
      })
    })
  },
  [AUTH_LOGOUT]: ({commit, dispatch}) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_LOGOUT)
      docCookie.removeItem('user-token')
      resolve()
    })
  }
}

const mutations = {
  [AUTH_REQUEST]: (state) => {
    state.status = 'loading'
  },
  [AUTH_SUCCESS]: (state, resp) => {
    state.status = 'success'
    state.token = resp.token
    state.hasLoadedOnce = true
  },
  [AUTH_ERROR]: (state) => {
    state.status = 'error'
    state.hasLoadedOnce = true
  },
  [AUTH_LOGOUT]: (state) => {
    state.token = ''
    state.csrfToken = ''
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}
