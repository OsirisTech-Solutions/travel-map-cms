import React from 'react'
import DOMPurify from 'dompurify';
type PreviewHTMlProps = {
  richText: string;
}
const PreviewHTMl:React.FC<PreviewHTMlProps> = ({richText}) => {
  return (
    <div>
      <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(richText)}}></div>
    </div>
  )
}

export default PreviewHTMl