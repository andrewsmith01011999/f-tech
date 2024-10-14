import AuthFormWrapper from "@/components/authen/form-wrapper";
import AuthPageLayout from "@/components/authen/layout";
import BaseButton from "@/components/core/button";
import { PATHS } from "@/utils/paths";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { css } from "@emotion/react";
import { Button, Checkbox, Divider, Form, FormProps, Input } from "antd";
import { FC } from "react";
import { Link } from "react-router-dom";
import GooglIcon from '@/assets/icons/Google.svg'

type FieldType = {
    username?: string;
    password?: string;
};



const SignInPage: FC = () => {
    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        var username = values.username;
        var password = values.password;

        // Do something
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return <div css={styles}>
        <AuthPageLayout>
            <AuthFormWrapper title="SIGN IN">
                <Form
                    initialValues={{  }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item<FieldType>
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input
                            width={100}
                            placeholder="Username"
                            prefix={<UserOutlined />}
                        />
                    </Form.Item>

                    <Form.Item<FieldType>
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password
                            width={100}
                            placeholder="Password"
                            prefix={<LockOutlined />} // Add lock icon
                        />
                    </Form.Item>

                    <div className="link-forgot-password">
                        <p>
                            <Link to={PATHS.FORGOT_PASSWORD}>
                                Forgot password?
                            </Link>
                        </p>
                    </div>

                    <Form.Item>
                        <BaseButton shape="round" type="primary" htmlType="submit" >
                            Login
                        </BaseButton>
                    </Form.Item>
                </Form>

                <Divider plain className="divider">
                    <span>
                        Or
                    </span>
                </Divider>

                <BaseButton shape="round" className="btn-google">
                    <img src={GooglIcon}></img>
                    <span>Google</span>
                </BaseButton>

                <div className="link-create-account">
                    <p>
                        <Link to={PATHS.SIGNUP}>
                            Have no acount yet?
                        </Link>
                    </p>
                </div>

                <BaseButton shape="round" className="btn-registration">
                    <span>Registration</span>
                </BaseButton>

            </AuthFormWrapper>
        </AuthPageLayout>
    </div>
}

const styles = css(`
    .link-forgot-password {
        text-align: right;
    }

    .link-create-account {
        text-align: center;
        color: #fff;
    }
    
    .divider span {
        opacity: 50%;
    }
    
    .btn-google,.btn-registration {
        color: #3949AB;
    }
`)

export default SignInPage