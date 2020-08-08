import React, { useState } from 'react'
import { Menu, Button, Modal, Header, Icon, Message } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { parseQueryString } from '../../../helper/url';
import querystring from 'querystring';
import config from '../../../config/config';

const Controls = () => {

    const inputData = useSelector(state => state.calc.inputData);
    const [exportUrl, setExportUrl] = useState("")

    const buildExportUrl = (inputData) => {
        const urlParams = parseQueryString(window.location.search, false)
        const appId = (urlParams && urlParams["vk_app_id"]) || config.VK_APP_ID
        const baseUrl = `https://vk.com/app${appId}#hash/`
        const resultingParams = querystring.stringify(inputData)
        return baseUrl + "?" + resultingParams
    }

    const handleExport = () => {
        setExportUrl(buildExportUrl(inputData))
    }

    const [open, setOpen] = React.useState(false)

    const ExportModal = () => (
        <Modal
            closeIcon
            open={open}
            trigger={
                <Menu.Item
                    name='Экспорт результата'
                    onClick={handleExport}
                    icon='save'
                />
            }
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
        >
            <Header icon='linkify' content="Ссылка на результат" />
            <Modal.Content>
                <Message>
                    <p>{exportUrl}</p>
                </Message>
            </Modal.Content>
            <Modal.Actions>
                <Button color='green' onClick={() => setOpen(false)}>
                    <Icon name='checkmark' /> Закрыть
                </Button>
            </Modal.Actions>
        </Modal>
    )


    return (
        <>
            <Menu fixed="top" color="teal" widths={2}>
                <Menu.Item header>Ипотека vs Вклад</Menu.Item>
                <ExportModal />
            </Menu>
        </>
    )
}

export default Controls;