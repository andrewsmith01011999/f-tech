import { FC } from "react";
import Balance from "./components/balance";
import Transactions from "./components/transaction";
import { Flex } from "antd";
import { BaseCard } from "@/components/core/card";
import { css } from "@emotion/react";

const WalletPage: FC = () => {
    return <BaseCard css={styles}>
        <Flex vertical gap={30}>
            <Balance balance={1000000} />
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