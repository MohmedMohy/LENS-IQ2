import {
    calculateRiskScore,
    getRiskLevel
} from "@lens/";

const score = calculateRiskScore({
    id: 1,
    customer_id: 1,
    customer_name: "Mohamed",
    salary: 30000,
    job_type: "SALARIED",
    brand: "Toyota",
    model: "Corolla",
    manufacturing_year: 2024,
    condition: "NEW",
    price: 1200000,
    requested_down_payment: 300000,
    status: "PENDING"
});

const level = getRiskLevel(score);

console.log("Risk Score:", score);
console.log("Risk Level:", level);