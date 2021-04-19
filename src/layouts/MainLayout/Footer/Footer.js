import React from "react";
import platforms from "ASSETS/platforms.png";

import { Wrapper } from "./Footer.styles";

export const Footer = () => {
    return (
        <Wrapper>
            <img src={platforms} />
        </Wrapper>
    );
};
