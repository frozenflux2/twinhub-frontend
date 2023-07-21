import {
    Box,
    Button,
    Link,
    Text,
    Flex,
    FormControl,
    FormLabel,
    HStack,
    Input,
    Icon,
    DarkMode,
    Switch,
    FormErrorMessage,
    Image
} from "@chakra-ui/react"
import { motion } from "framer-motion"
import { useNavigate, Link as RounterLink, Navigate } from "react-router-dom"
import auth_background from "../../../assets/img/auth_background.png"
import GradientBorder from "../Component/GradientBorder"
import {
    FaFacebook,
    FaGoogle,
    FaApple,
    FaDiscord,
    FaTelegram,
    FaInstagram,
    FaTiktok,
    FaYoutube
} from "react-icons/fa"
import { useForm } from "react-hook-form"
import { AppContext, BackendUrl } from "../../../constants"
import { useContext } from "react"
import { parseJwt } from "utils/parseJWT"
import { useGoogleLogin } from "@react-oauth/google"
import Logo from "../../../assets/img/auth_logo.png"
import tg_bot_icon from "../../../assets/img/icon_telegram_bot.png"

const Signup = () => {
    const titleColor = "white"
    const textColor = "gray.400"

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
        setError,
        watch
    } = useForm()

    const contextData = useContext(AppContext)
    const isAuthorized = contextData?.isAuthorized
    const setIsAuthorized = contextData?.setAuthorized
    const setUserId = contextData?.setUserId

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

    const onSubmit = (values) => {
        return new Promise<void>((resolve) => {
            const { email, password } = values
            console.log(email, password)

            const formData = new FormData()
            formData.append("username", email)
            formData.append("password", password)

            fetch(`${BackendUrl}/signup`, {
                method: "POST",
                body: formData
            })
                .then((response) => response.json())
                .then((response) => {
                    if (response.detail) {
                        setError("email", {
                            type: "manual",
                            message: response.detail
                        })
                    } else if (response.access_token) {
                        console.log("signup and login: ", response.access_token)
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

    return isAuthorized ? (
        <Navigate to={"/index"} />
    ) : (
        <Flex position="relative" overflow={{ lg: "hidden" }}>
            <Flex
                flexDirection="column"
                h={{ sm: "initial", md: "unset" }}
                w={{ base: "90%" }}
                maxW="1044px"
                mx="auto"
                justifyContent="space-between"
                pt={{ sm: "100px", md: "0px" }}
                me={{ base: "auto", lg: "50px", xl: "auto" }}
            >
                <Flex
                    alignItems="center"
                    justifyContent="start"
                    style={{ userSelect: "none" }}
                    flexDirection="column"
                    mx={{ base: "auto", lg: "unset" }}
                    ms={{ base: "auto", lg: "auto" }}
                    mb="50px"
                    w={{ base: "100%", md: "50%", lg: "42%" }}
                >
                    <Flex
                        direction="column"
                        textAlign="center"
                        justifyContent="center"
                        align="center"
                        mt={{ base: "60px", md: "140px" }}
                        mb="50px"
                    >
                        <Text
                            fontSize="4xl"
                            lineHeight="39px"
                            color="white"
                            fontWeight="bold"
                        >
                            Welcome!
                        </Text>
                        <Text
                            fontSize="md"
                            color="white"
                            fontWeight="normal"
                            mt="10px"
                            w={{
                                base: "100%",
                                md: "90%",
                                lg: "90%",
                                xl: "80%"
                            }}
                        >
                            Starting chatting with your favorite influencers now
                        </Text>
                    </Flex>
                    <GradientBorder
                        p="2px"
                        me={{ base: "none", lg: "30px", xl: "none" }}
                    >
                        <Flex
                            background="transparent"
                            borderRadius="30px"
                            direction="column"
                            p="40px"
                            minW={{ base: "unset", md: "430px", xl: "450px" }}
                            w="100%"
                            mx={{ base: "0px" }}
                            bg={{
                                base: "rgb(19,21,56)"
                            }}
                        >
                            <Text
                                fontSize="xl"
                                color={textColor}
                                fontWeight="bold"
                                textAlign="center"
                                mb="22px"
                            >
                                Register With
                            </Text>
                            <HStack spacing="40px" justify="center" mb="22px">
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
                                        <Link href="#">
                                            <Icon
                                                color={titleColor}
                                                as={FaFacebook}
                                                w="30px"
                                                h="30px"
                                                _hover={{
                                                    filter: "brightness(120%)"
                                                }}
                                            />
                                        </Link>
                                    </Flex>
                                </GradientBorder> */}
                            </HStack>
                            <Text
                                fontSize="lg"
                                color="gray.400"
                                fontWeight="bold"
                                textAlign="center"
                                mb="22px"
                            >
                                or
                            </Text>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <FormControl
                                    isInvalid={
                                        !!errors.email ||
                                        !!errors.password ||
                                        !!errors.repassword
                                    }
                                >
                                    <FormLabel
                                        color={titleColor}
                                        ms="4px"
                                        fontSize="sm"
                                        fontWeight="normal"
                                        htmlFor="email"
                                    >
                                        Email
                                    </FormLabel>
                                    <GradientBorder
                                        mb="24px"
                                        h="50px"
                                        w={{ base: "100%", lg: "fit-content" }}
                                        borderRadius="20px"
                                    >
                                        <Input
                                            id="email"
                                            color={titleColor}
                                            bg={{
                                                base: "rgb(19,21,54)"
                                            }}
                                            border="transparent"
                                            borderRadius="20px"
                                            fontSize="sm"
                                            size="lg"
                                            w={{ base: "100%", md: "346px" }}
                                            maxW="100%"
                                            h="46px"
                                            type="email"
                                            placeholder="Your email address"
                                            {...register("email", {
                                                required: "This is required",
                                                pattern: {
                                                    value: /^\S+@\S+$/i,
                                                    message:
                                                        "Invalid email address"
                                                }
                                            })}
                                        />
                                    </GradientBorder>
                                    {errors.email && (
                                        <FormErrorMessage
                                            mt={"-24px"}
                                            pb={"6px"}
                                        >
                                            {errors.email.message as string}
                                        </FormErrorMessage>
                                    )}
                                    <FormLabel
                                        color={titleColor}
                                        ms="4px"
                                        fontSize="sm"
                                        fontWeight="normal"
                                        htmlFor="password"
                                    >
                                        Password
                                    </FormLabel>
                                    <GradientBorder
                                        mb="24px"
                                        h="50px"
                                        w={{ base: "100%", lg: "fit-content" }}
                                        borderRadius="20px"
                                    >
                                        <Input
                                            id="password"
                                            color={titleColor}
                                            bg={{
                                                base: "rgb(19,21,54)"
                                            }}
                                            border="transparent"
                                            borderRadius="20px"
                                            fontSize="sm"
                                            size="lg"
                                            w={{ base: "100%", md: "346px" }}
                                            maxW="100%"
                                            h="46px"
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
                                        <FormErrorMessage
                                            mt={"-24px"}
                                            pb={"6px"}
                                        >
                                            {errors.password.message as string}
                                        </FormErrorMessage>
                                    )}
                                    <FormLabel
                                        color={titleColor}
                                        ms="4px"
                                        fontSize="sm"
                                        fontWeight="normal"
                                        htmlFor="repassword"
                                    >
                                        Confirm Password
                                    </FormLabel>
                                    <GradientBorder
                                        mb="24px"
                                        h="50px"
                                        w={{ base: "100%", lg: "fit-content" }}
                                        borderRadius="20px"
                                    >
                                        <Input
                                            id="repassword"
                                            color={titleColor}
                                            bg={{
                                                base: "rgb(19,21,54)"
                                            }}
                                            border="transparent"
                                            borderRadius="20px"
                                            fontSize="sm"
                                            size="lg"
                                            w={{ base: "100%", md: "346px" }}
                                            maxW="100%"
                                            h="46px"
                                            type="password"
                                            placeholder="Re-enter your password"
                                            {...register("repassword", {
                                                required: "This is required",
                                                minLength: {
                                                    value: 8,
                                                    message:
                                                        "Minimum length should be 8"
                                                },
                                                validate: (value) =>
                                                    value ===
                                                        watch("password") ||
                                                    "Passwords do not match"
                                            })}
                                        />
                                    </GradientBorder>
                                    {errors.repassword && (
                                        <FormErrorMessage
                                            mt={"-24px"}
                                            pb={"6px"}
                                        >
                                            {
                                                errors.repassword
                                                    .message as string
                                            }
                                        </FormErrorMessage>
                                    )}
                                    <FormControl
                                        display="flex"
                                        alignItems="center"
                                        mb="24px"
                                    >
                                        <DarkMode>
                                            <Switch
                                                id="remember-login"
                                                colorScheme="brand"
                                                me="10px"
                                            />
                                        </DarkMode>

                                        <FormLabel
                                            color={titleColor}
                                            htmlFor="remember-login"
                                            mb="0"
                                            fontWeight="normal"
                                        >
                                            Remember me
                                        </FormLabel>
                                    </FormControl>
                                    <Button
                                        variant="brand"
                                        fontSize="10px"
                                        type="submit"
                                        w="100%"
                                        maxW="350px"
                                        h="45"
                                        mb="20px"
                                        mt="20px"
                                        isLoading={isSubmitting}
                                    >
                                        SIGN UP
                                    </Button>
                                </FormControl>
                                <Flex
                                    flexDirection="column"
                                    justifyContent="center"
                                    alignItems="center"
                                    maxW="100%"
                                    mt="0px"
                                >
                                    <Text color={textColor} fontWeight="medium">
                                        Already have an account?
                                        <Link
                                            color={titleColor}
                                            as={RounterLink}
                                            ms="5px"
                                            to={"/login"}
                                            fontWeight="bold"
                                        >
                                            Sign In
                                        </Link>
                                    </Text>
                                </Flex>
                            </form>
                        </Flex>
                    </GradientBorder>
                    <Flex
                        direction={"column"}
                        alignItems={"center"}
                        gap={"10px"}
                        mt={"10px"}
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
                {/* <Box
                    w={{ base: "335px", md: "450px" }}
                    mx={{ base: "auto", lg: "unset" }}
                    ms={{ base: "auto", lg: "auto" }}
                    mb="90px"
                >
                    <AuthFooter />
                </Box> */}
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
                            // color="transparent"
                            color={"#FFF"}
                            letterSpacing="5.12px"
                            fontSize="25.6px"
                            fontWeight="500"
                            lineHeight={"normal"}
                            // bgClip="text !important"
                            // bg="linear-gradient(94.56deg, #FFFFFF 79.99%, #21242F 102.65%)"
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

export default Signup
