import PageBreadcrumbs from '@/components/core/page-breadcrumbs';
import { SecondaryButton } from '@/components/core/secondary-button';
import { UserInfo } from '@/components/user/user-info';
import { packKeys } from '@/consts/factory/pack';
import { useCreatePack } from '@/hooks/mutate/pack/use-create-pack';
import { usePacksListing } from '@/hooks/query/pack/use-packs-listing';
import { useAuthorize } from '@/hooks/use-authorize';
import { useMessage } from '@/hooks/use-message';
import { useUploadFile } from '@/hooks/use-upload-file';
import { RootState } from '@/stores';
import { CreatePackPayload } from '@/types/pack/pack';
import { useQueryClient } from '@tanstack/react-query';
import {
    Card,
    Flex,
    Form,
    Input,
    Modal,
    Divider,
    Button,
    Upload,
    Image,
    UploadFile,
    InputNumber,
    Row,
    Col,
} from 'antd';
import { UploadProps } from 'antd/lib';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import DepositItem from './components/deposit-item';
import GallerySvg from '/public/gallery.svg';

const DepositPage = () => {
    const { accountInfo } = useSelector((state: RootState) => state.account);
    const isAllowCreateNewPack = useAuthorize();
    const [form] = Form.useForm();
    const { imgUrlList, setImgUrlList, uploadFile } = useUploadFile();
    const { success } = useMessage();
    const queryClient = useQueryClient();

    const [isOpenCreate, setIsOpenCreate] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const { data: packs } = usePacksListing();
    const { mutate: createPack, isPending: isPendingCreatePack } = useCreatePack();

    const handleOpenCreate = () => {
        setIsOpenCreate(true);
    };

    const handleCloseCreate = () => {
        setIsOpenCreate(false);
    };

    const onChangeFile: UploadProps['onChange'] = ({ file, fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const onRemoveFile = (file: UploadFile) => {
        const index = fileList.indexOf(file);

        if (index > -1) {
            const newImgUrlList = imgUrlList.slice();

            newImgUrlList.splice(index, 1);

            setImgUrlList(newImgUrlList);
            setFileList(fileList.filter(item => item.uid !== file.uid));
        }
    };

    const handleResetForm = () => {
        form.resetFields();
        setFileList([]);
        setImgUrlList([]);
    };

    const onFinish = (values: CreatePackPayload) => {
        createPack(
            {
                ...values,
                ...(imgUrlList.length && {
                    imgUrl: imgUrlList[0],
                }),
            },
            {
                onSuccess: () => {
                    success('Create pack successfully');
                    queryClient.invalidateQueries({
                        queryKey: packKeys.listing(),
                    });
                    handleResetForm();
                    handleCloseCreate();
                },
            },
        );
    };

    return (
        <>
            <Card>
                <Flex justify="space-between" align="center">
                    <PageBreadcrumbs />

                    {isAllowCreateNewPack && <SecondaryButton onClick={handleOpenCreate}>ADD NEW PACK</SecondaryButton>}
                </Flex>

                <Divider />

                <Row gutter={[16, 16]}>
                    {packs?.map(pack => (
                        <Col key={pack.monkeyCoinPackId} span={12}>
                            <DepositItem pack={pack} />
                        </Col>
                    ))}
                </Row>
            </Card>

            <Modal title="Add New Pack" open={isOpenCreate} width="80vw" onCancel={handleCloseCreate} footer={null}>
                <Flex vertical gap={16}>
                    <UserInfo account={accountInfo!} />
                    <Form form={form} name="create-pack" layout="vertical" onFinish={onFinish}>
                        <Form.Item<CreatePackPayload>
                            label="Price Of Item"
                            name="price"
                            rules={[{ required: true, message: 'Please input the price of item!' }]}
                        >
                            <InputNumber style={{ width: '100%' }} size="large" suffix="VND" />
                        </Form.Item>
                        <Form.Item<CreatePackPayload>
                            label="Points Of Item"
                            name="point"
                            rules={[{ required: true, message: 'Please input the points of item!' }]}
                        >
                            <InputNumber style={{ width: '100%' }} size="large" suffix="MC" />
                        </Form.Item>

                        <Upload listType="picture-card" fileList={fileList} onRemove={onRemoveFile} />
                        {previewImage && (
                            <Image
                                wrapperStyle={{ display: 'none' }}
                                preview={{
                                    visible: previewOpen,
                                    onVisibleChange: visible => setPreviewOpen(visible),
                                    afterOpenChange: visible => !visible && setPreviewImage(''),
                                }}
                                src={previewImage}
                            />
                        )}

                        <Flex justify="space-between" align="center">
                            <Upload
                                accept="image/*"
                                customRequest={uploadFile}
                                onChange={onChangeFile}
                                onRemove={onRemoveFile}
                                showUploadList={false}
                                maxCount={1}
                            >
                                <Button type="text" icon={<img src={GallerySvg} />} />
                            </Upload>

                            <Button type="primary" htmlType="submit" loading={isPendingCreatePack}>
                                Create
                            </Button>
                        </Flex>
                    </Form>
                </Flex>
            </Modal>
        </>
    );
};

export default DepositPage;
