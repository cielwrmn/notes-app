import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../utils/network-data';
import Swal from 'sweetalert2';
import Input from '../components/Input';
import useInput from '../hooks/useInput'; 

function RegisterPage() {
    const [name, onNameChange] = useInput('');
    const [email, onEmailChange] = useInput('');
    const [password, onPasswordChange] = useInput('');
    const [confirmPassword, onConfirmPasswordChange] = useInput('');

    const navigate = useNavigate();

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        
        if (password !== confirmPassword) {
            Swal.fire({
                title: "Registrasi Gagal",
                text: "Password dan konfirmasi password tidak cocok",
                confirmButtonColor: "#ff5f52",
                cancelButtonColor: "#202124",
                confirmButtonText: "Tutup"
            });
            return;
        }

        const { error } = await register({ name, email, password });

        if (!error) {
            Swal.fire({
                icon: "success",
                title: "Berhasil!",
                text: "Akun Anda telah terdaftar. Silakan login.",
                confirmButtonColor: "#202124"
            });
            
            navigate('/login');
        }
    };

    return (
        <section className='register-page'>
            <h2>Isi form untuk mendaftar akun.</h2>
            <div className='input-register'>
                <form onSubmit={onSubmitHandler}>
                    <Input 
                        type="text"
                        id="name"
                        label="Nama"
                        value={name}
                        onChange={onNameChange} 
                    />
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
                        required
                    />
                    <Input 
                        type="password"
                        id="confirmPassword"
                        label="Confirm Password"
                        value={confirmPassword}
                        onChange={onConfirmPasswordChange}
                        required
                    />
                    <button type="submit" className='submit-button'>Daftar</button>
                </form>
            </div>
            <p>Sudah punya akun? <Link to="/login">Login di sini</Link></p>
        </section>
    );
}

export default RegisterPage;