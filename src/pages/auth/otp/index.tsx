import AuthFormWrapper from '@/components/authen/form-wrapper';
import AuthPageLayout from '@/components/authen/layout';
import AuthResultPage from '@/components/authen/result';
import BaseButton from '@/components/core/button';
import { OTP_EXPIRE_TIME } from '@/consts/common';
import { useOtpVerify } from '@/hooks/mutate/auth/use-otp-verify';
import { SuccessfulIcon } from '@/utils/asset';
import { PATHS } from '@/utils/paths';
import { css } from '@emotion/react';
import { Form, FormProps, GetProps, Input } from 'antd';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

type OTPProps = GetProps<typeof Input.OTP>;

type FieldType = {
    otp: string;
};

const OTPVerificationPage: FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const [timeCount, setTimeCount] = useState(OTP_EXPIRE_TIME);

    const { mutate: verifyOtp, isPending: isPendingVerifyOtp } = useOtpVerify();

    const onFinish: FormProps<FieldType>['onFinish'] = async values => {
        console.log('OTP: ', values.otp);
        verifyOtp(
            {
                email: localStorage.getItem('email') as string,
                otp: values.otp,
            },
            {
                onSuccess: () => {
                    navigate(PATHS.SIGNIN);
                },
            },
        );
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = errorInfo => {
        // Do something on failed submit form
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeCount(prev => {
                if (prev === 0) {
                    clearInterval(interval);
                    return 0;
                }

                return prev - 1;

            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div css={styles}>
            <AuthPageLayout>
                <AuthFormWrapper
                    title="OTP Verification"
                    description="Enter the verification code we just sent on your email address."
                >
                    {
                        // expire in 5 minutes format: mm:ss
                        timeCount > 0 && (
                            <p>
                                OTP will expire in {Math.floor(timeCount / 60000)}:
                                {Math.floor((timeCount % 60000) / 1000)
                                    .toString()
                                    .padStart(2, '0')}
                            </p>
                        )
                    }
                    <Form form={form} initialValues={{}} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                        <Form.Item<FieldType> name="otp" rules={[{ required: true, message: 'Please input OTP!' }]}>
                            <Input.OTP
                                autoFocus
                                length={4}
                                variant="filled"
                                size="large"
                                inputMode="numeric"
                                style={{ width: '100%', fontSize: '22px' }}
                            />
                        </Form.Item>

                        <Form.Item>
                            <BaseButton
                                size="large"
                                className="auth-submit-button "
                                shape="round"
                                type="primary"
                                htmlType="submit"
                                loading={isPendingVerifyOtp}
                                disabled={timeCount === 0}
                            >
                                Send code
                            </BaseButton>
                        </Form.Item>
                    </Form>

                    <AuthResultPage
                        icon={SuccessfulIcon}
                        title="SUCCESSFULLY!"
                        description="Your account has been created"
                        btnNavigateTo={PATHS.SIGNIN}
                        btnText="Back to login"
                    />
                </AuthFormWrapper>
            </AuthPageLayout>
        </div>
    );
};

const styles = css(`
    .ant-otp {
        gap: 15px;
        
        .ant-input {
            font-size: 22px;
            font-weight: 700;
            width: calc(100%/4);
            aspect-ratio : 1 / 1
        }
    }
`);

export default OTPVerificationPage;
