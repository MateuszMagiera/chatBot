const voice = document.querySelector('.voice');
const voice2text = document.querySelector('.voice2text');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recorder = new SpeechRecognition();

//adding a 'human' chat window
function addHumanText(text) {
    //creating a div containing this window
    const chatContainer = document.createElement("div");
    chatContainer.classList.add("chat-container");
    //creating a <p> inside the div
    const chatBox = document.createElement("p");
    chatBox.classList.add("voice2text");
    //creating a text element and appending it to paragraph
    const chatText = document.createTextNode(text);
    chatBox.appendChild(chatText)
    //appending whole to a div, and returning it
    chatContainer.appendChild(chatBox)
    return chatContainer;
};


function addBotText(text) {
  //creating a div containing this window
  const chatContainer1 = document.createElement("div");
  chatContainer1.classList.add("chat-container");
  chatContainer1.classList.add("darker");
  //creating a <p> inside the div
  const chatBox1 = document.createElement("p");
  chatBox1.classList.add("voice2text");
  //creating a text element and appending it to paragraph
  const chatText1 = document.createTextNode(text);
  chatBox1.appendChild(chatText1);
  //appending whole to a div, and returning it
  chatContainer1.appendChild(chatBox1);
  return chatContainer1;
}

function botVoice(message) {
    const speech = new SpeechSynthesisUtterance();
    speech.text = "Sorry, I did not understand that";

    if(message.includes('how are you')) {
        speech.text = 'I am fine, thanks. How are you?'
    }
    
    if(message.includes('fine')) {
        speech.text = 'Nice to hear that. How can I help you today?'
    }

    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);
    var element = document.getElementById('container');
    element.appendChild(addBotText(speech.text));
};


recorder.onstart = () => {
    console.log('voice activated')
};

recorder.onresult = (event) => {
    //console.log(event);
    //printing a voice input on the main page
    const resultIndex =  event.resultIndex
    const transcript = event.results[resultIndex][0].transcript;
    // voice2text.textContent = transcript;
    //taking the voice input and transcrive it
    var element = document.getElementById("container");
    element.appendChild(addHumanText(transcript));
    botVoice(transcript);
};


voice.addEventListener('click',function(){
    recorder.start();
});