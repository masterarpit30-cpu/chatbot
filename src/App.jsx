import { useState, useEffect, useRef } from "react";
import {Chatbot} from "supersimpledev";
import './App.css'
import RobotProfileImage from './assets/robot.png';
import UserProfileImage from './assets/user.png';

function ChatInput({ chatMessages, setChatMessages }) {
    const [inputText, setInputText] = useState('');
    function saveInputText(event) {
        setInputText(event.target.value);
    }

    function sendMessage() {
        const response = Chatbot.getResponse(inputText);
        setChatMessages([...chatMessages,
        {
            message: inputText,
            sender: "user",
            id: crypto.randomUUID()
        },
        {
            message: response,
            sender: "robot",
            id: crypto.randomUUID()
        }]);

        setInputText('');
    }

    return (
        <div className="chat-input-container">
            <input type="text"
                placeholder="Send a message to chatbot"
                size="30"
                onChange={saveInputText}
                value={inputText}
                className="chat-input"
            />
            <button onClick={sendMessage} className="send-button">Send</button>
        </div>
    );
}

function ChatMessage({ message, sender }) {
    return (
        <div className={sender === 'robot' ? 'chat-message-robot' : 'chat-message-user'}>
            {sender === 'robot' && (
                <>
                    <img src={RobotProfileImage} className="chat-message-profile" />
                    &nbsp;
                </>
            )}
            <div className="chat-message-text">
                {message}
            </div>
            {sender === 'user' && (
                <>
                    &nbsp;
                    <img src={UserProfileImage} className="chat-message-profile" />
                </>
            )}
        </div>
    );
}

function ChatMessages({ chatMessages }) {
    const chatMessagesRef = useRef(null);
    useEffect(() => {
        const containerElem = chatMessagesRef.current;
        if (containerElem) {
            containerElem.scrollTop = containerElem.scrollHeight;
        }
    }, [chatMessages]);

    return (
        <div className="chat-messages-container" ref={chatMessagesRef}>
            {chatMessages.map((chatMessage) => {
                return (
                    <ChatMessage message={chatMessage.message}
                        sender={chatMessage.sender}
                        key={chatMessage.id} />
                )
            })
            }
        </div>
    );
}
function Link({isChatbotInitialized, setIsChatbotInitialized}) {
    return (
            <div className="link-container">
                <a href="" onClick={() => {
                    setIsChatbotInitialized(!isChatbotInitialized);
                }}>
                    Move Input Chatbox to the 
                    {isChatbotInitialized ? ' top' : ' bottom'} of the page
                </a>
            </div>
    );
}

function App() {

    const [chatMessages, setChatMessages] = useState([]);
    const [isChatbotInitialized, setIsChatbotInitialized] = useState(false);

    // useEffect(() => {
    //     setIsChatbotInitialized(true);
    // }, []);

    return (
        <div className="app-container">
            {isChatbotInitialized 
            ? 
                <>
                    <ChatMessages chatMessages={chatMessages} />
                    <ChatInput chatMessages={chatMessages} setChatMessages={setChatMessages} />
                </>
            :
                <>
                    <ChatInput chatMessages={chatMessages} setChatMessages={setChatMessages} />
                    <ChatMessages chatMessages={chatMessages} />
                </>
            }
            <Link isChatbotInitialized={isChatbotInitialized} 
            setIsChatbotInitialized={setIsChatbotInitialized} />
        </div>
    );
}

export default App;