export async function postDiary(formData: FormData): Promise<Response> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/diaries`,
    {
      method: 'post',
      credentials: 'include',
      body: formData,
    },
  );

  // 응답 상태 확인 후 에러 처리
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText); // 에러 발생시키기
  }

  return response;
}
