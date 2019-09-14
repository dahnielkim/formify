import React, { Component } from 'react';
import TableHeader from './components/TableHeader';
import TableBody from './components/TableBody';
import { Button, Form, Label, Col, Table } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import { roundCurrency } from './utils/currencyUtils';
import Container from '@material-ui/core/Container';
import FormGroup from '@material-ui/core/FormGroup';
import FormCoreInput from './components/FormCoreInput';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import './App.css';

class App extends Component {
    _invoiceHeaders = ['Description', 'Period', 'Amount ($)', 'Delete'];
    _initialPeriod = new Date().getFullYear() + '-01';

    state = {
        unpaidInvoices: [{ description: '', amount: '', period: this._initialPeriod }],
        uninvoicedInvoices: [{ description: '', amount: '', period: this._initialPeriod }],
        vendor_name: '',
        description: '',
        email: '',
    };

    handleChange = evt => {
        if (['description', 'amount', 'period'].includes(evt.target.name)) {
            let invoices = [...this.state[evt.target.dataset.type]];

            invoices[evt.target.dataset.id][evt.target.name] =
                evt.target.name !== 'description' && evt.target.name !== 'period'
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
    };

    removeInvoice = (key, idx) => {
        let invoices = [...this.state[key]];
        invoices.splice(idx, 1);
        this.setState({ [key]: invoices });
    };

    render() {
        return (
            <Container>
                <Grid className="vcf-container">
                    <form>
                        <FormCoreInput
                            handleChange={this.handleChange}
                            name={this.state.vendor_name}
                            email={this.state.email}
                        />

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
                            <Col sm="12" md={{ size: 3, offset: 0 }}>
                                <Button color="primary" onClick={() => this.addInvoice('unpaid')}>
                                    Add Unpaid Invoices
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
                            <Col sm="12" md={{ size: 3, offset: 0 }}>
                                <Button color="primary" onClick={() => this.addInvoice('uninvoiced')}>
                                    Add Uninvoiced Invoices
                                </Button>
                            </Col>
                        </FormGroup>

                        <Button color="primary" size="lg" block onClick={this.handleSubmit}>
                            Submit
                        </Button>
                    </form>
                </Grid>
            </Container>
        );
    }
}

export default App;
