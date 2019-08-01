'use strict';
import React, { Component } from 'react';
import {withStyles} from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import {styles} from '../../misc/styles';

class RPLikes extends Component {
  constructor(props) {
    super(props);

  }

  change=(id, e) => {
    let value = e.target.value;
    let proceed = true;

    if (id === 'Age'){
      proceed = value <= maxAge && value >= minAge;
    } else if (id === 'Weight') {
      proceed = value <= maxWeight && value >= minWeight;
    }
    
    if (proceed){
      this.props.onChange({
        Key: id,
        Value: value
      })
    }
  }

  render() {
    const {classes} = this.props;
    const descProps = {
      multiline: true,
      rowsMax: '3',
      style: {paddingLeft: '0.2rem'},
      className:`${classes.textField} ${classes.invertColors} ${classes.grow}`
    }

    const titleProps = {
      style: {marginRight: '0.2rem', paddingLeft: '0.2rem', fontSize: '1.3rem', maxWidth: '9rem'},
      inputProps:{
        style: {
          fontSize: '1.3rem'
        }
      },
      className:`${classes.textField} ${classes.invertColors}`
    }

    return (
      <Container className={classes.verticalButtonContainer} style={{minWidth: '55%', backgroundColor: 'slategray'}}>
        <Container className={`${classes.horizontalTextContainer} ${classes.tinyMargin}`}>
          <TextField 
            id='Like0'
            placeholder='Like'
            {...titleProps}
          />
          <TextField
            id='LikeDesc0'
            placeholder='Like Description'
            {...descProps}
          />
        </Container>
        <Container className={`${classes.horizontalTextContainer} ${classes.tinyMargin}`}>
          <TextField 
            id='Like1'
            placeholder='Like'
            {...titleProps}
          />
          <TextField
            id='LikeDesc1'
            placeholder='Like Description'
            multiline
            rowsMax='3'
            style={{paddingLeft: '0.2rem'}}
            className={`${classes.textField} ${classes.invertColors} ${classes.grow}`}
          />
        </Container>
        <Container className={`${classes.horizontalTextContainer}  ${classes.tinyMargin} verticalSeparator`}>
          <TextField 
            id='Like2'
            placeholder='Like'
            {...titleProps}
          />
          <TextField
            id='LikeDesc2'
            placeholder='Like Description'
            multiline
            rowsMax='3'
            style={{paddingLeft: '0.2rem'}}
            className={`${classes.textField} ${classes.invertColors} ${classes.grow}`}
          />
        </Container>
        <Container className={`${classes.horizontalTextContainer} ${classes.tinyMargin}`}>
          <TextField 
            id='Dislike0'
            placeholder='Dislike'
            {...titleProps}
          />
          <TextField
            id='DislikeDesc0'
            placeholder='Dislike Description'
            multiline
            rowsMax='3'
            style={{paddingLeft: '0.2rem'}}
            className={`${classes.textField} ${classes.invertColors} ${classes.grow}`}
          />
        </Container>
        <Container className={`${classes.horizontalTextContainer} ${classes.tinyMargin}`}>
          <TextField 
            id='Dislike1'
            placeholder='Dislike'
            {...titleProps}
          />
          <TextField
            id='DislikeDisc1'
            placeholder='Dislike Description'
            multiline
            rowsMax='3'
            style={{paddingLeft: '0.2rem'}}
            className={`${classes.textField} ${classes.invertColors} ${classes.grow}`}
          />
          </Container>
        <Container className={`${classes.horizontalTextContainer}  ${classes.tinyMargin} verticalSeparator`}>
          <TextField 
            id='Dislikes2'
            placeholder='Dislike'
            {...titleProps}
          />
          <TextField
            id='DislikeDesc2'
            placeholder='Dislike Description'
            multiline
            rowsMax='3'
            style={{paddingLeft: '0.2rem'}}
            className={`${classes.textField} ${classes.invertColors} ${classes.grow}`}
          />
          </Container>
        <Container className={`${classes.horizontalTextContainer} ${classes.tinyMargin}`}>
          <TextField
            id='Vices0'
            placeholder='Vice'
            {...titleProps}
          />
          <TextField
            id='ViceDesc0'
            placeholder='Vice Description'
            multiline
            rowsMax='3'
            style={{paddingLeft: '0.2rem'}}
            className={`${classes.textField} ${classes.invertColors} ${classes.grow}`}
          />
        </Container>
        <Container className={`${classes.horizontalTextContainer} ${classes.tinyMargin}`}>
          <TextField
            id='Vices1'
            placeholder='Vice'
            {...titleProps}
          />
          <TextField
            id='ViceDesc0'
            placeholder='Vice Description'
            multiline
            rowsMax='3'
            style={{paddingLeft: '0.2rem'}}
            className={`${classes.textField} ${classes.invertColors} ${classes.grow}`}
          />
        </Container>
        <Container className={`${classes.horizontalTextContainer}  ${classes.tinyMargin} verticalSeparator`}>
          <TextField
            id='Vices2'
            placeholder='Vice'
            {...titleProps}
          />
          <TextField
            id='ViceDesc0'
            placeholder='Vice Description'
            multiline
            rowsMax='3'
            style={{paddingLeft: '0.2rem'}}
            className={`${classes.textField} ${classes.invertColors} ${classes.grow}`}
          />
        </Container>
        <TextField 
          id='GeneralNotes'
          placeholder='General Notes'
          multiline
          rowsMax='6'
          style={{paddingLeft: '0.2rem'}}
          className={`${classes.textField} ${classes.invertColors}`}
        />
      </Container>
    )
  }
}

export default withStyles(styles)(RPLikes);