import { hot } from "react-hot-loader/root";
import Countdown from "react-countdown";
import Providers from "./providers";
import MainRouter from "SRC/router";

import Logo from "ASSETS/logoFull.svg";

import "./App.styles.css";

const renderer = ({ days, hours, minutes, seconds, completed }) =>
    completed ? (
        <MainRouter />
    ) : (
        <div className="countdownPage">
            <div className="logo">
                <Logo />
            </div>
            <div className="countdown">
                <div>
                    {String(days).padStart(2, 0)}
                    <span>Days</span>
                </div>
                <div>
                    {String(hours).padStart(2, 0)}
                    <span>Hours</span>
                </div>
                <div>
                    {String(minutes).padStart(2, 0)}
                    <span>Minutes</span>
                </div>
                <div>
                    {String(seconds).padStart(2, 0)}
                    <span>Seconds</span>
                </div>
            </div>
            <div className="links">
                <a
                    href="https://t.me/BnbAirClub"
                    target="_blank"
                    rel="noreferrer"
                >
                    Telegram
                </a>
                <a href="/BnbAirClub.pdf">Audit</a>
            </div>
        </div>
    );

const App = () => {
    return (
        <Providers>
            <Countdown
                date={new Date("2021-04-22T19:00:00.000Z")}
                renderer={renderer}
            />
        </Providers>
    );
};

export default hot(App);
