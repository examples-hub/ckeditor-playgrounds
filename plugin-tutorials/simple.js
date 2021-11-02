import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import imageIcon from '@ckeditor/ckeditor5-core/theme/icons/image.svg';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

// https://www.baidu.com/img/bd_logo1.png

class InsertImage extends Plugin {
  init() {
    console.log('InsertImagePlugin init ing');

    const editor = this.editor;

    editor.ui.componentFactory.add('insertImage', (locale) => {
      const view = new ButtonView(locale);

      view.set({
        // 会作为鼠标提示
        label: '插入图片',
        icon: imageIcon,
        tooltip: true,
      });

      // Callback executed once the image is clicked.
      view.on('execute', () => {
        const imageUrl = prompt('Image URL');

        editor.model.change((writer) => {
          const imageElement = writer.createElement('imageBlock', {
            src: imageUrl,
          });

          // Insert the image in the current selection location.
          editor.model.insertContent(
            imageElement,
            editor.model.document.selection,
          );
        });
      });

      return view;
    });
  }
}

ClassicEditor.create(document.querySelector('#editor'), {
  plugins: [
    Essentials,
    Paragraph,
    Bold,
    Italic,
    Image,
    InsertImage,
    ImageCaption,
  ],
  toolbar: ['bold', 'italic', 'insertImage'],
})
  .then((editor) => {
    console.log('Editor was initialized', editor);
  })
  .catch((error) => {
    console.error(error.stack);
  });
