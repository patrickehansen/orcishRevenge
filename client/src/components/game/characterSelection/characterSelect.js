'use strict';
import React, { Component } from 'react';
import {connect} from 'react-redux';

import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import CharacterCreator from './characterCreator';
import ErrorComponent from '../../util/error';

class CharacterSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      creating: false,
    }
  }

  createCharacter = (e) => {
    e.preventDefault();

    this.setState({
      creating: true,
    })
  }

  closeCreator = (e) => {
    this.setState({
      creating: false,
    })
  }

  handleClose = (e) => {

  }

  render() {
    console.log('select', this.props, this.props.availableCharacters)
    return (
      <Modal        
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.props.open}
        onClose={this.handleClose}
      >
        <div id='characterSelectModal'>
          {/* Move this to a grid */}
          <div className='characterContainer'>
          {
            this.props.availableCharacters.map((v,i) => {
              return <Character character={v} key={i} />
            })
          }
          </div>
          <div className='createBtn'>
            <Button 
              onClick={this.createCharacter}
              variant='contained'
              color='primary'
              id='createNewBtn'
            >Create New</Button>
          </div>
          <CharacterCreator 
            open={this.state.creating}
            onClose={this.state.closeCreator}
            />
          <ErrorComponent error={this.state.error} />
        </div>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    availableCharacters: state.availableCharacters,
  }
}

export default connect(mapStateToProps)(CharacterSelect);