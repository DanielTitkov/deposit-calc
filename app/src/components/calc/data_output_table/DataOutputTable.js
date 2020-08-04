import React from 'react'
import { Table } from 'semantic-ui-react'
import { asFormat } from '../../../helper/format';
import "./DataOutputTable.css"

const DataOutputTable = ({ data, color }) => (
    <div className="data-output-table">
        <Table 
            color={ color } 
            selectable
            unstackable
            inverted
        >
            <Table.Body>
                { data && Object.keys(data).map( key => (
                    data[key] && <Table.Row key={ key }>
                        <Table.Cell>
                            { data[key]['label'] }
                        </Table.Cell>
                        <Table.Cell textAlign='right'>
                            { asFormat(data[key]['value'], data[key]['format']) }
                        </Table.Cell>
                    </Table.Row>
                )) }
            </Table.Body>
        </Table>
    </div>
);

export default DataOutputTable
