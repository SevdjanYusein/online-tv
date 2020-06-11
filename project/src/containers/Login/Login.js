import React, { Component } from 'react';
import { connect } from 'react-redux';

import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import SvgIcon from '@material-ui/core/SvgIcon';

import logo from '../../assets/images/elemental-logo-white.png';
import { EMAIL_REGEX } from '../../constants/constants';
import { checkValidity } from '../../services/helpers';
import * as LoginActions from '../../actions/loginActions';

class Login extends Component {
  state = {
    controls: {
      email: {
        value: '',
        valid: false,
        touched: false,
        validation: {
          required: true,
          regexPattern: EMAIL_REGEX
        }
      },
      password: {
        value: '',
        valid: false,
        touched: false,
        validation: {
          required: true
        }
      }
    },
    rememberme: true,
    isFormValid: false,
    isFormTouched: false
  };

  handleUserInput = event => {
    let controlName = event.target.type;
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true
      }
    };

    let formIsValid = true;
    for (let inputControl in updatedControls) {
      formIsValid = updatedControls[inputControl].valid && formIsValid;
    }

    this.setState({
      controls: updatedControls,
      isFormValid: formIsValid,
      isFormTouched: true
    });
  };

  onLogin = event => {
    event.preventDefault();

    if (!this.state.isFormTouched) {
      this.setState({ isFormTouched: true });
    }

    if (this.state.isFormValid) {
      const email = this.state.controls.email.value;
      const password = this.state.controls.password.value;
      const rememberme = this.state.rememberme;

      this.props.onLogin(email, password, rememberme);
    }
  };

  handleChange = event => {
    this.setState({ rememberme: event.target.checked });
  };

  render() {
    let errorMessageClasses = ['error-message'];
    if (this.state.isFormTouched && !this.state.isFormValid) {
      errorMessageClasses.push('visible');
    }

    return (
      <div className="background">
        <img className="logo" src={logo} alt="elemental" />
        <p className="slogan">Интерактивна онлайн телевизия за българи в чужбина.</p>
        <div className="login-card">
          <div className="tab-bar">
            <Tabs
              value={0}
              indicatorColor="primary"
              textColor="primary"
              TabIndicatorProps={{
                classes: {
                  root: 'tabs-indicator'
                }
              }}
            >
              <Tab
                label="Вход"
                className="tab"
              />
            </Tabs>
          </div>
          <p className="login-type-message">Вход със съществуващ акаунт</p>
          <p className={errorMessageClasses.join(' ')}>Грешна парола или имейл</p>
          <form className="login-form" onSubmit={this.onLogin} noValidate autoComplete="off">
            <TextField
              id="email"
              label="Имейл"
              className="text-field"
              InputProps={{
                classes: {
                  root: 'input-hint'
                }
              }}
              InputLabelProps={{
                classes: {
                  root: 'input-label'
                },
              }}
              type="email"
              onChange={(event) => this.handleUserInput(event)}
            />
            <TextField
              id="password"
              label="Парола"
              className="text-field"
              InputProps={{
                classes: {
                  root: 'input-hint'
                }
              }}
              InputLabelProps={{
                classes: {
                  root: 'input-label'
                },
              }}
              type="password"
              autoComplete="current-password"
              onChange={(event) => this.handleUserInput(event)}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.rememberme}
                  onChange={this.handleChange}
                  value="checked"
                  color="primary"
                  classes={{
                    root: 'checkbox-box'
                  }}
                />}
              label="Запомни ме"
            />
            <Button className="login-button" type="submit">Вход</Button>
          </form>
        </div>
        <div className="footer-buttons">
          <span className="right-button footer-button">
            <Button
              classes={{
                label: "footer-button-label"
              }}
            >
              <SvgIcon className="small-arrow svg-icon">
                <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
              </SvgIcon>
              <SvgIcon className="big-arrow svg-icon">
                <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
              </SvgIcon>
              Назад
            </Button>
          </span>
          <span className="footer-button">
            <Button
              classes={{
                label: "footer-button-label"
              }}
            >
              <SvgIcon className="svg-icon" fontSize="small" >
                <path d="M11,18H13V16H11V18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,6A4,4 0 0,0 8,10H10A2,2 0 0,1 12,8A2,2 0 0,1 14,10C14,12 11,11.75 11,15H13C13,12.75 16,12.5 16,10A4,4 0 0,0 12,6Z" />
              </SvgIcon>
              Помощ
            </Button>
          </span>
          <span className="footer-button">
            <Button
              classes={{
                label: "footer-button-label"
              }}
            >
              <SvgIcon className="svg-icon" fontSize="small" >
                <path d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z" />
              </SvgIcon>
              Общи условия
              </Button>
          </span>
          <span className="footer-button">
            <Button
              classes={{
                label: "footer-button-label"
              }}
            >
              <SvgIcon className="svg-icon" fontSize="small" >
                <path d="M4,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4C2.89,20 2,19.1 2,18V6C2,4.89 2.89,4 4,4M12,11L20,6H4L12,11M4,18H20V8.37L12,13.36L4,8.37V18Z" />
              </SvgIcon>
              Пишете ни
            </Button>
          </span>
        </div>
      </div >
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoLogin: () => dispatch(LoginActions.authCheckState()),
    onLogin: (username, password, rememberme) => dispatch(LoginActions.login(username, password, rememberme))
  };
};

export default connect(null, mapDispatchToProps)(Login);
