export { default as QuestionList } from './QuestionList';
export { default as QuestionContent } from './QuestionContent';
export { default as QuestionForm } from './QuestionForm';

export function renderTags(tags) {
    return tags?.map((tag, index) => {
      return (
        <span key={index} className='badge bg-secondary'>
          {tag}
        </span>
      );
    });
  };

export function getComplexityColor(complexity) {
    switch (complexity) {
      case 'Easy':   return 'bg-success';
      case 'Medium': return 'bg-warning';
      case 'Hard':   return 'bg-danger';
      default:       return 'bg-primary';
    }
  };
