# 자유 게시판 (Free Board)

React를 사용하여 만든 모던한 자유 게시판 애플리케이션입니다.

## 🚀 기능

- **게시글 관리**: 작성, 조회, 수정, 삭제
- **댓글 시스템**: 게시글에 댓글 작성 및 표시
- **검색 기능**: 제목, 내용, 작성자로 검색
- **정렬 기능**: 최신순, 오래된순, 조회수순, 좋아요순
- **반응형 디자인**: 모바일과 데스크톱에서 모두 사용 가능
- **모던한 UI/UX**: 그라데이션과 애니메이션 효과

## 📁 프로젝트 구조

```
freeboard/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   └── Header.css
│   ├── pages/
│   │   ├── BoardList.js
│   │   ├── BoardList.css
│   │   ├── PostDetail.js
│   │   ├── PostDetail.css
│   │   ├── PostWrite.js
│   │   ├── PostWrite.css
│   │   ├── PostEdit.js
│   │   └── PostEdit.css
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## 🛠️ 설치 및 실행

### Node.js 설치
먼저 [Node.js](https://nodejs.org/)를 설치해야 합니다.

### 의존성 설치
```bash
npm install
```

### 개발 서버 실행
```bash
npm start
```

브라우저에서 `http://localhost:3000`으로 접속하여 애플리케이션을 확인할 수 있습니다.

## 🎨 주요 컴포넌트

### Header
- 자유 게시판 로고와 네비게이션
- 글쓰기 버튼

### BoardList
- 게시글 목록 표시
- 검색 및 정렬 기능
- 게시글 통계

### PostDetail
- 게시글 상세보기
- 댓글 시스템
- 좋아요 기능

### PostWrite
- 새 게시글 작성
- 폼 유효성 검사
- 작성 팁 제공

### PostEdit
- 게시글 수정
- 원본 정보 표시

## 📱 반응형 디자인

- 모바일 우선 설계
- 태블릿 및 데스크톱 지원
- 터치 친화적 인터페이스

## 🎯 주요 기능

### 게시글 관리
- ✅ 게시글 작성 (제목, 내용, 작성자)
- ✅ 게시글 조회 (조회수 증가)
- ✅ 게시글 수정
- ✅ 게시글 삭제
- ✅ 게시글 검색
- ✅ 게시글 정렬

### 댓글 시스템
- ✅ 댓글 작성
- ✅ 댓글 표시
- ✅ 댓글 개수 표시

### 사용자 경험
- ✅ 직관적인 네비게이션
- ✅ 부드러운 애니메이션
- ✅ 모던한 디자인
- ✅ 반응형 레이아웃

## 🔧 기술 스택

- **React 18**: 사용자 인터페이스 구축
- **React Router**: 페이지 라우팅
- **CSS3**: 모던한 스타일링
- **JavaScript ES6+**: 모던 JavaScript 기능 활용

## 🎨 디자인 시스템

### 색상 팔레트
- Primary: #3b82f6 (파란색)
- Secondary: #8b5cf6 (보라색)
- Accent: #f59e0b (주황색)
- Success: #10b981 (초록색)
- Error: #ef4444 (빨간색)

### 그라데이션
- Primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%)
- Secondary: linear-gradient(135deg, #f093fb 0%, #f5576c 100%)
- Accent: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)

## 📝 라이선스

이 프로젝트는 교육 목적으로 제작되었습니다.

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
