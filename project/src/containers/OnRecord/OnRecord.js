import React, { Component } from 'react';

import Navigation from '../../components/Navigation/Navigation';
import { SELECTED_ON_RECORD_TAB } from '../../constants/constants';

class OnRecord extends Component {
  render() {
    return (
      <div>
        <Navigation selectedTab={SELECTED_ON_RECORD_TAB} />
        OnRecord
      </div>
    );
  }
}

export default OnRecord;
