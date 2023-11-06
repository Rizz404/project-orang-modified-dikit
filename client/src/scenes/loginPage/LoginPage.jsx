import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import Form from "./Form";

const LoginPage = () => {
  const isNotMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center">
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          Sociopedia
        </Typography>
      </Box>

      <Box
        width={isNotMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}>
        <Typography variant="h5" fontWeight="500" sx={{ mb: "1.5rem" }}>
          Welcome to Sociopedia, the social media for the worthy one
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
