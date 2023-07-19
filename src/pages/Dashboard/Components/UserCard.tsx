import {
    Box,
    Button,
    Container,
    Flex,
    VStack,
    Heading,
    Image,
    Stack,
    Text
} from "@chakra-ui/react"
import { personaProps } from "../../../constants"
import { Navigate, useNavigate } from "react-router-dom"
import { PhoneIcon } from "@chakra-ui/icons"
import { FaPhone, FaPhoneAlt, FaPhoneSquare } from "react-icons/fa"

const UserCard = ({ name, profile_pic_url, id }: personaProps) => {
    const navigate = useNavigate()

    return (
        <Box
            maxW={{ base: "45%", md: "222px" }}
            w={"full"}
            h={"112px"}
            mt={"36px"}
            bg={
                "linear-gradient(180deg, rgba(255, 255, 255, 0) 11.02%, rgba(255, 255, 255, 0.5) 100%)"
            }
            _hover={{
                filter: "brightness(120%)",
                mt: "32px"
            }}
            filter={"drop-shadow(0px 14px 10px rgba(0, 0, 0, 0.1))"}
            borderRadius={"14px"}
            border={"1px solid rgba(255, 255, 255, 0.16)"}
            cursor={"pointer"}
            transition={"0.2s linear"}
            onClick={() => navigate(`/chat/${id}`)}
        >
            <Flex
                flex={1}
                zIndex={1}
                gap={"13px"}
                flexDirection={"column"}
                mt={"-36px"}
                cursor={"pointer"}
                mx={"23px"}
            >
                <Image
                    src={profile_pic_url}
                    w={"88px"}
                    h={"88px"}
                    rounded={"full"}
                    border={"4px solid rgba(255, 255, 255, 0.16)"}
                />
                <Flex justifyContent={"space-between"} alignItems={"center"}>
                    <Text size="md" textAlign={"center"} color={"#504D73"}>
                        {name}
                    </Text>
                    <FaPhoneAlt />
                </Flex>
            </Flex>
        </Box>
    )
}

export default UserCard
