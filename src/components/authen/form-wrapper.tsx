import { css } from "@emotion/react";
import { Col, Row } from "antd";
import { FC, ReactNode } from "react";

interface AuthFormWrapperProps {
    title: string;
}

const AuthFormWrapper: FC<AuthFormWrapperProps> = ({ title, children }) => {
    return <Row justify="center" align="middle" css={styles}>
        <Col className="title" span={24}>
            <h1>{title}</h1>
        </Col>
        <Col className="form" span={24}>
            {children}
        </Col>
    </Row>
}

const styles = css(`
    .title {
        text-align: center;
        margin-bottom: 50px;
    }

    .form {
        width: 100%;

        button {
            width: 100%;
        }
    }
`)

export default AuthFormWrapper;