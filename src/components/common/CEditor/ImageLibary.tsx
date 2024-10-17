import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { createStyles } from 'antd-style';
import { UploadProps } from 'antd/lib';
import React, { useCallback, useEffect, useRef } from 'react';
import CModal from '../CModal';
import ImageItem from './ImageItem';
import { useGetAllImageQuery, useUploadFileMutation } from '@/redux/services/uploadApi';

type ImageLibaryProps = {
  insertImage?: (url: string | undefined) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};
const contentImageLibaryId = 'content-image-libary';
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

const useStyles = createStyles(({ css }) => {
  return {
    libaryContainer: {
      columnCount: 4,
      columnGap: '16px'
    },
    item: css`
    @keyframes fade-in {
      from {
        opacity: 0;
        }
      to {
        opacity: 100;
      }
    } 
    animation: fade-in 3s;  
      break-inside: avoid;
      .ant-image {
        border-radius: 8px;
        margin-top: 16px;
      }
    `,
  };
});
type ScrollProps = {
  children?: React.ReactNode;
  onScroll: (offsetHeight: number | undefined) => void;
  heightContainer: number;
}
const Scroll: React.FC<ScrollProps> = ({ children, onScroll, heightContainer }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    console.log('scroll', scrollRef?.current?.scrollTop, document.getElementById(contentImageLibaryId)?.getBoundingClientRect());
    const realHeight = document.getElementById(contentImageLibaryId)?.getBoundingClientRect().height || 0;
    const scrollTop = scrollRef?.current?.scrollTop || 0;
    if (realHeight - scrollTop - 50 <= heightContainer)
      onScroll(scrollRef?.current?.offsetHeight)
  }, [onScroll])

  useEffect(() => {

    scrollRef?.current?.addEventListener("scroll", handleScroll);

    return function () {
      scrollRef?.current?.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);
  return (
    <div className="overflow-y-scroll" ref={scrollRef} style={{
      height: heightContainer
    }}>
      {children}
    </div>
  )
}
const ImageLibary: React.FC<ImageLibaryProps> = ({ insertImage, isOpen, setIsOpen }) => {
  const { styles } = useStyles();
  const [page, setPage] = React.useState(1);
  const { isFetching, data } = useGetAllImageQuery({
    params: {
      limit: 12,
      page
    }
  })

  const [uploadFileMutation] = useUploadFileMutation()
  const onScroll = useCallback(() => {
    if (data?.data?.items && !isFetching && (data?.data?.total || 0) > (data?.data?.items?.length)) {
      setPage(page + 1);
    }
  }, [isFetching]);
  const onCancel = () => {
    setIsOpen(false);
  };
  const imageList = data?.data?.items || [];

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
        const res = await uploadFileMutation({
          body: {
            file
          }
        })
        if ('data' in res) {
          message.success('Upload ảnh thành công!');
          insertImage?.(res.data?.data.fileName);
        }
      }
      return false;
    },
  };
  const renderImageList = () => {
    return (
      <div className={styles.libaryContainer}>

        {imgList.map((img: any, idx: number) => {
          return (
            <div key={idx} className={styles.item}>
              <ImageItem
                className='rounded-lg'
                chooseImage={(url: string) => {
                  insertImage?.(url);
                }}
                src={img.url}
              />
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
      open={isOpen}
      onCancel={onCancel}
      footer={false}
      centered
    >
      <div className="mb-4">
        <Upload.Dragger
          {...uploadProps}
          height={160}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Tải ảnh lên</p>
          <p className="ant-upload-hint">Click hoặc kéo ảnh vào khu vực</p>
        </Upload.Dragger>
      </div>
      <Scroll heightContainer={600} onScroll={onScroll}>
        <div id={contentImageLibaryId}>
          {renderImageList()}
        </div>
      </Scroll>
    </CModal>
  );
};

export default ImageLibary;
