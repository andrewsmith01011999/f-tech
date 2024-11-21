import { TabsProps } from 'antd';
import React from 'react'
import RewardWrapper from '../reward/layout/reward-wrapper';
import { BaseTab } from '@/components/core/tab';
import RewardList from './components/reward-list';

const ExplorePage = () => {
  const items: TabsProps['items'] = [
      {
          key: '1',
          label: 'SOURCE & COURSES',
          children: <RewardList />,
      },
      {
          key: '2',
          label: 'SOURCE & CODE',
          children: <RewardList />,
      },
  ];

  return (
      <RewardWrapper>
          <BaseTab items={items} defaultActiveKey="1" />
      </RewardWrapper>
  );
}

export default ExplorePage