import React from 'react';
import TableRowInput from '../DynamicInput';

const TableBody = props => (
    <TableRowInput
        invoice={props.data}
        type={props.typeAbbrev}
        keyValue={props.typeLong}
        handleChange={props.fn}
        handleRemove={props.deleteFn}
    />
);

export default TableBody;
