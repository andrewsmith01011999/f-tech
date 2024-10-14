import { theme, ThemeConfig } from "antd";

export const themeConfig: ThemeConfig = {
    token: {
        colorPrimary: '#262d34',
        colorInfo: '#262d34',
        colorBgBase: '#262d34',
        borderRadius: 8,
    },
    components: {
        Input: {
            algorithm: true,
        },
        Menu: {
            algorithm: true,
            itemSelectedBg: '#2C353D',
            itemSelectedColor: '#fff',
            itemPaddingInline: 4
        },
        Card: {
            algorithm: true,
            borderRadius: 16,
        },
    },
    algorithm: theme.darkAlgorithm,
};
