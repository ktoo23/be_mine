import { HttpResponse, StrictResponse, http } from 'msw';
import { faker } from '@faker-js/faker';
import ANIMALS_DATA from '@/animals';

function generateDate() {
  const lastWeek = new Date(Date.now());
  lastWeek.setDate(lastWeek.getDate() - 7);
  return faker.date.between({
    from: lastWeek,
    to: Date.now(),
  });
}

const User = [
  {
    id: '123',
    name: 'john',
    email: 'john@example.com',
    imageUrl: faker.image.avatar(),
  },
  {
    id: '341',
    name: '핑핑이',
    email: 'sponge@bob.com',
    imageUrl: faker.image.avatar(),
  },
];

export const handlers = [
  http.post('/api/login', () => {
    console.log('로그인');
    return HttpResponse.json(User[0], {
      headers: {
        'Set-Cookie': 'connect.sid=msw-cookie;HttpOnly;Path=/',
      },
    });
    // return HttpResponse.text(JSON.stringify('user_exists'), {
    //   status: 401,
    // });
  }),

  http.post('/api/logout', () => {
    console.log('로그아웃');
    return new HttpResponse(null, {
      headers: {
        'Set-Cookie': 'connect.sid=;HttpOnly;Path=/;Max-Age=0',
      },
    });
  }),

  http.post('/api/users', async ({ request }) => {
    console.log('회원가입');
    // return HttpResponse.text(JSON.stringify('user_exists'), {
    //   status: 403,
    // });

    return HttpResponse.text(JSON.stringify('ok'), {
      headers: {
        'Set-Cookie': 'connect.sid=msw-cookie;HttpOnly;Path=/',
      },
    });
  }),

  http.get('/api/animals', async ({ request }) => {
    const url = new URL(request.url);
    const searchValue = url.searchParams.get('search') as string;

    const filteredAnimals = searchValue
      ? ANIMALS_DATA.filter(
          (animal) =>
            animal.name.toLowerCase().includes(searchValue.toLowerCase()) ||
            animal.announcementNo.includes(searchValue),
        )
      : ANIMALS_DATA;

    return HttpResponse.json(filteredAnimals);
  }),

  http.get('/api/fosters/dog', async ({ request }) => {
    const url = new URL(request.url);
    const cursor = parseInt(url.searchParams.get('cursor') as string) || 0;
    return HttpResponse.json([
      {
        id: cursor + 1,
        announcementNo: '2024-01-0291',
        animal: {
          species: 'dog',
          name: '마루',
          gender: '남',
          weight: '12kg',
          currentStatus: '임보가능',
          fosterType: '일반임보',
          rescueStory: `마루쫑쫑 마루 쫑긋 마루 덥썩 쫑쫑쫑쫑쫑`,
        },
        imageUrl: '/images/animals/20240913130110.jpg',
        createdAt: generateDate(),
      },
      {
        id: cursor + 2,
        announcementNo: '2024-01-0291',
        animal: {
          species: 'dog',
          name: '호두',
          gender: '남',
          weight: '23kg',
          currentStatus: '임보가능',
          fosterType: '일반임보',
          rescueStory: `회색 하네스를 차고 있는 상태로 몇 달간 거리를 배회했던 반이에요.
반이가 따라다니던 목격자의 신고를 통해 시보호소로 입소하게 되었고,
오지 않는 가족을 기다리던 반이는 결국 안락사 위기에 처해
행유세가 함께 손을 잡고 나오게 되었습니다.`,
        },
        imageUrl: '/images/animals/20250210180403.jpeg',
        createdAt: generateDate(),
      },
      {
        id: cursor + 3,
        announcementNo: '2024-01-0221',
        animal: {
          species: 'dog',
          name: '풍자',
          gender: '여',
          weight: '2.5kg',
          currentStatus: '임보중',
          fosterType: '일반임보',
          rescueStory: `풍자는 연천 뜬 장에서 방치 된 채 짬밥만 먹으며 관리도 안되던 아이였습니다. 구조 당시 임신상태였고, 구조 후 무사히 출산하였습니다`,
        },
        imageUrl: '/images/animals/20250121122418.jpg',
        createdAt: generateDate(),
      },
      {
        id: cursor + 4,
        announcementNo: '2024-01-0321',
        animal: {
          species: 'dog',
          name: '도리',
          gender: '여',
          weight: '9kg',
          currentStatus: '임보가능',
          fosterType: '단기임보',
          rescueStory: `24년10월 길위의 모견이 낳은 아가에요. 너무 밝게 자라고있어요!\nEBS 세상에나쁜개는없다 설채현선생님과 함께\n구조했어요!`,
        },
        imageUrl: '/images/animals/20241218134136.jpg',
        createdAt: generateDate(),
      },
      {
        id: cursor + 5,
        announcementNo: '2024-01-0019',
        animal: {
          species: 'dog',
          name: '수일',
          gender: '남',
          weight: '2kg',
          currentStatus: '임보중',
          fosterType: '입양전제',
          rescueStory: `수일이는 남양주에서 다리가 절단 된 채로 구조 된 아이입니다. 뒷다리 하나가 절단 된 상태이나 잘 걷고 일상생활에 지장 없습니다.`,
        },
        imageUrl: '/images/animals/20241126001121.jpeg',
        createdAt: generateDate(),
      },
    ]);
  }),

  http.get('/api/fosters/cat', async ({ request }) => {
    const url = new URL(request.url);
    const cursor = parseInt(url.searchParams.get('cursor') as string) || 0;
    return HttpResponse.json([
      {
        id: cursor + 1,
        announcementNo: '2024-01-0291',
        animal: {
          species: 'cat',
          name: '예삐',
          gender: '남',
          weight: '12kg',
          currentStatus: '임보가능',
          fosterType: '일반임보',
          rescueStory: `얼마전부터 밥자리에 중성화 된 상태로
나타남 순둥하고 애교많아 집냥이로 잘 적응할듯해요
힘든 길생활에서 벗어날 수 있게 유심히 봐주세요`,
        },
        imageUrl: '/images/animals/20250306170349.jpg',
        createdAt: generateDate(),
      },
      {
        id: cursor + 2,
        announcementNo: '2024-01-0291',
        animal: {
          species: 'cat',
          name: '콩돌이',
          gender: '남',
          weight: '2kg',
          currentStatus: '임보가능',
          fosterType: '일반임보',
          rescueStory: `중성화 설치한 틀에 콩돌이가 들어가 있었어요
중성화는 아직 어려서 힘들고 그냥 방사놀 하려니 도롯가에 차들이 위험한곳에서 지내는 콩돌이 안쓰러워 아이를 순화시켜 입양 보내려구 해요`,
        },
        imageUrl: '/images/animals/20250306144716.jpg',
        createdAt: generateDate(),
      },
      {
        id: cursor + 3,
        announcementNo: '2024-01-0221',
        animal: {
          species: 'cat',
          name: '회색이',
          gender: '여',
          weight: '2.5kg',
          currentStatus: '임보중',
          fosterType: '일반임보',
          rescueStory: `공원 회색이는 강남구에 있는 한 공원에서 몇년 째 거주 중인 냥이입니다.`,
        },
        imageUrl: '/images/animals/20250303173400.jpg',
        createdAt: generateDate(),
      },
      {
        id: cursor + 4,
        announcementNo: '2024-01-0321',
        animal: {
          species: 'cat',
          name: '강동냥이_치즈',
          gender: '여',
          weight: '5kg',
          currentStatus: '임보가능',
          fosterType: '단기임보',
          rescueStory: `전남 함평 밥자리에 12마리가 유기되어 그 중 크림이와 치즈 두 아이가 강동냥이 품으로 구조 되어 왔습니`,
        },
        imageUrl: '/images/animals/20250303173221.jpg',
        createdAt: generateDate(),
      },
      {
        id: cursor + 5,
        announcementNo: '2024-01-0019',
        animal: {
          species: 'cat',
          name: '뱅이',
          gender: '남',
          weight: '2kg',
          currentStatus: '임보중',
          fosterType: '입양전제',
          rescueStory: `장마가 시작되고 캄캄해진 밤,
도로 중앙선에서 차에 치인 듯 움직이지 못하는 아기 고양이를 발견하여 구조하게 되었습니다.`,
        },
        imageUrl: '/images/animals/20250303172941.jpg',
        createdAt: generateDate(),
      },
    ]);
  }),

  http.get('/api/fosters/dog/:id', async ({ request, params }) => {
    const { id } = params;

    return HttpResponse.json({
      id,
      announcementNo: '2024-01-789',
      Images: [
        { imageUrl: '/images/animals/20250318174416.jpg', imageId: 1 },
        { imageUrl: '/images/animals/add01320250318174416.jpg', imageId: 2 },
        { imageUrl: '/images/animals/add01420250318174416.jpg', imageId: 3 },
      ],
      Animal: {
        id: 2,
        species: 'dog',
        name: '도리',
        gender: '여',
        weight: '9kg',
        neutered: '완료',
        birth: '2024 추정',
        rescueLocation: '대전 서구',
        currentStatus: '임보가능',
        fosterType: '단기임보',
      },
      Detail: {
        rescueStory:
          '2024. 1월 꼬물이시절 너랑이는같이잡혀온 나랑이와. 같이 피부병걸려서. 안락사를 시키겠다고 주무관이 말을했습니다. 피부병은 치료하면 낫을수있는데 치료도 해주지않고 안락사를 시키겠다해서 급히 구조하게 되었고습니다. 그후 피부병깨끗이 나았습니다 사랑이 있는 가정에서 집밥 먹여줄 엄빠. 간절히 찾고 있습니다. 도와주십시요',
        personalityStory:
          '어미없이 보호소에 잡혀와 성장한 아이지만 사람좋아하고 매우 깨발랄한 성격입니다..',
      },
      FosterCondition: {
        region: '전국',
        fosterPeriod: '3개월 이상',
        pickup: '가능',
      },
      Health: {
        vaccinationStatus: '접종 완료',
        testStatus: '음성',
        medicalHistory: '건강함',
      },
      Behavior: {
        toiletTraining: 1,
        walking: 2,
        barking: 2,
        separationAnxiety: 3,
        shedding: 2,
        affection: 4,
        adultFriendly: 4,
        description:
          '현재까지 파악된 정보에요. 다만 보호소에서는 성향을 정확히 파악하기 어렵고, 환경과 보호자에 따라 행동은 바뀔 수 있으니 참고용으로만 봐주세요. 적절한 애정과 훈련이 갖춰진다면 모두 훌륭한 개가 될 수 있습니다.',
      },
      createdAt: new Date(Date.now()),
    });
  }),

  http.get('/api/fosters/cat/:id', async ({ request, params }) => {
    const { id } = params;

    return HttpResponse.json({
      id,
      announcementNo: '2024-01-789',
      Images: [
        { imageUrl: '/images/animals/20250306170349.jpg', imageId: 1 },
        { imageUrl: '/images/animals/add01120250306170349.jpg', imageId: 2 },
      ],
      Animal: {
        id: 2,
        species: 'cat',
        name: '예삐',
        gender: '여',
        weight: '3kg',
        neutered: '완료',
        birth: '2024 추정',
        rescueLocation: '경산 조영동',
        currentStatus: '임보가능',
        fosterType: '단기임보',
      },
      Detail: {
        rescueStory:
          '얼마전부터 밥자리에 중성화 된 상태로 나타남 순둥하고 애교많아 집냥이로 잘 적응할듯해요. 힘든 길생활에서 벗어날 수 있게 유심히 봐주세요',
        personalityStory: '순둥순둥 애교, 쓰담도 너무 좋아해요',
      },
      FosterCondition: {
        region: '경상도',
        fosterPeriod: '6개월 이상',
        pickup: '가능',
      },
      Health: {
        vaccinationStatus: '접종 완료',
        testStatus: '음성',
        medicalHistory: '중성화 완료 특이사항 없음',
      },
      Behavior: {
        toiletTraining: 1,
        walking: 2,
        barking: 2,
        separationAnxiety: 3,
        shedding: 2,
        affection: 4,
        adultFriendly: 4,
        description:
          '현재까지 파악된 정보에요. 다만 보호소에서는 성향을 정확히 파악하기 어렵고, 환경과 보호자에 따라 행동은 바뀔 수 있으니 참고용으로만 봐주세요. 적절한 애정과 훈련이 갖춰진다면 모두 훌륭한 개가 될 수 있습니다.',
      },
      createdAt: new Date(Date.now()),
    });
  }),

  http.get('/api/diaries/cat', async ({ request }) => {
    const url = new URL(request.url);
    const cursor = parseInt(url.searchParams.get('cursor') as string) || 0;
    return HttpResponse.json([
      {
        id: cursor + 1,
        title: '앙꼬랑 산책 중~',
        content:
          '앙꼬는 폭우 쏟아지는 날 어미를 잃은건지 혼자서 차 밑에 웅크리고 있었습니다. 구조자님이 배고플까봐 밥을 챙겨주던 중에 비가 갑자기 많이',
        imageUrl: '/images/animals/20250210154507.jpg',
        createdAt: generateDate(),
      },
      {
        id: cursor + 2,
        title: '안락사 위기였던 햇살이, 이제는 따뜻한 집에서 푹 쉬고 있어요',
        content:
          '안녕하세요. 저는 너무나 순하고 사랑스러운 유기견 햇살이의 새 가족 또는 임시보호자를 찾고 있습니다.',
        imageUrl: '/images/animals/20250210154044.jpg',
        createdAt: generateDate(),
      },
      {
        id: cursor + 3,
        title: '우리 애기 귀엽조?',
        content: '어떻게 이런 생명체를 탄생시길 생각을 하셨을까 진짜',
        imageUrl: '/images/animals/20250301203100.jpg',
        createdAt: generateDate(),
      },
      {
        id: cursor + 4,
        title: '이렇게나 깔꼼해졌어요!',
        content:
          '아파트 단지 아래에서 꼬질꼬질하게 숨어있던 아이가...씻었더니 하얀색이 되어버렸네요',
        imageUrl: '/images/animals/add01320250301203100.jpg',
        createdAt: generateDate(),
      },
      {
        id: cursor + 5,
        title: '탈출만 10번..',
        content:
          '탈출만 10번 했더니 집에서 코콜고 자네요 ㅋㅋㅋㅋ왜 자꾸 나가려구 해 이 마당냥이야?!',
        imageUrl: '/images/animals/20250303111207.jpg',
        createdAt: generateDate(),
      },
    ]);
  }),

  http.get('/api/diaries/dog', async ({ request }) => {
    const url = new URL(request.url);
    const cursor = parseInt(url.searchParams.get('cursor') as string) || 0;
    return HttpResponse.json([
      {
        id: cursor + 1,
        title: '세젤귀 웰시 칸쵸 가족 구해요!',
        content:
          '사람에게 버림 받았음에도 사람의 손길을 좋아하는 순수한 우리 칸쵸. 울 아가를 이쁘게 키울수 있게 할 수 있는 사람을 만났으면 좋겠어.',
        imageUrl: '/images/animals/20250318153247.jpg',
        createdAt: generateDate(),
      },
      {
        id: cursor + 2,
        title: '쫄보 순둥이 레몬이를 소개합니다????',
        content:
          '임보자가 1인가구에 스케줄 근무를 하다보니 레몬이가 혼자있는 시간이 불규칙적이고 길어서 최대한 예측가능한 루틴을 만들어주려고 노력했어요!\n사실 이렇게 육아 난이도 최하의 강아지가 있을까? 싶은 수준! \n다견 가정이라면 오히려 더 좋을 수 도 있겠다라는 생각이 들었어요. \n레몬이가 얼마나 귀여운지 이 세상 사람들이 다 알았으면 좋겠어요!!!!!!!!',
        imageUrl: '/images/animals/add01120250318153247.jpg',
        createdAt: generateDate(),
      },
      {
        id: cursor + 3,
        title: '웃는 모습이 정~말 예쁜 해리',
        content:
          '해리와 같이 산책을 나가면 놀란 표정으로\n강아지가 너무 예쁘게 생겼는데 무슨 견종이냐고 물어보시는 분도 계셨고, 예쁘게 생겼다는 얘기를 정말 많이 들었습니다.',
        imageUrl: '/images/animals/20250318141308.jpg',
        createdAt: generateDate(),
      },
      {
        id: cursor + 4,
        title: '엉덩이가 하트모양인 미니진도 땅이',
        content:
          '엉덩이조차도 하트모양인 사랑둥이 땅이~!\n얼굴은 더더더 예쁘고,\n어디가면 잘생겼다는 소리를 질리도록 듣습니다..',
        imageUrl: '/images/animals/20250318103831.jpg',
        createdAt: generateDate(),
      },
      {
        id: cursor + 5,
        title: '보송한 밍밍이 임보 일기 !!',
        content:
          '물지않고 조용함, 잠을 많이잡니다. 앉아있으면 사람무릎위에 올라옵니다. 무릎에서자는걸 좋아합니다',
        imageUrl: '/images/animals/20250317172441.jpg',
        createdAt: generateDate(),
      },
    ]);
  }),

  http.get('/api/diaries/dog/:id', async ({ request, params }) => {
    const { id } = params;

    return HttpResponse.json({
      id,
      User: User[1],
      Image: { imageUrl: '/images/animals/20240913130110.jpg', imageId: 1 },
      title: '겨울이 임시보호나 가족을 기다리고 있어용!',
      content: JSON.stringify({
        ops: [
          { insert: '7개월 추정 리트리버 믹스 겨울이 임시보호중입니다 ㅋㅋㅋ' },
          {
            insert:
              '\n도로 주변을 헤매고 있어 위험해보여서 일단 집으로 데리고 온지\n 4개월이나 되었네요..!',
          },
          {
            insert: '우리 겨울이 사람과 강아지 모두 다 넘 좋아합니다!!!',
            attributes: { bold: true, italic: true },
          },
          {
            insert:
              '저희 집에ㅜ 이미 노견 두 마리가 있어서 임보가 조금 힘들어요 ㅠ🥲',
          },
        ],
      }),
      createdAt: new Date(Date.now()),
    });
  }),

  http.get('/api/diaries/cat/:id', async ({ request, params }) => {
    const { id } = params;

    return HttpResponse.json({
      id,
      User: User[0],
      Image: { imageUrl: '/images/animals/20240221130603.jpg', imageId: 1 },
      title: '이름만 호동이 몸집은 아기!',
      content: JSON.stringify({
        ops: [
          {
            insert:
              '호동이 길가에 오들오들 떨고 있어서 뒷일 생각안하구 바로 데려왔어요 .. ㅎㅎㅎ',
          },
          {
            insert:
              '\n엄마한테 등짝 스매싱 맞았지만 ㅠㅠ ㅋㅋ 지금 저희 어머니 누구보다 호동이를 아껴주세요🤲🤲',
          },
          {
            insert: '호동이 덕분에 저희 가족 분위기두 너무 너무~~~ 좋아졌어요',
            attributes: { italic: true },
          },
          {
            insert: '아프지 말구 건강해라 호동아 이름처럼 크자! !',
          },
        ],
      }),
      createdAt: new Date(Date.now()),
    });
  }),

  http.post('/api/fosters', async ({ request }) => {
    console.log('임보 게시글 작성');

    const newPost = {
      id: 21,
      announcementNo: '2024-01-0291',
      animal: {
        species: 'dog',
        name: '마루',
        gender: '남',
        weight: '12kg',
        currentStatus: '임보가능',
        fosterType: '일반임보',
        rescueStory: `집 좀 빌려주쇼~~~~`,
      },
      imageUrl: faker.image.urlPicsumPhotos(),
      createdAt: generateDate(),
    };

    return HttpResponse.json(newPost, { status: 201 });
    // return HttpResponse.text(JSON.stringify('게시글 작성 오류'), {
    //   status: 403,
    // });
  }),

  http.post('/api/diaries', async ({ request }) => {
    console.log('임보 일기 작성');

    const newDiary = {
      id: 21,
      announcementNo: '2024-01-0291',
      User: User[1],
      imageUrl: faker.image.urlPicsumPhotos(),
      title: '살구가 보내는 나날',
      content:
        '{"ops":[{"insert":"살구 나의\n예쁜이!!\n"},{"attributes":{"bold":true},"insert":"최초초초초"},{"insert":"\n사랑해 나의 아가..😀\n"}]}',
      createdAt: generateDate(),
    };

    return HttpResponse.json(newDiary, { status: 201 });
    // return HttpResponse.text(JSON.stringify('게시글 작성 오류'), {
    //   status: 403,
    // });
  }),

  http.get('/api/users/:id', ({ request, params }): StrictResponse<any> => {
    const { id } = params;
    const found = User.find((v) => v.id === id);

    if (found) {
      return HttpResponse.json(found);
    }
    return HttpResponse.json(
      { message: 'no_such_user' },
      {
        status: 404,
      },
    );
  }),

  http.get('/api/users/:id/foster', async ({ request }) => {
    const url = new URL(request.url);
    const cursor = parseInt(url.searchParams.get('cursor') as string) || 0;
    return HttpResponse.json([
      {
        id: cursor + 1,
        User: User[0],
        imageUrl: faker.image.urlPicsumPhotos(),
      },
      {
        id: cursor + 2,
        User: User[0],
        imageUrl: faker.image.urlPicsumPhotos(),
      },
      {
        id: cursor + 3,
        User: User[0],
        imageUrl: faker.image.urlPicsumPhotos(),
      },
      {
        id: cursor + 4,
        User: User[0],
        imageUrl: faker.image.urlPicsumPhotos(),
      },
      {
        id: cursor + 5,
        User: User[0],
        imageUrl: faker.image.urlPicsumPhotos(),
      },
      {
        id: cursor + 6,
        User: User[0],
        imageUrl: faker.image.urlPicsumPhotos(),
      },
    ]);
  }),

  http.get('/api/users/:id/diary', async ({ request }) => {
    const url = new URL(request.url);
    const cursor = parseInt(url.searchParams.get('cursor') as string) || 0;
    return HttpResponse.json([
      {
        id: cursor + 1,
        User: User[0],
        imageUrl: faker.image.urlPicsumPhotos(),
      },
    ]);
  }),
];
