import { Center, CircularProgress, Heading } from "@chakra-ui/react"

const Loader = () => {
    return (
        <Center h={"100vh"} flexDirection={"column"} color={"white"}>
            <CircularProgress size={"200px"} isIndeterminate />
            <Heading>Loading...</Heading>
        </Center>
    )
}

export default Loader
