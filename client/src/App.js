import React, { Component } from 'react';
import TableHeader from './components/TableHeader';
import TableBody from './components/TableBody';
import { Button, Form, FormGroup, Label, Input, Col, Table, Container, Card } from 'reactstrap';
import { roundCurrency } from './utils/currencyUtils';
import axios from 'axios';
import './App.css';

class App extends Component {
    /* private variables */
    _invoiceHeaders = ['Description', 'Amount ($)', 'Period', 'Delete'];
    _initialPeriod = new Date().getFullYear() + '-01';

    /* state */
    state = {
        unpaidInvoices: [{ description: '', amount: '', period: this._initialPeriod }],
        uninvoicedInvoices: [{ description: '', amount: '', period: this._initialPeriod }],
        vendor_name: '',
        description: '',
        email: '',
    };

    handleChange = evt => {
        const className = evt.target.className.replace(' form-control', '');

        if (['description', 'amount', 'period'].includes(className)) {
            let invoices = [...this.state[evt.target.dataset.type]];

            invoices[evt.target.dataset.id][className] =
                className !== 'description' && className !== 'period'
                    ? roundCurrency(evt.target.value)
                    : evt.target.value;

            this.setState({ [evt.target.dataset.type]: invoices });
        } else {
            this.setState({ [evt.target.name]: evt.target.value });
        }

        console.log('Current State: ', this.state);
    };

    addInvoice = type => {
        if (type === 'unpaid') {
            this.setState(prevState => ({
                unpaidInvoices: [
                    ...prevState.unpaidInvoices,
                    { description: '', amount: '', period: this._initialPeriod },
                ],
            }));
        } else {
            this.setState(prevState => ({
                uninvoicedInvoices: [
                    ...prevState.uninvoicedInvoices,
                    { description: '', amount: '', period: this._initialPeriod },
                ],
            }));
        }
    };

    handleSubmit = e => {
        e.preventDefault();

        let vars = {};

        // eslint-disable-next-line no-unused-vars
        const parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
            vars[key] = value;
        });

        axios
            .post('/api/submit', { ...this.state, ...vars })
            .then(resp => {
                console.log('response', resp);
            })
            .catch(err => {
                console.log('error', err);
            });

        // fetch('/api/email', {
        //     method: 'POST',
        //     credentials: 'same-origin',
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ ...this.state, ...vars }),
        // });
    };

    removeInvoice = (key, idx) => {
        let invoices = [...this.state[key]];
        invoices.splice(idx, 1);
        this.setState({ [key]: invoices });
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

                    <Card className="vcf-form-container">
                        <FormGroup>
                            <Col sm="12" md={{ size: 3, offset: 5 }}>
                                <Button color="primary" onClick={() => this.addInvoice('unpaid')}>
                                    Add Unpaid Invoices
                                </Button>
                            </Col>
                        </FormGroup>

                        <FormGroup>
                            <Table responsive>
                                <TableHeader headerLabels={this._invoiceHeaders} />
                                <TableBody
                                    data={this.state.unpaidInvoices}
                                    typeAbbrev="Unpaid"
                                    typeLong="unpaidInvoices"
                                    fn={this.handleChange}
                                    deleteFn={this.removeInvoice}
                                />
                            </Table>
                        </FormGroup>
                    </Card>

                    <Card className="vcf-form-container">
                        <FormGroup>
                            <Col sm="12" md={{ size: 3, offset: 5 }}>
                                <Button color="primary" onClick={() => this.addInvoice('uninvoiced')}>
                                    Add Uninvoiced Invoices
                                </Button>
                            </Col>
                        </FormGroup>

                        <FormGroup>
                            <Table responsive>
                                <TableHeader headerLabels={this._invoiceHeaders} />
                                <TableBody
                                    data={this.state.uninvoicedInvoices}
                                    typeAbbrev="Uninvoiced"
                                    typeLong="uninvoicedInvoices"
                                    fn={this.handleChange}
                                    deleteFn={this.removeInvoice}
                                />
                            </Table>
                        </FormGroup>
                    </Card>

                    <Button color="primary" size="lg" block onClick={this.handleSubmit}>
                        Submit
                    </Button>
                </Form>
            </Container>
        );
    }
}

export default App;
