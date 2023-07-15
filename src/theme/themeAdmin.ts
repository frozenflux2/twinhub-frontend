import { extendTheme } from "@chakra-ui/react"
import { globalStyles } from "./styles"
import { bgAdmin } from "./bgAdmin"
import { breakpoints } from "./foundations/breakpoints"
import { buttonStyles } from "./components/button"
import { badgeStyles } from "./components/badge"
import { linkStyles } from "./components/link"
import { drawerStyles } from "./components/drawer"
import { switchStyles } from "./components/switch"
import { CardComponent } from "./additions/card/Card"
import { CardBodyComponent } from "./additions/card/CardBody"
import { CardHeaderComponent } from "./additions/card/CardHeader"
import { MainPanelComponent } from "./additions/layout/MainPanel"
import { textStyles } from "./components/text"
// import { mode } from "@chakra-ui/theme-tools";
export default extendTheme(
    { breakpoints }, // Breakpoints
    bgAdmin, // Global styles
    globalStyles, // Global styles
    textStyles,
    buttonStyles, // Button styles
    badgeStyles, // Badge styles
    linkStyles, // Link styles
    drawerStyles, // Sidebar variant for Chakra's drawer
    switchStyles, // Switch styles
    CardComponent, // Card component
    CardBodyComponent, // Card Body component
    CardHeaderComponent, // Card Header component
    MainPanelComponent, // Main Panel component
)
