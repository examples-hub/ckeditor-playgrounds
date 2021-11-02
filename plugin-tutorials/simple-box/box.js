import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import SimpleBoxEditing from './box-editing';
import SimpleBoxUI from './box-ui';

export default class SimpleBox extends Plugin {
  static get requires() {
    return [SimpleBoxEditing, SimpleBoxUI];
  }
}
