import React from 'react';

import classes from './Answer.module.css';
import Comment from "../Comment/Comment";

function Answer(props) {
    let date = props.answer.creationDate
    date = date*1000
    return (
        <div className={classes.Answer}>
            <p><b>Date Posted: </b>{new Date(date).toDateString()}</p>
            <p><b>Score: </b>{props.answer.score}</p>
            <div className={classes.Inner} dangerouslySetInnerHTML={{__html: props.answer.body}} />
            <div className={classes.Line}/>
            <h3>Comments</h3>
            {props.answer.comments.length > 0 ? props.answer.comments.map((comment) => <Comment comment={comment}/>) :
            <h4>No Comments For This Answer</h4>}
        </div>
    );
}

export default Answer;