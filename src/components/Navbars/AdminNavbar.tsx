/*!

=========================================================
* Vision UI Free Chakra - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-chakra
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-chakra/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra Imports
import {
    Button,
    Drawer,
    DrawerContent,
    DrawerOverlay,
    Flex,
    HStack,
    IconButton,
    Image,
    Text,
    useDisclosure,
    DrawerBody,
    DrawerCloseButton,
    Box,
    Stack,
    Link
} from "@chakra-ui/react"
import PropTypes from "prop-types"
import React, { useContext, useState } from "react"
import AdminNavbarLinks from "./AdminNavbarLinks"
import { Link as RouterLink, useNavigate } from "react-router-dom"
import { CreditIcon, HomeIcon } from "components/Icons/Icons"
import {
    FaTelegram,
    FaMailBulk,
    FaCreditCard,
    FaEnvelope,
    FaMobileAlt,
    FaAngleRight
} from "react-icons/fa"
import { AppContext, NavbarPosition } from "../../constants"
import Logo from "../../assets/img/logo.png"
import { HamburgerIcon } from "@chakra-ui/icons"
import IconBox from "components/Icons/IconBox"
import SidebarResponsive from "components/Sidebar"
import { googleLogout } from "@react-oauth/google"
import icon_lips from "../../assets/img/icon_lips.png"

export default function AdminNavbar(props) {
    const navigate = useNavigate()

    const [scrolled, setScrolled] = useState(false)
    const {
        variant,
        children,
        fixed,
        secondary,
        brandText,
        logoText,
        /*onOpen,*/ ...rest
    } = props
    const btnRef = React.useRef()

    const contextData = useContext(AppContext)
    const isAuthorized = contextData?.isAuthorized
    const setIsAuthorized = contextData?.setAuthorized

    // Here are all the props that may change depending on navbar's type or state.(secondary, variant, scrolled)
    let navbarPosition: NavbarPosition = "absolute"
    let mainText = "white"
    let navbarFilter = "none"
    let navbarBackdrop = "none"
    let navbarShadow = "none"
    let navbarBg = "none"
    let navbarBorder = "transparent"
    let secondaryMargin = "0px"
    let paddingX = "15px"
    if (props.fixed === true)
        if (scrolled === true) {
            navbarPosition = "fixed"
            navbarShadow = "0px 7px 23px rgba(0, 0, 0, 0.05)"
            navbarBg =
                "linear-gradient(rgba(255, 255, 255, 0) 0% rgba(255, 255, 255, 0.39) @ 100%)"
            navbarBorder = "rgba(226, 232, 240, 0.3)"
            navbarFilter = "drop-shadow(0px 7px 23px rgba(0, 0, 0, 0.05))"
            navbarBackdrop = "blur(42px)"
        }
    if (props.secondary) {
        navbarBackdrop = "blur(42px)"
        // mainText = "white";
        // secondaryText = "white";
        // secondaryMargin = "22px";
        // paddingX = "30px";
    }
    const changeNavbar = () => {
        if (window.scrollY > 1) {
            setScrolled(true)
        } else {
            setScrolled(false)
        }
    }
    window.addEventListener("scroll", changeNavbar)

    return (
        <Flex
            position={navbarPosition}
            boxShadow={navbarShadow}
            bg={navbarBg}
            borderColor={navbarBorder}
            filter={navbarFilter}
            backdropFilter={navbarBackdrop}
            borderWidth="1.5px"
            borderStyle="solid"
            transitionDelay="0s, 0s, 0s, 0s"
            transitionDuration=" 0.25s, 0.25s, 0.25s, 0s"
            transition-property="box-shadow, background-color, filter, border"
            transitionTimingFunction="linear, linear, linear, linear"
            alignItems={{ xl: "center" }}
            borderRadius="20px"
            display="flex"
            minH="75px"
            justifyContent={{ xl: "center" }}
            lineHeight="25.6px"
            mx="auto"
            mt={secondaryMargin}
            pb="8px"
            left={{ sm: "1vw", md: "10vw" }}
            px={{
                base: "5px",
                md: "30px"
            }}
            pt="8px"
            top="18px"
            w={{
                sm: "98vw",
                md: "80vw"
            }}
            zIndex={100}
        >
            <Flex w="100%" alignItems="center" justifyContent={"space-between"}>
                <HStack gap={"16px"}>
                    <Image
                        src={Logo}
                        height={"auto"}
                        maxW={"128px"}
                        alt={logoText}
                        onClick={() => navigate("/")}
                        cursor={"pointer"}
                    />
                    <Button
                        border={"1px solid #AC7AFD"}
                        bg={
                            "linear-gradient(180deg, #633BA5 0%, #D059EE 100%) !important"
                        }
                        gap={"4px"}
                        as={"a"}
                        href="https://flirt.twinhub.ai"
                        target="_self"
                        display={{
                            sm: "none",
                            md: "flex"
                        }}
                    >
                        <Image
                            src={icon_lips}
                            bgColor={"#FF8ECF"}
                            borderRadius={"full"}
                            maxW={"32px"}
                            h={"auto"}
                            boxShadow={
                                "0px 4px 6px 0px rgba(185, 45, 124, 0.40)"
                            }
                        />
                        <Text fontSize={"14px"} color={"#FFF"} fontWeight={400}>
                            NSFW
                        </Text>
                        <FaAngleRight />
                    </Button>
                </HStack>
                <HStack gap={"10px"}>
                    <Text
                        display={{ sm: "none", md: "flex" }}
                        alignItems={"center"}
                        as={"a"}
                        href="https://t.me/twinhub_bot"
                        target="_blank"
                    >
                        <FaMobileAlt /> Mobile App
                    </Text>
                    <Text
                        onClick={() => navigate("/payment")}
                        display={{ sm: "none", md: "flex" }}
                    >
                        Credits
                    </Text>
                    <Text
                        as={"a"}
                        href="https://t.me/+w_GZc7AEtsxiM2Fh"
                        target="_blank"
                        display={{ sm: "none", md: "flex" }}
                    >
                        Join Community
                    </Text>
                    <Text
                        as={"a"}
                        href="mailto:twinhub2023@gmail.com"
                        display={{ sm: "none", md: "flex" }}
                    >
                        Contact Us
                    </Text>
                    <SidebarResponsive />
                    <Button
                        padding={"4px 36px"}
                        onClick={() => {
                            if (isAuthorized) {
                                try {
                                    googleLogout()
                                } catch (error) {
                                    console.log(error)
                                }
                                window.localStorage.clear()
                                setIsAuthorized && setIsAuthorized(false)
                                navigate("/index")
                            } else navigate("/login")
                        }}
                    >
                        {isAuthorized ? "Logout" : "Login"}
                    </Button>
                </HStack>
            </Flex>
        </Flex>
    )
}

AdminNavbar.propTypes = {
    brandText: PropTypes.string,
    variant: PropTypes.string,
    logoText: PropTypes.string,
    secondary: PropTypes.bool,
    fixed: PropTypes.bool
    // onOpen: PropTypes.func
}
