import React, { Component } from 'react';

import Navigation from '../../components/Navigation/Navigation';
import { SELECTED_LIVE_TAB } from '../../constants/constants';

class Live extends Component {
  render() {
    return (
      <div className="live">
        <Navigation selectedTab={SELECTED_LIVE_TAB} />
        Live
      </div>
    );
  }
}

export default Live;
