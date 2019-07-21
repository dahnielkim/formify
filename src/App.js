import React, { Component } from 'react';
import DynamicInput from './components/DynamicInput';
import { Button, Form, FormGroup, Label, Input, Col, Table, Container } from 'reactstrap';
import { roundCurrency } from './utils/currencyUtils';
import './App.css';

class App extends Component {
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
        console.log('hit');

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
        return (
            <Container className="vcf-container">
                <Form>
                    <FormGroup row>
                        <Label for="vcf-vendor_name" sm={2}>
                            Vendor Name
                        </Label>
                        <Col sm={10}>
                            <Input
                                type="text"
                                name="vendor_name"
                                id="vcf-vendor_name"
                                value={this.state.vendor_name}
                                onChange={this.handleChange}
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for="vcf-email" sm={2}>
                            Email
                        </Label>
                        <Col sm={10}>
                            <Input
                                type="email"
                                name="email"
                                id="vcf-email"
                                onChange={this.handleChange}
                                value={this.state.email}
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Button color="primary" onClick={() => this.addInvoice('unpaid')}>
                            Add Unpaid Invoices
                        </Button>
                    </FormGroup>

                    <FormGroup>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>Description</th>
                                    <th>Amount ($)</th>
                                    <th>Period</th>
                                </tr>
                            </thead>
                            <DynamicInput
                                invoice={this.state.unpaidInvoices}
                                type="Unpaid"
                                keyValue="unpaidInvoices"
                                handleChange={this.handleChange}
                            />
                        </Table>
                    </FormGroup>

                    <FormGroup>
                        <Button color="primary" onClick={() => this.addInvoice('uninvoiced')}>
                            Add Uninvoiced Invoices
                        </Button>
                    </FormGroup>

                    <FormGroup>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>Description</th>
                                    <th>Amount ($)</th>
                                    <th>Period</th>
                                </tr>
                            </thead>
                            <DynamicInput
                                invoice={this.state.uninvoicedInvoices}
                                type="Uninvoiced"
                                keyValue="uninvoicedInvoices"
                                handleChange={this.handleChange}
                            />
                        </Table>
                    </FormGroup>

                    <Button color="primary" size="lg" block onClick={this.handleSubmit}>
                        Submit
                    </Button>
                </Form>
            </Container>
        );
    }
}

export default App;
