import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import ImageInsert from '@ckeditor/ckeditor5-image/src/imageinsert';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';
import CKEditorInspector from '@ckeditor/ckeditor5-inspector';
import List from '@ckeditor/ckeditor5-list/src/list';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';

import { Card } from './card/card';

ClassicEditor.create(document.querySelector('#editor'), {
  plugins: [
    Essentials,
    Paragraph,
    Heading,
    List,
    Bold,
    Italic,
    Image,
    ImageStyle,
    ImageCaption,
    ImageResize,
    ImageToolbar,
    ImageUpload,
    Card,
  ],
  toolbar: [
    'heading',
    'bold',
    'italic',
    'numberedList',
    'bulletedList',
    'cardToolbarItem',
  ],
})
  .then((editor) => {
    console.log('Editor was initialized', editor);

    // Expose for playing in the console.
    window.editor = editor;

    CKEditorInspector.attach({ 'main-editor': editor });
  })
  .catch((error) => {
    console.error(error.stack);
  });
