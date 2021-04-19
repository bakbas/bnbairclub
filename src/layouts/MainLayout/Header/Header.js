import React, { useState, useEffect, useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { appContext } from "CONTEXT/AppContext";
import { useBNB } from "HOOKS";
import { Button } from "COMPONENTS";
import Logoo from "ASSETS/logoFull.svg";

import {
    Wrrapper,
    Container,
    Column,
    Logo,
    Rate,
    List,
    Item
} from "./Header.styles";

export const Header = () => {
    const { t } = useTranslation();
    const { state } = useContext(appContext);
    const { connect } = useBNB();
    const [bnbPrice, setBnbPrice] = useState("...");

    const shorter = (text) => `${text.slice(0, 6)}...${text.slice(-5)}`;

    const connectWallet = useCallback(async () => {
        const { error } = await connect();
        if (error && [4001, 9500, 9501].indexOf(error.code) >= 0) {
            toast.error(t(`errors.e${error.code}`));
        }
    }, [connect, t]);

    useEffect(() => {
        async function getBNB() {
            const { binancecoin } = await fetch(
                "https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd"
            ).then((res) => res.json());

            setBnbPrice(binancecoin.usd);
        }

        getBNB();
    }, []);

    return (
        <Wrrapper>
            <Container data-id="header">
                <Column>
                    <Logo to="/">
                        <Logoo />
                    </Logo>
                    <Button instant={!!state.wallet} onClick={connectWallet}>
                        {state.wallet
                            ? shorter(state.wallet)
                            : t("general.connectWallet")}
                    </Button>
                </Column>
                <Column>
                    <Rate>
                        1 BNB <span>= ${bnbPrice}</span>
                    </Rate>
                    <List>
                        <Item>
                            <a href="/BnbAirClubAudit.pdf" target="_blank">
                                Audit
                            </a>
                        </Item>
                        <Item>
                            <a
                                href="https://t.me/BnbAirClub"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Telegram
                            </a>
                        </Item>
                    </List>
                </Column>
            </Container>
        </Wrrapper>
    );
};
