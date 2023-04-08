import { useState } from 'react';
import './App.css';

function App() {
  const baseURL = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data='
  const [inputValue, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [qrCode, setQRCode] = useState('');

  const handleQRCode = async (evt) => {
    evt.preventDefault();

    try {
      setIsLoading(true)

      const resQRCode = await fetch(`${baseURL}${inputValue}`);

      setQRCode(resQRCode.url)
      setInput('')
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="App">
      <form className='form' onSubmit={handleQRCode}>
        <h2>Gerador de QRCode</h2>
        <input
          className='input'
          type="text"
          placeholder='Digite a URL ou texto...'
          value={inputValue}
          onChange={(evt) => setInput(evt.target.value)}
        />

        {isLoading &&
          <div className='loading'><span></span>Carregando...</div>}

        {!isLoading && (qrCode ? <img className='qr-code' src={qrCode} alt="imagem qr-code" /> :
          <div className="loading">
            <p>Gera um divertido QRCode para você & para seus amigos!</p>
          </div>
        )}


        <input type="submit" className='submit' value="Gerar QRCode" />

      </form>
    </div>
  );
}

export default App;
