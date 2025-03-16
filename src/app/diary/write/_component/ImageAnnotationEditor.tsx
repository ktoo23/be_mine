import { useCallback, useEffect, useState } from 'react';
import {
  AssetRecordType,
  Editor,
  SVGContainer,
  TLImageShape,
  TLShapeId,
  Tldraw,
  createShapeId,
  track,
  useEditor,
} from 'tldraw';
import { AnnotatorImage } from './types';
import CustomTldrawEditor from './CustomTldrawEditor';
import imageAnnotionEditorStyles from './image-annotator.module.scss';
// TODO:
// - prevent changing pages (create page, change page, move shapes to new page)
// - prevent locked shape context menu
// - inertial scrolling for constrained camera
export function ImageAnnotationEditor({
  image,
  onDone,
}: {
  image: AnnotatorImage;
  onDone(result: Blob): void;
}) {
  const [imageShapeId, setImageShapeId] = useState<TLShapeId | null>(null);
  const [editor, setEditor] = useState(null as Editor | null);

  const padding = 20; // 이미지 주변에 20px 여백 추가

  // 비율 계산 함수
  const calculateAspectRatio = (
    imgWidth: number,
    imgHeight: number,
    containerWidth: number,
    containerHeight: number,
  ) => {
    const containerRatio = containerWidth / containerHeight;
    const imageRatio = imgWidth / imgHeight;
    let width, height;

    if (imageRatio > containerRatio) {
      // 이미지가 컨테이너보다 가로로 더 긴 경우
      // 이미지의 너비를 컨테이너 너비에 맞추고, 높이는 비율에 맞게 계산
      width = containerWidth;
      height = containerWidth / imageRatio;
    } else {
      // 이미지가 컨테이너보다 세로로 더 긴 경우
      // 이미지의 높이를 컨테이너 높이에 맞추고, 너비는 비율에 맞게 계산
      height = containerHeight;
      width = containerHeight * imageRatio;
    }

    return { width, height };
  };

  const { width: adjustedWidth, height: adjustedHeight } = calculateAspectRatio(
    image.width,
    image.height,
    700, // 컨테이너 고정 너비
    600, // 컨테이너 고정 높이
  );

  // 이미지를 컨테이너 중앙에 위치시키기 위한 오프셋 계산
  const offsetX = (700 - adjustedWidth) / 2;
  const offsetY = (600 - adjustedHeight) / 2;

  function onMount(editor: Editor) {
    setEditor(editor);
  }

  useEffect(() => {
    if (!editor) return;

    // Create the asset and image shape
    const assetId = AssetRecordType.createId();
    editor.createAssets([
      {
        id: assetId,
        typeName: 'asset',
        type: 'image',
        meta: {},
        props: {
          w: image.width,
          h: image.height,
          mimeType: image.type,
          src: image.src,
          name: 'image',
          isAnimated: false,
        },
      },
    ]);
    const shapeId = createShapeId();

    // 중앙에 위치한 이미지 셰이프 생성
    editor.createShape<TLImageShape>({
      id: shapeId,
      type: 'image',
      x: offsetX,
      y: offsetY,
      isLocked: true, // 이미지 위치 및 크기 변경 불가
      props: {
        w: adjustedWidth, // 비율에 맞게 조정된 너비
        h: adjustedHeight, // 비율에 맞게 조정된 높이
        assetId,
      },
    });

    // Make sure the shape is at the bottom of the page
    function makeSureShapeIsAtBottom() {
      if (!editor) return;

      const shape = editor.getShape(shapeId);
      if (!shape) return;

      const pageId = editor.getCurrentPageId();

      // The shape should always be the child of the current page
      if (shape.parentId !== pageId) {
        editor.moveShapesToPage([shape], pageId);
      }

      // The shape should always be at the bottom of the page's children
      const siblings = editor.getSortedChildIdsForParent(pageId);
      const currentBottomShape = editor.getShape(siblings[0])!;
      if (currentBottomShape.id !== shapeId) {
        editor.sendToBack([shape]);
      }
    }

    makeSureShapeIsAtBottom();

    const removeOnCreate = editor.sideEffects.registerAfterCreateHandler(
      'shape',
      makeSureShapeIsAtBottom,
    );

    const removeOnChange = editor.sideEffects.registerAfterChangeHandler(
      'shape',
      makeSureShapeIsAtBottom,
    );

    // The shape should always be locked
    const cleanupKeepShapeLocked =
      editor.sideEffects.registerBeforeChangeHandler('shape', (prev, next) => {
        if (next.id !== shapeId) return next;
        if (next.isLocked) return next;
        return { ...prev, isLocked: true };
      });

    // Reset the history
    editor.clearHistory();
    setImageShapeId(shapeId);

    return () => {
      removeOnChange();
      removeOnCreate();
      cleanupKeepShapeLocked();
    };
  }, [image, editor]);

  useEffect(() => {
    if (!editor) return;
    if (!imageShapeId) return;

    /**
     * We don't want the user to be able to scroll away from the image, or zoom it all the way out. This
     * component hooks into camera updates to keep the camera constrained - try uploading a very long,
     * thin image and seeing how the camera behaves.
     */
    // 카메라 설정 최적화
    editor.setCameraOptions({
      constraints: {
        initialZoom: 'fit-max',
        baseZoom: 'default',
        bounds: {
          // 이미지 위치에서 여백만큼 뺀 위치 (더 넓은 범위 설정)
          w: adjustedWidth + padding * 2,
          h: adjustedHeight + padding * 2,
          x: offsetX - padding,
          y: offsetY - padding,
        },
        padding: { x: padding, y: padding },
        origin: { x: 0.5, y: 0.5 },
        behavior: 'contain', // 이미지가 항상 화면에 포함되도록 설정
      },
    });

    // 카메라를 초기 위치로 리셋
    editor.setCamera(editor.getCamera(), { reset: true });

    // 전체 이미지가 보이도록 뷰포트 조정
    editor.zoomToFit();
  }, [editor, imageShapeId, image]);

  return (
    <div
      style={{
        width: '700x',
        height: '600px',
      }}
    >
      <Tldraw
        hideUi
        onMount={onMount}
        components={{
          PageMenu: null,
          // grey-out the area outside of the image
          InFrontOfTheCanvas: useCallback(() => {
            if (!imageShapeId) return null;
            return <ImageBoundsOverlay imageShapeId={imageShapeId} />;
          }, [imageShapeId]),
        }}
      >
        <CustomTldrawEditor
          imageShapeId={imageShapeId as TLShapeId}
          onDone={onDone}
        />
      </Tldraw>
    </div>
  );
}

/**
 * When we export, we'll only include the bounds of the image itself, so show an overlay on top of
 * the canvas to make it clear what will/won't be included. Check `image-annotator.css` for more on
 * how this works.
 */
const ImageBoundsOverlay = track(function ImageBoundsOverlay({
  imageShapeId,
}: {
  imageShapeId: TLShapeId;
}) {
  const editor = useEditor();
  const image = editor.getShape(imageShapeId) as TLImageShape;
  if (!image) return null;

  const imagePageBounds = editor.getShapePageBounds(imageShapeId)!;
  const viewport = editor.getViewportScreenBounds();
  const topLeft = editor.pageToViewport(imagePageBounds);
  const bottomRight = editor.pageToViewport({
    x: imagePageBounds.maxX,
    y: imagePageBounds.maxY,
  });

  const path = [
    // start by tracing around the viewport itself:
    `M ${-10} ${-10}`,
    `L ${viewport.maxX + 10} ${-10}`,
    `L ${viewport.maxX + 10} ${viewport.maxY + 10}`,
    `L ${-10} ${viewport.maxY + 10}`,
    `Z`,

    // then cut out a hole for the image:
    `M ${topLeft.x} ${topLeft.y}`,
    `L ${bottomRight.x} ${topLeft.y}`,
    `L ${bottomRight.x} ${bottomRight.y}`,
    `L ${topLeft.x} ${bottomRight.y}`,
    `Z`,
  ].join(' ');

  return (
    <SVGContainer className={imageAnnotionEditorStyles['image-overlay-screen']}>
      <path d={path} fillRule="evenodd" />
    </SVGContainer>
  );
});
