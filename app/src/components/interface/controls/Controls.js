import React, { useState } from 'react'
import { Menu, Button, Modal, Header, Icon, Message } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { parseQueryString } from '../../../helper/url';
import querystring from 'querystring';
import config from '../../../config/config';
import bridge from '@vkontakte/vk-bridge';

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

    const handleWallPost = () => {
        setOpen(false);
        bridge.send("VKWebAppShowWallPostBox", {
            "message": config.labels.WALL_SHARE, 
            "attachments": exportUrl, 
            "copyright": exportUrl
        });
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
                <Button color='blue' onClick={ handleWallPost }>
                    <Icon name='vk' /> Сохранить на стене
                </Button>
                <Button color='green' onClick={() => setOpen(false)}>
                    <Icon name='checkmark' /> Закрыть
                </Button>
            </Modal.Actions>
        </Modal>
    )


    return (
        <>
            <Menu fixed="top" color="teal" widths={3}>
                <Menu.Item header>Ипотека vs Вклад</Menu.Item>
                <ExportModal />
                <Menu.Item></Menu.Item>
            </Menu>
        </>
    )
}

export default Controls;