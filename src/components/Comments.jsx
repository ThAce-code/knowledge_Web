import React from 'react';
import './Comments.css';

const Comments = () => {
  const comments = [
    {
      id: 1,
      author: '李工程师',
      avatar: '李',
      time: '2小时前',
      content: '这篇嵌入式系统指南写得非常详细！作为一名硬件工程师，我特别赞赏关于实时性和资源限制的讲解。对新手来说很有帮助。'
    },
    {
      id: 2,
      author: '张开发者',
      avatar: '张',
      time: '5小时前',
      content: '很实用的文章！我正在学习STM32开发，这里提到的嵌入式系统特点让我对整个领域有了更清晰的认识。期待更多相关内容！'
    }
  ];

  return (
    <section className="comments-section">
      <h3 className="comments-title">评论</h3>
      
      <div className="comments-list">
        {comments.map(comment => (
          <div key={comment.id} className="comment-card">
            <div className="comment-header">
              <div className="comment-avatar">{comment.avatar}</div>
              <div className="comment-info">
                <div className="comment-author">{comment.author}</div>
                <div className="comment-time">{comment.time}</div>
              </div>
            </div>
            <div className="comment-content">
              {comment.content}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Comments;