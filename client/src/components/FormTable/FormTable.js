import React, { Fragment } from 'react';
import { TableHead, TableRow, TableCell, TableBody, Table } from '@material-ui/core';
import { Typography, Box } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './FormTable.css';

class FormTable extends React.Component {
    render() {
        return (
            <Fragment>
                <Typography component="div" className="vcf-form-title">
                    <Box textAlign="left" m={1}>
                        {this.props.title}
                    </Box>
                </Typography>

                <Table>
                    <TableHead>
                        <TableRow>
                            {this.props.headers.map((header, index) => (
                                <TableCell key={index} align="left">
                                    {header}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {this.props.rows.map((row, index) => {
                            const keys = Object.keys(row);

                            return (
                                <TableRow key={index}>
                                    {keys.includes('description') && row.description ? (
                                        <TableCell>
                                            <TextField
                                                type="text"
                                                name={this.props.id + '-' + index}
                                                id={this.props.id + '-' + index}
                                                onChange={this.props.handleChange}
                                                inputProps={{
                                                    name: 'description',
                                                    value: row.description,
                                                    'data-id': index,
                                                    'data-type': this.props.dataType,
                                                }}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </TableCell>
                                    ) : (
                                        <TableCell>
                                            <TextField
                                                type="text"
                                                name={this.props.id + '-' + index}
                                                id={this.props.id + '-' + index}
                                                onChange={this.props.handleChange}
                                                inputProps={{
                                                    name: 'description',
                                                    value: row.description,
                                                    'data-id': index,
                                                    'data-type': this.props.dataType,
                                                }}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </TableCell>
                                    )}

                                    {keys.includes('period') && row.period ? (
                                        <TableCell>
                                            <TextField
                                                type="month"
                                                name={this.props.id + '-' + index}
                                                id={this.props.id + '-' + index}
                                                onChange={this.props.handleChange}
                                                inputProps={{
                                                    name: 'period',
                                                    value: row.period,
                                                    'data-id': index,
                                                    'data-type': this.props.dataType,
                                                }}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </TableCell>
                                    ) : (
                                        <TableCell>
                                            <TextField
                                                type="month"
                                                name={this.props.id + '-' + index}
                                                id={this.props.id + '-' + index}
                                                onChange={this.props.handleChange}
                                                inputProps={{
                                                    name: 'period',
                                                    value: row.period,
                                                    'data-id': index,
                                                    'data-type': this.props.dataType,
                                                }}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </TableCell>
                                    )}

                                    {keys.includes('amount') && row.amount ? (
                                        <TableCell>
                                            <TextField
                                                type="number"
                                                name={this.props.id + '-' + index}
                                                id={this.props.id + '-' + index}
                                                onChange={this.props.handleChange}
                                                inputProps={{
                                                    name: 'amount',
                                                    value: row.amount.toString().replace(/^0+/, '') || '',
                                                    'data-id': index,
                                                    'data-type': this.props.dataType,
                                                    step: '0.01',
                                                }}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </TableCell>
                                    ) : (
                                        <TableCell>
                                            <TextField
                                                type="number"
                                                name={this.props.id + '-' + index}
                                                id={this.props.id + '-' + index}
                                                onChange={this.props.handleChange}
                                                inputProps={{
                                                    name: 'amount',
                                                    value: row.amount.toString().replace(/^0+/, '') || '',
                                                    'data-id': index,
                                                    'data-type': this.props.dataType,
                                                    step: '0.01',
                                                }}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </TableCell>
                                    )}

                                    {keys.includes('invoiceId') && row.invoiceId ? (
                                        <TableCell>
                                            <TextField
                                                type="text"
                                                disabled={this.props.dataType === 'uninvoicedInvoices' ? true : false}
                                                name={this.props.id + '-' + index}
                                                id={this.props.id + '-' + index}
                                                onChange={this.props.handleChange}
                                                inputProps={{
                                                    name: 'invoiceId',
                                                    value: row.invoiceId,
                                                    'data-id': index,
                                                    'data-type': this.props.dataType,
                                                }}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </TableCell>
                                    ) : (
                                        <TableCell>
                                            <TextField
                                                type="text"
                                                disabled={this.props.dataType === 'uninvoicedInvoices' ? true : false}
                                                name={this.props.id + '-' + index}
                                                id={this.props.id + '-' + index}
                                                onChange={this.props.handleChange}
                                                inputProps={{
                                                    name: 'invoiceId',
                                                    value: row.invoiceId,
                                                    'data-id': index,
                                                    'data-type': this.props.dataType,
                                                }}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </TableCell>
                                    )}

                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            data-type={this.props.dataType}
                                            color="secondary"
                                            onClick={() => this.props.handleRemove(this.props.dataType, index)}
                                            aria-label="add"
                                        >
                                            Delete
                                            <DeleteIcon />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Fragment>
        );
    }
}

export default FormTable;
