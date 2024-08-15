"use client";

import { useState } from 'react';

export default function Home() {
    const [features, setFeatures] = useState({
        CheckingStatus: '',
        CreditHistory: '',
        ExistingSavings: '',
        Housing: '',
        Job: '',
        LoanDuration: '',
        LoanAmount: '',
        Age: ''
    });
    const [results, setResults] = useState({
        knn: null,
        dt: null,
        rf: null
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFeatures({ ...features, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent, model: string) => {
        e.preventDefault();
        try {
            console.log('Submitting data:', { features });
            const res = await fetch(`http://localhost:5000/api/predict/${model}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ features })
            });
     
            console.log('Response status:', res.status);
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
     
            const data = await res.json();
            console.log('API response data:', data);
            setResults({ ...results, [model]: data.prediction });
        } catch (error) {
            console.error('Error:', error);
            setResults({ ...results, [model]: 'Error occurred' });
        }
     };     
  

    return (
        <div className="container">
            <h1>Credit Risk Analysis</h1>
            <form onSubmit={(e) => handleSubmit(e, 'knn')}>
                <select name="CheckingStatus" onChange={handleChange} value={features.CheckingStatus}>
                    <option value="">Select Checking Status</option>
                    <option value="no_checking">No Checking</option>
                    <option value="less_0">Less than 0</option>
                    <option value="0_to_200">0 to 200</option>
                    <option value="greater_200">Greater than 200</option>
                </select>

                <select name="CreditHistory" onChange={handleChange} value={features.CreditHistory}>
                    <option value="">Select Credit History</option>
                    <option value="prior_payments_delayed">Prior Payments Delayed</option>
                    <option value="credits_paid_to_date">Credits Paid to Date</option>
                    <option value="outstanding_credit">Outstanding Credit</option>
                    <option value="all_credits_paid_back">All Credits Paid Back</option>
                    <option value="no_credits">No Credits</option>
                </select>

                <select name="ExistingSavings" onChange={handleChange} value={features.ExistingSavings}>
                    <option value="">Select Existing Savings</option>
                    <option value="less_100">Less than 100</option>
                    <option value="100_to_500">100 to 500</option>
                    <option value="500_to_1000">500 to 1000</option>
                    <option value="greater_1000">Greater than 1000</option>
                    <option value="unknown">Unknown</option>
                </select>

                <select name="Housing" onChange={handleChange} value={features.Housing}>
                    <option value="">Select Housing</option>
                    <option value="own">Own</option>
                    <option value="rent">Rent</option>
                    <option value="free">Free</option>
                </select>

                <select name="Job" onChange={handleChange} value={features.Job}>
                    <option value="">Select Job</option>
                    <option value="skilled">Skilled</option>
                    <option value="unskilled">Unskilled</option>
                    <option value="management_self-employed">Management / Self-employed</option>
                    <option value="unemployed">Unemployed</option>
                </select>

                <input name="LoanDuration" type="number" min="4" max="64" placeholder="Loan Duration" onChange={handleChange} value={features.LoanDuration} />
                <input name="LoanAmount" type="number" min="250" max="11676" placeholder="Loan Amount" onChange={handleChange} value={features.LoanAmount} />
                <input name="Age" type="number" min="19" max="74" placeholder="Age" onChange={handleChange} value={features.Age} />
                <h2>K Nearest Neighbors Model</h2>
                <button type="submit">Predict KNN</button>
            </form>

            <h2>Decision Tree Model</h2>
            <form onSubmit={(e) => handleSubmit(e, 'dt')}>
                {/* Same form fields as above */}
                <button type="submit">Predict Decision Tree</button>
            </form>

            <h2>Random Forest Model</h2>
            <form onSubmit={(e) => handleSubmit(e, 'rf')}>
                {/* Same form fields as above */}
                <button type="submit">Predict Random Forest</button>
            </form>

<div>
    {results.knn && (
        <div>
            <h3>KNN Prediction</h3>
            <p>Result: {results.knn === 0 ? 'No Risk' : 'Risk'}</p>
        </div>
    )}
    {results.dt && (
        <div>
            <h3>Decision Tree Prediction</h3>
            <p>Result: {results.dt === 0 ? 'No Risk' : 'Risk'}</p>
        </div>
    )}
    {results.rf && (
        <div>
            <h3>Random Forest Prediction</h3>
            <p>Result: {results.rf === 0 ? 'No Risk' : 'Risk'}</p>
        </div>
    )}
</div>

        </div>
    );
}
