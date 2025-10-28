import { Firestore } from "@google-cloud/firestore";

export class FirestoreLogger {
    private db: Firestore;
    private collection = "audit_logs";

    constructor() {
        this.db = new Firestore({
            projectId: process.env.FIREBASE_PROJECT_ID,
            credentials: {
                client_email: process.env.FIREBASE_CLIENT_EMAIL,
                private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
            },
        });
    }

    async log(eventType: string, payload: any, metadata: Record<string, any> = {}) {
        await this.db.collection(this.collection).add({
            eventType,
            payload,
            metadata,
            createdAt: new Date(),
        });
    }
}
