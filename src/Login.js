import React, { useState } from 'react';
import "./login.css";
import { Typography, Divider} from '@mui/material';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(username, password);
    // After login, you might want to clear the form or redirect the user
  };

  const handleForgotPassword = () => {
    // Here, you might open a modal, navigate to a different route, or set some state to show a forgot password form
    console.log('Forgot password clicked');
  };

  return (
      <div className='lsbody'>
        <div className='logocontainer'>
          <img src="logo.png" alt="Logo" style={{ height: 90, position: 'absolute', top: '22%', left: '22%', transform: 'translate(-50%, -50%)' }} />
          <Typography variant="h3" style={{ fontFamily: 'Poppin, sans-serif', fontWeight: '650', fontSize: '50px', color: '#B18A00', position: 'absolute', top: '23%', left: '53%', transform: 'translate(-50%, -50%)' }}>
            EduDeck</Typography>
          <Typography style={{ color: 'white', fontWeight: '650', fontSize: '30px', position: 'absolute', top: '35%', left: '27%', transform: 'translate(-50%, -50%)' }}>Welcome!</Typography>
          <Typography style={{ color: 'white', fontSize: '15px', position: 'absolute', top: '41.5%', left: '42%', transform: 'translate(-50%, -50%)' }}>Elevating College Life for Holistic
            Success</Typography>
          <img src="studying.png" alt="Studying" style={{ width: '80%', height: '50%', position: 'absolute', top: '70%', left: '50%', transform: 'translate(-50%, -50%)' }} />
        </div>
        <div className='firstcontainer' >
          <div className='secondcontainer'>
            <form onSubmit={handleSubmit}>
              <Typography style={{ fontSize: '30px', fontWeight: 'bold', marginLeft: '20px' }}>
                Log in</Typography>
              <Typography style={{ fontSize: '12px', fontWeight: 'light', marginLeft: '20px' }}>
                please fill your information below</Typography>
              <div>
                <div style={{ marginBottom: '10px', position: 'relative' }}>
                  <div style={{ marginLeft: '30px' }}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={handleUsernameChange}
                        style={{
                          marginTop: '30px',
                          width: '90%',
                          padding: '8px',
                          border: 'none',
                          borderBottom: '1px solid #B18A00',
                          outline: 'none',
                        }}
                    />
                  </div>
                </div>
              </div>
              <div>
                <div style={{ marginBottom: '10px', position: 'relative' }}>
                  <div style={{ marginLeft: '30px' }}>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                        style={{
                          marginTop: '10px',
                          width: '90%',
                          padding: '8px',
                          border: 'none',
                          borderBottom: '1px solid #B18A00',
                          outline: 'none',
                        }}
                    />
                    <Typography
                        onClick={handleForgotPassword}
                        style={{ cursor: 'pointer', color: 'gray', display: 'block', marginTop: '10px' ,
                          fontStyle: 'italic', fontWeight: '300', fontSize: '12px', textAlign: 'center', marginRight: '2.5em'}} >Forgot Password?
                    </Typography>
                  </div>
                </div>
              </div>
              <div>
                <Divider style={{ marginBottom: '16px', backgroundColor: '#C8C8C8', width: '18%' , position: 'absolute', top: '62%', left: '37%',transform: 'translate(-50%, -50%)' , color: '#B18A00'}} />
                <Typography style={{ fontSize: '10px', position: 'absolute', top: '62%', left: '50%', transform: 'translate(-50%, -50%)' , color: '#B18A00'}}>or</Typography>
                <Divider style={{ marginBottom: '16px', backgroundColor: '#C8C8C8', width: '18%' , position: 'absolute', top: '62%', left: '63%', transform: 'translate(-50%, -50%)' , color: '#B18A00'}} />
              </div>

              <div className='buttoncontainer' style={{position: 'absolute', top: '69%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                <button type="button" style={{ width: '17em', color: 'gray', backgroundColor: 'white', borderRadius: '.2em', border: '1px solid #C8C8C8', borderWidth: '0.5px', padding: '8px 20px', marginTop: '10px' }}>
                  <img src="Google.png" alt="Google Logo" style={{ marginRight: '10px', height: '20px', verticalAlign: 'middle' }} />
                  Continue with Google
                </button>

                <button type="submit" style={{ height: '2.3em', width: '14.2em', fontWeight: '600', color: 'white', borderRadius: '.2em',
                  position: 'absolute', top: '81%', left: '49%', transform: 'translate(-50%, -50%)', marginTop: '2em'}}>Login</button>
              </div>
              <Typography
                  style={{ cursor: 'pointer', color: '#FFD234', display: 'block', marginTop: '10px' , fontSize: '8em', fontWeight: 'bold', fontSize: '12px', textAlign: 'center', position: 'absolute', top: '90%', left: '50%', transform: 'translate(-50%, -50%)' }}>Create Account
              </Typography>
            </form>
          </div>
        </div>
      </div>
  );
}

export default Login;

