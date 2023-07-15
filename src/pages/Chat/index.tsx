import { Button, Center, Flex, Heading, Image } from "@chakra-ui/react"
import { useParams } from "react-router-dom"

const Chatting = () => {
    const params = useParams()
    console.log("params: ", params)

    return (
        <Center
            alignItems={"center"}
            h={"100vh"}
            flexDirection={"column"}
            gap={"20px"}
            color={"#FFF"}
        >
            <Heading as={"h1"}>{"Mike"}</Heading>
            <Image
                src="https://twinhub.s3.us-east-2.amazonaws.com/74/profile_pic.jpeg"
                alt="mike"
                w={"300px"}
                h={"300px"}
                rounded={"full"}
            />
            <Button p={"12px 24px"}>Call</Button>
        </Center>
    )
}

export default Chatting
