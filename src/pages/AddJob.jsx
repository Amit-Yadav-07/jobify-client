import FormRow from '../components/FormRow'
import Wrapper from '../assets/wrappers/DashboardForm'
import { useOutletContext } from 'react-router-dom'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'
import { Form, useNavigate, redirect } from 'react-router-dom'
import { JOB_STATUS, JOB_TYPE } from '../../../server/utils/constants'
import { FormRowSelect } from '../components'

export const action = async ({ request }) => {

    const formData = await request.formData()
    const data = Object.fromEntries(formData);

    try {

        await customFetch.post('/jobs', data);
        toast.success('Job added successfully')
        return redirect('all-jobs')

    } catch (error) {
        toast.error(error?.response?.data?.msg)
        return error;
    }

}

const AddJob = () => {
    const { user } = useOutletContext();
    const navigation = useNavigate();
    const isSubmitting = navigation.state === 'submitting'
    return (
        <Wrapper>
            <Form method='post' className='form'>
                <h4 className='form-title'>Add Job</h4>
                <div className="form-center">
                    <FormRow type='text' name='position' />
                    <FormRow type='text' name='company' />
                    <FormRow type='text' labelText='job location' name='jobLocation' defaultValue={user.location} />

                    <FormRowSelect labelText='job status' name='jobStatus' id='jobStatus' defaultValue={JOB_STATUS.PENDING} list={Object.values(JOB_STATUS)} />
                    <FormRowSelect labelText='job type' name='jobType' id='jobType' defaultValue={JOB_TYPE.FULL_TIME} list={Object.values(JOB_TYPE)} />

                    <button type='submit' className='btn btn-block form-btn' disabled={isSubmitting}>{isSubmitting ? 'submitting' : 'submit'}</button>
                </div>
            </Form>
        </Wrapper>
    )
}

export default AddJob