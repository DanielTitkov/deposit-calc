import React from 'react';
import { RadialBarChart, RadialBar, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DataOutputRadialChart = ({ data }) => {
    return (
        <ResponsiveContainer height={300}>
            <RadialBarChart cx={150} cy={150} innerRadius={20} outerRadius={140} barSize={10} data={ data }>
                <RadialBar minAngle={15} label={{ position: 'insideStart', fill: '#fff' }} background clockWise dataKey="sum" />
                <Legend iconSize={10} width={120} height={140} layout="vertical" verticalAlign="middle" />
                <Tooltip />
            </RadialBarChart>
        </ResponsiveContainer>
    )
}

export default DataOutputRadialChart;
