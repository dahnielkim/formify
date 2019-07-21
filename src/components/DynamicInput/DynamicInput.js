import React from 'react';
import { Label, Input } from 'reactstrap';

const DynamicInput = props => {
    return props.invoice.map((val, idx) => {
        const invoiceId = `invoice-${idx}`;
        const amountid = `amount-${idx}`;
        const periodId = `period-${idx}`;

        return (
            <div key={idx}>
                <Label for={invoiceId}>{`${props.type} Invoice #${idx + 1}`} Description</Label>
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
                    type="number"
                    step="0.01"
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
