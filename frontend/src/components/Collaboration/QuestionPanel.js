import React, { useState, useEffect } from 'react';
import Spinner from '../Spinner';
import { getQuestionsByCriteria, getQuestionDetails } from '../../api/QuestionApi';
import { errorHandler } from '../../utils/errors';
import { getCookie } from '../../utils/helpers';
import { Complexity, Topics } from '../../constants';
import '../../css/QuestionPanel.css';

const QuestionPanel = ({ isOpen, onClose, onChangeQuestion, complexity }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isTopicExpanded, setIsTopicExpanded] = useState(false);
  const [selectedComplexity, setSelectedComplexity] = useState(complexity);
  const [selectedTopics, setSelectedTopics] = useState([Topics.ALL]);
  const [questions, setQuestions] = useState([]);

  const firstFiveTopics = Object.values(Topics).slice(0, 5);
  const topics = isTopicExpanded ? Object.values(Topics) : firstFiveTopics;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const questions = await getQuestionsByCriteria(
          selectedComplexity,
          selectedTopics,
          getCookie()
        );
        setQuestions(questions);
        setIsLoading(false);
      } catch (error) {
        errorHandler(error);
      }
    };

    fetchData();
  }, [selectedComplexity, selectedTopics]);

  const handleOverlayClick = () => {
    onClose();
  };

  const handleRowClick = async (id) => {
    const question = await getQuestionDetails(id, getCookie());
    onChangeQuestion(question);
    onClose();
  };

  const handleComplexityClick = (complexity) => {
    setSelectedComplexity(complexity);
  };

  const handleTopicClick = (topic) => {
    // If the topic is 'All', reset the selected topics
    if (topic === Topics.ALL) {
      setSelectedTopics([Topics.ALL]);
    } else if (selectedTopics.includes(topic)) {
      // If the topic is already selected, remove it
      // Add 'All' to the selected topics if there are no other topics selected
      const updatedTopics = selectedTopics.filter((t) => t !== topic);
      setSelectedTopics(updatedTopics.length === 0 ? [Topics.ALL] : updatedTopics);
    } else {
      // If the topic is not selected, add it
      // Remove 'All' from the selected topics
      setSelectedTopics([...selectedTopics.filter((t) => t !== Topics.ALL), topic]);
    }
  };

  const toggleExpandTopics = () => {
    setIsTopicExpanded(!isTopicExpanded);
  };

  const RenderTags = (tags) => {
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

  const complexityButtons = Object.values(Complexity).map(
    (complexity, index) => (
      <button
        key={index}
        className={`badge ${selectedComplexity === complexity ? 'bg-primary' : 'bg-secondary'}`}
        onClick={() => handleComplexityClick(complexity)}
      >
        {complexity}
      </button>
    )
  );

  const topicButtons = topics.map((topic, index) => (
    <button
      key={index}
      className={`badge ${selectedTopics.includes(topic) ? 'bg-primary' : 'bg-secondary'}`}
      onClick={() => handleTopicClick(topic)}
    >
      {topic}
    </button>
  ));

  const questionList = questions.map((question, index) => (
    <tr key={question._id} onClick={() => handleRowClick(question._id)}>
      <td>
        <div>
          <div className='d-flex justify-content-between'>
            <div style={{ wordWrap: 'break-word' }}>{question.title}</div>
            <span
              className={`badge ${getComplexityColor(question?.complexity)}`}
            >
              {question.complexity}
            </span>
          </div>
          <div>{RenderTags(question.tags)}</div>
        </div>
      </td>
    </tr>
  ));

  return isLoading ? (
    <Spinner />
  ) : (
    <div>
      {/* Overlay for darkening the background */}
      <div
        className={`question-panel-overlay ${isOpen ? 'open' : ''}`}
        onClick={handleOverlayClick}
      />
      <div className={`question-panel ${isOpen ? 'open' : ''}`}>
        <div className='panel-content'>
          <div className='d-flex flex-wrap gap-1' style={{ marginBottom: '5px' }}>
            <b>Complexity:</b>
            {complexityButtons}
          </div>
          <div className='d-flex flex-wrap gap-1' style={{ marginBottom: '5px' }}>
            <b>Topics:</b>
            {topicButtons}
            <span onClick={toggleExpandTopics} style={{ color: 'blue' }}>
              {isTopicExpanded ? 'Collapse' : 'Expand'}
            </span>
          </div>
          <table className='table table-hover table-striped'>
            <tbody className='table-group-divider'>{questionList}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default QuestionPanel;
