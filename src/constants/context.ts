import React from "react";
import { personaProps } from "./types";

type AppContextType = {
    isAuthorized: boolean
    personas: personaProps[]
    setAuthorized: (e: any) => void
    setPersonas: (e: any) => void
}

export const AppContext = React.createContext<AppContextType | null>(
    null
)