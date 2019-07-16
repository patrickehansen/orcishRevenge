'use strict';
import React, {Component} from 'react';

class MainPage extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    let {children} = this.props;
    return (
      <div className='mainView'> 
        {children && children}
      </div>
    )
  }
} 

export default MainPage;