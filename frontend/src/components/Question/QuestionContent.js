import DOMPurify from 'dompurify';
import { renderTags, getComplexityColor } from'./index';
import Spinner from '../Spinner';
import '../../css/QuestionContent.css';

const QuestionContent = ({ question }) => {
  const { title, description, tags, complexity } = question;

  const sanitizeHTML = (html) => {
    return DOMPurify.sanitize(html);
  };

  return (
    <div className='question-content-container'>
      { question.title ? (
        <>
          <div className='card-body'>
            <h2 className='card-title'>{title}</h2>
            <div
              className='scrollable-div'
              dangerouslySetInnerHTML={{
                __html: sanitizeHTML(description),
              }}
            />
          </div>
          <div className='card-footer'>
            <div className='d-flex justify-content-between'>
              <div className='d-flex flex-wrap gap-1'>{renderTags(tags)}</div>
              <span className={`badge ${getComplexityColor(complexity)}`}>
                {question.complexity}
              </span>
            </div>
          </div>
        </>
        ) : (
          <Spinner className='spinner-border'/>
        )
      }
    </div>
  );
};

export default QuestionContent;
