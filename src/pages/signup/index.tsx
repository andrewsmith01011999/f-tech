import GooglIcon from '@/assets/icons/Google.svg';
import AuthFormWrapper from "@/components/authen/form-wrapper";
import AuthPageLayout from "@/components/authen/layout";
import BaseButton from "@/components/core/button";
import { PATHS } from "@/utils/paths";
import { LockOutlined, MailOutlined, UserOutlined,  } from "@ant-design/icons";
import { css } from "@emotion/react";
import { Divider, Form, FormProps, Input } from "antd";
import { FC } from "react";
import { Link } from "react-router-dom";

type FieldType = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
};



const SignUpPage: FC = () => {
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
            <AuthFormWrapper title="SIGN UP">
                <Form
                    initialValues={{}}
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
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input
                            width={100}
                            placeholder="Email"
                            prefix={<MailOutlined />}
                        />
                    </Form.Item>

                    <Form.Item<FieldType>
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password
                            width={100}
                            placeholder="Password"
                            prefix={<LockOutlined />}
                        />
                    </Form.Item>

                    <Form.Item<FieldType>
                        name="confirmPassword"
                        rules={[{ required: true, message: 'Please input your confirm password!' }]}
                    >
                        <Input.Password
                            width={100}
                            placeholder="Confirm Password"
                            prefix={<LockOutlined />}
                        />
                    </Form.Item>

                    <Form.Item>
                        <BaseButton shape="round" type="primary" htmlType="submit" >
                            Create anew account
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
                        <Link to={PATHS.SIGNIN}>
                            Do you already have an account?
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

export default SignUpPage