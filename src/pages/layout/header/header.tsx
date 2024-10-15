import type { FC } from 'react';
import '../index.less';

import { theme as antTheme, Dropdown, Layout } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Logo from '/public/ftech-logo.svg';
import { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';
import BaseInput from '@/components/core/input';
import { PATHS } from '@/utils/paths';

const { Header } = Layout;

interface HeaderProps {
    collapsed: boolean;
    toggle: () => void;
}

const HeaderComponent: FC<HeaderProps> = ({ collapsed, toggle }) => {
    const { logged, device, username } = useSelector(state => state.user);
    const navigate = useNavigate();
    const token = antTheme.useToken();
    const dispatch = useDispatch();

    const onLogout = async () => {
        localStorage.clear();

        navigate(PATHS.SIGNIN);
    };

    const toLogin = () => {
        navigate(PATHS.SIGNIN);
    };

    return (
        <Header className="layout-page-header bg-2" style={{ backgroundColor: token.token.colorBgContainer }}>
            {device !== 'MOBILE' && (
                <div className="logo" style={{ width: collapsed ? 80 : 200 }}>
                    <img src={Logo} alt="logo.svg" style={{ marginRight: collapsed ? '2px' : '20px' }} />
                </div>
            )}

            <div className="layout-page-header-main">
                <div onClick={toggle}>
                    <span id="sidebar-trigger">{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}</span>
                </div>

                <div className="search-container">
                    <BaseInput.Search placeholder='Type here to search...' className='search' />
                </div>

                <div className="actions">
                    {logged ? (
                        <Dropdown
                            menu={{
                                items: [
                                    {
                                        key: '0',
                                        icon: <UserOutlined />,
                                        label: <span>{username}</span>,
                                    },
                                    {
                                        key: '1',
                                        icon: <LogoutOutlined />,
                                        label: <span onClick={onLogout}>Logout</span>,
                                    },
                                ],
                            }}
                        >
                            <span className="user-action">
                                <img src={Logo} className="user-avator" alt="avator" />
                            </span>
                        </Dropdown>
                    ) : (
                        <span style={{ cursor: 'pointer' }} onClick={toLogin}>
                            Login
                        </span>
                    )}
                </div>
            </div>
        </Header>
    );
};

export default HeaderComponent;
