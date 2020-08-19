import React from 'react'
import { Divider } from 'semantic-ui-react';
import "./Intro.css";

const Intro = () => {
    return (
        <div className="intro-wrapper">
            <p>
                Есть определенная сумма денег, которую мы можем платить в месяц по ипотеке.
                Вместо этого можно не брать ипотеку и снимать квартиру.
            </p>
            <p>
                Тогда часть из той же суммы мы будем отдавать за аренду, а остаток можем помещать на вклад.
                Что будет выгоднее?
            </p>
            <Divider />
        </div>
    );
}

export default Intro;
