import React, { useState } from "react"
import { Modal, IconButton, Box, Typography } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import FullscreenIcon from "@mui/icons-material/Fullscreen"
import { useTheme } from "../contexts/ThemeContext"

// Tambahkan interface untuk props
export interface CertificateProps {
  CertificateImg: string;  // Menentukan bahwa CertificateImg adalah string (URL gambar)
}

// Tambahkan tipe React.FC dengan CertificateProps
const Certificate: React.FC<CertificateProps> = ({ CertificateImg }) => {
    const [open, setOpen] = useState(false)
    const { isDark } = useTheme()

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Box component="div" sx={{ width: "100%" }}>
            {/* Thumbnail Container */}
            <Box
                className=""
                sx={{
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: 2,
                    boxShadow: isDark
                        ? "0 8px 16px rgba(0,0,0,0.3)"
                        : "0 8px 16px rgba(0,0,0,0.1)",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: isDark
                            ? "0 12px 24px rgba(0,0,0,0.4)"
                            : "0 12px 24px rgba(0,0,0,0.2)",
                        "& .overlay": {
                            opacity: 1,
                        },
                        "& .hover-content": {
                            transform: "translate(-50%, -50%)",
                            opacity: 1,
                        },
                        "& .certificate-image": {
                            filter: isDark
                                ? "contrast(1.05) brightness(1.05) saturate(1.1)"
                                : "contrast(1.05) brightness(1) saturate(1.1)",
                        },
                    },
                }}>
                {/* Certificate Image with Initial Filter */}
                <Box
                    sx={{
                        position: "relative",
                        "&::before": {
                            content: '""',
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: isDark
                                ? "rgba(0, 0, 0, 0.2)"
                                : "rgba(0, 0, 0, 0.05)",
                            zIndex: 1,
                        },
                    }}>
                    <img
                        className="certificate-image"
                        src={CertificateImg}
                        alt="Certificate"
                        style={{
                            width: "100%",
                            height: "auto",
                            display: "block",
                            objectFit: "cover",
                            filter: isDark
                                ? "contrast(1.10) brightness(0.9) saturate(1.1)"
                                : "contrast(1.05) brightness(0.95) saturate(1.05)",
                            transition: "filter 0.3s ease",
                        }}
                        onClick={handleOpen}
                    />
                </Box>

                {/* Hover Overlay */}
                <Box
                    className="overlay"
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: isDark
                            ? "rgba(30, 30, 60, 0.4)"
                            : "rgba(90, 90, 150, 0.25)",
                        opacity: 0,
                        transition: "all 0.3s ease",
                        cursor: "pointer",
                        zIndex: 2,
                    }}
                    onClick={handleOpen}>
                    {/* Hover Content */}
                    <Box
                        className="hover-content"
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -60%)",
                            opacity: 0,
                            transition: "all 0.4s ease",
                            textAlign: "center",
                            width: "100%",
                            color: "white",
                        }}>
                        <FullscreenIcon
                            sx={{
                                fontSize: 40,
                                mb: 1,
                                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
                            }}
                        />
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 600,
                                textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                            }}>
                            View Certificate
                        </Typography>
                    </Box>
                </Box>
            </Box>

            {/* Modal */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: 0,
                    padding: 0,
                    "& .MuiBackdrop-root": {
                        backgroundColor: isDark
                            ? "rgba(0, 0, 0, 0.9)"
                            : "rgba(0, 0, 0, 0.8)",
                        backdropFilter: "blur(5px)",
                    },
                }}>
                <Box
                    sx={{
                        position: "relative",
                        width: "auto",
                        maxWidth: "90vw",
                        maxHeight: "90vh",
                        m: 0,
                        p: 0,
                        outline: "none",
                        "&:focus": {
                            outline: "none",
                        },
                    }}>
                    {/* Close Button */}
                    <IconButton
                        onClick={handleClose}
                        sx={{
                            position: "absolute",
                            right: 16,
                            top: 16,
                            color: "white",
                            bgcolor: isDark
                                ? "rgba(0,0,0,0.6)"
                                : "rgba(30,30,30,0.6)",
                            zIndex: 1,
                            padding: 1,
                            "&:hover": {
                                bgcolor: isDark
                                    ? "rgba(0,0,0,0.8)"
                                    : "rgba(30,30,30,0.8)",
                                transform: "scale(1.1)",
                            },
                        }}
                        size="large">
                        <CloseIcon sx={{ fontSize: 24 }} />
                    </IconButton>

                    {/* Modal Image */}
                    <img
                        src={CertificateImg}
                        alt="Certificate Full View"
                        style={{
                            display: "block",
                            maxWidth: "100%",
                            maxHeight: "90vh",
                            margin: "0 auto",
                            objectFit: "contain",
                            boxShadow: isDark
                                ? "0 10px 30px rgba(0,0,0,0.3)"
                                : "0 10px 30px rgba(0,0,0,0.2)",
                        }}
                    />
                </Box>
            </Modal>
        </Box>
    )
}

export default Certificate