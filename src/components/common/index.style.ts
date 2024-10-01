import { createStylish } from 'antd-style';
// common style
export const useStylish = createStylish(({ css }) => {
  return {
    collapse: css`
      .ant-collapse-header {
        font-weight: 600;
      }
    `,
    table: css`
      .ant-table::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }

      .ant-table::-webkit-scrollbar-track {
        border-radius: 999px;
      }
      .ant-table::-webkit-scrollbar-thumb {
        background: #a7a7a7;
        border-radius: 999px;
        visibility: hidden !important;
      }
      .ant-table:hover::-webkit-scrollbar-thumb {
        visibility: visible !important;
      }
    `,
  };
});
