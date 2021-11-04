import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import { CardEditing } from './card-editing';
import { CardUI } from './card-ui';

export class Card extends Plugin {
  static get requires() {
    return [CardEditing, CardUI];
  }
}
