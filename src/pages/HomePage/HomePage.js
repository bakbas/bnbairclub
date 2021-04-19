import React, { useCallback, useContext } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { appContext } from "CONTEXT/AppContext";
import { useBNB } from "HOOKS";
import { CREATOR_ADDRESS, CONTRACT_ADDRESS } from "UTILS";
import { PlanBox, Button, InputField } from "COMPONENTS";

import {
    Contract,
    Info,
    Items,
    Rules,
    Panel,
    Stake,
    Referral,
    Link,
    Scores,
    ScoresCol,
    ScoresResult,
    ScoresText,
    Deposits,
    Deposit
} from "./HomePage.styles";

export const HomePage = () => {
    const { search } = useLocation();
    const { t } = useTranslation();
    const { state, dispatch } = useContext(appContext);
    const { stake, withdraw } = useBNB();

    const inputOnChange = useCallback(
        async ({ complationDays, index }) => {
            const cache = [...state.plans];
            cache[index].complationDays = complationDays;

            dispatch({
                type: "plans",
                payload: cache
            });
        },
        [dispatch, state.plans]
    );

    const onStake = useCallback(
        ({ amount, index }) => {
            const query = new URLSearchParams(search);
            const ref = query.get("ref") || CREATOR_ADDRESS;

            stake({ amount, index, ref });
        },
        [search, stake]
    );

    const copyRefUrl = useCallback(() => {
        navigator.clipboard.writeText(
            state.wallet ? `${location.origin}/?ref=${state.wallet}` : "..."
        );
        toast.success(t(`general.copySuccess`), {
            hideProgressBar: true,
            pauseOnHover: false,
            autoClose: 2000
        });
    }, [state.wallet, t]);

    return (
        <div data-id="homePage">
            <Panel>
                <Contract>
                    <span>
                        {t("contract.totalStaked")}

                        <a
                            href={`https://bscscan.com/address/${CONTRACT_ADDRESS}`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {t("contract.contract")}
                        </a>
                    </span>
                    <div>{state.pool.totalStaked}</div>
                    <span>{t("contract.totalBalance")}</span>
                    <div>{state.pool.availableBalance}</div>
                </Contract>
                <Info>
                    <ul>
                        <li>{t("info.info1")}</li>
                        <li>{t("info.info2")}</li>
                        <li>{t("info.info3")}</li>
                        <li>{t("info.info4")}</li>
                    </ul>
                </Info>
            </Panel>
            <Items>
                {state.plans.map((plan, i) => (
                    <PlanBox
                        key={`plan-${i}`}
                        title={plan.title}
                        dailyProfit={plan.dailyProfit}
                        totalReturn={plan.totalReturn}
                        days={plan.days}
                        complationDays={plan.complationDays}
                        profit={plan.profit}
                        index={i}
                        stakeEvent={onStake}
                        instant={plan.instant}
                        inputOnChange={inputOnChange}
                    />
                ))}
            </Items>
            <Rules>
                <li>{t("rules.rule1")}</li>
                <li>{t("rules.rule2")}</li>
                <li>{t("rules.rule3")}</li>
            </Rules>
            <Panel>
                <Stake>
                    <h2>{t("stake.yourStake")}</h2>
                    <span>{t("stake.totalStakedBNB")}</span>
                    <div>{state.balance.totalStaked}</div>
                    <span>{t("stake.availableWithdrawal")}</span>
                    <div>{state.balance.availableWithdrawal}</div>
                    <Button instant={true} onClick={withdraw}>
                        {t("stake.withdrawBNB")}
                    </Button>
                </Stake>
                <Referral>
                    <Link>
                        <label>
                            {t("referral.yourReferralLink")}
                            <InputField
                                type="text"
                                value={
                                    state.wallet
                                        ? `${location.origin}/?ref=${state.wallet}`
                                        : "..."
                                }
                                readOnly
                            />
                        </label>
                        <Button instant={true} onClick={copyRefUrl}>
                            {t("general.copy")}
                        </Button>
                    </Link>
                    <Scores>
                        <ScoresCol>
                            <ScoresResult>
                                {t("referral.totalReferralEarned")}
                                <div>{state.referral.totalReferralEarned}</div>
                            </ScoresResult>

                            <ScoresResult>
                                {t("referral.totalReferralWithdrawn")}
                                <div>
                                    {state.referral.totalReferralWithdrawn}
                                </div>
                            </ScoresResult>

                            <ScoresResult>
                                {t("referral.totalReferrals")}
                                <div>{state.referral.totalReferrals}</div>
                            </ScoresResult>
                        </ScoresCol>

                        <ScoresCol>
                            <ScoresText>
                                {t("referral.line1")}
                                <br />
                                <br />
                                {t("referral.line2")}
                                <br />
                                <br />
                                {t("referral.line3")}
                                <br />
                                {t("referral.line4")}
                                <br />
                                {t("referral.line5")}
                                <br />
                                <br />
                                {t("referral.line6")}
                                <br />
                            </ScoresText>
                        </ScoresCol>
                    </Scores>
                </Referral>
            </Panel>
            {state.deposits.length > 0 && (
                <h2 className="deposit-header">{t("general.yourStake")}</h2>
            )}
            <Deposits>
                {state.deposits.map((deposit, i) => (
                    <Deposit
                        key={`deposit-${i}`}
                        className={deposit.plan > 3 ? "saving" : ""}
                    >
                        <div className="deposit-content">
                            <h2>
                                {t("general.plan")} {deposit.plan}
                            </h2>
                            <div className="deposit-row">
                                <div className="deposit-text">
                                    {deposit.percent}%
                                </div>
                            </div>
                            <div className="deposit-row">
                                <div className="deposit-score">
                                    {deposit.plan > 3
                                        ? "BNB"
                                        : t("general.deposit")}
                                    <span>{deposit.amount}</span>
                                </div>
                                <div className="deposit-score">
                                    {deposit.plan > 3
                                        ? "BNB"
                                        : t("general.profit")}
                                    <span>{deposit.profit}</span>
                                </div>
                            </div>
                            <div className="deposit-range">
                                <div style={{ width: `${deposit.percents}%` }}>
                                    {deposit.percents}%
                                </div>
                            </div>
                        </div>
                    </Deposit>
                ))}
            </Deposits>
        </div>
    );
};
