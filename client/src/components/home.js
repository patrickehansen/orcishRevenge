'use strict';
import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

class Home extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    if (this.props.isAuthed) {
        return (<Redirect to={'/game'} />)
    }

    return (
      <div className='homeView'> 
        Hello, World!
      </div>
    )
  }
} 

const mapStateToProps = (state) => {
  console.log(state);
  return {
    isAuthed  : !!state.id_token
  }
}

export default connect(mapStateToProps)(Home);