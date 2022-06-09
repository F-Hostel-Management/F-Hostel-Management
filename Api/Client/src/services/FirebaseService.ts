import { FirebaseApp, initializeApp } from 'firebase/app'
import {
    Auth,
    FacebookAuthProvider,
    getAuth,
    GoogleAuthProvider,
    OAuthProvider,
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

        this.auth.languageCode = 'en'
    }

    public static getInstance(): FirebaseService {
        if (!FirebaseService.instance)
            FirebaseService.instance = new FirebaseService()

        return FirebaseService.instance
    }

    public async signInWithGoogle(): Promise<string> {
        const provider = new GoogleAuthProvider()
        provider.addScope('email profile openid')

        const result = await signInWithPopup(this.auth, provider)
        return result.user.getIdToken()
    }

    public async signInWithFacebook(): Promise<string> {
        const provider = new FacebookAuthProvider()
        provider.setCustomParameters({
            display: 'popup',
        })

        const result = await signInWithPopup(this.auth, provider)
        return result.user.getIdToken()
    }

    public async signInWithMicrosoft(): Promise<string> {
        const provider = new OAuthProvider('microsoft.com')
        provider.setCustomParameters({
            prompt: 'consent',
        })
        provider.addScope('openid email')

        const result = await signInWithPopup(this.auth, provider)
        return result.user.getIdToken()
    }

    public async getFirebaseToken(): Promise<string | undefined> {
        return this.auth.currentUser?.getIdToken(true)
    }

    public async getCurrentUser() {
        return this.auth.currentUser
    }
}
