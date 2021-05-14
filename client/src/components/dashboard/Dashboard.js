import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser, addLoan } from "../../actions/authActions";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      address: "",
      contact: "",
      email: "",
      loanamount: "",
      loanstartdate: "",
      loanexpirydate: "",
      monthlyinstallments: "",
      fixedorfloating: "fixed",
      errors: {},
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    let fixed = false;
    let floating = false;
    this.state.fixedorfloating === "fixed" ? (fixed = true) : (floating = true);
    const newApplication = {
      user: this.props.auth.user.name,
      name: this.state.name,
      address: this.state.address,
      contact: this.state.contact,
      email: this.state.email,
      loanamount: this.state.loanamount,
      loanstartdate: this.state.loanstartdate,
      loanexpirydate: this.state.loanexpirydate,
      monthlyinstallments: this.state.monthlyinstallments,
      fixed: fixed,
      floating: floating,
    };
    this.props.addLoan(newApplication);
  };

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;
    const { loandata } = this.props.auth;

    return (
      <div
        style={{ height: "75vh", display: "block" }}
        className="container valign-wrapper"
      >
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Hey there,</b> {user.name.split(" ")[0]}
              <p className="flow-text grey-text text-darken-1">
                Fill out a new loan form or check your previous one's.
              </p>
            </h4>
          </div>
        </div>
        <div>
          <div>
            <br />
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.name}
                  error={this.state.name}
                  id="name"
                  type="text"
                />
                <label htmlFor="name">Name</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.address}
                  error={this.state.address}
                  id="address"
                  type="text"
                />
                <label htmlFor="address">Address</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.contact}
                  error={this.state.contact}
                  id="contact"
                  type="number"
                />
                <label htmlFor="contact">Contact</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={this.state.email}
                  id="email"
                  type="text"
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.loanamount}
                  error={this.state.loanamount}
                  id="loanamount"
                  type="number"
                />
                <label htmlFor="loanamount">Loan Amount</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.loanstartdate}
                  error={this.state.loanstartdate}
                  id="loanstartdate"
                  type="date"
                />
                <label htmlFor="loanstartdate">loan Start Date</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.loanexpirydate}
                  error={this.state.loanexpirydate}
                  id="loanexpirydate"
                  type="date"
                />
                <label htmlFor="loanexpirydate">loan Expiry Date</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.monthlyinstallments}
                  error={this.state.monthlyinstallments}
                  id="monthlyinstallments"
                  type="number"
                />
                <label htmlFor="monthlyinstallments">
                  Monthly Installments
                </label>
              </div>

              <select
                value={this.state.fixedorfloating}
                style={{ display: "flex" }}
                onChange={this.onChange}
              >
                <option value="fixed">Fixed</option>
                <option value="floating">Floating</option>
              </select>

              <div
                className="col s12"
                style={{ paddingLeft: "11.250px", float: "right" }}
              >
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "3rem",
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
          <br />
        </div>
        <div>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell alight="center">Previous Loans</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Address</TableCell>
                  <TableCell align="right">Contact</TableCell>
                  <TableCell align="right">Email</TableCell>
                  <TableCell align="right">Loan Amount</TableCell>
                  <TableCell align="right">loan Start Date</TableCell>
                  <TableCell align="right">Loan Expiry Date</TableCell>
                  <TableCell align="right">monthly Installments</TableCell>
                  <TableCell align="right">Fixed / Floating</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loandata.length > 0 ? (
                  loandata.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.address}</TableCell>
                      <TableCell align="right">{row.contact}</TableCell>
                      <TableCell align="right">{row.email}</TableCell>
                      <TableCell align="right">{row.loanamount}</TableCell>
                      <TableCell align="right">{row.loanstartdate}</TableCell>
                      <TableCell align="right">{row.loanexpirydate}</TableCell>
                      <TableCell align="right">
                        {row.monthlyinstallments}
                      </TableCell>
                      <TableCell align="right">
                        {row.fixed ? "fixed" : "floating"}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell>No data please logout and login again</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div>
          <button
            style={{
              width: "150px",
              borderRadius: "3px",
              letterSpacing: "1.5px",
              marginTop: "10rem",
              marginBottom: "5rem",
            }}
            onClick={this.onLogoutClick}
            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
          >
            Logout
          </button>
          <br />
          <div className="col s12 center-align"></div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  addLoan: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser, addLoan })(Dashboard);
