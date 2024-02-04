import React, { useEffect, useState } from 'react'
import Table from './Table'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import QRCode from 'react-qr-code'

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const notify = () => toast("השינוי בוצע בהצלחה");

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleNewMessages = async (e) => {
    e.preventDefault();
    const messageReceived = e.target.received.value;
    const messageResponse = e.target.response.value;

    const data = {
      "received": messageReceived,
      "response": messageResponse
    };

    // console.log(data);
    notify()

    try {
      const res = await axios.post('http://localhost:3636/play/send', data);

      const result = res.data;
      // console.log(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  const [qrCode, setQrCode] = useState("")
  useEffect(() => {
      const newQr = async () => {
          try {
              const res = await axios.get("http://localhost:3636/client");
              console.log("qr: ",res.data);
              setQrCode(res.data);
          } catch (error) {
              console.log("error");
          }
      };
  
      newQr();
  }, []);
  
//   const socket = new WebSocket('ws://localhost:3666');  // יש להתאים לכתובת המתאימה של השרת

// client.on('qr', (qr) => {
//     console.log('QR RECEIVED', qr);
//     socket.send(JSON.stringify({ type: 'qrCode', data: qr }));
// });

  return (
    <div className={`table ${isDarkMode ? 'dark-mode' : ''}`}>
      <button onClick={toggleDarkMode} style={{backgroundColor:'inherit', border:'none', fontSize:'24px'}}>
        {!isDarkMode ? "😎" : '🌚'}
      </button>
      <form onSubmit={handleNewMessages}>
        <input type="text" name="received" placeholder='הודעה מתקבלת' />
        <input type="text" name="response" placeholder='הודעת תגובה אוטומטית' />
        <button type="submit">send</button>
        <div>
        <QRCode  value={qrCode}  />
        </div>

      </form>
      <Table />
      <ToastContainer/>
    </div>
  )
}
