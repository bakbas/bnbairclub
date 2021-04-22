import { useContext, useCallback, useEffect } from "react";
import { CONTRACT_ADDRESS, ABI } from "UTILS";
import { appContext } from "CONTEXT/AppContext";

export const useBNB = () => {
    window.web3 = new Web3(window.ethereum);
    const { state, dispatch } = useContext(appContext);
    const isConnected = !!window.ethereum?.selectedAddress;

    useEffect(() => {
        if (window.ethereum) {
            if (isConnected) connect();

            window.ethereum.on("accountsChanged", async () => {
                window.document.location.reload();
            });
        }
    }, []);

    const getContract = useCallback(async () => {
        return await new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
    }, []);

    const stake = useCallback(
        async ({ amount, index = 0, ref }) => {
            const contract = await getContract();

            if (contract && state.wallet && amount) {
                contract.methods.invest(ref, index).send({
                    value: amount * 1e18,
                    from: state.wallet
                });
            }
        },
        [state.wallet]
    );

    const withdraw = useCallback(async () => {
        const contract = await getContract();
        if (contract && state.wallet) {
            contract.methods.withdraw().send({
                from: state.wallet
            });
        }
    }, [state.balance.availableWithdrawal, state.wallet]);

    const getPool = useCallback(async (contract) => {
        const poolData = await Promise.all([
            contract.methods.totalStaked().call(),
            contract.methods.getContractBalance().call()
        ]);

        return {
            totalStaked: (poolData[0] / 1e18).toFixed(2),
            availableBalance: (poolData[1] / 1e18).toFixed(2)
        };
    }, []);

    const getPlans = useCallback(async (contract, plans) => {
        return await Promise.all(
            plans.map(async (plan, i) => {
                const info = await contract.methods.getPlanInfo(i).call();
                const percent = plan.instant
                    ? await contract.methods.getPercent(i).call()
                    : await contract.methods.getResult(i, 100).call();

                const dailyProfit = (
                    (plan.instant ? percent : percent.percent) / 10
                ).toFixed(0);

                const totalReturn = plan.instant
                    ? ((percent / 10) * info.time).toFixed(0)
                    : percent.profit;

                const days = info.time;
                const profit = (totalReturn / 100).toFixed(4);

                return {
                    ...plan,
                    dailyProfit,
                    totalReturn,
                    days,
                    profit
                };
            })
        );
    }, []);

    const getBalances = useCallback(async (contract, wallet) => {
        const ts = await contract.methods.getUserTotalDeposits(wallet).call();
        const totalStaked = (ts / 1e18).toFixed(2);

        const aw = await contract.methods.getUserAvailable(wallet).call();
        const availableWithdrawal = (aw / 1e18).toFixed(2);

        return { totalStaked, availableWithdrawal };
    }, []);

    const getReferrals = useCallback(async (contract, wallet) => {
        const tre = await contract.methods
            .getUserReferralTotalBonus(wallet)
            .call();
        const totalReferralEarned = (tre / 1e18).toFixed(2);

        const trw = await contract.methods
            .getUserReferralWithdrawn(wallet)
            .call();
        const totalReferralWithdrawn = (trw / 1e18).toFixed(2);

        const tr = await contract.methods.getUserDownlineCount(wallet).call();
        const totalReferrals =
            parseInt(tr[0]) + parseInt(tr[1]) + parseInt(tr[2]).toFixed(0);

        return {
            totalReferralEarned,
            totalReferralWithdrawn,
            totalReferrals
        };
    }, []);

    const getUserDeposits = useCallback(async (contract, wallet) => {
        const uaod = await contract.methods
            .getUserAmountOfDeposits(wallet)
            .call();
        const total = Array.from(Array(parseInt(uaod)).keys());
        const deposits = await getUserDepositInfo(contract, wallet, total);

        return deposits;
    }, []);

    const getUserDepositInfo = useCallback(async (contract, wallet, total) => {
        return await Promise.all(
            total.map(async (i) => {
                const udi = await contract.methods
                    .getUserDepositInfo(wallet, i)
                    .call();

                const amount = (udi.amount / 1e18).toFixed(2);
                const profit = (udi.profit / 1e18).toFixed(2);
                const plan = parseInt(udi.plan) + 1;
                const start = udi.start;
                const finish = udi.finish;
                const percent = (udi.percent / 10).toFixed(1);
                const now = (new Date().valueOf() / 1000).toFixed(0);
                const dif = (now - start) / 86400;
                const totalTime = (finish - start) / 86400;
                const percents = ((dif / totalTime) * 100).toFixed(2);

                return { plan, percent, amount, profit, percents };
            })
        );
    }, []);

    const getData = useCallback(async (wallet) => {
        const contract = await getContract();
        const pool = await getPool(contract);
        const plans = await getPlans(contract, state.plans);
        const balance = await getBalances(contract, wallet);
        const referral = await getReferrals(contract, wallet);
        const deposits = await getUserDeposits(contract, wallet);

        return { pool, plans, balance, referral, deposits };
    }, []);

    const connect = useCallback(async () => {
        try {
            if (!window.ethereum) {
                return { error: { code: 9500 } };
            }

            const networkID = ethereum.networkVersion;
            if (networkID == 56) {
                const [wallet] = await window.ethereum.request({
                    method: "eth_requestAccounts"
                });
                const allDate = await getData(wallet);
                dispatch({ payload: { wallet, ...allDate } });
                return { wallet };
            }

            return { error: { code: 9501 } };
        } catch (error) {
            return { error };
        }
    }, []);

    return {
        connect,
        stake,
        withdraw
    };
};
