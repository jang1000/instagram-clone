import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PostEdit.css';

function PostEdit({ posts, onUpdatePost }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: ''
  });

  const post = posts.find(p => p.id === parseInt(id));

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        content: post.content,
        author: post.author
      });
    }
  }, [post]);

  if (!post) {
    return (
      <div className="post-edit">
        <div className="post-edit__not-found">
          <h2>게시글을 찾을 수 없습니다</h2>
          <p>요청하신 게시글이 존재하지 않거나 삭제되었습니다.</p>
          <button onClick={() => navigate('/')} className="post-edit__back-button">
            목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }
    
    if (!formData.content.trim()) {
      alert('내용을 입력해주세요.');
      return;
    }
    
    if (!formData.author.trim()) {
      alert('작성자를 입력해주세요.');
      return;
    }

    onUpdatePost(post.id, formData);
    navigate(`/post/${post.id}`);
  };

  const handleCancel = () => {
    if (window.confirm('수정 중인 내용이 사라집니다. 정말 취소하시겠습니까?')) {
      navigate(`/post/${post.id}`);
    }
  };

  return (
    <div className="post-edit">
      <div className="post-edit__header">
        <h1>게시글 수정</h1>
        <p>게시글을 수정해보세요</p>
      </div>

      <form onSubmit={handleSubmit} className="post-edit__form">
        <div className="post-edit__field">
          <label htmlFor="title" className="post-edit__label">
            제목 *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="제목을 입력해주세요"
            className="post-edit__input post-edit__input--title"
            maxLength={100}
            required
          />
          <div className="post-edit__char-count">
            {formData.title.length}/100
          </div>
        </div>

        <div className="post-edit__field">
          <label htmlFor="author" className="post-edit__label">
            작성자 *
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="작성자명을 입력해주세요"
            className="post-edit__input"
            maxLength={20}
            required
          />
        </div>

        <div className="post-edit__field">
          <label htmlFor="content" className="post-edit__label">
            내용 *
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="내용을 입력해주세요"
            className="post-edit__textarea"
            rows={15}
            maxLength={2000}
            required
          />
          <div className="post-edit__char-count">
            {formData.content.length}/2000
          </div>
        </div>

        <div className="post-edit__actions">
          <button
            type="button"
            onClick={handleCancel}
            className="post-edit__button post-edit__button--cancel"
          >
            취소
          </button>
          <button
            type="submit"
            className="post-edit__button post-edit__button--submit"
          >
            수정하기
          </button>
        </div>
      </form>

      <div className="post-edit__info">
        <h3>수정 정보</h3>
        <div className="post-edit__info-item">
          <span className="post-edit__info-label">원본 작성일:</span>
          <span className="post-edit__info-value">
            {new Date(post.createdAt).toLocaleString('ko-KR')}
          </span>
        </div>
        <div className="post-edit__info-item">
          <span className="post-edit__info-label">조회수:</span>
          <span className="post-edit__info-value">{post.views}회</span>
        </div>
        <div className="post-edit__info-item">
          <span className="post-edit__info-label">좋아요:</span>
          <span className="post-edit__info-value">{post.likes}개</span>
        </div>
        <div className="post-edit__info-item">
          <span className="post-edit__info-label">댓글:</span>
          <span className="post-edit__info-value">{post.comments.length}개</span>
        </div>
      </div>
    </div>
  );
}

export default PostEdit;
