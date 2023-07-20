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
    Flex,
    HStack,
    Image,
    Link,
    Stack,
    Text,
    useColorModeValue,
    Box,
    useDisclosure,
    Drawer,
    DrawerContent,
    DrawerOverlay,
    DrawerBody,
    DrawerCloseButton
} from "@chakra-ui/react"
import PropTypes from "prop-types"
import React, { useState } from "react"
import AdminNavbarLinks from "./AdminNavbarLinks"
import { NavLink, Link as RouterLink, useNavigate } from "react-router-dom"
import {
    DocumentIcon,
    HomeIcon,
    PersonIcon,
    RocketIcon
} from "components/Icons/Icons"
import { NavbarPosition } from "../../constants"
import Logo from "../../assets/img/logo.png"
import { HamburgerIcon } from "@chakra-ui/icons"
import SidebarResponsive from "components/Sidebar"

export default function AuthNavbar(props) {
    const [scrolled, setScrolled] = useState(false)
    const { variant, children, fixed, secondary, logoText, ...rest } = props
    const navigate = useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure()

    // Here are all the props that may change depending on navbar's type or state.(secondary, variant, scrolled)
    let navbarPosition: NavbarPosition = "absolute"
    let mainText = "white"
    let secondaryMargin = "0px"
    let paddingX = "15px"
    let navbarFilter = useColorModeValue(
        "none",
        "drop-shadow(0px 7px 23px rgba(0, 0, 0, 0.05))"
    )
    let navbarBackdrop = "blur(42px)" //"none"
    let navbarShadow = useColorModeValue(
        "0px 7px 23px rgba(0, 0, 0, 0.05)",
        "none"
    )
    let navbarBg =
        "linear-gradient(123.64deg, rgba(255, 255, 255, 0) -22.38%, rgba(255, 255, 255, 0.039) 70.38%)"
    let navbarBorder = "rgba(226, 232, 240, 0.3)" //"transparent"
    let navbarIcon = "white"

    var brand = (
        <Link
            as={RouterLink}
            to={"/"}
            display="flex"
            lineHeight="100%"
            fontWeight="bold"
            justifyContent="center"
            alignItems="center"
            color={mainText}
        >
            <Box
                bg="linear-gradient(97.89deg, #FFFFFF 70.67%, rgba(117, 122, 140, 0) 108.55%)"
                bgClip="text"
            >
                <Text
                    fontSize="sm"
                    letterSpacing="3px"
                    mt="3px"
                    color="transparent"
                >
                    {logoText}
                </Text>
            </Box>
        </Link>
    )

    var linksAuth = (
        <HStack display={{ sm: "none", md: "flex" }}>
            <NavLink to="/">
                <Button
                    fontSize="sm"
                    ms="0px"
                    px="0px"
                    me={{ sm: "2px", md: "16px" }}
                    color={navbarIcon}
                    variant="transparent-with-icon"
                    leftIcon={
                        <HomeIcon
                            color={navbarIcon}
                            w="12px"
                            h="12px"
                            me="0px"
                        />
                    }
                >
                    <Text>Home</Text>
                </Button>
            </NavLink>
            {/* <NavLink to="/profile">
                <Button
                    fontSize="sm"
                    ms="0px"
                    px="0px"
                    me={{ sm: "2px", md: "16px" }}
                    color={navbarIcon}
                    variant="transparent-with-icon"
                    leftIcon={
                        <PersonIcon
                            color={navbarIcon}
                            w="12px"
                            h="12px"
                            me="0px"
                        />
                    }
                >
                    <Text>Profile</Text>
                </Button>
            </NavLink> */}
            <NavLink to="/signup">
                <Button
                    fontSize="sm"
                    ms="0px"
                    px="0px"
                    me={{ sm: "2px", md: "16px" }}
                    color={navbarIcon}
                    variant="transparent-with-icon"
                    leftIcon={
                        <RocketIcon
                            color={navbarIcon}
                            w="12px"
                            h="12px"
                            me="0px"
                        />
                    }
                >
                    <Text>Sign Up</Text>
                </Button>
            </NavLink>
            <NavLink to="/login">
                <Button
                    fontSize="sm"
                    ms="0px"
                    px="0px"
                    me={{ sm: "2px", md: "16px" }}
                    color={navbarIcon}
                    variant="transparent-with-icon"
                    leftIcon={
                        <DocumentIcon
                            color={navbarIcon}
                            w="12px"
                            h="12px"
                            me="0px"
                        />
                    }
                >
                    <Text>Sign In</Text>
                </Button>
            </NavLink>
        </HStack>
    )

    return (
        <Flex
            position={navbarPosition}
            top="16px"
            left="50%"
            transform="translate(-50%, 0px)"
            background={navbarBg}
            border="2px solid"
            borderColor={navbarBorder}
            boxShadow={navbarShadow}
            filter={navbarFilter}
            backdropFilter={navbarBackdrop}
            borderRadius="20px"
            px="16px"
            py="22px"
            mx="auto"
            width="1044px"
            maxW="90%"
            alignItems="center"
        >
            <Flex
                w="100%"
                justifyContent={{ sm: "start", lg: "space-between" }}
                alignItems={"center"}
            >
                {/* {brand} */}
                <Image
                    src={Logo}
                    height={"auto"}
                    maxW={"128px"}
                    alt={logoText}
                    onClick={() => navigate("/")}
                    cursor={"pointer"}
                />
                <Box
                    ms={{ base: "auto", lg: "0px" }}
                    display={{ base: "flex", lg: "none" }}
                >
                    <SidebarResponsive />
                </Box>
                {linksAuth}
                {/* <Link href="https://creative-tim.com/product/vision-ui-dashboard-chakra">
                    <Button
                        fontSize="xs"
                        variant="brand"
                        borderRadius="12px"
                        px="30px"
                        display={{
                            sm: "none",
                            lg: "flex"
                        }}
                    >
                        Free Download
                    </Button>
                </Link> */}
            </Flex>
        </Flex>
    )
}

AuthNavbar.propTypes = {
    color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
    logoText: PropTypes.string
}
