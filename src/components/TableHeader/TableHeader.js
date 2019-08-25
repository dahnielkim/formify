import React from 'react';

const TableHeader = props => (
    <thead>
        <tr>
            {props.headerLabels.map(headerLabel => (
                <th key={headerLabel}>{headerLabel}</th>
            ))}
        </tr>
    </thead>
);

export default TableHeader;
