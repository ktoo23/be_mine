'use client';
import { ChangeEventHandler, FormEventHandler, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { IoPawSharp } from 'react-icons/io5';

import styles from './postForm.module.scss';
import cn from 'classnames';

export const PostForm = () => {
  const imageRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<
    Array<{ dataUrl: string; file: File } | null>
  >([]);

  const onUpload: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    if (e.target.files) {
      if (e.target.files.length > 3) {
        alert('최대 3개의 파일만 선택 가능합니다.');
        return;
      }

      Array.from(e.target.files).forEach((file, index) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview((prevPreview) => {
            const prev = [...prevPreview];
            prev[index] = {
              dataUrl: reader.result as string,
              file,
            };
            return prev;
          });
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const onClickButton = () => {
    imageRef.current?.click();
  };

  const onRemoveImage = (index: number) => () => {
    setPreview((prevPreview) => {
      const prev = [...prevPreview];
      prev[index] = null;
      return prev;
    });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    // formData에서 textarea의 값 가져오기
    const content = formData.get('content') as string;
  };

  return (
    <div className={styles.post}>
      <form onSubmit={onSubmit}>
        <div className={styles['upload-image-wrapper']}>
          <button
            className={styles.uploadButton}
            type="button"
            onClick={onClickButton}
          >
            사진 업로드(3장 이내)
          </button>
          <p className={styles.misc}>*이미지를 클릭하면 삭제됩니다.</p>
          <input
            id="image"
            name="image"
            multiple
            hidden
            ref={imageRef}
            onChange={onUpload}
            className={styles.input}
            type="file"
            accept="image/*"
          />
          <div className={styles['image-box']}>
            {preview.map(
              (v, index) =>
                v && (
                  <div
                    key={index}
                    className={styles['preview-image']}
                    onClick={onRemoveImage(index)}
                  >
                    <img src={v.dataUrl} alt="미리보기" />
                  </div>
                ),
            )}
          </div>
        </div>
        <div className={styles['animal-info']}>
          <div className={styles.inputDiv}>
            <p className={styles.title}>종</p>
            <input
              type="radio"
              id="dog"
              name="species"
              value="강아지"
              defaultChecked
            />
            <label htmlFor="dog">강아지</label>

            <input type="radio" id="cat" name="species" value="고양이" />
            <label htmlFor="cat">고양이</label>
          </div>
          <div className={styles.inputDiv}>
            <label className={styles.inputLabel} htmlFor="current-status">
              현 상황
            </label>
            <select id="current-status" name="currentStatus">
              <option value="임보가능">임보가능</option>
              <option value="임보중">임보중</option>
              <option value="입양완료">입양완료</option>
              <option value="공고종료">공고종료</option>
            </select>
          </div>
          <div className={styles.inputDiv}>
            <label className={styles.inputLabel} htmlFor="foster-type">
              임보 종류
            </label>
            <select id="foster-type" name="fosterType">
              <option value="일반임보">일반임보</option>
              <option value="단기임보">단기임보</option>
              <option value="입양전제">입양전제</option>
              <option value="수유임보">수유임보</option>
              <option value="긴급임보">긴급임보</option>
            </select>
          </div>
          <div className={styles.inputDiv}>
            <label className={styles.inputLabel} htmlFor="animal-name">
              이름
            </label>
            <input
              id="animal-name"
              name="animalName"
              className={styles.input}
              required
            />
          </div>
          <div className={styles.inputDiv}>
            <label className={styles.inputLabel} htmlFor="rescue-location">
              구조 지역
            </label>
            <input
              id="rescue-location"
              name="rescueLocation"
              className={styles.input}
              required
            />
          </div>
          <div className={styles.inputDiv}>
            <p className={styles.title}>성별</p>
            <input
              type="radio"
              id="male"
              name="gender"
              value="남"
              defaultChecked
            />
            <label htmlFor="male">남</label>

            <input type="radio" id="female" name="gender" value="여" />
            <label htmlFor="female">여</label>
          </div>
          <div className={styles.inputDiv}>
            <p className={styles.title}>중성화</p>
            <input
              type="radio"
              id="completed"
              name="neutered"
              value="완료"
              defaultChecked
            />
            <label htmlFor="completed">완료</label>
            <input
              type="radio"
              id="incomplete"
              name="neutered"
              value="미완료"
            />
            <label htmlFor="incomplete">미완료</label>
          </div>
          <div className={styles.inputDiv}>
            <label className={styles.inputLabel} htmlFor="birth">
              출생 시기
            </label>
            <input type="month" id="birth" name="birth" />
          </div>
          <div className={styles.inputDiv}>
            <label className={styles.inputLabel} htmlFor="weight">
              몸무게
            </label>
            <input
              type="number"
              id="weight"
              name="weight"
              className={cn(styles.input, styles.weight)}
              min={1}
              required
            />
            <span>kg</span>
          </div>
        </div>

        <div className={styles['animal-details']}>
          <strong>
            <IoPawSharp className={styles.icon} />
            소개
          </strong>
          <div className={styles.inputDiv}>
            <label className={styles.inputLabel} htmlFor="rescue-story">
              구조 사연
            </label>
            <TextareaAutosize
              id="rescue-story"
              name="rescueStory"
              className={cn(styles.input, styles.text)}
              required
            />
          </div>
          <div className={styles.inputDiv}>
            <label className={styles.inputLabel} htmlFor="personality-traits">
              성격 및 특징
            </label>
            <TextareaAutosize
              id="personality-traits"
              name="personalityTraits"
              className={cn(styles.input, styles.text)}
              required
            />
          </div>
        </div>

        <div className={styles['foster-conditions']}>
          <strong>
            <IoPawSharp className={styles.icon} />
            임보 조건
          </strong>
          <div className={styles.inputDiv}>
            <label className={styles.inputLabel} htmlFor="region">
              지역
            </label>
            <input
              className={styles.input}
              id="region"
              name="region"
              type="text"
              placeholder="서울, 경기"
              required
            />
          </div>
          <div className={styles.inputDiv}>
            <label className={styles.inputLabel} htmlFor="foster-period">
              임보 기간
            </label>
            <input
              className={styles.input}
              id="foster-period"
              name="fosterPeriod"
              type="text"
              placeholder="2개월 이상"
              required
            />
          </div>
          <div className={styles.inputDiv}>
            <label className={styles.inputLabel} htmlFor="pickup">
              픽업
            </label>
            <input
              className={styles.input}
              id="pickup"
              name="pickup"
              type="text"
              placeholder="지원 가능/ 불가능"
              required
            />
          </div>
          <div className={styles.inputDiv}>
            <label
              className={styles.inputLabel}
              htmlFor="additional-conditions"
            >
              기타 조건
            </label>
            <TextareaAutosize
              id="additional-conditions"
              name="additionalConditions"
              className={cn(styles.input, styles.text)}
            />
          </div>
        </div>

        <div className={styles['health-info']}>
          <strong>
            <IoPawSharp className={styles.icon} />
            건강 정보
          </strong>
          <div className={styles.inputDiv}>
            <label className={styles.inputLabel} htmlFor="vaccination-status">
              접종 현황
            </label>
            <input
              className={styles.input}
              id="vaccination-status"
              name="vaccinationStatus"
              type="text"
              required
            />
          </div>
          <div className={styles.inputDiv}>
            <label className={styles.inputLabel} htmlFor="test-status">
              검사 현황
            </label>
            <input
              className={styles.input}
              id="test-status"
              name="testStatus"
              type="text"
              required
            />
          </div>
          <div className={styles.inputDiv}>
            <label className={styles.inputLabel} htmlFor="medical-history">
              병력 사항
            </label>
            <input
              className={styles.input}
              id="medical-history"
              name="medicalHistory"
              type="text"
              required
            />
          </div>
        </div>

        <div className={styles['reference-info']}>
          <strong>
            <IoPawSharp className={styles.icon} />
            참고용 정보
          </strong>
          <div className={styles.inputDiv}>
            <label className={styles.inputLabel}>배변 훈련</label>
            <div className={styles.radioGroup}>
              <span className={styles['level1Text']}>훈련이 필요해요</span>
              <div className={styles.radioWrapper}>
                {[1, 2, 3, 4, 5].map((value) => (
                  <label key={value}>
                    <input
                      type="radio"
                      name="toiletTraining"
                      value={value}
                      required
                    />
                    {value}
                  </label>
                ))}
              </div>
              <span className={styles['level2Text']}>잘 가려요</span>
            </div>
          </div>
          <div className={styles.inputDiv}>
            <label className={styles.inputLabel}>산책</label>
            <div className={styles.radioGroup}>
              <span className={styles['level1Text']}>아직 낯설어요</span>
              <div className={styles.radioWrapper}>
                {[1, 2, 3, 4, 5].map((value) => (
                  <label key={value}>
                    <input type="radio" name="walking" value={value} required />
                    {value}
                  </label>
                ))}
              </div>
              <span className={styles['level2Text']}>잘해요</span>
            </div>
          </div>
          <div className={styles.inputDiv}>
            <label className={styles.inputLabel}>짖음</label>
            <div className={styles.radioGroup}>
              <span className={styles['level1Text']}>없어요</span>
              <div className={styles.radioWrapper}>
                {[1, 2, 3, 4, 5].map((value) => (
                  <label key={value}>
                    <input type="radio" name="barking" value={value} required />
                    {value}
                  </label>
                ))}
              </div>
              <span className={styles['level2Text']}>있어요</span>
            </div>
          </div>
          <div className={styles.inputDiv}>
            <label className={styles.inputLabel}>분리불안</label>
            <div className={styles.radioGroup}>
              <span className={styles['level1Text']}>없어요</span>
              <div className={styles.radioWrapper}>
                {[1, 2, 3, 4, 5].map((value) => (
                  <label key={value}>
                    <input
                      type="radio"
                      name="separationAnxiety"
                      value={value}
                      required
                    />
                    {value}
                  </label>
                ))}
              </div>
              <span className={styles['level2Text']}>있어요</span>
            </div>
          </div>
          <div className={styles.inputDiv}>
            <label className={styles.inputLabel}>털빠짐</label>
            <div className={styles.radioGroup}>
              <span className={styles['level1Text']}>없어요</span>
              <div className={styles.radioWrapper}>
                {[1, 2, 3, 4, 5].map((value) => (
                  <label key={value}>
                    <input
                      type="radio"
                      name="shedding"
                      value={value}
                      required
                    />
                    {value}
                  </label>
                ))}
              </div>
              <span className={styles['level2Text']}>있어요</span>
            </div>
          </div>
          <div className={styles.inputDiv}>
            <label className={styles.inputLabel}>스킨십</label>
            <div className={styles.radioGroup}>
              <span className={styles['level1Text']}>어려워요</span>
              <div className={styles.radioWrapper}>
                {[1, 2, 3, 4, 5].map((value) => (
                  <label key={value}>
                    <input
                      type="radio"
                      name="affection"
                      value={value}
                      required
                    />
                    {value}
                  </label>
                ))}
              </div>
              <span className={styles['level2Text']}>좋아요</span>
            </div>
          </div>
          <div className={styles.inputDiv}>
            <label className={styles.inputLabel}>성인</label>
            <div className={styles.radioGroup}>
              <span className={styles['level1Text']}>무서워요</span>
              <div className={styles.radioWrapper}>
                {[1, 2, 3, 4, 5].map((value) => (
                  <label key={value}>
                    <input type="radio" name="adult" value={value} required />
                    {value}
                  </label>
                ))}
              </div>
              <span className={styles['level2Text']}>좋아요</span>
            </div>
          </div>
        </div>
        <div className={styles['button-wrapper']}>
          <button className={styles.actionButton}>게시하기</button>
        </div>
      </form>
    </div>
  );
};
