import { FirebaseApp, initializeApp } from 'firebase/app'
import {
    Auth,
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth'

import firebaseConfig from '../configurations/firebaseConfig'

export default class FirebaseService {
    private static instance: FirebaseService
    private app: FirebaseApp
    private auth: Auth

    private constructor() {
        this.app = initializeApp(firebaseConfig)
        this.auth = getAuth(this.app)
    }

    public static getInstance(): FirebaseService {
        if (!FirebaseService.instance)
            FirebaseService.instance = new FirebaseService()

        return FirebaseService.instance
    }

    public async signInWithGoogle(): Promise<string> {
        const provider = new GoogleAuthProvider()
        provider.addScope('email profile openid')

        this.auth.languageCode = 'en'

        const result = await signInWithPopup(this.auth, provider)
        return result.user.getIdToken()
    }
}
