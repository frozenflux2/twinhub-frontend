import { ColorModeScript } from "@chakra-ui/react"
import ReactDOM from "react-dom/client"

import "@fontsource/poppins"
import "@fontsource/archivo-black"

import App from "./App"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
    <>
        <ColorModeScript initialColorMode={"system"} />
        <App />
    </>
)
