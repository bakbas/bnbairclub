export const interestPlans = [
    {
        ratePlanKey: "0a04c5dd-2baa-4991-b667-856d2ff5b399",
        indexRateKey: "0ce07fec-62aa-4109-b1dc-e94e919cca22",
        ratePlanName: "First Interest Plan",
        currency: "GBP",
        indexRate: 1.0,
        effectiveDate: "2021-03-02",
        subRatePlanList: [
            {
                credibility: 90.0,
                term: 12,
                value: 30000.0,
                rate: 1.0,
                effectiveRate: 2.0
            },
            {
                credibility: 90.0,
                term: 18,
                value: 30000.0,
                rate: 1.5,
                effectiveRate: 2.5
            }
        ]
    },
    {
        ratePlanKey: "0a4add95-5b3f-4e84-84c7-492bc0aa3c89",
        indexRateKey: "75dd2675-cae9-419b-a5f1-f7fe9735b2a0",
        ratePlanName: "BankOf UK Rate",
        currency: "EUR",
        indexRate: 1.0,
        effectiveDate: "2021-03-03",
        subRatePlanList: [
            {
                credibility: 90.0,
                term: 12,
                value: 30000.0,
                rate: 2.5,
                effectiveRate: 3.5
            },
            {
                credibility: 90.0,
                term: 24,
                value: 30000.0,
                rate: 3.5,
                effectiveRate: 4.5
            }
        ]
    },
    {
        ratePlanKey: "ac76b53f-2b49-42a8-8235-a7a7ef787a9f",
        indexRateKey: "cf1b5d44-d359-49cd-90c0-8b3f0fdc4cf1",
        ratePlanName: "Yellow Interest Plan",
        currency: "GBP",
        indexRate: 2.0,
        effectiveDate: "2021-02-08",
        subRatePlanList: [
            {
                credibility: 90.0,
                term: 12,
                value: 30000.0,
                rate: 4.0,
                effectiveRate: 6.0
            },
            {
                credibility: 90.0,
                term: 18,
                value: 30000.0,
                rate: 4.5,
                effectiveRate: 6.5
            },
            {
                credibility: 90.0,
                term: 24,
                value: 30000.0,
                rate: 4.75,
                effectiveRate: 6.75
            }
        ]
    }
];
