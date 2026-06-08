import React, { useState } from "react";
import axios from "axios";

const AIAssistant = () => {

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {

    if (!message.trim()) return;

    const currentMessage = message;

    setChat(prev => [
      ...prev,
      {
        role: "user",
        text: currentMessage
      }
    ]);

    setMessage("");
    setLoading(true);

    try {

      const res = await axios.post(
        "http://127.0.0.1:5000/chat",
        {
          message: currentMessage
        }
      );

      setChat(prev => [
        ...prev,
        {
          role: "assistant",
          text: res.data.response
        }
      ]);

    } catch {

      setChat(prev => [
        ...prev,
        {
          role: "assistant",
          text: "Backend not responding."
        }
      ]);

    } finally {

      setLoading(false);

    }
  };

  const handleKeyDown = (e) => {

    if (e.key === "Enter") {

      sendMessage();

    }
  };

  return (

    <div
      style={{
        background: "#F5E9D8",
        borderRadius: "20px",
        minHeight: "80vh",
        padding: "30px"
      }}
    >

      {chat.length === 0 ? (

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "70vh",
            textAlign: "center"
          }}
        >

          <div
            style={{
              fontSize: "70px"
            }}
          >
            🤖
          </div>

          <h1>
            SmartStock AI Assistant
          </h1>

          <p
            style={{
              color: "#666",
              maxWidth: "600px"
            }}
          >
            Ask inventory forecasting,
            warehouse optimization,
            demand prediction,
            analytics and risk related questions.
          </p>

          <div
            style={{
              width: "70%",
              display: "flex",
              gap: "10px",
              marginTop: "25px"
            }}
          >

            <input
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              onKeyDown={handleKeyDown}
              placeholder="Ask SmartStock AI..."
              style={{
                flex: 1,
                padding: "16px",
                borderRadius: "12px",
                border: "1px solid #ccc"
              }}
            />

            <div
                style={{
                    display:"flex",
                    gap:"10px",
                    flexWrap:"wrap",
                    marginBottom:"20px"
                }}
                >

                <button
                onClick={()=>setMessage("Prediction Count")}
                >
                Prediction Count
                </button>

                <button
                onClick={()=>setMessage("Latest Prediction")}
                >
                Latest Prediction
                </button>

                <button
                onClick={()=>setMessage("Highest Demand Region")}
                >
                Highest Demand Region
                </button>

                <button
                onClick={()=>setMessage("Dashboard Summary")}
                >
                Dashboard Summary
                </button>

                </div>

            <button
              onClick={sendMessage}
              style={{
                background: "#2F2F2F",
                color: "white",
                border: "none",
                borderRadius: "12px",
                padding: "0 25px",
                cursor: "pointer"
              }}
            >
              Send
            </button>

          </div>

        </div>

      ) : (

        <>
          <h2>
            🤖 SmartStock AI Assistant
          </h2>

          <div
            style={{
              height: "60vh",
              overflowY: "auto",
              background: "#FAF6F0",
              borderRadius: "15px",
              padding: "20px",
              marginTop: "20px"
            }}
          >

            {chat.map((msg, index) => (

              <div
                key={index}
                style={{
                  textAlign:
                    msg.role === "user"
                      ? "right"
                      : "left",
                  marginBottom: "15px"
                }}
              >

                <span
                  style={{
                    display: "inline-block",
                    maxWidth: "75%",
                    padding: "12px 18px",
                    borderRadius: "14px",
                    background:
                      msg.role === "user"
                        ? "#2F2F2F"
                        : "#E9DCC9",
                    color:
                      msg.role === "user"
                        ? "white"
                        : "#222"
                  }}
                >
                  {msg.text}
                </span>

              </div>

            ))}

            {loading && (

              <div>
                🤖 Thinking...
              </div>

            )}

          </div>

          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "20px"
            }}
          >

            <input
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              onKeyDown={handleKeyDown}
              placeholder="Ask SmartStock AI..."
              style={{
                flex: 1,
                padding: "14px",
                borderRadius: "10px",
                border: "1px solid #ccc"
              }}
            />

            <button
              onClick={sendMessage}
              style={{
                background: "#2F2F2F",
                color: "white",
                border: "none",
                borderRadius: "10px",
                padding: "0 25px",
                cursor: "pointer"
              }}
            >
              Send
            </button>

          </div>

        </>

      )}

    </div>
  );
};

export default AIAssistant;