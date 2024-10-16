import { splitArray } from '@/utils/utils';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { createStyles } from 'antd-style';
import { UploadProps } from 'antd/lib';
import React from 'react';
import CModal from '../CModal';
import ImageItem from './ImageItem';

type ImageLibaryProps = {
  insertImage?: (url: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};
const imgList = [
  { id: 0, url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg' },
  { id: 1, url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg' },
  { id: 2, url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg' },
  { id: 3, url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg' },
  { id: 4, url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg' },
  { id: 5, url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg' },
  { id: 6, url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg' },
  { id: 7, url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg' },
  { id: 8, url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg' },
  { id: 9, url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg' },
  { id: 10, url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg' },
  { id: 11, url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg' },
];

const useStyles = createStyles(({ token }) => {
  return {
    libaryContainer: {
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: token.paddingContentHorizontal,
      display: 'grid',
    },
    col: {
      display: 'flex',
      flexDirection: 'column',
      gap: token.paddingContentHorizontal,
    },
    item: {
      maxWidth: '100%',
      height: 'auto',
      borderRadius: token.borderRadiusSM,
    },
  };
});
const ImageLibary: React.FC<ImageLibaryProps> = ({ insertImage, isOpen, setIsOpen }) => {
  const { styles } = useStyles();
  const onCancel = () => {
    setIsOpen(false);
  };
  const uploadProps: UploadProps = {
    name: 'file',
    multiple: false,
    showUploadList: false,
    beforeUpload: async (file: any) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('Vui lòng upload ảnh theo định dạng JPG/PNG!');
      }
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        message.error('Dung lượng ảnh không vượt quá 10MB!');
      }
      if (isJpgOrPng && isLt10M) {
        // upload
      }
      return false;
    },
  };
  const renderImageList = () => {
    return (
      <div className={styles.libaryContainer}>
        {splitArray(imgList, 4).map((imgs: any, index) => {
          return (
            <div
              className={styles.col}
              key={index}
            >
              {imgs.map((img: any) => {
                return (
                  <div key={index}>
                    <ImageItem
                      chooseImage={(url: string) => {
                        insertImage?.(url);
                      }}
                      className={styles.item}
                      src={img.url}
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };
  return (
    <CModal
      title="Thư viện ảnh"
      width={'100%'}
      height={800}
      open={isOpen}
      onCancel={onCancel}
      footer={false}
      centered
    >
      <div className="h-[700px] overflow-y-scroll">
        <div className="mb-4">
          <Upload.Dragger
            {...uploadProps}
            height={200}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Tải ảnh lên</p>
            <p className="ant-upload-hint">Click hoặc kéo ảnh vào khu vực</p>
          </Upload.Dragger>
        </div>
        {renderImageList()}
      </div>
    </CModal>
  );
};

export default ImageLibary;
