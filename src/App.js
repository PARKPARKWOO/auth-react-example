import React, { useEffect, useState } from 'react';
import axios from 'axios';

const KAKAO_AUTH_URL = 'https://kauth.kakao.com/oauth/authorize';
const CLIENT_ID = 'YOUR_KAKAO_CLIENT_ID'; // Kakao Developers에서 얻은 클라이언트 ID로 교체하세요
const REDIRECT_URI = 'http://localhost:3001/oauth';

function App() {
  const [authCode, setAuthCode] = useState(null);

  useEffect(() => {
    // URL에서 인증 코드 추출
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      setAuthCode(code);
      sendCodeToServer(code);
    }
  }, []);

  const handleLogin = () => {
    const authUrl = `${KAKAO_AUTH_URL}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    window.location.href = authUrl;
  };

  const sendCodeToServer = async (code) => {
    try {
      const response = await axios.post('http://localhost:8080/auth/kakao', { code });
      console.log('Server response:', response.data);
      // 여기에서 서버 응답을 처리합니다 (예: 토큰 저장, 사용자 정보 표시 등)
    } catch (error) {
      console.error('Error sending code to server:', error);
    }
  };

  return (
      <div>
        <h1>Kakao OAuth Login</h1>
        {!authCode ? (
            <button onClick={handleLogin}>Login with Kakao</button>
        ) : (
            <p>Authentication code received. Sent to server for processing.</p>
        )}
      </div>
  );
}

export default App;
