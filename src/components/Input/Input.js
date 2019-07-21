import React from 'react';
import { Input as RsInput } from 'reactstrap';

const Input = props => (
    <RsInput
        type={props.type}
        data-type={props.invoiceType}
        name={props.name}
        data-id={props.invoiceId}
        onChange={props.handleChange}
        value={props.value}
        className={props.className}
    />
);

export default Input;
