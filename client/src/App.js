import React, { Component } from 'react';
import { roundCurrency } from './utils/currencyUtils';
import Container from '@material-ui/core/Container';
import FormGroup from '@material-ui/core/FormGroup';
import FormCoreInput from './components/FormCoreInput';
import { Grid } from '@material-ui/core';
import Title from './components/Title';
import FormTable from './components/FormTable';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import './App.css';

class App extends Component {
    _invoiceHeaders = ['Description', 'Period', 'Amount ($)', 'Delete'];
    _initialPeriod = new Date().getFullYear() + '-01';

    state = {
        unpaidInvoices: [{ description: '', amount: '', invoiceId: '', period: this._initialPeriod }],
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
        console.log(this.state, 'state at submit');
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
                <Title context="Vendor Form" format="h2" />

                <Grid className="vcf-container">
                    <form>
                        <FormCoreInput
                            inputs={[
                                {
                                    name: 'vendor_name',
                                    value: this.state.vendor_name,
                                    label: 'Vendor Name',
                                    changeHandler: this.handleChange,
                                },
                                {
                                    name: 'email',
                                    value: this.state.email,
                                    label: 'Email',
                                    changeHandler: this.handleChange,
                                },
                            ]}
                        />

                        <FormGroup className="vcf-data-table">
                            <FormTable
                                headers={['Description', 'Period', 'Amount', 'Invoice No', '']}
                                rows={this.state.unpaidInvoices}
                                handleChange={this.handleChange}
                                handleRemove={this.removeInvoice}
                                dataType="unpaidInvoices"
                                id="invoice"
                                title="Unpaid Invoices"
                            />

                            <div>
                                <Button
                                    variant="contained"
                                    data-type={this.props.dataType}
                                    color="primary"
                                    onClick={() => this.addInvoice('unpaid')}
                                    aria-label="add"
                                    className="vcf-add-btn"
                                >
                                    Add Unpaid Invoices
                                </Button>
                            </div>
                        </FormGroup>

                        <FormGroup className="vcf-data-table">
                            <FormTable
                                headers={['Description', 'Period', 'Amount', '', '']}
                                rows={this.state.uninvoicedInvoices}
                                handleChange={this.handleChange}
                                handleRemove={this.removeInvoice}
                                dataType="uninvoicedInvoices"
                                id="invoice"
                                title="Uninvoiced Services"
                            />

                            <div>
                                <Button
                                    variant="contained"
                                    data-type={this.props.dataType}
                                    color="primary"
                                    onClick={() => this.addInvoice('uninvoiced')}
                                    aria-label="add"
                                    className="vcf-add-btn"
                                >
                                    Add Uninvoiced Invoices
                                </Button>
                            </div>
                        </FormGroup>

                        <div className="vcf-submit-container">
                            <Button
                                className="vcf-submit"
                                variant="contained"
                                color="primary"
                                onClick={this.handleSubmit}
                                aria-label="add"
                            >
                                Submit
                            </Button>
                        </div>
                    </form>
                </Grid>
            </Container>
        );
    }
}

export default App;
