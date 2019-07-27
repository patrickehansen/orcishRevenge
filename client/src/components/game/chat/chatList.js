'use strict';
import React, {Component} from 'react';

import Scrollbar from 'react-scrollbars-custom';
import ChatMessage from './chatMessage';
import EmoteMessage from './emoteMessage';
import RollMessage from './rollMessage';

export default class ChatList extends Component {
  constructor(props) {
    super(props);

    this.scrollbarRef = null;
  }

  componentDidUpdate() {
    if (this.scrollbarRef) {
      this.scrollbarRef.scrollToBottom();
    }
  }

  render() {
    return (
      <Scrollbar className='chatContainer' ref={(el) => this.scrollbarRef = el}>
        {
          this.props.messages.map((v,i) => {
            switch (v.Type) {
              case 'chat' : 
                return <ChatMessage message={v} key={i} />
              case 'emote' : 
                return <EmoteMessage message={v} key={i} />
              case 'roll' :
                return <RollMessage message={v} key={i} />
              default: 
                return null;
            }
          })
        }
      </Scrollbar>
    )
  }
  
}