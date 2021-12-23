import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import imageIcon from '@ckeditor/ckeditor5-core/theme/icons/image.svg';
import pilcrowIcon from '@ckeditor/ckeditor5-core/theme/icons/pilcrow.svg';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import CKEditorInspector from '@ckeditor/ckeditor5-inspector';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

import { ImgCustomUploadPlugin } from './custom/custom-img-upload-plugin';

// https://www.baidu.com/img/bd_logo1.png

class InsertImage extends Plugin {
  init() {
    console.log('InsertImagePlugin init ing');

    const editor = this.editor;

    // * 定义一个插入图片的按钮
    editor.ui.componentFactory.add('insertImage', (locale) => {
      const view = new ButtonView(locale);

      view.set({
        // 会作为鼠标提示
        label: '插入图片url',
        icon: pilcrowIcon,
        tooltip: true,
      });

      // Callback executed once the image is clicked.
      view.on('execute', () => {
        const imageUrl = prompt('Image URL');

        // * 修改model，插入图片数据
        editor.model.change((writer) => {
          const imageElement = writer.createElement('imageBlock', {
            src: imageUrl,
            class: 'img-custom',
          });
          writer.appendElement('caption', imageElement);
          writer.appendText('请输入标题或描述', imageElement.getChild(0));

          console.log('insertImage-writer, ', writer.constructor.name);
          console.log('insertImage-writer, ', writer);

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
  language: 'zh-cn',
  // language: 'en',
  plugins: [
    Essentials,
    Paragraph,
    Bold,
    Italic,
    Image,
    ImageStyle,
    ImageCaption,
    ImageResize,
    InsertImage,
    ImageToolbar,
    ImageUpload,
    ImgCustomUploadPlugin,
  ],
  // * 将插入图片的按钮添加到toolbar
  toolbar: ['bold', 'italic', 'insertImage', 'uploadImage'],
  image: {
    styles: ['alignLeft', 'alignCenter', 'alignRight', 'full', 'side'],
    toolbar: [
      // 'imageStyle:center',
      // 'imageStyle:full',
      // 'imageStyle:side',
      'imageStyle:alignLeft',
      'imageStyle:alignCenter',
      'imageStyle:alignRight',
      '|',
      'toggleImageCaption',
    ],
    // 为相应的 scheme 添加 image caption
    caption: ['image'],
  },
})
  .then((editor) => {
    console.log('Editor was initialized', editor);
    window.editor = editor;

    CKEditorInspector.attach({ 'main-editor': editor });
  })
  .catch((error) => {
    console.error(error.stack);
  });
