import { Card, Flex, Image, Space, Typography } from 'antd';

const programmingLanguages = [
    'JavaScript',
    'TypeScript',
    'Python',
    'Java',
    'C#',
    'PHP',
    'Ruby',
    'Go',
    'Swift',
    'Kotlin',
    'Rust',
    'Scala',
];

export const PostSummary = () => {
    return (
        <Card>
            <Flex>
                <Image src="https://via.placeholder.com/150" />

                <Flex>
                    <Space direction="vertical">
                        <Typography.Title level={4} style={{ textTransform: 'uppercase' }}>
                            Knowledge sharing
                        </Typography.Title>
                        {/* {
              Array.from({ length: 10 }).map((_, index) => ())
            } */}
                    </Space>
                </Flex>
            </Flex>
        </Card>
    );
};
