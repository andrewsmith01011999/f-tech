import { apiSignUp } from '@/apis/user.api';
import GooglIcon from '@/assets/icons/Google.svg';
import AuthFormWrapper from "@/components/authen/form-wrapper";
import AuthPageLayout from "@/components/authen/layout";
import BaseButton from "@/components/core/button";
import { SignUpRequest } from '@/types/user/auth';
import { PATHS } from "@/utils/paths";
import { LockOutlined, MailOutlined, UserOutlined, } from "@ant-design/icons";
import { css } from "@emotion/react";
import { Divider, Form, FormProps, Input, message } from "antd";
import { FC } from "react";
import { useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";

type FieldType = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
};

const SignUpPage: FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { loading } = useSelector(state => state.global);

    // Function to validate password confirmation
    const validateConfirmPassword = (_: any, value: string) => {
        const password = form.getFieldValue('password');

        if (value && value !== password) {
            return Promise.reject(new Error('Passwords do not match!'));
        }
        return Promise.resolve();
    };

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        const req: SignUpRequest = {
            email: values.email,
            username: values.username,
            password: values.password,
            address: "",
            avatar: "",
            bio: "",
            gender: "",
            roleName: "",
            handle: "",
            categoryList: []
        }

        const { success, message: mess } = await apiSignUp(req);
        if (success) {
            message.success("Registration account successfully")
            navigate(PATHS.SIGNIN)
        }
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        // console.log('Failed:', errorInfo);
    };

    return <div css={styles}>
        <AuthPageLayout>
            <AuthFormWrapper title="SIGN UP">
                <Form
                    form={form}
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
                        rules={[
                            { required: true, message: 'Please input email!' },
                            { type: 'email', message: 'Please input a valid email!' },
                        ]}
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
                        rules={[
                            { required: true, message: 'Please input your confirm password!' },
                            {
                                validator: validateConfirmPassword, // Custom validator for password match
                            },
                        ]}
                    >
                        <Input.Password
                            width={100}
                            placeholder="Confirm Password"
                            prefix={<LockOutlined />}
                        />
                    </Form.Item>

                    <Form.Item>
                        <BaseButton shape="round" type="primary" htmlType="submit" loading={loading}>
                            Create a new account
                        </BaseButton>
                    </Form.Item>
                </Form>

                <Divider plain className="divider">
                    <span>
                        Or
                    </span>
                </Divider>

                <BaseButton shape="round" className="btn-google" disabled={loading}>
                    <img src={GooglIcon}></img>
                    <span>Google</span>
                </BaseButton>

                <div className="link-create-account">
                    <p>
                        Do you already have an account?
                    </p>
                </div>

                <BaseButton shape="round" className="btn-registration" disabled={loading}>
                    <Link to={PATHS.SIGNIN}>
                        <span>Signin</span>
                    </Link>
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
        color: #ccc;
    }
    
    .divider span {
        color: #ccc;
    }
    
    .btn-google,.btn-registration {
        color: #3949AB;
    }
`)

export default SignUpPage