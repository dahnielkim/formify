import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const DynamicInput = props => {
    return props.invoice.map((val, idx) => {
        const invoiceId = 'invoice-' + idx;
        const amountid = 'amount-' + idx;
        const periodId = 'period-' + idx;

        return (
            <tbody key={idx}>
                <tr>
                    <td>
                        <TextField
                            type="text"
                            name={invoiceId}
                            id={invoiceId}
                            onChange={props.handleChange}
                            inputProps={{
                                name: 'description',
                                value: props.invoice[idx].description,
                                'data-id': idx,
                                'data-type': props.keyValue,
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </td>

                    <td>
                        <TextField
                            type="month"
                            name={periodId}
                            id={periodId}
                            onChange={props.handleChange}
                            inputProps={{
                                name: 'period',
                                value: props.invoice[idx].period,
                                'data-id': idx,
                                'data-type': props.keyValue,
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </td>

                    <td>
                        <TextField
                            type="number"
                            name={amountid}
                            id={amountid}
                            onChange={props.handleChange}
                            inputProps={{
                                name: 'amount',
                                value: props.invoice[idx].amount.toString().replace(/^0+/, '') || '',
                                'data-id': idx,
                                'data-type': props.keyValue,
                                step: '0.01',
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </td>

                    <td>
                        <Button
                            variant="contained"
                            data-type={props.keyValue}
                            color="secondary"
                            onClick={() => props.handleRemove(props.keyValue, idx)}
                            aria-label="add"
                        >
                            Delete
                            <DeleteIcon />
                        </Button>
                    </td>
                </tr>
            </tbody>
        );
    });
};

export default DynamicInput;
