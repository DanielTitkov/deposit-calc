import React from 'react'
import { 
    Line, CartesianGrid, XAxis, YAxis, Area,
    Tooltip, ResponsiveContainer, ComposedChart, Legend,
} from 'recharts';
import { asFormat } from '../../../helper/format';

const DataOutputLineChart = ({
    data,
    depositKey,
    mortgageKey,
    nameKey,
    assetPriceKey,
    depositContibutionSumKey,
    depositIncomeSumKey,
}) => {
    const tooltipFormatter = (value, name, props) => {
        Object.keys(props.payload).forEach( k => {
            props.payload[k] = isNaN(props.payload[k]) ? props.payload[k] : asFormat(props.payload[k], "money");
        })
        return [value, name, props]
    }
    return data ? (
        <ResponsiveContainer height={400} debounce={1}>
            <ComposedChart  
                    data={data}
                    margin={{
                        top: 20, right: 0, bottom: 20, left: 0,
                    }}
                >
                <Line name="Сумма платежей по ипотеке" type="monotone" dataKey={mortgageKey} stroke="#F2711C" strokeWidth={2} />
                <Line name="Сумма на вкладе" type="monotone" dataKey={depositKey} stroke="#00B5AD" strokeWidth={2} />
                <Line name="Цена актива" type="monotone" dataKey={assetPriceKey} stroke="#21BA45" strokeWidth={2} dot={false} />
                <Area name="Взносы на вклад" type="monotone" stackId="dep" dataKey={ depositContibutionSumKey } stroke="#6435C9" fill="#6435C9" />
                <Area name="Доход по вкладу" type="monotone" stackId="dep" dataKey={ depositIncomeSumKey } stroke="#2185D0" fill="#2185D0" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey={ nameKey } />
                <YAxis tickFormatter={ e => asFormat(e, "money") } interval="preserveStartEnd" />
                <Legend />
                <Tooltip formatter={ tooltipFormatter } />
            </ComposedChart>
        </ResponsiveContainer>
    ) : null;
}

export default DataOutputLineChart;

