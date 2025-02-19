import api from '../api';
import { useState } from 'react';

function Register() {
    const [regUserName, setRegUserName] = useState('');
    const [regPassword, setRegPassword] = useState('');

    async function handleRegister() {
        try {
            //send the post request with the registering user's data as the body
            const response = await api.post('/register', {
                userName: regUserName,
                password: regPassword,
            });

            //transform the success message/response from the backend into text - done for my own interest
            const message = response.data;
            //alert the backend response message - done for my own interest
            alert(message);
            //clear the register input fields so everything is neat again
            setRegUserName('');
            setRegPassword('');
        } catch (error) {
            alert(error.response.data); // display the backend error message saying "user does not exist" - done for my own interest
            console.error(error);
        }
    }
    return (
        <div>
            <h2>or</h2>
            <h1>Register as new user</h1>
            <form onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="userName">User Name:</label>
                <input value={regUserName} onChange={(e) => setRegUserName(e.target.value)} />
                <label htmlFor="password">Password:</label>
                <input type="password" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} />
                <button onClick={handleRegister}>Register</button>
            </form>
        </div>
    );
}
export default Register;
