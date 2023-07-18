import React, { createContext, useContext, ReactNode } from "react"
import { useGoogleLogin } from "react-use-googlelogin"
interface GoogleAuthContextProps {
    googleAuth: any
}
const GoogleAuthContext = createContext<GoogleAuthContextProps | undefined>(
    undefined
)

interface GoogleAuthProviderProps {
    children: ReactNode
}

export const GoogleAuthProvider: React.FC<GoogleAuthProviderProps> = ({
    children
}) => {
    const googleAuth = useGoogleLogin({
        clientId:
            "338083818163-tdpbb7l79j2cbkpvt0rrarueo67og5ot.apps.googleusercontent.com" // Your clientID from Google.
    })

    const value = {
        googleAuth
    }

    return (
        <GoogleAuthContext.Provider value={value}>
            {children}
        </GoogleAuthContext.Provider>
    )
}
export const useGoogleAuth = (): GoogleAuthContextProps => {
    const context = useContext(GoogleAuthContext)
    if (!context) {
        throw new Error(
            "useGoogleAuth must be used within a GoogleAuthProvider"
        )
    }
    return context
}
