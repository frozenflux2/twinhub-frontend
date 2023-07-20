import { HamburgerIcon } from "@chakra-ui/icons"
import {
    Box,
    useDisclosure,
    Drawer,
    DrawerCloseButton,
    DrawerBody,
    DrawerOverlay,
    DrawerContent,
    Stack,
    Link,
    Image,
    Text,
    Flex,
    Button
} from "@chakra-ui/react"
import { Link as RouterLink, useNavigate } from "react-router-dom"
import { CreditIcon, HomeIcon } from "components/Icons/Icons"
import {
    FaTelegram,
    FaMailBulk,
    FaCreditCard,
    FaEnvelope,
    FaMobileAlt
} from "react-icons/fa"
import Logo from "../../assets/img/logo.png"
import IconBox from "components/Icons/IconBox"
import lips_ico from "../../assets/img/icon_lips.png"

const SidebarResponsive = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const navigate = useNavigate()

    let logoText = "TwinHub"
    var brand = (
        <Box pt={"35px"} mb="8px">
            <Link
                as={RouterLink}
                to={"/"}
                display="flex"
                lineHeight="100%"
                mb="30px"
                fontWeight="bold"
                justifyContent="center"
                alignItems="center"
                fontSize="11px"
            >
                {/* <Image
                    src={Logo}
                    alt={logoText}
                    w="auto"
                    h="22px"
                    me="10px"
                    mt="2px"
                /> */}
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
            <Flex
                h="1px"
                w="100%"
                bg="linear-gradient(90deg, rgba(224, 225, 226, 0) 0%, #E0E1E2 47.22%, rgba(224, 225, 226, 0.15625) 94.44%)"
            />
        </Box>
    )

    var links = (
        <>
            <Button
                boxSize="inherit"
                variant={"sidebar-item"}
                onClick={() => navigate("/")}
            >
                <Flex>
                    <IconBox
                        bg="brand.200"
                        color="white"
                        h="30px"
                        w="30px"
                        me="12px"
                        transition={"0.2s linear"}
                    >
                        <HomeIcon />
                    </IconBox>
                    <Text color={"white"} my="auto" fontSize="sm">
                        Home
                    </Text>
                </Flex>
            </Button>
            <Button
                boxSize="inherit"
                variant={"sidebar-item"}
                as={"a"}
                href="https://flirt.twinhub.ai"
                target="_self"
            >
                <Flex>
                    <Image
                        bg="brand.200"
                        color="white"
                        h="30px"
                        w="30px"
                        me="12px"
                        transition={"0.2s linear"}
                        src={lips_ico}
                        borderRadius={"30%"}
                    />
                    <Text color={"white"} my="auto" fontSize="sm">
                        NSFW
                    </Text>
                </Flex>
            </Button>
            <Button
                boxSize="inherit"
                variant={"sidebar-item"}
                as={"a"}
                href="https://t.me/twinhub_bot"
                target="_blank"
            >
                <Flex>
                    <IconBox
                        bg="brand.200"
                        color="white"
                        h="30px"
                        w="30px"
                        me="12px"
                        transition={"0.2s linear"}
                    >
                        <FaMobileAlt />
                    </IconBox>
                    <Text color={"white"} my="auto" fontSize="sm">
                        Mobile App
                    </Text>
                </Flex>
            </Button>
            <Button
                boxSize="inherit"
                variant={"sidebar-item"}
                onClick={() => navigate("/payment")}
            >
                <Flex>
                    <IconBox
                        bg="brand.200"
                        color="white"
                        h="30px"
                        w="30px"
                        me="12px"
                        transition={"0.2s linear"}
                    >
                        <CreditIcon />
                    </IconBox>
                    <Text color={"white"} my="auto" fontSize="sm">
                        Credits
                    </Text>
                </Flex>
            </Button>
            <Button
                boxSize="inherit"
                variant={"sidebar-item"}
                as={"a"}
                href="https://t.me/+w_GZc7AEtsxiM2Fh"
                target="_blank"
            >
                <Flex>
                    <IconBox
                        bg="brand.200"
                        color="white"
                        h="30px"
                        w="30px"
                        me="12px"
                        transition={"0.2s linear"}
                    >
                        <FaTelegram />
                    </IconBox>
                    <Text color={"white"} my="auto" fontSize="sm">
                        Join Community
                    </Text>
                </Flex>
            </Button>
            <Button
                boxSize="inherit"
                variant={"sidebar-item"}
                as={"a"}
                href="mailto:twinhub2023@gmail.com"
            >
                <Flex>
                    <IconBox
                        bg="brand.200"
                        color="white"
                        h="30px"
                        w="30px"
                        me="12px"
                        transition={"0.2s linear"}
                    >
                        <FaEnvelope />
                    </IconBox>
                    <Text color={"white"} my="auto" fontSize="sm">
                        Contact Us
                    </Text>
                </Flex>
            </Button>
        </>
    )

    return (
        <>
            <HamburgerIcon
                color={"#FFF"}
                w={"24px"}
                h={"24px"}
                display={{ sm: "flex", md: "none" }}
                onClick={onOpen}
                // ref={btnRef}
            />
            <Drawer
                isOpen={isOpen}
                onClose={onClose}
                placement={
                    document.documentElement.dir === "rtl" ? "right" : "left"
                }
                // finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent
                    backdropFilter="blur(10px)"
                    bg="linear-gradient(111.84deg, rgba(102, 126, 234, 0.4) 59.3%, rgba(26, 31, 55, 0) 100%); "
                    w="250px"
                    maxW="250px"
                    ms={{
                        sm: "16px"
                    }}
                    my={{
                        sm: "16px"
                    }}
                    borderRadius="16px"
                    onClick={onClose}
                >
                    <DrawerCloseButton
                        color="white"
                        _focus={{ boxShadow: "none" }}
                        _hover={{ boxShadow: "none" }}
                    />
                    <DrawerBody maxW="250px" px="1rem">
                        <Box maxW="100%" h="100%">
                            <Box>{brand}</Box>
                            <Stack direction="column" mb="40px">
                                <Box width={"full"}>{links}</Box>
                            </Stack>
                        </Box>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default SidebarResponsive
