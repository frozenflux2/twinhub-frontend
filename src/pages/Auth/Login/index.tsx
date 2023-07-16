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
    FormErrorMessage
} from "@chakra-ui/react"
import { motion } from "framer-motion"
import { useNavigate, Link as RouterLink, Navigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import auth_background from "../../../assets/img/auth_background.png"
import GradientBorder from "../Component/GradientBorder"
import { useContext } from "react"
import { AppContext, BackendUrl } from "../../../constants"

const Login = () => {
    const navigate = useNavigate()

    const handleBackToHome = () => navigate("/")
    const titleColor = "white"
    const textColor = "gray.400"

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
        setError
    } = useForm()

    const contextData = useContext(AppContext)
    const isAuthorized = contextData?.isAuthorized
    const setIsAuthorized = contextData?.setAuthorized

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
                    px="50px"
                >
                    <Flex
                        direction="column"
                        w="100%"
                        background="transparent"
                        mt={{
                            base: "50px",
                            md: "150px",
                            lg: "160px",
                            xl: "245px"
                        }}
                        mb={{ base: "60px", lg: "95px" }}
                    >
                        <Heading color={titleColor} fontSize="32px" mb="10px">
                            Nice to see you!
                        </Heading>
                        <Text
                            mb="36px"
                            ms="4px"
                            color={textColor}
                            fontWeight="bold"
                            fontSize="14px"
                        >
                            Enter your email and password to sign in
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
                                maxW="350px"
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
                        <Text
                            textAlign="center"
                            color="white"
                            letterSpacing="8px"
                            fontSize="20px"
                            fontWeight="500"
                        >
                            INSPIRED BY THE FUTURE:
                        </Text>
                        <Text
                            textAlign="center"
                            color="transparent"
                            letterSpacing="8px"
                            fontSize="36px"
                            fontWeight="bold"
                            bgClip="text !important"
                            bg="linear-gradient(94.56deg, #FFFFFF 79.99%, #21242F 102.65%)"
                        >
                            THE VISION UI DASHBOARD
                        </Text>
                    </Box>
                </Box>
            </Flex>
        </Flex>
    )
}

export default Login
