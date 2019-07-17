'use strict';
import React, {Component} from 'react';
import {Redirect, Link} from 'react-router-dom';
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
        <h1>Orcish Revenge</h1>
        <div className='accountActions'>
          <span><Link to='/register'>Register</Link></span>
          <span> or </span>
          <span><Link to='/login'>Login</Link></span>
        </div>
      </div>
    )
  }
} 

const mapStateToProps = (state) => {
  return {
    isAuthed  : !!state.id_token
  }
}

export default connect(mapStateToProps)(Home);