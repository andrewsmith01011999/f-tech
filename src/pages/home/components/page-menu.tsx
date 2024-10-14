import BaseMenu from '@/components/core/menu';
import Icon from '@ant-design/icons';
import { GetProp, MenuProps } from 'antd';
import HomeSvg from '/public/home.svg';
import BookMarkSvg from '/public/android.svg';
import ExploreSvg from '/public/explore.svg';

type MenuItem = GetProp<MenuProps, 'items'>[number];

export const PageMenu = () => {
    const items: MenuItem[] = [
        {
            key: '1',
            icon: <Icon component={() => <img src={HomeSvg} alt="home" />} />,
            label: 'Home',
        },
        {
            key: '2',
            icon: <Icon component={() => <img src={BookMarkSvg} alt="bookmark" />} />,
            label: 'Bookmark',
        },
        {
            key: '3',
            icon: <Icon component={() => <img src={ExploreSvg} alt="explore" />} />,
            label: 'Explore',
        },
    ];

    return (
        <>
            <BaseMenu items={items} />
        </>
    );
};
