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
    Switch
} from "@chakra-ui/react"
import { motion } from "framer-motion"
import { useNavigate, Link as RounterLink } from "react-router-dom"
import auth_background from "../../../assets/img/auth_background.png"
import GradientBorder from "../Component/GradientBorder"
import { FaFacebook, FaGoogle, FaApple } from "react-icons/fa"

const Signup = () => {
    const titleColor = "white"
    const textColor = "gray.400"

    return (
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
                        mt={{ base: "60px", md: "140px", lg: "200px" }}
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
                            Use these awesome forms to login or create new
                            account in your project for free.
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
                            <HStack spacing="15px" justify="center" mb="22px">
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
                                </GradientBorder>
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
                                    >
                                        <Link href="#">
                                            <Icon
                                                color={titleColor}
                                                as={FaApple}
                                                w="30px"
                                                h="30px"
                                                _hover={{
                                                    filter: "brightness(120%)"
                                                }}
                                            />
                                        </Link>
                                    </Flex>
                                </GradientBorder>
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
                                    >
                                        <Link href="#">
                                            <Icon
                                                color={titleColor}
                                                as={FaGoogle}
                                                w="30px"
                                                h="30px"
                                                _hover={{
                                                    filter: "brightness(120%)"
                                                }}
                                            />
                                        </Link>
                                    </Flex>
                                </GradientBorder>
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
                            <FormControl>
                                <FormLabel
                                    color={titleColor}
                                    ms="4px"
                                    fontSize="sm"
                                    fontWeight="normal"
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
                                    />
                                </GradientBorder>
                                <FormLabel
                                    color={titleColor}
                                    ms="4px"
                                    fontSize="sm"
                                    fontWeight="normal"
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
                                    />
                                </GradientBorder>
                                <FormLabel
                                    color={titleColor}
                                    ms="4px"
                                    fontSize="sm"
                                    fontWeight="normal"
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
                                    />
                                </GradientBorder>
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
                        </Flex>
                    </GradientBorder>
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
                    h="1300px"
                    maxW={{ md: "50vw", lg: "48vw" }}
                    w="960px"
                    position="absolute"
                    left="0px"
                >
                    <Box
                        bgImage={auth_background}
                        w="100%"
                        h="1300px"
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

export default Signup
