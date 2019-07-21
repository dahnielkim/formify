import React from "react";

const DynamicInput = props => {
  return props.invoice.map((val, idx) => {
    let invoiceId = `invoice-${idx}`;
    let amountid = `amount-${idx}`;
    let periodId = `period-${idx}`;

    return (
      <div key={idx}>
        <label htmlFor={invoiceId}>{`Invoice #${idx + 1}`} Description</label>
        <input
          type="text"
          name={invoiceId}
          data-id={idx}
          id={invoiceId}
          value={props.invoice[idx].description}
          className="description"
        />

        <label htmlFor={amountid}>Amount</label>
        <input
          type="text"
          name={amountid}
          data-id={idx}
          id={amountid}
          value={props.invoice[idx].amount}
          className="amount"
        />

        <label htmlFor={amountid}>Period</label>
        <input
          type="text"
          name={periodId}
          data-id={idx}
          id={periodId}
          value={props.invoice[idx].period}
          className="period"
        />
      </div>
    );
  });
};

export default DynamicInput;
