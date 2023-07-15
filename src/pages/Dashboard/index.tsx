import {
    Box,
    Container,
    Flex,
    Heading,
    InputGroup,
    InputLeftElement,
    IconButton,
    Stack,
    Text,
    Input
} from "@chakra-ui/react"
import UserCard, { UserCardProps } from "./Components/UserCard"
import { useState } from "react"
import { SearchIcon } from "@chakra-ui/icons"

const Dashboard = () => {
    const [users, setUsers] = useState<UserCardProps[]>([
        {
            name: "Mike Tyson",
            image: "https://twinhub.s3.us-east-2.amazonaws.com/74/profile_pic.jpeg",
            description: "I am Mike, how are you",
            userId: "1"
        },
        {
            name: "Drake",
            image: "https://twinhub.s3.us-east-2.amazonaws.com/8/profile_pic.jpeg",
            description: "I am Drake, how are you",
            userId: "2"
        },
        {
            name: "Scarlette Johasson",
            image: "https://twinhub.s3.us-east-2.amazonaws.com/74/profile_pic.jpeg",
            description: "I am Scarlette, how are you",
            userId: "4"
        },
        {
            name: "Michael Jackson",
            image: "https://twinhub.s3.us-east-2.amazonaws.com/74/profile_pic.jpeg",
            description: "I am Michael, how are you",
            userId: "7"
        },
        {
            name: "Donald Trump",
            image: "https://twinhub.s3.us-east-2.amazonaws.com/74/profile_pic.jpeg",
            description: "I am Dona, how are you",
            userId: "9"
        }
    ])

    const [search, setSearch] = useState("")

    return (
        <Box p={4} mt={"80px"} color={"#FFF"}>
            <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
                <Heading
                    fontSize={{ base: "2xl", sm: "4xl" }}
                    fontWeight={"bold"}
                >
                    Who do you want to call?
                </Heading>
                <Flex
                    alignItems={"center"}
                    gap={"10px"}
                    justifyContent={"center"}
                    flexDirection={{
                        sm: "column",
                        md: "row"
                    }}
                >
                    <Text
                        color={"gray.300"}
                        fontSize={{ base: "sm", sm: "lg" }}
                    >
                        Search your favorite user
                    </Text>
                    <InputGroup
                        cursor="pointer"
                        bg={"#0F1535"}
                        borderRadius="15px"
                        borderColor="rgba(226, 232, 240, 0.3)"
                        w={{
                            sm: "80%",
                            md: "256px"
                        }}
                        mx={{ sm: "auto", md: "inherit" }}
                        me={{ sm: "auto", md: "20px" }}
                    >
                        <InputLeftElement
                            children={
                                <SearchIcon color={"#FFF"} w="15px" h="15px" />
                            }
                        />
                        <Input
                            fontSize="xs"
                            py="11px"
                            color={"gray.400"}
                            placeholder="Type here..."
                            borderRadius="inherit"
                            value={search}
                            onChange={(el) => setSearch(el.target.value)}
                        />
                    </InputGroup>
                </Flex>
            </Stack>

            <Container maxW={"5xl"} mt={12}>
                <Flex flexWrap="wrap" gridGap={6} justify="center">
                    {users
                        .filter((val) =>
                            val.name.toLowerCase().includes(search)
                        )
                        .map((el, key) => (
                            <UserCard
                                key={`${key}`}
                                name={el.name}
                                image={el.image}
                                description={el.description}
                                userId={el.userId}
                            />
                        ))}
                </Flex>
            </Container>
        </Box>
    )
}

export default Dashboard
