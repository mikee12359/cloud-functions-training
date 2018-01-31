// src/index.ts
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as getData from './get-data';
import * as updateData from './update-data';
const credentials = require('./google-service-key.json');

admin.initializeApp(functions.config().firebase);
// admin.initializeApp({
//     databaseURL: "https://xerkitfirebasefunction.firebaseio.com",
//     credential: admin.credential.cert(credentials)
// })

export const getDataListener = getData.listener;
export const updateDataListener = updateData.listener;
