import React from 'react';
import DynamicInput from './components/DynamicInput';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { roundCurrency } from './utils/currencyUtils';

class App extends React.Component {
    state = {
        unpaidInvoices: [{ description: '', amount: 0, period: '' }],
        uninvoicedInvoices: [{ description: '', amount: 0, period: '' }],
        vendor_name: '',
        description: '',
        email: '',
    };

    handleChange = evt => {
        const className = evt.target.className.replace(' form-control', '');

        if (['description', 'amount', 'period'].includes(className)) {
            let invoices = [...this.state[evt.target.dataset.type]];

            invoices[evt.target.dataset.id][className] =
                className !== 'description' ? roundCurrency(evt.target.value) : evt.target.value;

            this.setState({ [evt.target.dataset.type]: invoices });
        } else {
            this.setState({ [evt.target.name]: evt.target.value.toUpperCase() });
        }

        console.log('Current State: ', this.state);
    };

    addInvoice = type => {
        if (type === 'unpaid') {
            this.setState(prevState => ({
                unpaidInvoices: [...prevState.unpaidInvoices, { description: '', amount: 0, period: '' }],
            }));
        } else {
            this.setState(prevState => ({
                uninvoicedInvoices: [...prevState.uninvoicedInvoices, { description: '', amount: 0, period: '' }],
            }));
        }
    };

    handleSubmit = e => {
        e.preventDefault();

        fetch('/api/email', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state),
        });
    };

    render() {
        const { vendor_name, unpaidInvoices, email, uninvoicedInvoices } = this.state;

        return (
            <Form>
                <FormGroup>
                    <Label for="vcf-vendor_name">Vendor Name</Label>
                    <Input
                        type="text"
                        name="vendor_name"
                        id="vcf-vendor_name"
                        value={vendor_name}
                        onChange={this.handleChange}
                        placeholder="password placeholder"
                    />
                </FormGroup>

                <FormGroup>
                    <Label for="vcf-email">Email</Label>
                    <Input
                        type="email"
                        name="email"
                        id="vcf-email"
                        onChange={this.handleChange}
                        placeholder="JohnSmith@sample.com"
                        value={email}
                    />
                </FormGroup>

                <FormGroup>
                    <Button color="primary" onClick={() => this.addInvoice('unpaid')}>
                        Add Unpaid Invoices
                    </Button>
                    <DynamicInput
                        invoice={unpaidInvoices}
                        type="Unpaid"
                        keyValue="unpaidInvoices"
                        handleChange={this.handleChange}
                    />
                </FormGroup>

                <FormGroup>
                    <Button color="primary" onClick={() => this.addInvoice('uninvoiced')}>
                        Add Uninvoiced Invoices
                    </Button>
                    <DynamicInput
                        invoice={uninvoicedInvoices}
                        type="Uninvoiced"
                        keyValue="uninvoicedInvoices"
                        handleChange={this.handleChange}
                    />
                </FormGroup>

                <Button>Submit</Button>
            </Form>
        );
    }
}

export default App;
