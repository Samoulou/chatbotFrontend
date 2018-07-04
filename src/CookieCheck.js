import React, { Component } from 'react';
import ChatBot from 'react-simple-chatbot';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class CookieCheck extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentWillMount() {
    const self = this;
    const { steps } = this.props;
    if(cookies.get('chatmee-save')){
      self.props.triggerNextStep('search');
    }
    self.props.triggerNextStep('save');
  }

  render() {
    return (
      <div>
        Super merci pour la réponse !
      </div>
    );
  }
}

export default CookieCheck;
