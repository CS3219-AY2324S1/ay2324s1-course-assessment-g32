import React from 'react';
import { Route, Routes } from 'react-router-dom';
import QuestionList from '../../components/Question/QuestionList';
import SubmissionHeatMap from '../../components/Statistics/SubmissionHeatMap';
import SubmissionPieChart from '../../components/Statistics/SubmissionPieChart';
import {
  CreateQuestion,
  EditQuestion,
  QuestionDescription,
} from '../Question/Question';
import Header from '../../components/Header';
import './Landing.css';

function Landing() {
  return (
    <div className='landing'>
      <Header />
      <h1 className='title m-5'>Welcome, User</h1>
      <SubmissionPieChart />
      <SubmissionHeatMap />
    </div>
  );
}

export default Landing;
