import {
    Box,
    Button,
    Center,
    Grid,
    Heading,
    Image,
    Link,
    Stack,
    Text,
    VStack
} from "@chakra-ui/react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

const Page404 = () => {
    const navigate = useNavigate()

    const handleBackToHome = () => navigate("/")

    return (
        <Center
            as={motion.main}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            flexDirection="column"
            textAlign="center"
            textColor={"#FFF"}
            height={"100vh"}
        >
            <Heading fontSize="5em">Page Not Found</Heading>
            <VStack gap={3} pt={2}>
                <Text fontSize="2xl">
                    There's nothing here. Want to go back?
                </Text>
                <Button
                    rounded="1em"
                    shadow="md"
                    bg="white"
                    _hover={{ bg: "gray.100" }}
                    fontSize="1.3em"
                    onClick={handleBackToHome}
                >
                    Let&apos;s Head Back!
                </Button>
            </VStack>
        </Center>
    )
}

export default Page404
