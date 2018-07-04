import React, { Component } from 'react';
import ChatBot from 'react-simple-chatbot';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class getOption extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentWillMount() {
    const self = this;
    const { steps } = this.props;
    // const search = steps.search.value;
    const options = steps.options.value;
    cookies.set('chatmee-save', options);
    self.props.triggerNextStep();
  }

  render() {
    return (
      <div>
        Super merci pour la réponse !
      </div>
    );
  }
}

export default getOption;
