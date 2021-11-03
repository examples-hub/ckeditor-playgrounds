import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import {
  toWidget,
  toWidgetEditable,
} from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';

import { InsertCardCommand } from './card-cmd';

{
  /*
<card>
    <cardTitle></cardTitle>
    <cardDesc></cardDesc>
</card>
*/
}

/**
 * 在editing部分定义schema，以及model对应的view。
 * 仅定义schema并不会起作用，需要定义converter才能起作用
 */
export class CardEditing extends Plugin {
  static get requires() {
    return [Widget];
  }

  init() {
    console.log('cardEditing#init() got called');

    this._defineSchema();
    this._defineConverters();

    // 注册cmd
    this.editor.commands.add('insertCard', new InsertCardCommand(this.editor));
  }

  _defineSchema() {
    const schema = this.editor.model.schema;

    schema.register('card', {
      // Behaves like a self-contained object (e.g. an image).
      isObject: true,

      // Allow in places where other blocks are allowed (e.g. directly in the root).
      allowWhere: '$block',
    });

    schema.register('cardTitle', {
      // Cannot be split or left by the caret.
      isLimit: true,

      allowIn: 'card',

      // Allow content which is allowed in blocks (i.e. text with attributes).
      allowContentOf: '$block',
    });

    schema.register('cardDesc', {
      // Cannot be split or left by the caret.
      isLimit: true,

      allowIn: 'card',

      // Allow content which is allowed in the root (e.g. paragraphs).
      allowContentOf: '$root',
    });

    // 简单的检查 disallow card inside cardDesc，不能插入
    schema.addChildCheck((context, childDefinition) => {
      if (context.endsWith('cardDesc') && childDefinition.name == 'card') {
        return false;
      }
    });
  }

  _defineConverters() {
    const conversion = this.editor.conversion;

    // <card> converters
    conversion.for('upcast').elementToElement({
      model: 'card',
      view: {
        name: 'section',
        classes: 'simple-box',
      },
    });
    conversion.for('dataDowncast').elementToElement({
      model: 'card',
      view: {
        name: 'section',
        classes: 'simple-box',
      },
    });
    conversion.for('editingDowncast').elementToElement({
      model: 'card',
      view: (modelElement, { writer: viewWriter }) => {
        const section = viewWriter.createContainerElement('section', {
          class: 'simple-box',
        });

        return toWidget(section, viewWriter, { label: 'simple box widget' });
        // return toWidgetEditable(section, viewWriter, { label: 'simple box widget' });
      },
    });

    // <cardTitle> converters
    conversion.for('upcast').elementToElement({
      model: 'cardTitle',
      view: {
        name: 'h1',
        classes: 'simple-box-title',
      },
    });
    conversion.for('dataDowncast').elementToElement({
      model: 'cardTitle',
      view: {
        name: 'h1',
        classes: 'simple-box-title',
      },
    });
    conversion.for('editingDowncast').elementToElement({
      model: 'cardTitle',
      view: (modelElement, { writer: viewWriter }) => {
        // Note: You use a more specialized createEditableElement() method here.
        const h1 = viewWriter.createEditableElement('h1', {
          class: 'simple-box-title',
        });

        // return toWidgetEditable(h1, viewWriter);
        return toWidget(h1, viewWriter);
      },
    });

    // <cardDesc> converters
    conversion.for('upcast').elementToElement({
      model: 'cardDesc',
      view: {
        name: 'div',
        classes: 'simple-box-description',
      },
    });
    conversion.for('dataDowncast').elementToElement({
      model: 'cardDesc',
      view: {
        name: 'div',
        classes: 'simple-box-description',
      },
    });
    conversion.for('editingDowncast').elementToElement({
      model: 'cardDesc',
      view: (modelElement, { writer: viewWriter }) => {
        // Note: You use a more specialized createEditableElement() method here.
        const div = viewWriter.createEditableElement('div', {
          class: 'simple-box-description',
        });

        return toWidgetEditable(div, viewWriter);
      },
    });
  }
}
