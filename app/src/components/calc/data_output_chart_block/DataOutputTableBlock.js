import React from 'react'
import { Header, Popup, Icon } from 'semantic-ui-react'

const DataOutputChartBlock = (props) => {
    const { headerText, tooltipText } = props;
    return(
        <div className="data-output-chart-block">
            <Header as="h2">
                { headerText }
                <Popup
                    trigger={<small>&nbsp;<Icon name='question circle outline' /></small>}
                    content={ tooltipText }
                    basic
                />
            </Header>
            { props.children }
        </div>
    );
}

export default DataOutputChartBlock
