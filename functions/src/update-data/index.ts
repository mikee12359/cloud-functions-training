import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as cors from 'cors';
import { corsOptions } from '../cors';

export const listener = functions.https.onRequest((request, response) => {
    let todoRef = admin.database().ref("todo");
    let corsFn = cors(corsOptions);

    corsFn(request, response, async () => {
        let id = request.body.id;
        let data = request.body;
        delete data.id;
        let snap = await todoRef.child(id).once("value");
        let todoValue = snap.val();
        
        // todoValue = Object.assign(todoValue, data);
        todoValue = {...todoValue, ...data};

        await todoRef.child(id).set(todoValue);
        
        response.status(200).json(todoValue);
    });
});