import React, { useState } from 'react';
import "./Signup.css";
import { Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

function Signup({ onSignup }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        onSignup(username, password, email);
    };

    const handleForgotPassword = () => {
        console.log('Forgot password clicked');
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className='lsbody'>
            <div className='logocontainer'>
                <img src="logo.png" alt="Logo" style={{ width: '25%', height: '15%', position: 'absolute',
                    top: '22.5%', left: '22%', transform: 'translate(-50%, -50%)' }} />
                <Typography variant="h3" style={{ fontFamily: 'Poppin, sans-serif', fontWeight: '650',
                    fontSize: '50px', color: '#B18A00', position: 'absolute', top: '23%', left: '53%',
                    transform: 'translate(-50%, -50%)' }}>
                    EduDeck</Typography>
                <Typography style={{ color: 'white', fontWeight: '650', fontSize: '30px', position: 'absolute',
                    top: '35%', left: '40.8%', transform: 'translate(-50%, -50%)' }}>Create an Account</Typography>
                <Typography style={{ color: 'white', fontSize: '15px', position: 'absolute', top: '41.5%',
                    left: '42%', transform: 'translate(-50%, -50%)' }}>Elevating College Life for Holistic
                    Success</Typography>
                <img src="studying.png" alt="Studying" style={{ width: '80%', height: '50%',
                    position: 'absolute', top: '70%', left: '50%', transform: 'translate(-50%, -50%)' }} />
            </div>
            <div className='firstcontainer'>
                <div className='secondcontainer'>
                    <form onSubmit={handleSubmit}>
                        <Typography style={{ fontSize: '30px', fontWeight: 'bold', marginLeft: '20px' }}>
                            Signup</Typography>
                        <Typography style={{ fontSize: '12px', fontWeight: 'light', marginLeft: '20px' }}>
                            Please fill your information below</Typography>
                        <div>
                            <div style={{width: '95%', marginBottom: '5px', position: 'relative' }}>
                                <div style={{ marginLeft: '20px' }}>
                                    <TextField
                                        type="email"
                                        placeholder="Email Address"
                                        value={email}
                                        onChange={handleEmailChange}
                                        fullWidth
                                        margin="normal"
                                        variant="standard"
                                        InputProps={{
                                            style: { fontSize: '14px' }, // Adjust font size and padding
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        edge="end"
                                                        tabIndex={-1}
                                                        className="thin-icon"
                                                    >
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <div style={{width: '95%', marginBottom: '5px', position: 'relative' }}>
                                <div style={{ marginLeft: '20px' }}>
                                    <TextField
                                        type="text"
                                        placeholder="Username"
                                        value={username}
                                        onChange={handleUsernameChange}
                                        fullWidth
                                        margin="normal"
                                        variant="standard"
                                        InputProps={{ style: { fontSize: '14px' } }} // Adjust font size and padding
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <div style={{width: '95%', marginBottom: '5px', position: 'relative' }}>
                                <div style={{ marginLeft: '20px' }}>
                                    <TextField
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Password"
                                        value={password}
                                        onChange={handlePasswordChange}
                                        fullWidth
                                        margin="normal"
                                        variant="standard"
                                        InputProps={{
                                            style: { fontSize: '14px' }, // Adjust font size and padding
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        edge="end"
                                                        onClick={toggleShowPassword}
                                                        className="thin-icon"
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <div style={{ width: '95%', marginBottom: '5px', position: 'relative' }}>
                                <div style={{ marginLeft: '20px' }}>
                                    <TextField
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Confirm Password"
                                        value={confirmPassword}
                                        onChange={handleConfirmPasswordChange}
                                        fullWidth
                                        margin="normal"
                                        variant="standard"
                                        InputProps={{
                                            style: { fontSize: '14px' },
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='buttoncontainer' style={{position: 'absolute', top: '90%',
                            left: '50%', transform: 'translate(-50%, -50%)'}}>
                            <button type="submit" style={{ width: '100%', fontWeight: '600', color: 'white' }}>
                                Create Account</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;
