import React, { Component } from 'react';
import ChatBot, { Loading } from 'react-simple-chatbot';

class CustomAnswer extends Component {

  // TODO: METTRE COMMENTAIRES
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      result: '',
      trigger: '',
      type:'',
    };
  }

  // TODO: METTRE COMMENTAIRES
  componentWillMount() {
    const self = this;
    const answerText = 1;
    const type = 2;
    const nextStep = {value:null, trigger:'options'}
    const { steps, previousStep, step } = this.props;
    const search = steps.search.value;
    const endpoint = encodeURI('http://localhost:6060/api/messages');
    var headers = new Headers();
    // var options = steps.options;
    // console.log(options);
    // if(options != null){
    //   if(steps.options.value === 'celibataire' || steps.options.value === 'marie'){
    //     var message = {
    //       "message" : steps.options.message,
    //     }
    //     options = null;
    //     console.log(options);
    //   }
    // }
    // else{
      var message = {
          "message": search,
          "savingState": true
      };

      if(message.message === "stop sauvegarde"){
        message.savingState = false;
      }

      console.log(message);
    //}
    // Tell the server we want JSON back
    headers.set('Content-Type', 'application/json');
    console.log(message);
    var fetchOptions = {
       method: 'POST',
       headers,
       body: JSON.stringify(message)
     };

     // TODO: METTRE COMMENTAIRES
     var responsePromise = fetch(endpoint, fetchOptions);
     // 3. Use the response
     responsePromise
    // 3.1 Convert the response into JSON-JS object.
    .then(function(response) {
      return response.json();
    })
    .then(function(jsonData) {
      // if(jsonData[0][0].value === 'price_information'){
      //   self.props.triggerNextStep(nextStep)
      // }
      console.log(jsonData);
      self.setState({
        result: jsonData.answer,
        type: jsonData.type,
      })
      self.props.triggerNextStep();
    });
  }

  renderAnswer(){
    const { trigger, loading, result } = this.state;
    let answer;
    if (this.state.type === 'text') {
      answer = <div>{this.state.result}</div>;
    } else if(this.state.type === 'url') {
      answer = <a href={this.state.result}>{this.state.result}</a>
      }
      return answer;
    }

  render() {
    return (
        <div>
           {this.renderAnswer()}
        </div>
    );
  }
}

export default CustomAnswer;
