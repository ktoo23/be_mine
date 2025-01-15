import React from 'react';
import { StyleProp, useEditor, useUiEvents } from 'tldraw';

export function useStyleChangeCallback() {
  const editor = useEditor();
  const trackEvent = useUiEvents();

  return React.useMemo(
    () =>
      function handleStyleChange<T>(style: StyleProp<T>, value: T) {
        editor.run(() => {
          if (editor.isIn('select')) {
            editor.setStyleForSelectedShapes(style, value);
          }
          editor.setStyleForNextShapes(style, value);
          editor.updateInstanceState({ isChangingStyle: true });
        });

        trackEvent('set-style', {
          source: 'style-panel',
          id: style.id,
          value: value as string,
        });
      },
    [editor, trackEvent],
  );
}
