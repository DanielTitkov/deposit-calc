import React from 'react';
import { Container, Divider } from 'semantic-ui-react'
import DataInput from '../components/calc/data_input/DataInput';
import DataOutput from '../components/calc/data_output/DataOutput';
import UserSnippet from '../components/user/user_snippet/UserSnippet';
import Controls from '../components/interface/controls/Controls';
import Footer from '../components/interface/footer/Footer';
import TitleBlock from '../components/interface/title_block/TitleBlock';
import "./Home.css";

const Home = () => {
	return (
        <Container className="home-wrapper">
            <Controls />
            <TitleBlock />
            <UserSnippet />
            <DataInput />
            <Divider />
            <DataOutput />
            <Footer />
        </Container>
	)
};

export default Home;