export type Redeem = {
    reward: RedeemDocument[];
};

export type RedeemDocument = {
    rewardId: string;
    name: string;
    image: string;
    price: number;
    type: string;
    status: string;
    sectionList: Section[];
};

export type Section = {
    sectionCodeId: string;
    createdDate: string;
    linkGit: string;
    content: string;
};

export type CreateRedeemPayload = {
    accountId: string;
    rewardId: string;
};
