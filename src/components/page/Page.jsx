import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap';
import './Page.css'

/**
 * default wrapper for all pages.
 */

const Page = ({ children, title, darkMode }) => {
    // when every time first switch to current page, 
    // scroll the windows to the top.
    useEffect(() => {
        window.scroll(100, 10)
    }, []);

    let colorTheme = (dark) => dark? 'light': 'dark';
    let backgroundTheme = (dark) => !dark? 'light': 'dark';


    return (
        <div className={`wrapper bg-${backgroundTheme(darkMode)} text-${colorTheme(darkMode)}`}>
            <Container
                bsPrefix={
                    `page--container bg-${backgroundTheme(darkMode)} text-${colorTheme(darkMode)}`}
                className='w-75 mx-auto'
            >
                {title && <h1
                    className={`title text-${colorTheme(darkMode)}`}
                >{title}</h1>}
                {children}
            </Container>
        </div>

    )
}

export default Page