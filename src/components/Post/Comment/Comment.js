import React from 'react';

function Comment(props) {
    let date = props.comment.creation_date
    date = date*1000
    return (
        <div>
            <p><b>Date Posted: </b>{new Date(date).toDateString()}</p>
            <p><b>Score: </b>{props.comment.score}</p>
            <div dangerouslySetInnerHTML={{__html: props.comment.body}}/>
        </div>
    );
}

export default Comment;