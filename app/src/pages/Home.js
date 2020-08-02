import React, { useEffect, useState } from 'react';
import { Button, Container, Divider, Grid, Header, Image, Menu, Segment } from 'semantic-ui-react'
import DataInput from '../components/calc/data_input/DataInput';
import DataOutput from '../components/calc/data_output/DataOutput';

const Home = (props) => {
	return (
        <Container>
            <Divider/>
            <Header as='h1'>Ипотека vs Вклад</Header>
            <DataInput />
            <Divider />
            <DataOutput />
        </Container>
	)
};

export default Home;