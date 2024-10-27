import { Breadcrumb, Button, Card } from 'antd';
import React, { FC, useState } from 'react';
import TagXSvg from '/public/tag-x.svg';
import { Link, useNavigate } from 'react-router-dom';
import { RightOutlined } from '@ant-design/icons';

interface FeedbackWrapperProps {
    children: React.ReactNode;
}

const FeedbackWrapper : FC<FeedbackWrapperProps> = ({children}) => {
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
            <Breadcrumb>
                {breadcrumbItems.map(item => (
                    <React.Fragment key={item.path}>
                        <Breadcrumb.Item>{item.breadcrumbName}</Breadcrumb.Item>
                    </React.Fragment>
                ))}
            </Breadcrumb>

            {children}
        </Card>
    );
};

export default FeedbackWrapper;
