import React from 'react';
import { Input, Button, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { MdDelete } from 'react-icons/md';

const DynamicInput = props => {
    return props.invoice.map((val, idx) => {
        const invoiceId = 'invoice-' + idx;
        const amountid = 'amount-' + idx;
        const periodId = 'period-' + idx;

        return (
            <tbody key={idx}>
                <tr>
                    <td>
                        <Input
                            type="text"
                            data-type={props.keyValue}
                            name={invoiceId}
                            data-id={idx}
                            id={invoiceId}
                            onChange={props.handleChange}
                            value={props.invoice[idx].description}
                            className="description"
                        />
                    </td>

                    <td>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>$</InputGroupText>
                            </InputGroupAddon>
                            <Input
                                type="number"
                                data-type={props.keyValue}
                                step="0.01"
                                name={amountid}
                                data-id={idx}
                                id={amountid}
                                onChange={props.handleChange}
                                value={props.invoice[idx].amount.toString().replace(/^0+/, '')}
                                className="amount"
                            />
                        </InputGroup>
                    </td>

                    <td>
                        <Input
                            type="month"
                            data-type={props.keyValue}
                            name={periodId}
                            data-id={idx}
                            id={periodId}
                            onChange={props.handleChange}
                            value={props.invoice[idx].period}
                            className="period"
                        />
                    </td>

                    <td>
                        <Button data-type={props.keyValue} color="danger" size="sm" onClick={() => props.handleRemove(props.keyValue, idx)}>
                            <MdDelete />
                        </Button>
                    </td>
                </tr>
            </tbody>
        );
    });
};

export default DynamicInput;
