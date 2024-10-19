import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
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
const Thumbnail: React.FC<ImageProps & { deleteImage: () => void }> = ({
  deleteImage,
  ...props
}) => {
  const { styles } = useStyles();
  const onDeleteImage = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    deleteImage();
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
              onClick={onDeleteImage}
              className="bg-transparent text-white hover:!bg-transparent"
              type="dashed"
              icon={<DeleteOutlined />}
            >
              Xóa
            </Button>
          </div>
        ),
      }}
      className={'object-contain ' + (props.className || '')}
      {...props}
    />
  );
};

export default Thumbnail;
