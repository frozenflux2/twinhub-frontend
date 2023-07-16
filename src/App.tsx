/* eslint-disable sonarjs/no-small-switch */
import { ChakraProvider, useBreakpoint } from "@chakra-ui/react"
import { BrowserRouter as Router } from "react-router-dom"
import { MotionConfig } from "framer-motion"

import Layout from "components/Layout"
import RouterSetup from "components/Router/RouterSetup"
import themeAdmin from "theme/themeAdmin"

import "react-toastify/dist/ReactToastify.css"
import { useEffect, useState } from "react"
import { AppContext, BackendUrl, personaProps } from "./constants"
import Loader from "components/Loader"
import { parseJwt } from "utils/parseJWT"

const withAuthorization = (WrappedComponent) => {
    const AuthorizedComponent = () => {
        const [isAuthorized, setIsAuthorized] = useState(false)
        const [personas, setPersonas] = useState<personaProps[]>([])
        const [isLoading, setIsLoading] = useState(true)

        useEffect(() => {
            const checkTokenAuthorization = async () => {
                try {
                    const response = await fetch(
                        "http://223.165.6.49/authenticate",
                        {
                            method: "GET",
                            headers: {
                                access_token:
                                    window.localStorage.getItem(
                                        "access_token"
                                    ) || ""
                            }
                        }
                    )
                    if (response.ok) {
                        // Token is authorized
                        const result = await response.json()
                        const access_token = result.access_token
                        console.log("token: ", access_token)
                        window.localStorage.setItem(
                            "access_token",
                            access_token
                        )
                        setIsAuthorized(true)
                    } else {
                        // Token is not authorized
                        console.log("no auth", await response.json())
                        setIsAuthorized(false)
                    }
                } catch (error) {
                    console.error(
                        "Error occurred during token authorization:",
                        error
                    )
                    setIsAuthorized(false)
                }
            }

            checkTokenAuthorization()
        }, [])

        useEffect(() => {
            const fetchPersonas = async () => {
                fetch(BackendUrl + "/api/personas")
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
            <AppContext.Provider
                value={{
                    isAuthorized,
                    personas,
                    setAuthorized: (e) => setIsAuthorized(e),
                    setPersonas: (e) => setPersonas(e)
                }}
            >
                {isLoading ? <Loader /> : <WrappedComponent />}
            </AppContext.Provider>
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
