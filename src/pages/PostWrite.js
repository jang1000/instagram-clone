import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PostWrite.css';

function PostWrite({ onAddPost }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: ''
  });

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

    onAddPost(formData);
    navigate('/');
  };

  const handleCancel = () => {
    if (window.confirm('작성 중인 내용이 사라집니다. 정말 취소하시겠습니까?')) {
      navigate('/');
    }
  };

  return (
    <div className="post-write">
      <div className="post-write__header">
        <h1>새 게시글 작성</h1>
        <p>자유롭게 글을 작성해보세요</p>
      </div>

      <form onSubmit={handleSubmit} className="post-write__form">
        <div className="post-write__field">
          <label htmlFor="title" className="post-write__label">
            제목 *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="제목을 입력해주세요"
            className="post-write__input post-write__input--title"
            maxLength={100}
            required
          />
          <div className="post-write__char-count">
            {formData.title.length}/100
          </div>
        </div>

        <div className="post-write__field">
          <label htmlFor="author" className="post-write__label">
            작성자 *
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="작성자명을 입력해주세요"
            className="post-write__input"
            maxLength={20}
            required
          />
        </div>

        <div className="post-write__field">
          <label htmlFor="content" className="post-write__label">
            내용 *
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="내용을 입력해주세요"
            className="post-write__textarea"
            rows={15}
            maxLength={2000}
            required
          />
          <div className="post-write__char-count">
            {formData.content.length}/2000
          </div>
        </div>

        <div className="post-write__actions">
          <button
            type="button"
            onClick={handleCancel}
            className="post-write__button post-write__button--cancel"
          >
            취소
          </button>
          <button
            type="submit"
            className="post-write__button post-write__button--submit"
          >
            게시하기
          </button>
        </div>
      </form>

      <div className="post-write__tips">
        <h3>작성 팁</h3>
        <ul>
          <li>명확하고 구체적인 제목을 사용해주세요</li>
          <li>내용은 자유롭게 작성하되, 다른 사용자를 배려해주세요</li>
          <li>개인정보나 민감한 정보는 게시하지 마세요</li>
          <li>줄바꿈을 활용하여 가독성을 높여보세요</li>
        </ul>
      </div>
    </div>
  );
}

export default PostWrite;
