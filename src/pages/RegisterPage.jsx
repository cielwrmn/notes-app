import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../utils/network-data';

function RegisterPage(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        
        if(password !== confirmPassword){
            Swal.fire({
                title: "Registrasi Gagal",
                text: "Password dan konfirmasi password tidak cocok",
                confirmButtonColor: '#ff5f52',
                cancelButtonColor: '#202124',
                confirmButtonText: 'Yes, delete it!' 
            });
        }

        const { error } = await register({ name, email, password });

        if(!error){
            Swal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: 'Akun Anda telah terdaftar. Silakan login.',
                confirmButtonColor: '#202124'
            });
            
            navigate('/login');
        }
    };

    return(
        <section className='register-page'>
            <h2>Isi form untuk mendaftar akun.</h2>
            <div className='input-register'>
                <form onSubmit={onSubmitHandler}>
                    <Input 
                        type = "text"
                        id = "name"
                        label = "Nama"
                        value = {name}
                        onChange = {(e) => setName(e.target.value)}
                    />
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
                    <Input 
                        type = "password"
                        id = "confirmPassword"
                        value = {password}
                        onChange = {(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Daftar</button>
                </form>
            </div>
            <p>Sudah punya akun? <Link to="/login">Login di sini</Link></p>
        </section>
    )
}