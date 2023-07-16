import { Button, Center, Heading, Image } from "@chakra-ui/react"
import { AppContext, BackendUrl } from "../../constants"
import { useContext, useEffect, useState } from "react"
import { Navigate, useParams } from "react-router-dom"
import Loader from "components/Loader"

interface personalDataType {
    name: string
    pic_url: string
}

const Chatting = () => {
    const params = useParams()
    const [personalData, setPersonalData] = useState<personalDataType>()
    const [isLoading, setLoading] = useState(true)

    const contextData = useContext(AppContext)
    const isAuthorized = contextData?.isAuthorized

    useEffect(() => {
        fetch(BackendUrl + "/api/set_persona", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                persona_id: params.id
            })
        })
            .then((response) => response.json())
            .then((data) => {
                setPersonalData({
                    name: data?.name,
                    pic_url: data?.profile_pic_url
                })
                setLoading(false)
            })
            .catch((error) => console.error("Error:", error))
    }, [])

    return isAuthorized ? (
        isLoading ? (
            <Loader />
        ) : (
            <Center
                alignItems={"center"}
                h={"100vh"}
                flexDirection={"column"}
                gap={"20px"}
                color={"#FFF"}
            >
                <Heading as={"h1"}>{personalData?.name}</Heading>
                <Image
                    src={personalData?.pic_url}
                    alt={personalData?.name}
                    w={"300px"}
                    h={"300px"}
                    rounded={"full"}
                />
                <Button p={"12px 24px"}>Call</Button>
            </Center>
        )
    ) : (
        <Navigate to={"/login"} />
    )
}

export default Chatting
