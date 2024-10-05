import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';

export default function CEditor() {
  const editorRef = useRef<any>(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current?.editor);
    }
  };
  return (
    <>
      <Editor
        apiKey={'y0v57222nkzitr0bf7zk2nfjvhgikvioaundh182if52aeg6'}
        onInit={(_evt, editor) => (editorRef.current = editor)}
        initialValue="<p>This is the initial content of the editor.</p>"
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
              name: 'indentation',
              items: ['outdent', 'indent'],
            },
            {
              name: 'insert',
              items: ['image', 'media', 'table', 'hr'],
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
        }}
      />
      <button onClick={log}>Log editor content</button>
    </>
  );
}
