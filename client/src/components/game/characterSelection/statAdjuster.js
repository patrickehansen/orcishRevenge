'use strict';
import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import {withStyles, mergeClasses} from '@material-ui/styles';
import {styles} from '../../misc/styles';

class Character extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
    }
  }

  // <span className='statLabel'>{this.props.name}</span>
  // <span className='statValue'>{this.props.value}</span>
  
  render() {
    const {classes} = this.props;

    return (
      <Card className={classes.statAdjuster}>
        <CardContent className={classes.horizontalTextContainer}>
          <Typography variant='h6' className={classes.statText} component='span'>
          {this.props.name}
          </Typography>
          <Typography variant='h6' className={classes.statValue} component='span'>
            {this.props.value}
          </Typography>
        </CardContent>
        <CardActions className={classes.verticalButtonContainer} disableSpacing={true}>
          <Button
            variant='contained'
            color='primary'
            size='small'
            className={classes.smallButton}
            fullWidth={false}
            width={20}
            disabled={!this.props.canIncrement || this.props.name === 'MagicAffinity'}
            onClick={() => this.props.increment(this.props.name)}
            >
            <Add />
          </Button>

          <Button
            variant='contained'
            color='primary'
            size='small'
            className={classes.smallButton}
            fullWidth={false}
            width={20}
            disabled={this.props.value <= 6 || this.props.name === 'MagicAffinity'}
            onClick={() => this.props.decrement(this.props.name)}
            >
            <Remove />
          </Button>
        </CardActions>
      </Card>
    )
  }
}

export default withStyles(styles)(Character);