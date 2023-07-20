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
import { useContext, useEffect, useState } from "react"
import { FcCheckmark } from "react-icons/fc"
import { loadStripe } from "@stripe/stripe-js"
import { AppContext, BackendUrl, CurrentVersion } from "../../constants"
import { Navigate, useLocation } from "react-router-dom"

const Credits = () => {
    const contextData = useContext(AppContext)
    const isAuthorized = contextData?.isAuthorized
    const user_id = contextData?.userId

    const [sliderValue, setSliderValue] = useState(1)
    const totalPrice = 500
    const [currentBalance, setCurrentBalance] = useState(-1)

    // const stripe_test =
    //     "pk_test_51NGPlbEA0RyojNxJP7pQz7n8TLRs8HEAbdMRS62z9QnujnPJcvAQ7lyGTPP6lrtqB5Gd4zZ5kUsSUCT5HcgVRG0V00INg4CBoC"
    // const stripe = loadStripe(stripe_test)

    const handleStripe = () => {
        const amountInCents = totalPrice * sliderValue

        fetch(
            `${BackendUrl}/${
                CurrentVersion === "PREMIUM" ? "checkout-premium" : "checkout"
            }`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    amount: amountInCents,
                    user_id: user_id
                })
            }
        )
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                console.log("success")
                window.location.href = `https://checkout.stripe.com/c/pay/${data.sessionId}#fidkdWxOYHwnPyd1blppbHNgWjA0S0JVaWdARDVXfGpvS31PMkRqczA1VEJPZzRJQGR%2FVkpXQl9ncUluU19NMXU8XWl0ZzYwPUoybk90QVJCNXY0U11ocnxtaX9OQ29xXFFqbX9ySnxrRGFTNTVDaW9wPDUycCcpJ2hsYXYnP34nYnBsYSc%2FJ2RjZ2NgYGYzKGAxZzUoMTNjZChnNTMyKGRmYDQ1PGBnMmQ3PWZgPDFjZicpJ2hwbGEnPycxYzE8Zzc8PCg1PTQxKDEyM2YoPGAzYyhgYDU8NTJkNmE0ZDA3NjQwNDMnKSd2bGEnPydgZ2c2PGA9YCg2ZzQ9KDE1MDcoZGcwYSgxM2M9Z2Y2MzI1ZDwyYTwzPWYneCknZ2BxZHYnP15YKSdpZHxqcHFRfHVgJz8ndmxrYmlgWmxxYGgnKSd3YGNgd3dgd0p3bGJsayc%2FJ21xcXV2PyoqNzc2KzQzMCszKzE8J3gl`
                // navigate(
                //     `https://checkout.stripe.com/c/pay/${data.sessionId}#fidkdWxOYHwnPyd1blpxYHZxWjA0S0JVaWdARDVXfGpvS31PVTJ1VH8yaz1RSVd2PU1ARGdhSFdWMzd%2FPFRrcG9rVU9mc0RUMml8QlFVVTNpd3F0RzBCYTF%2FXzBuUHZWUEZRME1mYlNXQjVTNTVMS2IxRkdqRicpJ2hsYXYnP34nYnBsYSc%2FJ2RjZ2NgYGYzKGAxZzUoMTNjZChnNTMyKGRmYDQ1PGBnMmQ3PWZgPDFjZicpJ2hwbGEnPycxYzE8Zzc8PCg1PTQxKDEyM2YoPGAzYyhgYDU8NTJkNmE0ZDA3NjQwNDMnKSd2bGEnPyczZGMwZzI3Yyg0NTxgKDE1YTMoPGYxNygyNGNgNzFnMjAxPDYzZmRhZGAneCknZ2BxZHYnP15YKSdpZHxqcHFRfHVgJz8ndmxrYmlgWmxxYGgnKSd3YGNgd3dgd0p3bGJsayc%2FJ21xcXV2PyoqNzc2KzQzMCszKzE8J3gl`
                // )
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        fetch(`${BackendUrl}/balance/${user_id}`)
            .then((response) => response.json())
            .then((result) => {
                setCurrentBalance(result.balance)
            })
            .catch((err) => {
                console.log("balance get err: ", err)
            })
    }, [user_id])

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
                w={{
                    base: "100vw",
                    md: "60vw"
                }}
                mt={{
                    base: "25vh",
                    md: "0"
                }}
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
                    onClick={() => handleStripe()}
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
                <Text color={"#000"}>
                    Current Balance:{" "}
                    <span
                        style={{
                            color: "#EF5626",
                            fontWeight: 800,
                            fontSize: "18px"
                        }}
                    >
                        ${currentBalance}
                    </span>
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
                        Accessible from web and mobile (support iOS / Safari)
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
