import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import React from 'react'

type VisibleProps = {
  value: boolean
  onChange: () => void
}
const Visible: React.FC<VisibleProps> = ({
  value,
  onChange,
}) => {
  const onToggle = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation()
    onChange()
  }
  return (
    <>
      {
        value ?
          <Tooltip title='Ẩn loại địa danh này!'>
            <EyeOutlined onClick={onToggle} />
          </Tooltip>
          :
          <Tooltip title='Hiện loại địa danh này!'>
            <EyeInvisibleOutlined onClick={onToggle} />
          </Tooltip>
      }
    </>
  )
}

export default Visible