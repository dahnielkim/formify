import React from "react";
import DynamicInput from "./components/DynamicInput";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

class App extends React.Component {
  state = {
    unpaidInvoices: [{ description: "", amount: "", period: "" }],
    vendor_name: "",
    description: "",
    email: ""
  };

  handleChange = e => {
    const className = e.target.className.replace(" form-control", "");
    if (["description", "amount", "period"].includes(className)) {
      let unpaidInvoices = [...this.state.unpaidInvoices];

      unpaidInvoices[e.target.dataset.id][
        className
      ] = e.target.value.toUpperCase();

      this.setState({ unpaidInvoices }, () =>
        console.log(this.state.unpaidInvoices)
      );
    } else {
      this.setState({ [e.target.name]: e.target.value.toUpperCase() });
    }

    console.log("Current State: ", this.state);
  };

  addUnpaidInvoice = e => {
    this.setState(prevState => ({
      unpaidInvoices: [
        ...prevState.unpaidInvoices,
        { description: "", amount: "", period: "" }
      ]
    }));
  };

  handleSubmit = e => {
    e.preventDefault();

    fetch("/api/email", {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state)
    })
  };

  render() {
    let { vendor_name, unpaidInvoices, email } = this.state;

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
          <Button color="primary" onClick={() => this.addUnpaidInvoice()}>
            Add Unpaid Invoices
          </Button>
          <DynamicInput
            invoice={unpaidInvoices}
            handleChange={this.handleChange}
          />
        </FormGroup>

        <Button>Submit</Button>
      </Form>
    );
  }
}

export default App;
