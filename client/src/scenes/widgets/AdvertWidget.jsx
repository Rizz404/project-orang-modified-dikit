import { Typography, useTheme } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import WigdetWrapper from "../../components/WidgetWrapper";

import React from "react";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WigdetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        src="http://localhost:3500/assets/info4.jpeg"
        alt="advert"
        width="100%"
        height="auto"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>This is an ad</Typography>
        <Typography color={medium}>ad.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Your pathway to suffer and despair
      </Typography>
    </WigdetWrapper>
  );
};

export default AdvertWidget;
