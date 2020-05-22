import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import withStyles from "@material-ui/core/styles/withStyles";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  progress: {
    position: "abosulute",
  },
});

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      country: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      errors: [],
      loading: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors,
      });
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    // set loading to true
    this.setState({ loading: true });
    // create the object to be sent
    const newUserData = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      phoneNumber: this.state.phoneNumber,
      country: this.state.phoneNumber,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
    };
    // post request with axios
    axios
      .post("/signup", newUserData)
      .then((response) => {
        localStorage.setItem("AuthToken", response.data.token);
        this.setState({
          loading: false,
        });
        this.props.history.push("/");
      })
      .catch((error) => {
        this.setState({
          errors: error.response.data,
          loading: false,
        });
      });
  };

  render() {
    const { classes } = this.props;
    const { errors, loading } = this.state;
    return (
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  autoComplete="firstName"
                  helperText={errors.firstName}
                  error={errors.firstName ? true : false}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  autoComplete="lastName"
                  helperText={errors.lastName}
                  error={errors.lastName ? true : false}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  name="username"
                  label="Username"
                  autoComplete="username"
                  helperText={errors.username}
                  error={errors.username ? true : false}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="phoneNumber"
                  name="phoneNumber"
                  label="Phone Number"
                  autoComplete="phoneNumber"
                  helperText={errors.phoneNumber}
                  error={errors.phoneNumber ? true : false}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  name="email"
                  label="Email Address"
                  autoComplete="email"
                  helperText={errors.email}
                  error={errors.email ? true : false}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="country"
                  name="country"
                  label="Country"
                  autoComplete="country"
                  helperText={errors.country}
                  error={errors.country ? true : false}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  autoComplete="current-password"
                  helperText={errors.password}
                  error={errors.password ? true : false}
                  onChange={this.handleChange}
                  type="password"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Confirm Password"
                  autoComplete="current-password"
                  onChange={this.handleChange}
                  type="password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.handleSubmit}
              disabled={
                loading ||
                !this.state.email ||
                !this.state.password ||
                !this.state.firstName ||
                !this.state.lastName ||
                !this.state.country ||
                !this.state.username ||
                !this.state.phoneNumber
              }
            >
              Sign Up
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="login" variant="body2">
                  Already have an account? Sign In
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

export default withStyles(styles)(SignUp);
