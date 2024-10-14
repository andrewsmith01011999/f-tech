import { Logo } from "@/utils/asset";
import { css } from "@emotion/react";
import { Col, ConfigProvider, Row } from "antd";
import { FC } from "react";
import { ThemeConfig } from "antd";

const AuthPageLayout: FC = (props) => {
    return <Row css={styles}>
        <Col span={24} className="left" md={{ span: 16 }}>
            <Row className="left-inner" align={"middle"} gutter={{ md: 6 }}>
                <Col span={24}>
                    <img className="left-image" src={Logo} />
                </Col>
                <Col className="left-text" span={24}>
                    <h1>
                        WELCOME TO <br /> FIFO COMMUNITY
                    </h1>
                </Col>
            </Row>
        </Col>
        <Col span={24} css={formStyles} md={{ span: 8 }} className="right">
            {props.children}
        </Col>
    </Row>
}

const styles = css(`
    overflow: auto; 

    .left {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh; 
        background-color:#000;
        color: #fff;

        & .left-image {
            display: block;
            border-radius: 50%;
            height: 263px;
            width: 263px;
            margin: 0 auto;
            
        }

        & .left-text {
            text-align: center;

            & > h1 {
                font-weight: 400;
                font-size: 3.2rem;
                line-height: 1.5;
            }
        }
    }

    .right {
        display: flex;
        justify-content: center; 
        align-items: center;     
        height: 100vh;   
        min-height: 500px;
    }


`)


const formStyles = css({
})

export default AuthPageLayout;