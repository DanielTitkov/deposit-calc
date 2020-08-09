import React from 'react'
import { Header } from 'semantic-ui-react'
import "./Intro.css";

const Intro = () => {
    return (
        <div className="intro-wrapper">
            <Header block as="h5">
                Есть определенная сумма денег, которую мы можем платить в месяц по ипотеке.
                Вместо этого можно часть из нее отдавать за аренду, а остаток помещать на вклад. 
                Что будет выгоднее? 
                <Header.Subheader>Введите свои значения в поля ниже, чтобы посчитать.</Header.Subheader>
            </Header>
        </div>
    );
}

export default Intro;
