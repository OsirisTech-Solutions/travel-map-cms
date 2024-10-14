import React from 'react'
import CModal from '../CModal'
import { Image } from 'antd'
import { createStyles } from 'antd-style'

type ImageLibaryProps = {
  insertImage?: (url: string) => void
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}
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
  { id: 11, url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg' }
]
// split to 4 array from imgList each array least 1 element
// @ts-ignore
function splitArrayIntoChunks(array, numChunks) {
  const chunks = Array.from({ length: numChunks }, () => []);
  // @ts-ignore
  array.forEach((item, index) => {
    // @ts-ignore
    chunks[index % numChunks].push(item);
  });
  return chunks;
}
const useStyles = createStyles(({ token }) => {
  return {
    libaryContainer: {
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: token.paddingContentHorizontal,
      display: 'grid',
      height: '600px',
      overflow: 'scroll'
    },
    col: {
      display: 'grid',
      gap: token.paddingContentHorizontal,
    },
    item: {
      maxWidth: '100%',
      height: 'auto',
      borderRadius: token.borderRadiusSM
    }
  }
})
const ImageLibary: React.FC<ImageLibaryProps> = ({ insertImage, isOpen, setIsOpen }) => {
  const { styles } = useStyles()
  const onCancel = () => {
    setIsOpen(false)
  }
  const renderImageList = () => {
    return (
      <div className={styles.libaryContainer}>
        {
          splitArrayIntoChunks(imgList, 4).map((imgs: any, index) => {
            return (<div className={styles.col} key={index}>
              {
                imgs.map((img: any) => {
                  return (
                    <div key={index}>
                      <img
                        className={styles.item}
                        src={img.url}
                      />
                    </div>
                  )
                })
              }
            </div>)
          })
        }
      </div>
    )
  }
  return (
    <CModal title='Thư viện ảnh' width={'100%'} height={800} open={isOpen} onCancel={onCancel}>
      {renderImageList()}
    </CModal>
  )
}

export default ImageLibary