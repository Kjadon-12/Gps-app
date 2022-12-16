
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const submitHandler = async () => {
        let result = await fetch('http://localhost:5002/register', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json();
        console.log(result)
        if (result.serverStatus === 2) {
            navigate('/')
            alert('Registers successfully, Now you can Login')
        }
        else {
            alert('User already exists, Please Login')
        }
    }


    return (
        <>
            <div className='container-login'>
                <h2 className="titleL">Register</h2>

                <input type='text' onChange={(e) => setEmail(e.target.value)} value={email} placeholder='          Email' className='login-input' required></input><br /><br />
                
                <input type='password' onChange={(e) => setPassword(e.target.value)} value={password} placeholder='           Password' className='login-input' required></input><br /><br />
                <button type='submit' onClick={submitHandler} className='login-input'>{props.btn}</button><br /><br />


            </div>

        </>
    )


}

export default Register;