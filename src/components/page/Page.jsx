import React from 'react'
import { Container } from 'react-bootstrap';
import './Page.css'

/**
 * default wrapper for all pages.
 */

const Page = ({ children, title }) => {
    // when every time first switch to current page, 
    // scroll the windows to the top.
    // useEffect(() => {
    //     window.scroll(100, 10)
    // }, []);
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