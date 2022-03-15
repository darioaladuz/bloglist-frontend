import React, { useState } from 'react';
import registerService from '../services/register';

const RegisterForm = ({ setMessage }) => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const updateName = (e) => {
        setName(e.target.value);
    }

    const updateUsername = (e) => {
        setUsername(e.target.value);
    }

    const updatePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleRegister = async (e) => {
        e.preventDefault();

        const newUser = {
            name,
            username,
            password
        }

        try {
            await registerService.register(newUser);
            setMessage({
                text: 'User created successfully',
                type: 'success'
            })
        } catch(error) {
            console.log(error.response.data.error)
            setMessage({
                text: error.response.data.error,
                type: 'error'
            })
        }

        setName('');
        setUsername('');
        setPassword('');
    }

    return (
        <form onSubmit={handleRegister}>
            <input value={name} name="name" onChange={updateName} type="text" required placeholder="name" />
            <input value={username} name="username" onChange={updateUsername} type="text" required placeholder="username" />
            <input value={password} name="password" onChange={updatePassword} type="password" required placeholder="password" />
            <button type="submit">register</button>
        </form>
    )
}

export default RegisterForm;