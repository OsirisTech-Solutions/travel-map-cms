import { EyeOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Image, ImageProps } from 'antd'
import { createStyles } from 'antd-style'
import React from 'react'


const useStyles = createStyles(({ token, css }) => {
  return {
    mask: css`
      border-radius: 4px;
    `
  }
})
const ImageItem: React.FC<ImageProps> = ({ ...props }) => {
  const { styles } = useStyles()
  return (
    <Image
      preview={{
        maskClassName: styles.mask,
        mask: <div className='flex flex-col gap-4'>
          <Button className='bg-transparent text-white hover:!bg-transparent' type='dashed' icon={<EyeOutlined />}>Xem trước</Button>
          <Button className='bg-transparent text-white hover:!bg-transparent' type='dashed' icon={<PlusOutlined />}>Chọn</Button>
        </div>,
      }}
      {...props}
    />
  )
}

export default ImageItem