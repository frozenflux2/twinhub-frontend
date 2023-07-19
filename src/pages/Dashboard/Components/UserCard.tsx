import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    Image,
    Stack,
    Text
} from "@chakra-ui/react"
import { personaProps } from "../../../constants"
import { Navigate, useNavigate } from "react-router-dom"

const UserCard = ({ name, profile_pic_url, id }: personaProps) => {
    const navigate = useNavigate()

    return (
        <Box
            maxW={{ base: "45%", md: "20%" }}
            w={"full"}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={10}
            cursor={"pointer"}
            _hover={{
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)"
            }}
            onClick={() => navigate(`/chat/${id}`)}
        >
            <Stack align={"center"} spacing={5}>
                {/* <Flex
                    w={16}
                    h={16}
                    align={"center"}
                    justify={"center"}
                    color={"white"}
                    rounded={"full"}
                    bg={useColorModeValue("gray.100", "gray.700")}
                >
                    {image}
                </Flex> */}
                <Image src={profile_pic_url} w={16} h={16} rounded={"full"} />
                <Box mt={2}>
                    <Text size="md" textAlign={"center"}>
                        {name}
                    </Text>
                    {/* <Text mt={1} fontSize={"sm"}>
                        {prompt?.slice(0, 100) + "..."}
                    </Text> */}
                </Box>
            </Stack>
        </Box>
    )
}

export default UserCard
