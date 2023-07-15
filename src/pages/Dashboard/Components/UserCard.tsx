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
import { Navigate, useNavigate } from "react-router-dom"

export interface UserCardProps {
    name: string
    description: string
    image: string
    userId: string | number
}

const UserCard = ({ name, description, image, userId }: UserCardProps) => {
    const navigate = useNavigate()

    return (
        <Box
            maxW={{ base: "full", md: "275px" }}
            w={"full"}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={5}
            cursor={"pointer"}
            _hover={{
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)"
            }}
            onClick={() => navigate(`/chat/${userId}`)}
        >
            <Stack align={"start"} spacing={2}>
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
                <Image src={image} w={16} h={16} rounded={"full"} />
                <Box mt={2}>
                    <Heading size="md">{name}</Heading>
                    <Text mt={1} fontSize={"sm"}>
                        {description}
                    </Text>
                </Box>
                <Button
                    variant={"link"}
                    colorScheme={"whatsapp"}
                    size={"sm"}
                    onClick={() => navigate(`/chat/${userId}`)}
                >
                    Visit
                </Button>
            </Stack>
        </Box>
    )
}

export default UserCard
