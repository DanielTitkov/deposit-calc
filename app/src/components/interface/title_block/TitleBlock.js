import React, { useState } from 'react';
import { Header, Accordion, Icon } from 'semantic-ui-react';
import "./TitleBlock.css";
import Intro from '../intro/Intro';

const TitleBlock = () => {
    const [showIntro, setShowIntro] = useState(false)
    return (
        <div className="title-block-wrapper">
            <Header as='h1' icon textAlign='center' className="title-block-header">
                <Header.Content>Ипотека vs Вклад</Header.Content>
            </Header>
            <Accordion>
                <Accordion.Title
                    className="title-block-accordion-title"
                    active={showIntro}
                    onClick={() => setShowIntro(!showIntro)}
                >
                    <Icon name='dropdown' />
                    Инструкция
                </Accordion.Title>
                <Accordion.Content active={showIntro}>
                    <Intro />
                </Accordion.Content>
            </Accordion>
        </div>
    )
}

export default TitleBlock;
