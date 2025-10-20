import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import BoardList from './pages/BoardList';
import PostDetail from './pages/PostDetail';
import PostWrite from './pages/PostWrite';
import PostEdit from './pages/PostEdit';

function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: '자유 게시판에 오신 것을 환영합니다! 🎉',
      content: '이곳은 자유롭게 소통할 수 있는 공간입니다.\n\n다양한 주제로 자유롭게 글을 작성해보세요.\n\n- 일상 이야기\n- 취미 공유\n- 질문과 답변\n- 정보 공유\n\n모든 분들의 참여를 기다립니다!',
      author: '관리자',
      createdAt: new Date('2024-01-15T10:30:00'),
      views: 156,
      likes: 23,
      comments: [
        { id: 1, author: '사용자1', content: '환영합니다! 좋은 공간이 될 것 같아요.', createdAt: new Date('2024-01-15T11:00:00') },
        { id: 2, author: '사용자2', content: '앞으로 자주 이용하겠습니다.', createdAt: new Date('2024-01-15T11:30:00') }
      ]
    },
    {
      id: 2,
      title: 'React 개발 팁 공유 💡',
      content: 'React 개발하면서 유용했던 팁들을 공유해드립니다.\n\n1. useState vs useReducer\n- 간단한 상태: useState\n- 복잡한 상태: useReducer\n\n2. useEffect 의존성 배열\n- 빈 배열 []: 컴포넌트 마운트 시에만 실행\n- 의존성 포함: 해당 값이 변경될 때마다 실행\n\n3. 성능 최적화\n- React.memo() 사용\n- useMemo(), useCallback() 활용\n\n더 많은 팁이 있으시면 댓글로 공유해주세요!',
      author: '개발자',
      createdAt: new Date('2024-01-14T14:20:00'),
      views: 89,
      likes: 15,
      comments: [
        { id: 3, author: '초보자', content: '정말 유용한 정보네요! 감사합니다.', createdAt: new Date('2024-01-14T15:00:00') }
      ]
    },
    {
      id: 3,
      title: '오늘의 일상 - 맛있는 점심 🍱',
      content: '오늘 점심으로 먹은 돈카츠가 정말 맛있었어요!\n\n회사 근처에 새로 생긴 일본식당인데,\n크리스피한 튀김옷과 부드러운 고기가\n완벽한 조화를 이뤘습니다.\n\n가격도 합리적이고 서비스도 좋아서\n다음에 또 가려고 해요.\n\n혹시 이 근처 맛집 아시는 분 있으면\n추천해주세요!',
      author: '일상러',
      createdAt: new Date('2024-01-13T12:45:00'),
      views: 67,
      likes: 8,
      comments: []
    },
    {
      id: 4,
      title: '책 추천 - "클린 코드" 📚',
      content: '로버트 마틴의 "클린 코드"를 읽고 있는데,\n정말 좋은 책이네요!\n\n코드의 가독성과 유지보수성에 대한\n깊은 통찰을 얻을 수 있었습니다.\n\n특히 "함수는 한 가지 일만 해야 한다"는\n원칙이 인상적이었어요.\n\n개발자라면 꼭 읽어봐야 할 책이라고\n생각합니다.\n\n다른 좋은 개발서적 추천도 받습니다!',
      author: '독서광',
      createdAt: new Date('2024-01-12T16:30:00'),
      views: 134,
      likes: 19,
      comments: [
        { id: 4, author: '개발자', content: '저도 이 책 정말 좋아요! 추천합니다.', createdAt: new Date('2024-01-12T17:00:00') },
        { id: 5, author: '책벌레', content: '다음엔 "리팩토링"도 읽어보세요.', createdAt: new Date('2024-01-12T17:30:00') }
      ]
    },
    {
      id: 5,
      title: '여행 계획 세우는 중 ✈️',
      content: '다음 달에 제주도 여행을 계획하고 있어요!\n\n이번엔 혼자 여행을 가려고 하는데,\n혹시 제주도 혼자 여행 경험 있으신 분들\n조언 부탁드려요.\n\n- 추천 숙소\n- 꼭 가봐야 할 곳\n- 맛집 추천\n- 교통편\n\n3박 4일 정도로 계획하고 있는데,\n어떤 코스가 좋을까요?',
      author: '여행자',
      createdAt: new Date('2024-01-11T09:15:00'),
      views: 203,
      likes: 27,
      comments: [
        { id: 6, author: '제주러버', content: '한라산 등반 추천해요!', createdAt: new Date('2024-01-11T10:00:00') },
        { id: 7, author: '맛집탐방러', content: '흑돼지 맛집들 꼭 가보세요.', createdAt: new Date('2024-01-11T10:30:00') }
      ]
    }
  ]);

  const addPost = (newPost) => {
    const post = {
      ...newPost,
      id: Math.max(...posts.map(p => p.id)) + 1,
      createdAt: new Date(),
      views: 0,
      likes: 0,
      comments: []
    };
    setPosts([post, ...posts]);
  };

  const updatePost = (id, updatedPost) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, ...updatedPost } : post
    ));
  };

  const deletePost = (id) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  const addComment = (postId, comment) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            comments: [...post.comments, { 
              id: Date.now(), 
              author: '익명', 
              content: comment,
              createdAt: new Date()
            }]
          }
        : post
    ));
  };

  const likePost = (id) => {
    setPosts(posts.map(post => 
      post.id === id 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  const viewPost = (id) => {
    setPosts(posts.map(post => 
      post.id === id 
        ? { ...post, views: post.views + 1 }
        : post
    ));
  };

  return (
    <Router>
      <div className="app">
        <Header />
        <main className="app__main">
          <Routes>
            <Route 
              path="/" 
              element={
                <BoardList 
                  posts={posts} 
                  onDelete={deletePost}
                  onView={viewPost}
                />
              } 
            />
            <Route 
              path="/post/:id" 
              element={
                <PostDetail 
                  posts={posts}
                  onLike={likePost}
                  onAddComment={addComment}
                  onView={viewPost}
                />
              } 
            />
            <Route 
              path="/write" 
              element={<PostWrite onAddPost={addPost} />} 
            />
            <Route 
              path="/edit/:id" 
              element={
                <PostEdit 
                  posts={posts}
                  onUpdatePost={updatePost}
                />
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
