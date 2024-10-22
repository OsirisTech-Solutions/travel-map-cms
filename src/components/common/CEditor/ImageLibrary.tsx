import { useGetAllImageQuery, useUploadFileMutation } from '@/redux/services/uploadApi';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { createStyles } from 'antd-style';
import { UploadProps } from 'antd/lib';
import React, { useCallback, useEffect, useRef } from 'react';
import CModal from '../CModal';
import ImageItem from './ImageItem';
import { getPathAsset } from '../Library/utils';

type ImageLibraryProps = {
  insertImage?: (url: string | undefined) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};
const contentImageLibraryId = 'content-image-libary';

const useStyles = createStyles(({ css }) => {
  return {
    libaryContainer: {
      columnCount: 4,
      columnGap: '16px',
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
        margin-top: 16px;
        border-radius: 8px;
      }
    `,
  };
});
type ScrollProps = {
  children?: React.ReactNode;
  onScroll: (offsetHeight: number | undefined) => void;
  heightContainer: number;
};
const Scroll: React.FC<ScrollProps> = ({ children, onScroll, heightContainer }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const realHeight =
      document.getElementById(contentImageLibraryId)?.getBoundingClientRect().height || 0;
    const scrollTop = scrollRef?.current?.scrollTop || 0;
    if (realHeight - scrollTop - 50 <= heightContainer) onScroll(scrollRef?.current?.offsetHeight);
  }, [onScroll]);

  useEffect(() => {
    scrollRef?.current?.addEventListener('scroll', handleScroll);

    return function () {
      scrollRef?.current?.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);
  return (
    <div
      className="overflow-y-scroll"
      ref={scrollRef}
      style={{
        height: heightContainer,
      }}
    >
      {children}
    </div>
  );
};
const ImageLibrary: React.FC<ImageLibraryProps> = ({ insertImage, isOpen, setIsOpen }) => {
  const { styles } = useStyles();
  const [page, setPage] = React.useState(1);
  const { isFetching, data } = useGetAllImageQuery(
    {
      params: {
        limit: 12,
        page,
      },
    },
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    },
  );

  const [libraryData, setLibraryData] = React.useState<{ items: SCHEMA.File[]; total: number }>({
    total: 0,
    items: [],
  });

  const [uploadFileMutation] = useUploadFileMutation();
  const onScroll = useCallback(() => {
    if (data?.data?.items && !isFetching && (data?.data?.total || 0) > libraryData.items.length) {
      setPage(page + 1);
    }
  }, [isFetching, data, libraryData]);
  const onCancel = () => {
    setIsOpen(false);
    setPage(1);
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
        const res = await uploadFileMutation({
          body: {
            file,
          },
        });
        if ('data' in res) {
          setPage(1);

          message.success('Upload ảnh thành công!');
          if (res.data?.data.fileName) insertImage?.(res.data?.data.fileName);
        }
      }
      return false;
    },
  };

  const renderImageList = () => {
    return (
      <div className={styles.libaryContainer}>
        {libraryData?.items?.map((img: any, idx: number) => {
          return (
            <div
              key={idx}
              className={styles.item}
            >
              <ImageItem
                path={img.name}
                className="rounded-lg"
                chooseImage={(url: string) => {
                  insertImage?.(url);
                }}
                src={getPathAsset(img.name)}
              />
            </div>
          );
        })}
      </div>
    );
  };

  useEffect(() => {
    if (data?.data && page !== 1) {
      setLibraryData({
        items: [...libraryData.items, ...data.data.items],
        total: data.data.total,
      });
      return;
    }
    if (data?.data && page === 1) {
      setLibraryData(data.data);
    }
  }, [data]);
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
      <Scroll
        heightContainer={600}
        onScroll={onScroll}
      >
        <div id={contentImageLibraryId}>{renderImageList()}</div>
      </Scroll>
    </CModal>
  );
};

export default ImageLibrary;
