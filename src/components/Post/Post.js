import React, {useState} from 'react';

import classes from './Post.module.css'
import Expand from '../../assets/images/chevron-down-outline.svg';
import Collapse from '../../assets/images/chevron-up-outline.svg';
import {getPostAnswersForQuestion, getCommentsForQuestions} from '../../services/tags/tags';
import Answer from "./Answer/Answer";
import Comment from "./Comment/Comment";

function Post(props) {
    const [answers, setAnswers] = useState([]);
    const [showBody, setShowBody] = useState(false);
    const [comments, setComments] = useState([]);
    let date = props.creationDate
    date = date*1000

    const getPostAnswers = () =>{
        let startTime = new Date().getTime()
        getPostAnswersForQuestion(props.question_id)
            .then((res) => {
                setAnswers(res)
                getCommentsForQuestions(props.question_id)
                    .then((res) => {
                        let endTime = new Date().getTime()
                        props.apiTime(endTime-startTime);
                        setComments(res);
                        setShowBody(true);
                    })
            })
            .catch((err) =>  console.log(err))
    }
    return (
        <div className={classes.Post}>
            <img className={classes.Arrow} src={showBody ? Collapse : Expand} alt={'expand'} onClick={() => {
                showBody ?
                    setShowBody(false)
                    : getPostAnswers()
            }}/>
            <h2>{props.title}</h2>
            <p><b>Date Posted:</b> {new Date(date).toDateString()}</p>
            <p><b>Score:</b> {props.score}</p>
            {showBody &&
                <div>
                    <div className={classes.Inner} dangerouslySetInnerHTML={{__html: props.body}} />
                    <h3>Comments</h3>
                    <div className={classes.Line}/>
                    {comments.length > 0 ?
                        comments.map((comment) => <Comment comment={comment}/>):
                        <h4>No Comments</h4>
                    }
                    <div className={classes.Line}/>
                    <h2 style={{textAlign:"left"}}>Answers</h2>
                    {answers.length > 0 ?
                    answers.map((answer) => <Answer answer={answer}/>)
                    : <h3>No Answers For This Question</h3>}
                </div>}
        </div>
    );
}

export default Post;