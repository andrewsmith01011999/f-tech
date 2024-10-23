import { FC, useEffect } from "react";
import Balance from "./components/balance";
import Transactions from "./components/transaction";
import { Flex } from "antd";
import { BaseCard } from "@/components/core/card";
import { css } from "@emotion/react";
import { useSelector } from "react-redux";
import { RootState } from "@/stores";

const WalletPage: FC = () => {
    const { wallet } = useSelector((state: RootState) => state.account)
    
    return <BaseCard css={styles}>
        <Flex vertical gap={30}>
            <Balance balance={wallet?.balance || 0} />
            <div className="transaction">
                <Transactions />
            </div>
        </Flex>
    </BaseCard>
}

const styles = css(`
    overflow: hidden;

    .ant-card-body {
        padding: 0;  
    }

    .transaction {
        padding: 40px;
    }
`)

export default WalletPage;