import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';

import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import SvgIcon from '@material-ui/core/SvgIcon';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';

import logo from '../../assets/images/elemental_logo_full.svg';
import smallLogo from '../../assets/images/elemental_logo_small.svg';
import { MINUTE_TIME_IN_MILLISECONDS, LIVE_PAGE_PATH, ON_RECORD_PAGE_PATH } from '../../constants/constants';

class Navigation extends Component {
  state = {
    selectedTab: this.props.selectedTab,
    anchorEl: null,
    openHelp: false,
    openUser: false,
    placement: null,
    time: null,
    redirect: false
  };

  /**
   * Handle switching between pages from tabs and sets state
   * @param {number} selectedTab - selected tab number
   */
  handleChange = (event, selectedTab) => {
    this.setState({ selectedTab, redirect: true });
  };

  /**
   * Redirects to relevant page 
   * @param {number} selectedTab - selected tab number
   * @return {JSX} - redirects to relevant page 
   */
  renderRedirect = selectedTab => {
    if (this.state.redirect) {
      const path = !this.state.selectedTab ? LIVE_PAGE_PATH : ON_RECORD_PAGE_PATH;
      this.setState({ selectedTab, redirect: false });
      return <Redirect to={path} />;
    }
  };

  componentDidMount = () => {
    this.currentTime();
    setInterval(this.currentTime, MINUTE_TIME_IN_MILLISECONDS);
  };

  /**
   * Handle when nav button is clicked and open relevant menu
   * @param {string} placement - button placement
   * @param {button} button - clicked button name
   */
  handleClick = (placement, button) => event => {
    const { currentTarget } = event;
    switch (button) {
      case 'help': this.setState(state => ({
        openHelp: state.placement !== placement || !state.openHelp
      }));
        break;
      case 'user': this.setState(state => ({
        openUser: state.placement !== placement || !state.openUser
      }));
        break;
      default: break;
    }
    this.setState({ anchorEl: currentTarget, placement });
  };

  /**
   * Handle when menu is closed and sets state
   * @param {string} menu - menu name
   */
  handleClose = menu => {
    switch (menu) {
      case 'help': this.setState({ openHelp: false }); break;
      case 'user': this.setState({ openUser: false }); break;
      default: break;
    }
    this.setState({ anchorEl: null });
  };

  /**
   * Sets state with urrent time
   */
  currentTime = () => {
    var today = new Date();
    var time = today.getHours() + ':' + today.getMinutes();
    this.setState({ time });
  };

  render() {
    const { selectedTab, anchorEl, openHelp, openUser, placement } = this.state;

    const time = classname => (
      <div className={classname} >
        <p className="time-text location">София</p>
        <SvgIcon className="svg-icon blue">
          <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
        </SvgIcon>
        <span className="time-text">{this.state.time}</span>
      </div>
    );

    const tabs = classname => (
      <div className={classname}>
        <Tabs
          value={selectedTab}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          TabIndicatorProps={{
            classes: {
              root: 'tabs-indicator'
            }
          }}
        >
          <Tab
            disableRipple={true}
            label="На живо"
            className="tab"
            classes={{
              selected: 'selected-tab'
            }}
          />
          <Tab
            disableRipple={true}
            label="На запис"
            className="tab"
            classes={{
              selected: 'selected-tab'
            }}
          />
        </Tabs>
      </div>
    );

    return (
      <React.Fragment>
        <div className="nav-bar">
          <div className="logo-time">
            <NavLink to='/channels' className="logo-link">
              <img className="logo" src={logo} alt="elemental" />
              <img className="smallLogo" src={smallLogo} alt="elemental" />
            </NavLink>
            {time('time first-hidden')}
          </div>
          {tabs('tab-bar')}
          <div className="right-elements">
            <Tooltip title="Търсене" placement="bottom">
              <Button
                className="nav-button"
                classes={{ label: 'search' }}
              >
                <SvgIcon className="svg-icon">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                </SvgIcon>
              </Button>
            </Tooltip>
            <Tooltip title="Помощ" placement="bottom">
              <Button
                className="nav-button"
                classes={{ label: 'help' }}
                aria-owns={anchorEl ? 'simple-menu' : undefined}
                aria-haspopup="true"
                onClick={this.handleClick('bottom-end', 'help')}
              >
                <SvgIcon className="svg-icon svg-hover">
                  <path d="M11,18H13V16H11V18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,6A4,4 0 0,0 8,10H10A2,2 0 0,1 12,8A2,2 0 0,1 14,10C14,12 11,11.75 11,15H13C13,12.75 16,12.5 16,10A4,4 0 0,0 12,6Z" />
                </SvgIcon>
              </Button>
            </Tooltip>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={openHelp}
              onClose={() => this.handleClose('help')}
              placement={placement}
            >
              <MenuItem disabled>Често задавани въпроси</MenuItem>
              <MenuItem disabled>Политика за поверителност</MenuItem>
              <MenuItem disabled>Пишете ни</MenuItem>
            </Menu>
            <Tooltip title="Акаунт" placement="bottom">
              <Button
                className="nav-button"
                classes={{ label: 'user' }}
                aria-owns={anchorEl ? 'simple-menu' : undefined}
                aria-haspopup="true"
                onClick={this.handleClick('bottom-end', 'user')}
              >
                <SvgIcon className="svg-icon blue user svg-hover">
                  <path d="M12,19.2C9.5,19.2 7.29,17.92 6,16C6.03,14 10,12.9 12,12.9C14,12.9 17.97,14 18,16C16.71,17.92 14.5,19.2 12,19.2M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z" />
                </SvgIcon>
              </Button>
            </Tooltip>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={openUser}
              onClose={() => this.handleClose('user')}
              placement={placement}
            >
              <MenuItem disabled>Име и Фамилия <br /> емаил</MenuItem>
              <hr />
              <MenuItem>Акаунт</MenuItem>
              <MenuItem>Абонаменти</MenuItem>
              <hr />
              <MenuItem>Изход</MenuItem>
            </Menu>
            {time('time')}
          </div>
        </div>
        {tabs('tab-bar block-tabs')}
        {this.renderRedirect(this.state.selectedTab)}
      </React.Fragment>
    );
  }
}

export default Navigation;
