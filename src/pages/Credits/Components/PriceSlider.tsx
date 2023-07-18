import { useState } from "react"
import {
    Box,
    Slider,
    SliderMark,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb
} from "@chakra-ui/react"

interface PriceSliderProps {
    totalPrice: number
    sliderValue: number
    setSliderValue: (e: any) => void
}

const PriceSlider = ({
    totalPrice,
    sliderValue,
    setSliderValue
}: PriceSliderProps) => {
    // const [sliderValue, setSliderValue] = useState(50)

    const labelStyles = {
        mt: "2",
        ml: "-2.5",
        fontSize: "sm"
    }

    return (
        <Box pt={6} pb={2} width={"full"}>
            <Slider
                aria-label="slider-ex-6"
                onChange={(val) => setSliderValue(Math.max(1, val))}
            >
                <SliderMark value={0} {...labelStyles}>
                    ${0}
                </SliderMark>
                <SliderMark value={25} {...labelStyles}>
                    ${totalPrice / 4}
                </SliderMark>
                <SliderMark value={50} {...labelStyles}>
                    ${totalPrice / 2}
                </SliderMark>
                <SliderMark value={75} {...labelStyles}>
                    ${(totalPrice * 3) / 4}
                </SliderMark>
                <SliderMark value={100} {...labelStyles}>
                    ${totalPrice}
                </SliderMark>
                <SliderMark
                    value={sliderValue}
                    textAlign="center"
                    bg="blue.500"
                    color="white"
                    mt="-10"
                    ml="-5"
                    w="12"
                >
                    ${(totalPrice * sliderValue) / 100}
                </SliderMark>
                <SliderTrack>
                    <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
            </Slider>
        </Box>
    )
}

export default PriceSlider
