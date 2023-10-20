import DOMPurify from 'dompurify';
import './QuestionContent.css';

const QuestionContent = ({ question }) => {
  const { title, description, tags, complexity } = question;

  const sanitizeHTML = (html) => {
    return DOMPurify.sanitize(html);
  };

  const renderTags = (tags) => {
    return tags?.map((tag, index) => {
      return (
        <span key={index} className='badge bg-secondary'>
          {tag}
        </span>
      );
    });
  };

  const getComplexityColor = (complexity) => {
    switch (complexity) {
      case 'Easy':
        return 'bg-success';
      case 'Medium':
        return 'bg-warning';
      case 'Hard':
        return 'bg-danger';
      default:
        return 'bg-primary';
    }
  };

  return (
    <div className='question-content-container'>
      <div className='card-body'>
        <h2 className='card-title'>{title}</h2>
        <div
          className='scrollable-div'
          dangerouslySetInnerHTML={{
            __html: sanitizeHTML(description),
          }}
        />
      </div>
      <div className='card-footer d-flex'>
        <div className='d-flex flex-wrap gap-1'>{renderTags(tags)}</div>
        <div className='ms-auto'>
          <span className={`badge ${getComplexityColor(complexity)}`}>
            {question.complexity}
          </span>
        </div>
      </div>
    </div>
  );
};

export default QuestionContent;
