/* eslint-disable sonarjs/no-small-switch */
import { ChakraProvider, useBreakpoint } from "@chakra-ui/react"
import { BrowserRouter as Router } from "react-router-dom"
import { MotionConfig } from "framer-motion"

import Layout from "components/Layout"
import RouterSetup from "components/Router/RouterSetup"
import themeAdmin from "theme/themeAdmin"

import "react-toastify/dist/ReactToastify.css"
import { useState } from "react"

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

export default App
