import { Flex, Typography } from 'antd';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import TransactionItem from './transaction-item';
import { css } from '@emotion/react';
import { useRedeemHistory } from '@/hooks/query/redeem/use-redeem-documents';
import { useTransactionsCurrentAccount } from '@/hooks/query/transaction/use-transactions-current-account';
import { useSelector } from 'react-redux';
import { RootState } from '@/stores';

const Transactions: FC = () => {
    const { accountInfo } = useSelector((state: RootState) => state.account);
    const { data } = useTransactionsCurrentAccount();

    return (
        <div css={styles}>
            <Flex justify="space-between" className="transaction-header">
                <p>
                    <Typography.Text
                        style={{
                            fontSize: 20,
                            fontWeight: 500,
                        }}
                    >
                        Last Transaction
                    </Typography.Text>
                </p>
                <p>
                    <Link to={'#'}>
                        <Typography.Text
                            style={{
                                fontSize: 15,
                            }}
                        >
                            View all
                        </Typography.Text>
                    </Link>
                </p>
            </Flex>
            <Flex className="transaction-items" vertical gap={20}>
                            {data?.map((transaction) => (

                                <TransactionItem
                                image={accountInfo?.avatar || ''}
                                amount={transaction?.amount}
                                description={transaction?.type}
                                title="Reward"
                                />
                            ))}
            </Flex>
        </div>
    );
};

const styles = css(`
    .transaction-header {
        margin-bottom: 30px;    
    }
`);
export default Transactions;
