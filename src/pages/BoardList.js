import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './BoardList.css';

function BoardList({ posts, onDelete, onView }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('latest');

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case 'latest':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt);
      case 'views':
        return b.views - a.views;
      case 'likes':
        return b.likes - a.likes;
      default:
        return 0;
    }
  });

  const formatDate = (date) => {
    const now = new Date();
    const postDate = new Date(date);
    const diffInHours = (now - postDate) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return '방금 전';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}시간 전`;
    } else if (diffInHours < 168) {
      return `${Math.floor(diffInHours / 24)}일 전`;
    } else {
      return postDate.toLocaleDateString('ko-KR');
    }
  };

  const handleDelete = (id, e) => {
    e.preventDefault();
    if (window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      onDelete(id);
    }
  };

  return (
    <div className="board-list">
      <div className="board-list__header">
        <h1 className="board-list__title">자유 게시판</h1>
        <p className="board-list__subtitle">자유롭게 소통하는 공간입니다</p>
      </div>

      <div className="board-list__controls">
        <div className="board-list__search">
          <input
            type="text"
            placeholder="제목, 내용, 작성자로 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="board-list__searchInput"
          />
          <svg className="board-list__searchIcon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        </div>

        <div className="board-list__sort">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="board-list__sortSelect"
          >
            <option value="latest">최신순</option>
            <option value="oldest">오래된순</option>
            <option value="views">조회수순</option>
            <option value="likes">좋아요순</option>
          </select>
        </div>
      </div>

      <div className="board-list__stats">
        <div className="board-list__stat">
          <span className="board-list__statNumber">{posts.length}</span>
          <span className="board-list__statLabel">전체 게시글</span>
        </div>
        <div className="board-list__stat">
          <span className="board-list__statNumber">{filteredPosts.length}</span>
          <span className="board-list__statLabel">검색 결과</span>
        </div>
      </div>

      <div className="board-list__posts">
        {sortedPosts.length === 0 ? (
          <div className="board-list__empty">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor" className="board-list__emptyIcon">
              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
            </svg>
            <h3>게시글이 없습니다</h3>
            <p>첫 번째 게시글을 작성해보세요!</p>
            <Link to="/write" className="board-list__emptyButton">
              글쓰기
            </Link>
          </div>
        ) : (
          sortedPosts.map(post => (
            <article key={post.id} className="board-list__post">
              <div className="board-list__postHeader">
                <div className="board-list__postInfo">
                  <h2 className="board-list__postTitle">
                    <Link to={`/post/${post.id}`} onClick={() => onView(post.id)}>
                      {post.title}
                    </Link>
                  </h2>
                  <div className="board-list__postMeta">
                    <span className="board-list__postAuthor">{post.author}</span>
                    <span className="board-list__postDate">{formatDate(post.createdAt)}</span>
                  </div>
                </div>
                <div className="board-list__postActions">
                  <Link to={`/edit/${post.id}`} className="board-list__actionButton board-list__actionButton--edit">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                    </svg>
                    수정
                  </Link>
                  <button 
                    onClick={(e) => handleDelete(post.id, e)}
                    className="board-list__actionButton board-list__actionButton--delete"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                    </svg>
                    삭제
                  </button>
                </div>
              </div>
              
              <div className="board-list__postContent">
                <p>{post.content.length > 150 ? `${post.content.substring(0, 150)}...` : post.content}</p>
              </div>
              
              <div className="board-list__postFooter">
                <div className="board-list__postStats">
                  <span className="board-list__stat">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                    </svg>
                    {post.views}
                  </span>
                  <span className="board-list__stat">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                    {post.likes}
                  </span>
                  <span className="board-list__stat">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
                    </svg>
                    {post.comments.length}
                  </span>
                </div>
                <Link to={`/post/${post.id}`} className="board-list__readMore" onClick={() => onView(post.id)}>
                  자세히 보기 →
                </Link>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}

export default BoardList;
