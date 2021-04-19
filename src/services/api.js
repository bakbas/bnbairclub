import axios from "axios";

import { initAxiosInterceptors } from "./interceptors";

initAxiosInterceptors();

const api = {
    login: (data) =>
        axios.post(`${process.env.SECURITY_ENDPOINT}/users/login`, data),
    getInterestPlans: (key = "") =>
        axios.get(
            `${process.env.LOAN_ACCOUNT_ENDPOINT}/products/plans/rate/${key}`
        ),
    setInterestPlan: (data) =>
        axios.post(
            `${process.env.LOAN_ACCOUNT_ENDPOINT}/products/plans/rate`,
            data
        ),
    getIndexRates: (currency = "") =>
        axios.get(
            `${process.env.LOAN_ACCOUNT_ENDPOINT}/products/plans/index/${currency}`
        ),
    setIndexRate: (data) =>
        axios.post(
            `${process.env.LOAN_ACCOUNT_ENDPOINT}/products/plans/index`,
            data
        ),
    getLoans: () =>
        axios.get(`${process.env.LOAN_ACCOUNT_ENDPOINT}/products/loan`),
    getCurrencies: () =>
        axios.get(`${process.env.LOAN_ACCOUNT_ENDPOINT}/products/currency`),
    getRatePlansByCurrency: (currency) =>
        axios.get(
            `${process.env.LOAN_ACCOUNT_ENDPOINT}/products/plans/rate/sub/${currency}`
        ),
    setLoan: (data) =>
        axios.post(`${process.env.LOAN_ACCOUNT_ENDPOINT}/products/loan`, data)
};

export default api;
