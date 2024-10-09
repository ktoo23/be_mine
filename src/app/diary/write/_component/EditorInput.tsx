import dynamic from 'next/dynamic';
import Quill from 'quill';
import { useRef } from 'react';

const Editor = dynamic(() => import('@/app/diary/write/_component/Editor'), {
  ssr: false,
});

type Props = {
  onBlur: (content: string) => void;
};
export const EditorInput = ({ onBlur }: Props) => {
  // innerRef: 부모 컴포넌트에서 Quill 객체에 접근할 수 있도록 하는 참조
  const editorRef = useRef<Quill | null>(null);
  return (
    <div style={{ width: '100%' }}>
      <Editor innerRef={editorRef} onBlur={onBlur} />
    </div>
  );
};
