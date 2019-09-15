import React from 'react';
import { Typography, Box } from '@material-ui/core';
import './Title.css';

/**
 * Title component
 * @param {string} context - title text to display
 * @param {string} format - heading format
 */
const Title = ({ context, format }) => (
    <Typography className="vcf-title" component="div">
        <Box fontSize={format + '.fontSize'} m={1}>
            {context}
        </Box>
    </Typography>
);

export default Title;
