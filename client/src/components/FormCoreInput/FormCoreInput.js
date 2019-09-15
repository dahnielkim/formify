import React, { Fragment } from 'react';
import { TextField, Grid, Typography, Box } from '@material-ui/core';
import './FormCoreInput.css';

/**
 * FormCoreInput component
 */
export const FormCoreInput = ({ inputs }) => (
    <Grid container className="form-core-input-root">
        {inputs.map((input, index) => {
            return (
                <Fragment key={index}>
                    <Grid item sm={3}>
                        <Typography component="div">
                            <Box textAlign="left" m={1}>
                                {input.label}
                            </Box>
                        </Typography>
                    </Grid>
                    <Grid item sm={5}>
                        <TextField
                            type="text"
                            fullWidth
                            onChange={input.changeHandler}
                            inputProps={{
                                name: input.name,
                                value: input.value,
                            }}
                        />
                    </Grid>
                    <Grid item sm={4} />
                </Fragment>
            );
        })}
    </Grid>
);

export default FormCoreInput;
