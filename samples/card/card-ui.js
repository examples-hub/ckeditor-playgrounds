import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

export class CardUI extends Plugin {
  init() {
    console.log('cardUI#init() got called');

    const editor = this.editor;
    const t = editor.t;

    // The "simpleBox" button must be registered among the UI components of the editor
    // to be displayed in the toolbar.
    // * 这里定义了ui的名称
    editor.ui.componentFactory.add('card', (locale) => {
      // The state of the button will be bound to the widget command.
      const command = editor.commands.get('insertCard');

      // The button will be an instance of ButtonView.
      const buttonView = new ButtonView(locale);

      buttonView.set({
        // The t() function helps localize the editor. All strings enclosed in t() can be
        // translated and change when the language of the editor changes.
        label: t('卡片'),
        withText: true,
        tooltip: true,
      });

      // Bind the state of the button to the command.
      buttonView.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');

      // Execute the command when the button is clicked (executed).
      this.listenTo(buttonView, 'execute', () =>
        // * 触发插入行为
        editor.execute('insertCard'),
      );

      return buttonView;
    });
  }
}
