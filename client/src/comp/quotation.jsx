const Quotation = () => {
    const pricingTable = [
        { weight: 'Up to 500g', charges: '₹100' },
        { weight: '501g - 1kg', charges: '₹120' },
        { weight: '1kg - 2kg', charges: '₹150' },
        { weight: '2kg - 5kg', charges: '₹250' },
        { weight: '5kg - 10kg', charges: '₹500' },
        { weight: 'Above 10kg', charges: '₹700' },
    ];

    return (
        <div className="quotation-container">
            <h2>Courier Charges Quotation</h2>
            <p>Below is the pricing chart based on package weight:</p>
            <table className="quotation-table">
                <thead>
                    <tr>
                        <th>Weight Range</th>
                        <th>Charges</th>
                    </tr>
                </thead>
                <tbody>
                    {pricingTable.map((row, idx) => (
                        <tr key={idx}>
                            <td>{row.weight}</td>
                            <td>{row.charges}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Quotation;
