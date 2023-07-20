import {
    Flex,
    Heading,
    Text,
    FormControl,
    FormLabel,
    Input,
    Box,
    DarkMode,
    Switch,
    Button,
    Link,
    FormErrorMessage,
    HStack,
    Icon,
    Image
} from "@chakra-ui/react"
import { motion } from "framer-motion"
import { useNavigate, Link as RouterLink, Navigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import auth_background from "../../../assets/img/auth_background.png"
import GradientBorder from "../Component/GradientBorder"
import { useContext } from "react"
import { AppContext, BackendUrl } from "../../../constants"
import { parseJwt } from "utils/parseJWT"
import {
    FaGoogle,
    FaFacebook,
    FaTelegram,
    FaDiscord,
    FaInstagram,
    FaYoutube,
    FaTiktok
} from "react-icons/fa"
import { useGoogleLogin, GoogleLogin } from "@react-oauth/google"
import Logo from "../../../assets/img/auth_logo.png"
import tg_bot_icon from "../../../assets/img/icon_telegram_bot.png"

const Login = () => {
    const navigate = useNavigate()
    const handleBackToHome = () => navigate("/")
    const titleColor = "white"
    const textColor = "#BAA6FF"

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
        setError
    } = useForm()

    const contextData = useContext(AppContext)
    const isAuthorized = contextData?.isAuthorized
    const setIsAuthorized = contextData?.setAuthorized
    const setUserId = contextData?.setUserId

    const onSubmit = (values) => {
        return new Promise<void>((resolve) => {
            console.log("value: ", values)
            fetch(`${BackendUrl}/token`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: `username=${values.email}&password=${values.password}`
            })
                .then((response) => response.json())
                .then((response) => {
                    if (response.detail) {
                        setError("email", {
                            type: "manual",
                            message: response.detail
                        })
                        setError("password", {
                            type: "manual",
                            message: response.detail
                        })
                    } else if (response.access_token) {
                        console.log("loggedin: ", response.access_token)
                        const parsed_data = parseJwt(response.access_token)
                        console.log("parseJWT: ", parsed_data)
                        setUserId &&
                            setUserId(JSON.parse(parsed_data).user_id ?? 0)
                        window.localStorage.setItem(
                            "access_token",
                            response.access_token
                        )
                        setIsAuthorized && setIsAuthorized(true)
                    }
                    resolve()
                })
                .catch((err) => {
                    console.log("err:", err)
                    resolve()
                })
        })
    }

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: (tokenResponse) => {
            console.log("google login:", tokenResponse)
            fetch(
                `${BackendUrl}/google_token?token=${tokenResponse.access_token}`
            )
                .then((response) => response.json())
                .then((response) => {
                    if (response.detail) {
                        console.error("error: ", response.detail)
                    } else if (response.access_token) {
                        console.log("loggedin: ", response.access_token)
                        const parsed_data = parseJwt(response.access_token)
                        console.log("parseJWT: ", parsed_data)
                        setUserId &&
                            setUserId(JSON.parse(parsed_data).user_id ?? 0)
                        window.localStorage.setItem(
                            "access_token",
                            response.access_token
                        )
                        setIsAuthorized && setIsAuthorized(true)
                    }
                })
                .catch((err) => {
                    console.error("failed to login: ", err)
                })
        },
        onError: (err) => {
            console.log("Login Failed: ", err)
        }
    })

    return isAuthorized ? (
        <Navigate to={"/index"} />
    ) : (
        <Flex position={"relative"}>
            <Flex
                minH="100vh"
                h={{ base: "120vh", lg: "fit-content" }}
                w="100%"
                maxW="1044px"
                mx="auto"
                pt={{ sm: "100px", md: "0px" }}
                flexDirection="column"
                me={{ base: "auto", lg: "50px", xl: "auto" }}
            >
                <Flex
                    alignItems="center"
                    justifyContent="start"
                    style={{ userSelect: "none" }}
                    mx={{ base: "auto", lg: "unset" }}
                    ms={{ base: "auto", lg: "auto" }}
                    w={{ base: "100%", md: "50%", lg: "450px" }}
                    flexDirection={"column"}
                >
                    <Heading
                        color={titleColor}
                        fontSize="25.6px"
                        mb="10px"
                        fontWeight={500}
                        lineHeight={"normal"}
                        textAlign={"center"}
                        mt={{
                            base: "50px",
                            md: "150px"
                        }}
                    >
                        Starting chatting with your favorite
                        <br /> influencers now
                    </Heading>
                    <Flex
                        direction="column"
                        w="100%"
                        background="transparent"
                        mb={{ base: "40px", lg: "75px" }}
                        px="50px"
                    >
                        <Text
                            fontSize="16px"
                            color={textColor}
                            fontWeight="400"
                            textAlign="center"
                            mb="22px"
                        >
                            Login With
                        </Text>
                        <HStack spacing="40px" justify="center" mb="22px">
                            {/* <GoogleLogin
                                onSuccess={(credentialResponse) => {
                                    console.log(credentialResponse)
                                }}
                                onError={() => {
                                    console.log("Login Failed")
                                }}
                            /> */}
                            <GradientBorder borderRadius="15px">
                                <Flex
                                    _hover={{ filter: "brightness(120%)" }}
                                    transition="all .25s ease"
                                    cursor="pointer"
                                    justify="center"
                                    align="center"
                                    bg="rgb(19,21,54)"
                                    w="71px"
                                    h="71px"
                                    borderRadius="15px"
                                    onClick={() => handleGoogleLogin()}
                                >
                                    <Icon
                                        color={titleColor}
                                        as={FaGoogle}
                                        w="30px"
                                        h="30px"
                                        _hover={{
                                            filter: "brightness(120%)"
                                        }}
                                    />
                                </Flex>
                            </GradientBorder>
                            {/* <GradientBorder borderRadius="15px">
                                <Flex
                                    _hover={{ filter: "brightness(120%)" }}
                                    transition="all .25s ease"
                                    cursor="pointer"
                                    justify="center"
                                    align="center"
                                    bg="rgb(19,21,54)"
                                    w="71px"
                                    h="71px"
                                    borderRadius="15px"
                                >
                                    <Icon
                                        color={titleColor}
                                        as={FaFacebook}
                                        w="30px"
                                        h="30px"
                                        _hover={{
                                            filter: "brightness(120%)"
                                        }}
                                    />
                                </Flex>
                            </GradientBorder> */}
                        </HStack>
                        <Text
                            fontSize="16px"
                            color={textColor}
                            fontWeight="400"
                            textAlign="center"
                            mb="22px"
                        >
                            or
                        </Text>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <FormControl isInvalid={!!errors.email}>
                                <FormLabel
                                    ms="4px"
                                    fontSize="sm"
                                    fontWeight="normal"
                                    color="white"
                                    htmlFor="email"
                                >
                                    Email
                                </FormLabel>
                                <GradientBorder
                                    mb="24px"
                                    w={{ base: "100%", lg: "fit-content" }}
                                    borderRadius="20px"
                                >
                                    <Input
                                        id="email"
                                        color="white"
                                        bg="rgb(19,21,54)"
                                        border="transparent"
                                        borderRadius="20px"
                                        fontSize="sm"
                                        size="lg"
                                        w={{ base: "100%", md: "346px" }}
                                        maxW="100%"
                                        h="46px"
                                        placeholder="Your email address"
                                        {...register("email", {
                                            required: "This is required",
                                            pattern: {
                                                value: /^\S+@\S+$/i,
                                                message: "Invalid email address"
                                            }
                                        })}
                                    />
                                </GradientBorder>
                                {errors.email && (
                                    <FormErrorMessage mt={"-24px"} pb={"6px"}>
                                        {errors.email.message as string}
                                    </FormErrorMessage>
                                )}
                            </FormControl>
                            <FormControl isInvalid={!!errors.password}>
                                <FormLabel
                                    ms="4px"
                                    fontSize="sm"
                                    fontWeight="normal"
                                    color="white"
                                    htmlFor="password"
                                >
                                    Password
                                </FormLabel>
                                <GradientBorder
                                    mb="24px"
                                    w={{ base: "100%", lg: "fit-content" }}
                                    borderRadius="20px"
                                >
                                    <Input
                                        id="password"
                                        color="white"
                                        bg="rgb(19,21,54)"
                                        border="transparent"
                                        borderRadius="20px"
                                        fontSize="sm"
                                        size="lg"
                                        w={{ base: "100%", md: "346px" }}
                                        maxW="100%"
                                        type="password"
                                        placeholder="Your password"
                                        {...register("password", {
                                            required: "This is required",
                                            minLength: {
                                                value: 8,
                                                message:
                                                    "Minimum length should be 8"
                                            }
                                        })}
                                    />
                                </GradientBorder>
                                {errors.password && (
                                    <FormErrorMessage mt={"-24px"} pb={"6px"}>
                                        {errors.password.message as string}
                                    </FormErrorMessage>
                                )}
                            </FormControl>
                            <FormControl display="flex" alignItems="center">
                                <DarkMode>
                                    <Switch
                                        id="remember-login"
                                        colorScheme="brand"
                                        me="10px"
                                    />
                                </DarkMode>
                                <FormLabel
                                    htmlFor="remember-login"
                                    mb="0"
                                    ms="1"
                                    fontWeight="normal"
                                    color="white"
                                >
                                    Remember me
                                </FormLabel>
                            </FormControl>
                            <Button
                                variant="brand"
                                fontSize="10px"
                                type="submit"
                                w="100%"
                                // maxW="350px"
                                h="45"
                                mb="20px"
                                mt="20px"
                                isLoading={isSubmitting}
                            >
                                SIGN IN
                            </Button>
                        </form>
                        <Flex
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                            maxW="100%"
                            mt="0px"
                        >
                            <Text color={textColor} fontWeight="medium">
                                Don't have an account?
                                <Link
                                    color={titleColor}
                                    ms="5px"
                                    fontWeight="bold"
                                    as={RouterLink}
                                    to={"/signup"}
                                >
                                    Sign Up
                                </Link>
                            </Text>
                        </Flex>
                    </Flex>
                    <Flex
                        direction={"column"}
                        alignItems={"center"}
                        gap={"10px"}
                        mb={"20px"}
                    >
                        <Text>Contact Us</Text>
                        <Flex gap={"10px"} fontSize={"30px"} color={"#4C368D"}>
                            <a
                                href="https://t.me/+w_GZc7AEtsxiM2Fh"
                                target="_blank"
                            >
                                <FaTelegram />
                            </a>
                            <a
                                href="https://t.me/twinhubpremium_bot"
                                target="_blank"
                            >
                                <Image boxSize={"30px"} src={tg_bot_icon} />
                            </a>
                            <a
                                href="https://discord.gg/DNjbDrFM"
                                target="_blank"
                            >
                                <FaDiscord />
                            </a>
                            <a
                                href="https://www.instagram.com/twinhub.ai/?igshid=YmM0MjE2YWMzOA"
                                target="_blank"
                            >
                                <FaInstagram />
                            </a>
                            <a
                                href="https://www.tiktok.com/@twinhub.ai"
                                target="_blank"
                            >
                                <FaTiktok />
                            </a>
                            <a
                                href="https://www.youtube.com/channel/UC5pCim57xW170qjDsPusOYQ"
                                target="_blank"
                            >
                                <FaYoutube />
                            </a>
                            <a
                                href="https://www.facebook.com/people/TwinHub/100093399862136/"
                                target="_blank"
                            >
                                <FaFacebook />
                            </a>
                        </Flex>
                    </Flex>
                </Flex>
                <Box
                    display={{ base: "none", lg: "block" }}
                    overflowX="hidden"
                    h="100%"
                    maxW={{ md: "50vw", lg: "50vw" }}
                    minH="100vh"
                    w="960px"
                    position="absolute"
                    left="0px"
                >
                    <Box
                        bgImage={auth_background}
                        w="100%"
                        h="100%"
                        bgSize="cover"
                        bgPosition="50%"
                        position="absolute"
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Image src={Logo} alt="TwinHub" />
                        <Text
                            textAlign="center"
                            color="#7A8AEE"
                            letterSpacing="8px"
                            fontSize="16px"
                            fontWeight="500"
                            mt={"24px"}
                        >
                            INSPIRED BY THE FUTURE:
                        </Text>
                        <Text
                            mt={"10.8px"}
                            textAlign="center"
                            color="transparent"
                            letterSpacing="5.12px"
                            fontSize="25.6px"
                            fontWeight="500"
                            lineHeight={"normal"}
                            bgClip="text !important"
                            bg="linear-gradient(94.56deg, #FFFFFF 79.99%, #21242F 102.65%)"
                        >
                            The world’s most engaging AI
                            <br />
                            influencers platform
                        </Text>
                    </Box>
                </Box>
            </Flex>
        </Flex>
    )
}

export default Login
