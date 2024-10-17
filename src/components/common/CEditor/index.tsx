import { Editor } from '@tinymce/tinymce-react';
import React, { useRef } from 'react';
import { Editor as TinyMCEEditor } from 'tinymce';
import ImageLibary from './ImageLibary';
import { Spin } from 'antd';
import PreviewHTMl from './PreviewHTMl';

enum CustomEditorAction {
  INSERT_IMAGE = 'insertImage',
  CUSTOM_PREVIEW = 'customPreview',
}
type CEditorProps = {
  id?: string;
  value?: string;
  onChange?: (value: string) => void;
}
export default function CEditor({id, value, onChange}: CEditorProps) {
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isOpenImageLibrary, setIsOpenImageLibrary] = React.useState(false);
  const [isOpenPreview, setIsOpenPreview] = React.useState(false);
  const [richText, setRichText] = React.useState<string>('');

  const onInsertImage = (path: string | undefined) => {
    if (editorRef.current && path) {
      setIsOpenImageLibrary(false)
      editorRef.current.execCommand(
        'mceInsertContent',
        false,
        `<img src="${path}" alt="travel" data-mce-src="${path}" style="width: 100%" />`,
      )
    }
  }

  const onChangeValue = (value: string) => {
    setRichText(value)
    onChange?.(value)
  }

  const onCancelPreview = () => {
    setIsOpenPreview(false)
  }

  return (
    <>
      {
        isLoading && (
          <div className='flex flex-col min-h-52 items-center gap-2'>
            <div className='font-semibold'>Đang tải editor!</div>
            <Spin spinning />
          </div>
        )
      }
      <Editor
      id={id}
        apiKey={'y0v57222nkzitr0bf7zk2nfjvhgikvioaundh182if52aeg6'}
        onInit={(_evt, editor) => {
          editorRef.current = editor;
          setIsLoading(false)
        }}
        initialValue={value}
        value={value}
        onEditorChange={(e) => {
          onChangeValue(e)
        }}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'preview',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'code',
            'help',
            'wordcount',
          ],
          toolbar: [
            {
              name: 'document',
              items: ['undo', 'redo'],
            },
            {
              name: 'styles',
              items: ['styleselect'],
            },
            {
              name: 'formatting',
              items: ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript'],
            },
            {
              name: 'alignment',
              items: ['alignleft', 'aligncenter', 'alignright', 'alignjustify'],
            },
            {
              name: 'insert',
              items: [CustomEditorAction.INSERT_IMAGE, 'media', 'table', 'hr', CustomEditorAction.CUSTOM_PREVIEW],
            },
            {
              name: 'indentation',
              items: ['outdent', 'indent'],
            },
            {
              name: 'blocks',
              items: ['paragraph', 'blockquote', 'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
            },
            {
              name: 'colors',
              items: ['forecolor', 'backcolor'],
            },
            {
              name: 'tools',
              items: ['spellchecker'],
            },
            {
              name: 'lists',
              items: ['bullist', 'numlist'],
            },
            {
              name: 'links',
              items: ['link'],
            },
            {
              name: 'clipboard',
              items: ['cut', 'copy', 'paste', 'pastetext', 'pasteword', 'selectall'],
            },
            {
              name: 'undo',
              items: ['undo', 'redo'],
            },
            {
              name: 'find',
              items: ['find', 'replace'],
            },
            {
              name: 'others',
              items: ['fullscreen', 'code', 'help'],
            },
          ],
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          setup(editor) {
            editor.ui.registry.addButton(CustomEditorAction.CUSTOM_PREVIEW, {
              icon: 'preview',
              tooltip: 'Xem trước',
              onAction: () => {
                setIsOpenPreview(true)
              },
            })

            editor.ui.registry.addButton(CustomEditorAction.INSERT_IMAGE, {
              icon: 'image',
              tooltip: 'Thư viện ảnh',
              onAction: () => {
                editorRef.current?.windowManager.close();
                setIsOpenImageLibrary(true)
              },
            });
          },
        }}
      />
      <ImageLibary isOpen={isOpenImageLibrary} setIsOpen={setIsOpenImageLibrary} insertImage={onInsertImage} />
      <PreviewHTMl richText={richText} open={isOpenPreview} onCancel={onCancelPreview} />
    </>
  );
}
