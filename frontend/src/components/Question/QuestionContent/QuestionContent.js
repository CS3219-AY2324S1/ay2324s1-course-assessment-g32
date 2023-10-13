import './QuestionContent.css';

const QuestionContent = ({ title, description, tags, complexity }) => {
  const renderTags = () => {
    return tags?.map((tag, index) => {
      return (
        <span key={index} className="badge bg-secondary">
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
    <div>
      <div className="card-body">
        <h1 className="card-title">{title}</h1>
        <div
          className="scrollable-div"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
      <div className="card-footer d-flex">
        <div className="d-flex flex-wrap gap-1">{renderTags()}</div>
        <div className="ms-auto">
          <span className={`badge ${getComplexityColor(complexity)}`}>
            {complexity}
          </span>
        </div>
      </div>
    </div>
  );
};

export default QuestionContent;
