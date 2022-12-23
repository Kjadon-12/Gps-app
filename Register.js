
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";





const initialValues = {
    email: "",
    password: "",
    
}

function Register() {

    const navigate = useNavigate();



    const SignUpSchema = Yup.object({
        name: Yup.string().min(2).max(20).required("Name is required"),
        email: Yup.string().email().required("Email is required"),
        password: Yup.string().min(4).required("Password is required"),
        cnfrmPassword: Yup.string().required("Confirm Password is required").oneOf([Yup.ref('password'), null], "Password must match")
    })

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: SignUpSchema,
        onSubmit: (values) => {
            submitHandler( values.email, values.password)
        }

    })


    async function submitHandler( email, password) {
        let result = await fetch('http://localhost:5002/register', {
            method: 'POST',
            body: JSON.stringify({  email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json();
        console.log(result)
        if (result.serverStatus === 2) {
            navigate('/')
            alert('Register successfully')
        }

        else {
            alert('User already exists, Please Login')
            navigate('/')
        }
    }


    return (
        <>
            <div className='container-login'>
                <h2 className="titleL">Register</h2>
                <form onSubmit={handleSubmit}>
                    <input type='text' name="email" autoComplete="off" onChange={handleChange} onBlur={handleBlur} value={values.email} placeholder='          Email' className='login-input'></input><br /><br />
                    {errors.email && touched.email ? <p className="err-msg">{errors.email}</p> : null}
                    <input type='password' name="password" autoComplete="off" onBlur={handleBlur} onChange={handleChange} value={values.password} placeholder='           Password' className='login-input'></input><br /><br />
                    {errors.password && touched.password ? <p className="err-msg">{errors.password}</p> : null}
                    

                    <button type='submit' className='login-input btn'>Register</button><br /><br />
                </form>

            </div>

        </>
    )


}

export default Register;