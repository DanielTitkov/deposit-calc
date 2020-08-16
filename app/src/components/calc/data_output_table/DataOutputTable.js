import React from 'react'
import { Table } from 'semantic-ui-react'
import { asFormat } from '../../../helper/format';
import "./DataOutputTable.css"
import DataOutputValue from '../data_output_number/DataOutputValue';

const DataOutputTable = ({ data, color }) => (
    <div className="data-output-table">
        <Table
            color={color}
            selectable
            unstackable
            inverted
        >
            <Table.Body>
                {data && Object.keys(data).map(key => (
                    data[key] && <Table.Row key={key}>
                        <Table.Cell>
                            {data[key]['label']}
                        </Table.Cell>
                        <Table.Cell textAlign='right'>
                            <DataOutputValue
                                value={data[key]['value']}
                                max={10000000000}
                                min={0}
                            />
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    </div>
);

export default DataOutputTable
