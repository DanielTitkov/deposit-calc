import React from 'react';
import { Container, Divider } from 'semantic-ui-react'
import DataInput from '../components/calc/data_input/DataInput';
import DataOutput from '../components/calc/data_output/DataOutput';
import UserSnippet from '../components/user/user_snippet/UserSnippet';
import Controls from '../components/interface/controls/Controls';
import Intro from '../components/interface/intro/Intro';
import "./Home.css";

const Home = () => {
	return (
        <Container className="home-wrapper">
            <Controls />
            <Intro />
            <UserSnippet />
            <DataInput />
            <Divider />
            <DataOutput />
        </Container>
	)
};

export default Home;