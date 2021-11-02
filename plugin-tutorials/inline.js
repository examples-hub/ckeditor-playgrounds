import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import CKEditorInspector from '@ckeditor/ckeditor5-inspector';
import List from '@ckeditor/ckeditor5-list/src/list';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';

import Placeholder from './placeholder/placeholder';

ClassicEditor.create(document.querySelector('#editor'), {
  plugins: [Essentials, Paragraph, Heading, List, Bold, Italic, Placeholder],
  toolbar: [
    'heading',
    'bold',
    'italic',
    'numberedList',
    'bulletedList',
    '|',
    'placeholder',
  ],
  placeholderConfig: {
    types: ['date', 'color', 'first name', 'surname'],
  },
})
  .then((editor) => {
    console.log('Editor was initialized', editor);

    CKEditorInspector.attach({ editor: editor });

    // Expose for playing in the console.
    window.editor = editor;
  })
  .catch((error) => {
    console.error(error.stack);
  });
