import { currencies } from "./getCurrencies";
import { indexRates } from "./getIndexRates";
import { interestPlans } from "./getInterestPlans";
import { loans } from "./getLoans";

const api = {
    login: () => Promise.resolve({ data: { token: true } }),
    getInterestPlans: (key = "") => {
        const plans = key
            ? interestPlans.find((i) => i.ratePlanKey === key)
            : interestPlans;
        return Promise.resolve({ data: plans });
    },
    setInterestPlan: (data) => Promise.resolve({ status: 200 }),
    getIndexRates: (currency = "") => {
        const rates = currency
            ? indexRates.filter((i) => i.currency === currency)
            : indexRates;
        return Promise.resolve({ data: rates });
    },
    setIndexRate: (data) => Promise.resolve({ status: 200 }),
    getLoans: () => {
        return Promise.resolve({ data: loans });
    },
    getCurrencies: () =>
        Promise.resolve({
            data: currencies
        }),
    getRatePlansByCurrency: (currency) => {
        const plans = currency
            ? interestPlans.filter((i) => i.currency === currency)
            : interestPlans;
        return Promise.resolve({ data: plans });
    },
    setLoan: (data) => Promise.resolve({ status: 200 })
};

export default api;
