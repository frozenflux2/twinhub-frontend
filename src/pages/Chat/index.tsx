import {
    Button,
    Center,
    Flex,
    Heading,
    IconButton,
    Image,
    Text
} from "@chakra-ui/react"
import { AppContext, BackendUrl, WebsocketURL } from "../../constants"
import { RefObject, createRef, useContext, useEffect, useState } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import AudioRecorder from "audio-recorder-polyfill"
import Loader from "components/Loader"
import { PhoneIcon } from "@chakra-ui/icons"

window.MediaRecorder = AudioRecorder

interface personalDataType {
    name: string
    pic_url: string
}

interface AudioObject {
    transcript: any
    audioBlob: Blob
}

const Chatting = () => {
    const params = useParams()
    const [personalData, setPersonalData] = useState<personalDataType>()
    const [isLoading, setLoading] = useState(true)
    const [isRecording, setIsRecording] = useState(false)
    const navigate = useNavigate()

    const contextData = useContext(AppContext)
    const isAuthorized = contextData?.isAuthorized
    const user_id = contextData?.userId

    let mediaRecorder: MediaRecorder
    let socket: WebSocket

    const createWebSocket = () => {
        let url = `${WebsocketURL}/${user_id}/${params.id}`
        console.log("ws url: ", url)
        socket = new WebSocket(url)

        socket.onopen = () => {
            console.log("debug socket open: ", url)
            mediaRecorder.addEventListener("dataavailable", async (event) => {
                if (event.data.size > 0 && socket.readyState == 1) {
                    console.log("data availabe: ", event.data)
                    socket.send(event.data)
                }
            })
        }

        var audioQueue: AudioObject[] = []
        var isPlaying = false

        socket.onmessage = (event) => {
            var data = JSON.parse(event.data)
            var transcript = data.transcript
            var audioBase64 = data.audio
            var status = data.status
            console.log("onmessage/data/status:", status)

            if (status == "insufficient_balance") {
                alert("Insufficient funds. Please top up your account.")
                mediaRecorder.stop()
                socket.close()
                setIsRecording(false)
                navigate("/payment")
                return
            }

            var audioData = atob(audioBase64)
            var audioArrayBuffer = new ArrayBuffer(audioData.length)
            var audioBufferView = new Uint8Array(audioArrayBuffer)
            for (var i = 0; i < audioData.length; i++) {
                audioBufferView[i] = audioData.charCodeAt(i)
            }

            // Create a Blob from the audio data
            var audioBlob = new Blob([audioArrayBuffer], { type: "audio/wav" })

            // Add the audio data to the queue
            audioQueue.push({ transcript: transcript, audioBlob: audioBlob })

            // If audio is not currently playing, start playing the next audio
            if (!isPlaying) {
                playNextAudio()
            }
        }

        const playNextAudio = () => {
            // Check if there are audio items in the queue
            if (audioQueue.length > 0) {
                var audioItem = audioQueue.shift() // Get the next audio item from the queue
                var transcript = audioItem?.transcript
                var audioBlob = audioItem?.audioBlob

                if (!audioBlob) return

                // Create an audio element and set the audio source using a Blob URL
                var audioElement = document.createElement("audio")
                // currentAudioElement = audioElement;
                audioElement.src = URL.createObjectURL(audioBlob)

                // Use the transcript as needed
                console.log("Transcript:", transcript)

                // Set the flag to indicate that audio is currently playing
                isPlaying = true

                // Play the audio
                audioElement.play()

                // When the audio finishes playing, play the next audio
                audioElement.onended = () => {
                    // Set the flag to indicate that audio has finished playing
                    isPlaying = false

                    // Play the next audio
                    playNextAudio()

                    // If the mediaRecorder is not recording, start recording
                    if (!isRecording) {
                        mediaRecorder.start()
                        setIsRecording(true)
                    }
                }
            }
        }

        socket.onclose = (err) => {
            console.log("debug socket close: ", err)
            mediaRecorder.stop()
            setIsRecording(false)
        }

        socket.onerror = (error) => {
            console.log("debug socket error: ", error)
            mediaRecorder.stop()
            socket.close()
            setIsRecording(false)
        }
    }

    // const stopRecording = () => {
    //     try {
    //         setIsRecording(false)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    useEffect(() => {
        if (!isRecording) {
            // stopRecording()
        } else {
            console.log("Recording...")
            navigator.mediaDevices
                .getUserMedia({ audio: true })
                .then((stream) => {
                    // if (!MediaRecorder.isTypeSupported("audio/webm")) {
                    //     return alert(
                    //         "this browser not supported. Please use another browser."
                    //     )
                    // }

                    mediaRecorder = new MediaRecorder(stream, {
                        mimeType: "audio/mp3"
                    })

                    mediaRecorder.start(250)
                    createWebSocket()
                })
                .catch((err) => {
                    console.error("can't catch audio device :(", err)
                    setIsRecording(false)
                })
        }

        return () => {
            try {
                socket.close()
            } catch (error) {
                console.error("debug socket error: ", error)
            }
        }
    }, [isRecording])

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
                    border={"4px solid rgba(255, 255, 255, 0.16)"}
                />
                {isRecording ? (
                    <Flex alignItems={"center"}>
                        <Button
                            p={"12px 24px"}
                            onClick={() => {
                                if (isRecording) {
                                    mediaRecorder.stop()
                                    socket.close()
                                    setIsRecording(false)
                                } else {
                                    setIsRecording(true)
                                }
                            }}
                            w={"152px"}
                            border={"1px solid #DF3119"}
                            pr={"36px"}
                        >
                            <Text>Hang up</Text>
                        </Button>
                        <IconButton
                            aria-label={"Call"}
                            icon={<PhoneIcon />}
                            size={"lg"}
                            bgColor={"#DF3119 !important"}
                            zIndex={1}
                            _hover={{
                                filter: "none"
                            }}
                            ml={"-24px"}
                        />
                    </Flex>
                ) : (
                    <Flex alignItems={"center"}>
                        <IconButton
                            aria-label={"Call"}
                            icon={<PhoneIcon />}
                            size={"lg"}
                            bgColor={"#0BB512 !important"}
                            zIndex={1}
                            _hover={{
                                filter: "none"
                            }}
                            mr={"-24px"}
                        />
                        <Button
                            p={"12px 24px"}
                            onClick={() => {
                                if (isRecording) {
                                    mediaRecorder.stop()
                                    socket.close()
                                    setIsRecording(false)
                                } else {
                                    setIsRecording(true)
                                }
                            }}
                            w={"152px"}
                            border={"1px solid #0BB512"}
                            pl={"36px"}
                        >
                            <Text>CALL</Text>
                        </Button>
                    </Flex>
                )}
            </Center>
        )
    ) : (
        <Navigate to={"/login"} />
    )
}

export default Chatting
