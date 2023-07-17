import {
    Center,
    Heading,
    VStack,
    Text,
    Button,
    Link,
    HStack
} from "@chakra-ui/react"
import { motion } from "framer-motion"
import PriceSlider from "./Components/PriceSlider"
import { useContext, useState } from "react"
import { FcCheckmark } from "react-icons/fc"
import { loadStripe } from "@stripe/stripe-js"
import { AppContext, BackendUrl } from "constants"
import { Navigate } from "react-router-dom"

const Credits = () => {
    const contextData = useContext(AppContext)
    const isAuthorized = contextData?.isAuthorized
    const user_id = contextData?.userId

    const [sliderValue, setSliderValue] = useState(50)
    const totalPrice = 500

    const stripe_test =
        "pk_test_51NGPlbEA0RyojNxJP7pQz7n8TLRs8HEAbdMRS62z9QnujnPJcvAQ7lyGTPP6lrtqB5Gd4zZ5kUsSUCT5HcgVRG0V00INg4CBoC"
    const stripe = loadStripe(stripe_test)

    const handleStripe = () => {
        const amountInCents = totalPrice * sliderValue

        // fetch(`${BackendUrl}/checkout`, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
        //         amount: amountInCents,
        //         user_id: user_id
        //     })
        // })
        //     .then((response) => {
        //         return response.json()
        //     })
        //     .then((data) => {
        //         stripe
        //             .redirectToCheckout({
        //                 sessionId: data.sessionId
        //             })
        //             .then((result) => {
        //                 console.log(result.error.message)
        //             })
        //     })
    }

    return isAuthorized ? (
        <Center
            as={motion.main}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            flexDirection="column"
            textAlign="center"
            height={"100vh"}
        >
            <VStack
                gap={3}
                p={"2rem"}
                bg={"#FFF"}
                borderRadius={".5rem"}
                w={"60vw"}
            >
                <Heading>Choose your Plan</Heading>
                <PriceSlider
                    totalPrice={totalPrice}
                    sliderValue={sliderValue}
                    setSliderValue={(e) => setSliderValue(e)}
                />
                <Button
                    bgColor="#667eea !important"
                    color="#fff"
                    border="none"
                    borderRadius={5}
                    padding="10px 20"
                    fontSize="1.2em"
                    marginTop={10}
                    marginBottom={10}
                >
                    Checkout
                </Button>
                <Text color={"#000"}>
                    Powered by{" "}
                    <Link
                        color="blue"
                        href="https://stripe.com"
                        target="_blank"
                    >
                        Stripe
                    </Link>
                </Text>
                <HStack fontWeight={"bold"}>
                    <FcCheckmark />
                    <span>Pricing: $1 / minute</span>
                </HStack>
                <HStack fontWeight={"bold"}>
                    <FcCheckmark />
                    <span>Chat with all the AI digital twins</span>
                </HStack>
                <HStack fontWeight={"bold"}>
                    <FcCheckmark />
                    <span>
                        Accessible from web and mobile (currently no support iOS
                        / Safari)
                    </span>
                </HStack>
                <HStack fontWeight={"bold"}>
                    <FcCheckmark />
                    <span>
                        Customize all the digital twins to your liking 24 / 7
                        customer support
                    </span>
                </HStack>
            </VStack>
        </Center>
    ) : (
        <Navigate to={"/login"} />
    )
}

export default Credits
