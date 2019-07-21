import React from "react";
import { Label, Input } from "reactstrap";

const DynamicInput = props => {
  return props.invoice.map((val, idx) => {
    let invoiceId = `invoice-${idx}`;
    let amountid = `amount-${idx}`;
    let periodId = `period-${idx}`;

    return (
      <div key={idx}>
        <Label for={invoiceId}>{`Invoice #${idx + 1}`} Description</Label>
        <Input
          type="text"
          name={invoiceId}
          data-id={idx}
          id={invoiceId}
          onChange={props.handleChange}
          value={props.invoice[idx].description}
          className="description"
        />

        <Label for={amountid}>Amount</Label>
        <Input
          type="text"
          name={amountid}
          data-id={idx}
          id={amountid}
          onChange={props.handleChange}
          value={props.invoice[idx].amount}
          className="amount"
        />

        <Label for={amountid}>Period</Label>
        <Input
          type="text"
          name={periodId}
          data-id={idx}
          id={periodId}
          onChange={props.handleChange}
          value={props.invoice[idx].period}
          className="period"
        />
      </div>
    );
  });
};

export default DynamicInput;
