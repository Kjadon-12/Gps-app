import { Link } from 'react-router-dom'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        //console.log(email, password)
        let result = await fetch('http://localhost:5002/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json();
        //console.log(result)
        if (result.includes('logged')) {
            navigate('/gps/data')
        }
        else if (result.includes('incorrect')) {


            alert('Password is incorrect, please try again')
        }
        else if (result.includes('User does not exist')) {


            alert('User does not exist, please register first')
        }

    }
    return (
        <>
            <div className='container-login'>
                <h2 className='titleL'>Login</h2>

                <input type='text' placeholder='          Email' onChange={(e) => setEmail(e.target.value)} className='login-input' value={email} required></input><br /><br />
                <input type='password' onChange={(e) => setPassword(e.target.value)} value={password} placeholder='           Password' className='login-input' required></input><br /><br />

                <button type='submit' onClick={submitHandler} className='login-input btn'>{props.btn}</button><br /><br />

                <Link to='/register' className='new-user'>New User?</Link>
            </div>
        </>
    )



}

export default Login;