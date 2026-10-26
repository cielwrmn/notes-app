import React from 'react';
import { Link } from 'react-router-dom';
import { login, putAccessToken } from '../utils/network-data';
import Input from '../components/Input'; 
import useInput from '../hooks/useInput'; 

function LoginPage({ loginSuccess }) {
    const [email, onEmailChange] = useInput('');
    const [password, onPasswordChange] = useInput('');

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const { error, data } = await login({ email, password });

        if (!error) {
            putAccessToken(data.accessToken);
            loginSuccess();
        }
    };

    return (
        <section className='login-page'>
            <h2>Yuk, login untuk menggunakan aplikasi.</h2>
            <form onSubmit={onSubmitHandler} className='input-login'>
                <Input 
                    type="email" 
                    id="email" 
                    label="Email" 
                    value={email} 
                    onChange={onEmailChange} 
                />
                <Input 
                    type="password" 
                    id="password" 
                    label="Password" 
                    value={password} 
                    onChange={onPasswordChange} 
                />
                <button type="submit" className="submit-button">Login</button>
            </form>
            <p>Belum punya akun? <Link to="/register">Daftar di sini</Link></p>
        </section>
    );
}

export default LoginPage;