import React from 'react'
import config from '../../../config/config'
import { Header } from 'semantic-ui-react';

const Footer = () => {
    return (
        <Header disabled as='h5' textAlign='center'>
            <a 
                href={ config.AUTHOR_LINK } 
                target="_blank"
                rel="noopener noreferrer"
            >
                Связаться с автором
            </a>
        </Header>
    )
}

export default Footer;