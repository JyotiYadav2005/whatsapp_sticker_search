import React, { useState } from "react";
import "./App.css";
import sticker1 from "./stickers/sticker1.png";
import sticker2 from "./stickers/sticker2.png";
import sticker3 from "./stickers/sticker3.png";
import sticker4 from "./stickers/sticker4.png";

const stickers = [
  { image: sticker1, name: "bhidu" },
  { image: sticker2, name: "please" },
  { image: sticker3, name: "control" },
  // sticker4 is not included initially
];

function App() {
  const [messages, setMessages] = useState([
    {
      text: "Hey, I just wanted to say 👉👈",
      type: "text",
      timestamp: "10:05 AM",
      sender: "user",
    },
    {
      text: sticker4,
      type: "sticker",
      timestamp: "10:06 AM",
      sender: "user",
      name: "css",
    },
  ]);
  const [input, setInput] = useState("");
  const [showStickers, setShowStickers] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [userStickers, setUserStickers] = useState(stickers); // Exclude sticker4 initially
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stickerToSave, setStickerToSave] = useState(null);
  const [stickerName, setStickerName] = useState("");

  const sendMessage = () => {
    if (input.trim()) {
      const newMessage = {
        text: input,
        type: "text",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        sender: "self",
      };
      setMessages([...messages, newMessage]);
      setInput("");
    }
  };

  const sendSticker = (sticker) => {
    const newMessage = {
      text: sticker.image,
      type: "sticker",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      sender: "self",
      name: sticker.name,
    };
    setMessages([...messages, newMessage]);
    setShowStickers(false);
  };

  const openSaveModal = (sticker) => {
    setStickerToSave(sticker);
    setIsModalOpen(true);
  };

  const handleSaveSticker = () => {
    if (stickerName) {
      const newSticker = { image: stickerToSave.image, name: stickerName };
      setUserStickers([...userStickers, newSticker]);
      setIsModalOpen(false);
      setStickerName("");
      setStickerToSave(null);
    }
  };

  const filteredStickers = userStickers.filter((sticker) =>
    sticker.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <div className="chat-window">
        <div className="chat-header">WhatsApp Chat</div>
        <div className="chat-body">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`chat-message ${message.sender} ${message.type}`}
            >
              {message.type === "text" ? (
                <span className="message-text">{message.text}</span>
              ) : (
                <>
                  <img
                    src={message.text}
                    alt="Sticker"
                    className="sticker-image"
                  />
                  {message.sender === "user" && (
                    <button
                      onClick={() =>
                        openSaveModal({
                          image: message.text,
                          name: message.name,
                        })
                      }
                      className="save-button"
                    >
                      Save
                    </button>
                  )}
                </>
              )}
              <span className="timestamp">{message.timestamp}</span>
            </div>
          ))}
        </div>

        {showStickers && (
          <div className="stickers-panel">
            <input
              type="text"
              placeholder="Search stickers"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="sticker-search"
            />

            <div className="saved-stickers">
              <h4>Saved Stickers</h4>
              <div className="sticker-grid">
                {filteredStickers.map((sticker, index) => (
                  <button
                    key={index}
                    onClick={() => sendSticker(sticker)}
                    className="sticker-button"
                  >
                    <img
                      src={sticker.image}
                      alt={sticker.name}
                      className="sticker-image-thumb"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="chat-footer">
          <input
            type="text"
            placeholder="Type a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={() => setShowStickers(!showStickers)}>
            Stickers
          </button>
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>Save Sticker</h4>
            <input
              type="text"
              placeholder="Enter a name for this sticker"
              value={stickerName}
              onChange={(e) => setStickerName(e.target.value)}
              className="modal-input"
            />
            <button onClick={handleSaveSticker} className="modal-save-button">
              Save
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="modal-cancel-button"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
