import React from 'react'
import { Link, useRouteError } from 'react-router-dom';
import Wrapper from '../assets/wrappers/ErrorPage';
import img from '../assets/images/not-found.svg';

const Error = () => {

    const error = useRouteError();
    // console.log(error);

    if (error.status === 404) {
        return (

            <Wrapper>
                <div>
                    <img src={img} alt="not-found-img" />
                    <h4 style={{ marginBottom: '1rem' }}>ohh! Page Not Found</h4>
                    <Link to='/dashboard'>Back Home</Link>
                </div>
            </Wrapper>
        )
    }

    return (
        <Wrapper>
            <div>
                <h2>Something Went Wrong...</h2>
            </div>
        </Wrapper>
    )
}

export default Error