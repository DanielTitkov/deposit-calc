import React from 'react';
import { Container, Divider, Header } from 'semantic-ui-react'
import DataInput from '../components/calc/data_input/DataInput';
import DataOutput from '../components/calc/data_output/DataOutput';
import UserSnippet from '../components/user/user_snippet/UserSnippet';
import "./Home.css";

const Home = () => {
	return (
        <Container className="home-wrapper">
            <UserSnippet />
            <Header as='h1'>Ипотека vs Вклад</Header>
            <DataInput />
            <Divider />
            <DataOutput />
        </Container>
	)
};

export default Home;