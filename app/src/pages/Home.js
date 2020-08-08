import React from 'react';
import { Container, Divider } from 'semantic-ui-react'
import DataInput from '../components/calc/data_input/DataInput';
import DataOutput from '../components/calc/data_output/DataOutput';
import UserSnippet from '../components/user/user_snippet/UserSnippet';
import "./Home.css";
import Controls from '../components/interface/controls/Controls';

const Home = () => {
	return (
        <Container className="home-wrapper">
            <Controls />
            <UserSnippet />
            <DataInput />
            <Divider />
            <DataOutput />
        </Container>
	)
};

export default Home;