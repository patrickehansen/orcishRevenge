'use strict';
import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/styles';
import {styles} from '../../misc/styles';

import CardMedia from '@material-ui/core/CardMedia';

class CharacterCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
    }
  }

  onClick=(e) => {
    this.props.onSelect(this.props.character.Name, this.props.character._id);
  }
  
  render() {
    const {character, classes} = this.props;

    return (
      <Card className={`character-root ${this.props.active ? 'active' : ''}`} key={this.props.key} style={{cursor: 'pointer'}} onClick={this.onClick}>
        <CardContent className={classes.verticalFlex} raised="true">
          <CardMedia className={classes.grow}>
            <img className='characterAvatar' src={character.Avatar} />
          </CardMedia>
          
          <Typography component="h1" variant="h5" style={{textAlign: 'center'}} className={classes.fixed}>
          {character.Name}
          </Typography>
        </CardContent>
      </Card>
    )
  }
}

export default withStyles(styles)(CharacterCard);