import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as cors from 'cors';
import { corsOptions } from '../cors';

export const listener = functions.https.onRequest((request, response) => {
    let todoRef = admin.database().ref('todo');
    let corFn = cors(corsOptions); //Add CORS Options

    corFn(request, response, async () => { //Add CORS to request
        let id = request.query.id; //Get query parameter
        let snap;
        // console.log(request.query);
        /*
        if (id) { //if naay ID fetch 1 data
            snap = await todoRef.child(id).once("value"); //Wait for the data
        } else { // fetch all
            snap = await todoRef.once("value");
        }*/

        //Shortchut

        snap = await todoRef.child((id || "/")).once("value");

        let todo = snap.val(); //Extract data from firebase data snapshot

        if (!todo) {
            return response.status(404).send("Todo not found");
        }
        if (id) { //If not fetch all data
            todo.id = snap.key;
        }

        response.status(200).json(todo);
    });
});