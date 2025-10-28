import { Firestore } from "@google-cloud/firestore";

export class FirestoreLogger {
    private db: Firestore;
    private collection = "audit_logs";

    constructor() {
        console.log('Project ID:', process.env.FIREBASE_PROJECT_ID);
        console.log('Client Email:', process.env.FIREBASE_CLIENT_EMAIL);
        console.log('Private Key:', process.env.FIREBASE_PRIVATE_KEY?.slice(0, 30), '...');

       /* this.db = new Firestore({
            projectId: "backend-clean-architecture",
            keyFilename: "./backend-firebase.json",
        });*/
        this.db= new Firestore({
            projectId: "backend-clean-architecture",

            credentials: {
                client_email: process.env.FIREBASE_CLIENT_EMAIL,
                private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
            },
        })
    }

    async log(eventType: string, payload: any, metadata: Record<string, any> = {}) {

        const docRef = this.db.collection(this.collection).doc(); // genera un ID automáticamente
        await docRef.set({
            eventType,
            payload,
            metadata,
            createdAt: new Date(),
        });
    }
}
