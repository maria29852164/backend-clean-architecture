import { Injectable } from "@nestjs/common";
import * as admin from "firebase-admin";

@Injectable()
export class FirebaseService {
    private readonly app: admin.app.App;

    constructor() {
        if (!admin.apps.length) {
            this.app = admin.initializeApp({
                credential: admin.credential.cert({
                    projectId: process.env.FIREBASE_PROJECT_ID,
                    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
                }),
            });
        } else {
            this.app = admin.app();
        }
    }

    getAuth() {
        return admin.auth(this.app);
    }

    getFirestore() {
        return admin.firestore(this.app);
    }
}
