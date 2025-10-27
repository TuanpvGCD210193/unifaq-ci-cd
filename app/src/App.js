import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [faqs, setFaqs] = useState([]);
  const [status, setStatus] = useState('Đang tải...');

  useEffect(() => {
    const apiUrl = 'http://localhost:5000/api/faqs';

    fetch(apiUrl)
      .then(res => {
        if (!res.ok) {
          throw new Error('Fetch thất bại');
        }
        return res.json();
      })
      .then(data => {
        setFaqs(data);
        setStatus('Tải thành công!');
      })
      .catch(err => {
        setStatus(`Lỗi: ${err.message}. API server đã chạy chưa?`);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>UniFAQ Docker App</h1>
        <p>Trạng thái: {status}</p>
        <div style={{ textAlign: 'left', marginTop: '20px' }}>
          {faqs.map(faq => (
            <div key={faq.id} style={{ border: '1px solid #555', padding: '10px', margin: '10px' }}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;