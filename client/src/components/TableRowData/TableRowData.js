import React from 'react';
import { TextField, TableCell } from '@material-ui/core';

/**
 * TableRowData component
 */
export const TableRowData = ({ id, index, dataType, value, name, handleChange, inputType }) => (
    <TableCell>
        <TextField
            type={inputType}
            name={id + '-' + index}
            id={id + '-' + index}
            onChange={handleChange}
            inputProps={{
                name: name,
                value: value,
                'data-id': index,
                'data-type': dataType,
            }}
            InputLabelProps={{
                shrink: true,
            }}
        />
    </TableCell>
);

export default TableRowData;
