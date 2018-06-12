import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import ChatBot, { Loading } from 'react-simple-chatbot';
const theme = {
   backgroundImage: 'url("https://www.bookmee.ch/45cf21b9ee27587b7ea6a87fc033f899.svg")',
   fontFamily: '“Helvetica Neue”,Helvetica,Arial,sans-serif!important',
   headerBgColor: '#5e9df1',
   headerFontColor: '#fff',
   headerFontSize: '15px',
   botBubbleColor: '#5e9df1',
   botFontColor: '#fff',
   userBubbleColor: '#fff',
   userFontColor: 'rgb(110, 122, 137)',

};

class CustomAnswer extends Component {

  // TODO: METTRE COMMENTAIRES
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      result: '',
      trigger: '',
    };
  }

  // TODO: METTRE COMMENTAIRES
  componentWillMount() {
    const self = this;
    const answerText = 1;
    const nextStep = {value:null, trigger:'options'}
    const { steps, previousStep, step } = this.props;
    const search = steps.search.value;
    const endpoint = encodeURI('http://localhost:6060/api/message');
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
          "message": search
      };
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
      self.setState({
        result: jsonData[answerText],
      })
      self.props.triggerNextStep();
    });
  }

  render() {
    const { trigger, loading, result } = this.state;
    return (
      <div>
         {this.state.result}
      </div>
    );
  }
}

const App = () => (
  <ThemeProvider theme={theme}>
  <ChatBot
    headerTitle={"Chatmee - v1.0"}
    // recognitionEnable={true}
    botAvatar={"http://bookmee.thecomputerfirm.com/img/favicon.png"}
    hideUserAvatar={true}
    steps={[
      {
        id: '1',
        message: "Bonjour, je suis Chatmee, l'assistant virtuel de [CompanyName], que puis-je faire pour vous ?",
        trigger: '2',
      },
      {
        id: '2',
        message: "Vous avez des questions sur les documents à nous fournir pour votre déclaration d’impôts, nos tarifs, les dates butoirs de cette année ?",
        trigger: 'search',
      },
      {
        id: 'search',
        user: true,
        trigger: '3',
      },
      {
        id: '3',
        component: <CustomAnswer />,
        asMessage: true,
        waitAction: true,
        trigger: 'search',
      },
      // {
      //   id: 'options',
      //   options: [
      //     { value: 'marie', label: 'Je suis marié', trigger: '3' },
      //     { value: 'celibataire', label: 'Je suis célibataire', trigger: '3' },
      //   ],
      // },
    ]}
  />
    </ThemeProvider>
);
export default App;
