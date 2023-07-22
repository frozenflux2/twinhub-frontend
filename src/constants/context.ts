import React from "react";
import { personaProps } from "./types";

type AppContextType = {
    isAuthorized: boolean
    personas: personaProps[]
    userId: number | string
    showPresent: boolean
    setAuthorized: (e: any) => void
    setPersonas: (e: any) => void
    setUserId: (e: any) => void
    setShowPresent: (e: any) => void
}

export const AppContext = React.createContext<AppContextType | null>(
    null
)