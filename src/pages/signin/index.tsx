import AuthFormWrapper from "@/components/authen/form-wrapper";
import AuthPageLayout from "@/components/authen/layout";
import BaseButton from "@/components/core/button";
import { PATHS } from "@/utils/paths";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { css } from "@emotion/react";
import { Button, Checkbox, Divider, Form, FormProps, Input } from "antd";
import { FC } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GooglIcon from '@/assets/icons/Google.svg'
import { useDispatch } from "react-redux";
import { loginAsync } from "@/stores/user.action";
import { useSelector } from 'react-redux';

type FieldType = {
    username?: string;
    password?: string;
};



const SignInPage: FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.global);

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        var username = values.username ?? "";
        var password = values.password ?? "";

        // Do something
        const res = await dispatch(await loginAsync({
            username,
            password
        }))

        if (!!res) {
            navigate(PATHS.HOME)
        }
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        // Do something on failed submit form
    };

    return <div css={styles}>
        <AuthPageLayout>
            <AuthFormWrapper title="SIGN IN">
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
                        <BaseButton shape="round" type="primary" htmlType="submit" loading={loading}>
                            Login
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
                        Have no acount yet?
                    </p>
                </div>

                <BaseButton shape="round" className="btn-registration" disabled={loading}>
                    <Link to={PATHS.SIGNUP}>
                        <span>Registration</span>
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

export default SignInPage