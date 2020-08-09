import React from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, Legend } from 'recharts';

const DataOutputLineChart = ({ data, depositKey, mortgageKey, nameKey, assetPrice }) => {
    return data ? (
        <ResponsiveContainer height={ 300 }>
            <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey={ depositKey } stroke="blue" />
                <Line type="monotone" dataKey={ mortgageKey } stroke="orange" />
                <ReferenceLine y={ assetPrice } label="Цена актива" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey={ nameKey } />
                <YAxis />
                <Legend />
                <Tooltip />
            </LineChart>
        </ResponsiveContainer>
    ) : null;
}

export default DataOutputLineChart;

