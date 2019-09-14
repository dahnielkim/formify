import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

class FormCoreInput extends Component {
    render() {
        return (
            <Grid container>
                <Grid item sm={3}>
                    <Typography component="div">
                        <Box textAlign="left" m={1}>
                            Vendor Name
                        </Box>
                    </Typography>
                </Grid>
                <Grid item sm={9}>
                    <TextField
                        type="text"
                        onChange={this.props.handleChange}
                        inputProps={{
                            name: 'vendor_name',
                            value: this.props.name,
                        }}
                    />
                </Grid>

                <Grid item sm={3}>
                    <Typography component="div">
                        <Box textAlign="left" m={1}>
                            Email
                        </Box>
                    </Typography>
                </Grid>
                <Grid item sm={9}>
                    <TextField
                        type="gmail"
                        onChange={this.props.handleChange}
                        inputProps={{
                            name: 'email',
                            value: this.props.email,
                        }}
                    />
                </Grid>
            </Grid>
        );
    }
}

export default FormCoreInput;
