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

const Home = () => {
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
            <Heading fontSize="5em">Home</Heading>
        </Center>
    )
}

export default Home
