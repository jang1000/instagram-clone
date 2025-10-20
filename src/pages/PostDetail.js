import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './PostDetail.css';

function PostDetail({ posts, onLike, onAddComment, onView }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [comment, setComment] = useState('');
  const [showComments, setShowComments] = useState(true);

  const post = posts.find(p => p.id === parseInt(id));

  useEffect(() => {
    if (post) {
      onView(post.id);
    }
  }, [post, onView]);

  if (!post) {
    return (
      <div className="post-detail">
        <div className="post-detail__not-found">
          <h2>게시글을 찾을 수 없습니다</h2>
          <p>요청하신 게시글이 존재하지 않거나 삭제되었습니다.</p>
          <Link to="/" className="post-detail__back-button">
            목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      onAddComment(post.id, comment);
      setComment('');
    }
  };

  const handleLike = () => {
    onLike(post.id);
  };

  return (
    <div className="post-detail">
      <div className="post-detail__header">
        <Link to="/" className="post-detail__back">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
          목록으로
        </Link>
        
        <div className="post-detail__actions">
          <Link to={`/edit/${post.id}`} className="post-detail__action post-detail__action--edit">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
            </svg>
            수정
          </Link>
        </div>
      </div>

      <article className="post-detail__content">
        <header className="post-detail__post-header">
          <h1 className="post-detail__title">{post.title}</h1>
          <div className="post-detail__meta">
            <div className="post-detail__author-info">
              <span className="post-detail__author">{post.author}</span>
              <span className="post-detail__date">{formatDate(post.createdAt)}</span>
            </div>
            <div className="post-detail__stats">
              <span className="post-detail__stat">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
                조회 {post.views}
              </span>
              <button 
                onClick={handleLike}
                className="post-detail__like-button"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                좋아요 {post.likes}
              </button>
            </div>
          </div>
        </header>

        <div className="post-detail__body">
          <div className="post-detail__text">
            {post.content.split('\n').map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </div>

        <footer className="post-detail__footer">
          <div className="post-detail__tags">
            <span className="post-detail__tag">자유게시판</span>
            <span className="post-detail__tag">일상</span>
          </div>
        </footer>
      </article>

      <section className="post-detail__comments">
        <div className="post-detail__comments-header">
          <h3>댓글 {post.comments.length}개</h3>
          <button 
            onClick={() => setShowComments(!showComments)}
            className="post-detail__toggle-comments"
          >
            {showComments ? '숨기기' : '보기'}
          </button>
        </div>

        {showComments && (
          <>
            <div className="post-detail__comments-list">
              {post.comments.length === 0 ? (
                <div className="post-detail__no-comments">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
                  </svg>
                  <p>아직 댓글이 없습니다.<br/>첫 번째 댓글을 작성해보세요!</p>
                </div>
              ) : (
                post.comments.map(comment => (
                  <div key={comment.id} className="post-detail__comment">
                    <div className="post-detail__comment-header">
                      <span className="post-detail__comment-author">{comment.author}</span>
                      <span className="post-detail__comment-date">{formatDate(comment.createdAt)}</span>
                    </div>
                    <div className="post-detail__comment-content">
                      {comment.content}
                    </div>
                  </div>
                ))
              )}
            </div>

            <form onSubmit={handleSubmitComment} className="post-detail__comment-form">
              <div className="post-detail__comment-input-wrapper">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="댓글을 작성해주세요..."
                  className="post-detail__comment-input"
                  rows="3"
                />
                <button 
                  type="submit" 
                  disabled={!comment.trim()}
                  className="post-detail__comment-submit"
                >
                  댓글 작성
                </button>
              </div>
            </form>
          </>
        )}
      </section>
    </div>
  );
}

export default PostDetail;
