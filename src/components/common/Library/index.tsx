import { Button } from 'antd';
import React from 'react';
import ImageLibary from '../CEditor/ImageLibrary';
import Thumbnail from './Thumbnail';

type LibraryProps = {
  id?: string;
  value?: string;
  onChange?: (value: string | undefined) => void;
};
const Library: React.FC<LibraryProps> = ({ id, value, onChange }) => {
  console.log("🚀 -----------------🚀")
  console.log("🚀 ~ value:", value)
  console.log("🚀 -----------------🚀")
  const [isOpen, setIsOpen] = React.useState(false);
  const [url, setUrl] = React.useState<string | undefined>(value);
  const onOpen = () => {
    setIsOpen(true);
  };
  const handleChange = (url: string | undefined) => {
    setUrl(url);
    onChange?.(url);
    setIsOpen(false);
  };
  return (
    <div id={id}>
      {url || value ? (
        <Thumbnail
          deleteImage={() => handleChange(undefined)}
          width={150}
          height={200}
          src={url || value}
        />
      ) : (
        <Button onClick={onOpen}>Chọn ảnh</Button>
      )}
      <ImageLibary
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        insertImage={handleChange}
      />
    </div>
  );
};

export default Library;
