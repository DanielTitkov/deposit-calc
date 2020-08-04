import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Divider, Header } from 'semantic-ui-react'
import DataInput from '../components/calc/data_input/DataInput';
import DataOutput from '../components/calc/data_output/DataOutput';
import UserSnippet from '../components/user/user_snippet/UserSnippet';
import "./Home.css";

const Home = () => {

    const currentUser = useSelector(state => state.user.currentUser);

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