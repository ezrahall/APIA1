import React, {useState} from 'react';

import classes from './Home.module.css'
import Stack from '../../assets/images/StackOverflow.svg';
import Search from '../../assets/images/search-outline.svg';
import Back from '../../assets/images/arrow-back-outline.svg';
import {getPostsFromTag} from '../../services/tags/tags';
import Post from "../Post/Post";

function Home(props) {
    const [tag, setTag] = useState('');
    const [posts, setPosts] = useState([]);
    const [showPosts, setShowPosts] = useState(false)
    const [timeTaken, setTimeTaken] = useState(null);

    const getPosts = () => {
        let timeStart = new Date().getTime();
        getPostsFromTag(tag)
            .then((data) => {
                let timeEnd = new Date().getTime()
                setTimeTaken(timeEnd-timeStart);
                setPosts(data);
                setShowPosts(true);
            })
    }
    const onKeyDownInInput = (ele) => {
        if(ele.key === 'Enter'){
            getPosts()
        }
    }
    return (
        <div className={classes.Home}>
            {showPosts ?
                <div>
                    <button
                        className={classes.Back}
                        onClick={() => setShowPosts(false)}
                    >
                        <img src={Back} alt={'Back'}/>
                    </button>
                    <div className={classes.Posts}>
                        {posts.map((post) => <Post
                            apiTime={(time) => setTimeTaken(time)}
                            title={post.title}
                            creationDate={post.creation_date}
                            score={post.score}
                            question_id={post.question_id}
                            body={post.body}
                        />)}
                    </div>
                    {timeTaken && <div className={classes.Time}>
                        <p>Time Taken For API Call: {timeTaken/1000} seconds</p>
                    </div>}
                </div>
                :
                <div className={classes.SearchPage}>
                    <img className={classes.Image} src={Stack} alt={'stack'}/>
                    <h3>Enter a tag to find the newest 10 posts and the top 10 voted posts in the last week with that tag</h3>
                    <div className={classes.Input}>
                        <input
                            placeholder='Tag Search'
                            value={tag}
                            onChange={(data) => setTag(data.target.value)}
                            onKeyDown={(data) => onKeyDownInInput(data)}
                        />
                        <button onClick={() => getPosts()}><img className={classes.Search} src={Search} alt={'search'}/></button>
                </div>
            </div>}
        </div>
    );
}

export default Home;