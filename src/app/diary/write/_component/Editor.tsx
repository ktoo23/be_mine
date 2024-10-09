'use client';
import Quill, { type QuillOptions } from 'quill';
import { Delta, Op } from 'quill/core';
import {
  MutableRefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import 'quill/dist/quill.snow.css';

import styles from './editor.module.scss';
import { EmojiPopover } from './EmojiPopover';

type EditorValue = {
  body: string;
};

interface EditorProps {
  placeholder?: string;
  defaultValue?: Delta | Op[];
  innerRef?: MutableRefObject<Quill | null>;
  onBlur: (content: string) => void;
}
// JSON.stringify(quillRef.current?.getContents()) 25:39
const Editor = ({
  placeholder = '오늘 일기를 작성해주세요!',
  defaultValue = [],
  innerRef,
  onBlur,
}: EditorProps) => {
  const [text, setText] = useState('');

  const placeholderRef = useRef(placeholder);
  // Quill 에디터 객체를 참조하기 위한 ref
  const quillRef = useRef<Quill | null>(null);
  const defaultValueRef = useRef(defaultValue);
  // editor가 렌더링될 div 요소 참조
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    placeholderRef.current = placeholder;
    defaultValueRef.current = defaultValue;
  });

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const editorContainer = container.appendChild(
      container.ownerDocument.createElement('div'),
    );

    const options: QuillOptions = {
      theme: 'snow',
      placeholder: placeholderRef.current,
    };

    const quill = new Quill(editorContainer, options);
    quillRef.current = quill;
    //quillRef.current.focus()

    if (innerRef) {
      innerRef.current = quill;
    }

    quill.setContents(defaultValueRef.current);
    setText(quill.getText());

    // 사용자가 포커스를 잃을 때 이벤트가 작동되어 작성한 내용을 부모로 전달
    quill.on(Quill.events.SELECTION_CHANGE, (range) => {
      setText(quill.getText());
      if (!range) {
        onBlur(JSON.stringify(quill.getContents()));
      }
    });

    return () => {
      quill.off(Quill.events.SELECTION_CHANGE);
      if (container) {
        container.innerHTML = '';
      }
      if (quillRef.current) {
        quillRef.current = null;
      }
      if (innerRef) {
        innerRef.current = null;
      }
    };
  }, [innerRef]);

  const isEmpty = text.replace(/<(.|\n)*?>/g, '').trim().length === 0;

  const onEmojiSelect = (emoji: any) => {
    const quill = quillRef.current;
    quill?.insertText(quill?.getSelection()?.index || 0, emoji.native);
  };
  // TODO: 버튼 hover시 hint 알려줌

  // console.log({ isEmpty, text });
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div ref={containerRef} className={styles.editor} />
        <div className={styles['icon-wrapper']}>
          <EmojiPopover onEmojiSelect={onEmojiSelect} />
        </div>
      </div>
    </div>
  );
};

export default Editor;
