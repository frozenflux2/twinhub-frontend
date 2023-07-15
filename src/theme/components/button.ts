export const buttonStyles =  {
    components: {
        Button: {
            variants: {
                "no-hover": {
                    _hover: {
                        boxShadow: "none",
                    },
                    },
                "transparent-with-icon": {
                    bg: "transparent !important",
                    border: "none",
                    fontWeight: "bold",
                    backdropFilter: "none",
                    borderRadius: "inherit",
                    cursor: "pointer",
                    _hover: "none",
                    _active: {
                        bg: "transparent",
                        transform: "none",
                        borderColor: "transparent",
                    },
                    _focus: {
                        boxShadow: "none",
                    }
                },
                "sidebar-item": {
                    justifyContent: "flex-start",
                    alignItems: "center",
                    boxShadow: "none",
                    border: "none",
                    bg: "transparent !important",
                    transition: "0.2s linear",
                    backdropFilter: "none",
                    mb: {
                        xl: "12px"
                    },
                    mx: {
                        xl: "auto"
                    },
                    ps: {
                        sm: "10px",
                        xl: "16px"
                    },
                    py: "12px",
                    borderRadius: "15px",
                    _hover: {
                        bg: "#667eea !important"
                    },
                    w: "inherit",
                    _active: {
                        bg: "#667eea !important",
                        transform: "none",
                        borderColor: "transparent"
                    },
                    _focus: {
                        bg: "#667eea !important",
                        boxShadow: "0px 7px 11px rgba(0, 0, 0, 0.04)"
                    }
                },
                "link": {
                    bgColor: "transparent !important",
                    border: "none",
                    backdropFilter: "none"
                }
            },
            baseStyle: {
                bgColor: "rgba(19, 19, 19, 0.4) !important",
                color: "#F0F0F0",
                border: "1px solid rgba(245, 58, 238, 0.4)",
                backdropFilter: "blur(5px)",
                borderRadius: "full",
                _hover: {
                    filter: "brightness(130%)"
                },
                _focus: {
                    filter: "brightness(90%)"
                },
                _active: {
                    filter: "brightness(90%)"
                }
            }
        }
    }
}
