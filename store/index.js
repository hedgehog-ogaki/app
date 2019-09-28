import firebase from '~/plugins/firebase'
import Vue from 'vue'
import { firebaseMutations, firebaseAction } from 'vuexfire'
export const state = () => ({
  distances: null,
  users: {
    "20190926": {
      "last-update": '2019/09/26 10:00:00',
      "count": 4
    },
    "20190928": {
      "last-update": '2019/09/28 10:00:00',
      "count": 4
    },
    "20190927": {
      "last-update": '2019/09/27 10:00:00',
      "count": 4
    },
  },
  app: {
    0: {
      done: false,
      goal: "岐阜駅",
      start: "大垣駅",
      start_time: "2019-09-29 10:00",
      distance: 15497,
    }
  }
})

export const getters = {
  users: state => state.users,
  app: state => state.app,
}
export const mutations = {
  ...firebaseMutations
}

export const actions = {
  /*
  setDataRef: firestoreAction(function (context, ref) {
    context.bindFirestoreRef('data', ref)
  }),
  setAppRef: firestoreAction(function (context, ref) {
    context.bindFirestoreRef('app', ref)
  }),
  */

  setDataRef: firebaseAction(({bindFirebaseRef, unbindFirebaseRef}, {ref}) => {
    bindFirebaseRef('users', ref)
  }),
  setAppRef: firebaseAction(({bindFirebaseRef, unbindFirebaseRef}, {ref}) => {
    bindFirebaseRef('app', ref)
  }),
}
