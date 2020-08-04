import React from 'react'
import { Header, Popup, Icon } from 'semantic-ui-react'
import DataOutputTable from '../data_output_table/DataOutputTable';
import "./DataOutputTableBlock.css";

const DataOutputTableBlock = ({ headerText, tooltipText, tableColor, data }) => (
    <div className="data-output-table-block">
        <Header as="h2">
            { headerText }
            <Popup
                trigger={<small>&nbsp;<Icon name='question circle outline' /></small>}
                content={ tooltipText }
                basic
            />
        </Header>
        <DataOutputTable data={ data } color={ tableColor } />
    </div>
);

export default DataOutputTableBlock
