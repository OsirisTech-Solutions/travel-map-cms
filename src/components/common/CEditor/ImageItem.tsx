import { EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Image, ImageProps } from 'antd';
import { createStyles } from 'antd-style';
import React from 'react';

const useStyles = createStyles(({ css }) => {
  return {
    mask: css`
      border-radius: 4px;
    `,
  };
});
const ImageItem: React.FC<ImageProps & { chooseImage: (url: string) => void }> = ({
  chooseImage,
  ...props
}) => {
  const { styles } = useStyles();
  const onChooseImage = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    chooseImage(props.src as string);
  };
  return (
    <Image
      preview={{
        maskClassName: styles.mask,
        mask: (
          <div className="flex flex-col gap-4">
            <Button
              className="bg-transparent text-white hover:!bg-transparent"
              type="dashed"
              icon={<EyeOutlined />}
            >
              Xem trước
            </Button>
            <Button
              onClick={onChooseImage}
              className="bg-transparent text-white hover:!bg-transparent"
              type="dashed"
              icon={<PlusOutlined />}
            >
              Chọn
            </Button>
          </div>
        ),
      }}
      {...props}
    />
  );
};

export default ImageItem;
