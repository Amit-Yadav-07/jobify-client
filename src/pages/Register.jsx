import React from 'react'
import { Link, useNavigation, redirect, Form } from 'react-router-dom'
import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import { Logo } from '../components'
import FromRow from '../components/FormRow'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'
import SubmitBtn from '../components/SubmitBtn'

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post('/auth/register', data);
    toast.success('Registration Successful')
    return redirect('/login');
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error;
  }

}

const Register = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting'
  return (
    <Wrapper>
      <Form method='post' className="form">
        <Logo />
        <h4>Register</h4>
        <FromRow type='text' name='name' id='name' defaultValue='john' />
        <FromRow type='text' name='lastName' id='lastName' labelText='Last Name' defaultValue='doe' />
        <FromRow type='text' name='location' id='location' defaultValue='Earth' />
        <FromRow type='email' name='email' id='email' defaultValue='john@gmail.com' />
        <FromRow type='password' name='password' id='Password' defaultValue='secret123' />

        <SubmitBtn />
      </Form>
    </Wrapper>
  )
}

export default Register