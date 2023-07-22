/* eslint-disable sonarjs/no-small-switch */
import { ChakraProvider, useBreakpoint } from "@chakra-ui/react"
import { BrowserRouter as Router, json } from "react-router-dom"
import { MotionConfig } from "framer-motion"
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google"

import Layout from "components/Layout"
import RouterSetup from "components/Router/RouterSetup"
import themeAdmin from "theme/themeAdmin"

import "react-toastify/dist/ReactToastify.css"
import { useEffect, useState } from "react"
import {
    AppContext,
    BackendUrl,
    CurrentVersion,
    GoogleAuthClientID,
    personaProps
} from "./constants"
import Loader from "components/Loader"
import { parseJwt } from "utils/parseJWT"

const withAuthorization = (WrappedComponent) => {
    const AuthorizedComponent = () => {
        const [isAuthorized, setIsAuthorized] = useState(false)
        const [personas, setPersonas] = useState<personaProps[]>([])
        const [isLoading, setIsLoading] = useState(true)
        const [userId, setUserId] = useState(0)
        const [showPresent, setShowPresent] = useState(false)

        useEffect(() => {
            const checkTokenAuthorization = async () => {
                try {
                    const response = await fetch(`${BackendUrl}/authenticate`, {
                        method: "GET",
                        headers: {
                            access_token:
                                window.localStorage.getItem("access_token") ||
                                ""
                        }
                    })
                    if (response.ok) {
                        // Token is authorized
                        const result = await response.json()
                        const access_token = result.access_token
                        console.log("token: ", access_token)
                        window.localStorage.setItem(
                            "access_token",
                            access_token
                        )
                        const parsed_data = parseJwt(access_token)
                        console.log("parseJWT: ", parsed_data)
                        setUserId(JSON.parse(parsed_data).user_id ?? 0)
                        setIsAuthorized(true)
                    } else {
                        // Token is not authorized
                        console.log("no auth", await response.json())
                        setIsAuthorized(false)
                        window.localStorage.clear()
                    }
                } catch (error) {
                    console.error(
                        "Error occurred during token authorization:",
                        error
                    )
                    setIsAuthorized(false)
                    window.localStorage.clear()
                }
            }

            checkTokenAuthorization()
        }, [])

        useEffect(() => {
            const fetchPersonas = async () => {
                fetch(
                    BackendUrl +
                        `${
                            CurrentVersion === "PREMIUM"
                                ? "/api/personas-premium"
                                : "/api/personas"
                        }`
                )
                    .then((response) => response.json())
                    .then((personas) => {
                        console.log("persons: ", personas)
                        setPersonas(personas)
                        setIsLoading(false)
                    })
                    .catch((error) => console.error("Error:", error))
            }

            fetchPersonas()
        }, [])

        return (
            <GoogleOAuthProvider clientId={GoogleAuthClientID}>
                <AppContext.Provider
                    value={{
                        isAuthorized,
                        personas,
                        userId,
                        showPresent,
                        setAuthorized: (e) => setIsAuthorized(e),
                        setPersonas: (e) => setPersonas(e),
                        setUserId: (e) => setUserId(e),
                        setShowPresent: (e) => setShowPresent(e)
                    }}
                >
                    {isLoading ? <Loader /> : <WrappedComponent />}
                    {/* {isAuthorized ? (
                        <></>
                    ) : (
                        <GoogleLogin
                            onSuccess={(credentialResponse) => {
                                console.log(credentialResponse)
                            }}
                            onError={() => {
                                console.log("Login Failed")
                            }}
                            useOneTap
                        />
                    )} */}
                </AppContext.Provider>
            </GoogleOAuthProvider>
        )
    }

    return AuthorizedComponent
}

const App = () => {
    return (
        <ChakraProvider theme={themeAdmin}>
            <Router>
                <MotionConfig
                    transition={{
                        type: "spring",
                        bounce: 0.4,
                        damping: 7
                    }}
                >
                    <Layout>
                        <RouterSetup />
                    </Layout>
                </MotionConfig>
            </Router>
        </ChakraProvider>
    )
}

export default withAuthorization(App)
