import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { login, putAccessToken } from '../utils/network-data';
import Input from '../components/Input';

function LoginPage({ loginSuccess }){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const onSubmitHandler = async (event) => {
        event.preventDefault();

        const { error, data } = await login({ email, password });

        if(!error){
            putAccessToken(data.accessToken);
            loginSuccess();
        }
    };

    return(
        <section className='login-page'>
            <h2>Login untuk menggunakan aplikasi</h2>
            <form onSubmit={onSubmitHandler} className='input-login'>
                <Input 
                        type = "email"
                        id = "email"
                        label = "Email"
                        value = {email}
                        onChange = {(e) => setEmail(e.target.value)}
                    />
                    <Input 
                        type = "password"
                        id = "confirmPassword"
                        value = {password}
                        onChange = {(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type='submit'>Login</button>
            </form>
            <p>Belum punya akun? <Link to="/register">Daftar di sini</Link></p>
        </section>
    );
}

export default LoginPage;