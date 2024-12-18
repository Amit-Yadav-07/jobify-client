import React from 'react'
import { Link, redirect, useNavigation, Form, useActionData } from 'react-router-dom'
import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import FormRow from '../components/FormRow'
import SubmitBtn from '../components/SubmitBtn'
import { Logo } from '../components'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'


export const action = async ({ request }) => {

  const fromData = await request.formData()
  const data = Object.fromEntries(fromData);

  const errors = { msg: '' };
  if (data.password.length < 3) {
    errors.msg = 'password too short';
    return errors
  }

  try {
    await customFetch.post('/auth/login', data)
    toast.success('Login Successful')
    return redirect('/dashboard');

  } catch (error) {
    // toast.error(error?.response?.data?.msg)
    errors.msg = error?.response?.data?.msg
    return errors
  }

}

const Login = () => {

  const errors = useActionData()

  return (
    <Wrapper>
      <Form method="post" className='form'>
        <Logo />
        <h4>Login</h4>

        {errors?.msg && <p style={{ color: 'red' }}>{errors.msg}</p>}

        <div className="form-row">
          <FormRow type='email' name='email' id='email' defaultValue='john@gmail.com' />
          <FormRow type='password' name='password' id='password' defaultValue='secret123' />
          <SubmitBtn />
          <p>Not A Member Yet ? <Link to='/register' className='member-btn'>Register</Link></p>
        </div>
      </Form>
    </Wrapper>
  )
}

export default Login;