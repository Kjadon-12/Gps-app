import { Link, useNavigate } from 'react-router-dom';

import { useFormik } from "formik";
import * as Yup from "yup";


const initialValues = {
    email: "",
    password: "",
    
}


function Login() {
    
    
    const navigate = useNavigate();

    const SignUpSchema = Yup.object({
    
        email: Yup.string().email().required("Email is required"),
        password: Yup.string().min(4).required("Password is required"),
    
    })


    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: SignUpSchema,
        onSubmit: (values) => {
            console.log(values)
            submitHandler( values.email, values.password)
        }

    })


    async function submitHandler(email,password){
        
        
        console.log(email, password)
        let result = await fetch('http://localhost:5002/login', {
            method: 'POST',
            body: JSON.stringify( {email, password }),
            headers: {
                'Content-Type': 'application/json',
                 }
        })
        result = await result.json();
        console.log(result)

        
        if (result.includes('logged')) {
            
            navigate('/all/user')
        }
        else if (result.includes('incorrect')) {
            
           
            
        
            alert('Password is incorrect, please try again')
            
           
        }
        else if (result.includes('User does not exist')) {
            

            alert('User does not exist, please register first')
            navigate('/register')
        }

    }
    return (
        <>
            <div className='container-login'>
                <h2 className='titleL'>Login</h2>

                <form onSubmit={handleSubmit}>
                    <input type='text' name="email" autoComplete="off" onChange={handleChange} onBlur={handleBlur} value={values.email} placeholder='          Email' className='login-input'></input><br /><br />
                    {errors.email && touched.email ? <p className="err-msg">{errors.email}</p> : null}
                    <input type='password' name="password" autoComplete="off" onChange={handleChange} onBlur={handleBlur} value={values.password} placeholder='          Password' className='login-input'></input><br /><br />
                    {errors.password && touched.password ? <p className="err-msg">{errors.password}</p> : null}
                    
                    <button type='submit' onClick={submitHandler} className='login-input btn'>Login</button><br /><br />
                </form>

                
                 <Link to="/register" className='new-reg'>New User?</Link>
            </div>
        </>
    )



}

export default Login;