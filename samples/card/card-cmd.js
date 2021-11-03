import Command from '@ckeditor/ckeditor5-core/src/command';

export class InsertCardCommand extends Command {
  execute() {
    this.editor.model.change((writer) => {
      // Insert <simpleBox>*</simpleBox> at the current selection position
      // in a way that will result in creating a valid model structure.
      this.editor.model.insertContent(createCard(writer));
    });
  }

  refresh() {
    const model = this.editor.model;
    const selection = model.document.selection;
    const allowedIn = model.schema.findAllowedParent(
      selection.getFirstPosition(),
      'simpleBox',
    );

    this.isEnabled = allowedIn !== null;
  }
}

/** 创建card的vdom结构 */
function createCard(writer) {
  const card = writer.createElement('card');
  const cardTitle = writer.createElement('cardTitle');
  const cardDesc = writer.createElement('cardDesc');

  writer.append(cardTitle, card);
  writer.append(cardDesc, card);

  // There must be at least one paragraph for the description to be editable.
  // See https://github.com/ckeditor/ckeditor5/issues/1464.
  writer.appendElement('paragraph', cardDesc);

  return card;
}
