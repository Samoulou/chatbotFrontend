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
  renderAnswer() {
    console.log(this.props.steps.options.value);
    if(this.props.steps.options.value === true){
      return <div>C'est noté, merci !</div>
    } else {
      return <div>C'est en ordre, vos messages ne seront pas sauvé</div>
    }
  }

  render() {
    return (
      <div>
      {this.renderAnswer()}
      </div>
    );
  }
}

export default getOption;
