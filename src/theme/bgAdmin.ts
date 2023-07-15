export const bgAdmin = {
    styles: {
        global: (props) => ({
            body: {
                bg: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
                bgSize: "cover",
                bgPosition: "center center"
            },
            "::-webkit-scrollbar": {
                width: "5px",
                backgroundColor: "rgba(27, 27, 27, 0.5)"
            },
            "::-webkit-scrollbar-track": {
                background: "var(--grey)"
            },
            "::-webkit-scrollbar-thumb": {
                borderRadius: "5px",
                backgroundColor: "#888"
            },
            "::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "#555"
            }
        })
    }
}
