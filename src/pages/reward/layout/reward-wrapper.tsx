import { SecondaryButton } from '@/components/core/secondary-button';
import SecondaryTag from '@/components/core/secondary-tag';
import Balance from '@/pages/wallet/components/balance';
import { RightOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Card, Divider, Flex, Tag } from 'antd';
import React, { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TagXSvg from '/public/tag-x.svg';

interface RewardWrapperProps {
    children: React.ReactNode;
}

const RewardWrapper: FC<RewardWrapperProps> = ({ children }) => {
    const navigate = useNavigate();

    const [history, setHistory] = useState<string>('');

    const pathSnippets = location.pathname.split('/').filter(i => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;

        return {
            path: url,
            breadcrumbName: (
                <Link to={url} onClick={() => setHistory(location.pathname)}>
                    {url.split('/').splice(-1)?.[0]}
                </Link>
            ),
        };
    });

    const breadcrumbItems = [
        {
            ...(location.pathname.split('/').length > 1 && {
                path: '-1',
                breadcrumbName: (
                    <Button
                        size="small"
                        type="text"
                        icon={<img src={TagXSvg} alt="tag-x" />}
                        onClick={() => {
                            setHistory(location.pathname);
                            navigate(-1);
                        }}
                    />
                ),
            }),
        },
        ...extraBreadcrumbItems,
        {
            ...(location.pathname.length < history.length &&
                history.includes(location.pathname) && {
                    path: '1',
                    breadcrumbName: <RightOutlined onClick={() => navigate(history)} />,
                }),
        },
    ];

    return (
        <Card>
            <Flex justify="space-between" align="center">
                <Breadcrumb>
                    {breadcrumbItems.map(item => (
                        <React.Fragment key={item.path}>
                            <Breadcrumb.Item>{item.breadcrumbName}</Breadcrumb.Item>
                        </React.Fragment>
                    ))}
                </Breadcrumb>

                <SecondaryTag>Balance 1000000</SecondaryTag>
            </Flex>

            <Divider />

            {children}
        </Card>
    );
};

export default RewardWrapper;
