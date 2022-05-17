import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap';
import './Page.css'
import { useLocation } from 'react-router-dom';


/**
 * default wrapper for all pages.
 */

const Page = ({ children, title }) => {
    // when every time first switch to current page, 
    // scroll the windows to the top.

    const location = useLocation()

    useEffect(() => {

        console.log(location.pathname)

        if (location.pathname !== '/') {
            window.scroll({
                top: window.innerHeight - 70,
                left: 0,
                behavior: 'smooth'
            });
        }
        else {
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        }

    }, [location]);


    return (
        <Container
            bsPrefix={
                `page--container`}
            className='w-75 mx-auto'
        >
            {title && <h1
                className={`title`}
            >{title}</h1>}
            {children}
        </Container>

    )
}

export default Page