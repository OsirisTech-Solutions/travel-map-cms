import { Editor } from '@tinymce/tinymce-react';
import React, { useRef } from 'react';
import { Editor as TinyMCEEditor } from 'tinymce';
import ImageLibary from './ImageLibary';

enum CustomEditorAction {
  INSERT_IMAGE = 'insertImage',
  CUSTOM_PREVIEW = 'customPreview',
}
export default function CEditor() {
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const [isOpenImageLibrary, setIsOpenImageLibrary] = React.useState(false);

  const onInsertImage = (data: any) => {
    if (editorRef.current) {
      editorRef.current.execCommand(
        'mceInsertContent',
        false,
        `<img src="${data?.downloadUrl}" alt="${
          data?.metadata?.filename?.split('.')?.[0]
        }" data-mce-src="${data?.downloadUrl}" style="width: 100%" />`,
      )
    }
  }

  return (
    <>
      <Editor
        apiKey={'y0v57222nkzitr0bf7zk2nfjvhgikvioaundh182if52aeg6'}
        onInit={(_evt, editor) => (editorRef.current = editor)}

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
                setIsOpenImageLibrary(true)
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
    </>
  );
}
