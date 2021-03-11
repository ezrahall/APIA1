import axios from "axios";
import {Answer} from "../../models/Answer/Answer";

export const getPostsFromTag = async (tag) => {
    let posts = []
    let date = new Date();
    date.setDate(date.getDate() -7);
    date = date.getTime().toString();
    date = date.substring(0,10);
    let res = await axios.get(`https://api.stackexchange.com/2.2/questions?pagesize=10&order=desc&sort=creation&tagged=${tag}&site=stackoverflow&filter=!9_bDDxJY5`)
        posts = res.data.items;
    res = await axios.get(`https://api.stackexchange.com/2.2/questions?pagesize=10&fromdate=${date}&order=desc&sort=votes&tagged=${tag}&site=stackoverflow&filter=!9_bDDxJY5`)
    posts = posts.concat(res.data.items);
    posts = posts.sort((a,b)=>{
        if(a.creation_date < b.creation_date){
            return 1
        }
        if(a.creation_date > b.creation_date){
            return -1
        }
        return 0
    })
    return posts
}

export const getCommentsForQuestions = async (qID) => {
    let res = await axios.get(`https://api.stackexchange.com/2.2/questions/${qID}/comments?order=desc&sort=creation&site=stackoverflow&filter=!9_bDE0E4s`);
    return res.data.items;
}

export const getPostAnswersForQuestion = async (qID) =>{
    let res = await axios.get(`https://api.stackexchange.com/2.2/questions/${qID}/answers?order=desc&sort=activity&site=stackoverflow`);
    const promises = res.data.items.map(async (answer) => {
        const res = await axios.get(`https://api.stackexchange.com/2.2/answers/${answer.answer_id}?order=desc&sort=activity&site=stackoverflow&filter=!--1nZxN5VP.X`);
        const comments = await axios.get(`https://api.stackexchange.com/2.2/answers/${answer.answer_id}/comments?order=desc&sort=creation&site=stackoverflow&filter=!9_bDE0E4s`);
        return {...res, comments}
    })
    let answers = await Promise.all(promises)
    answers = answers.map((answer) => new Answer(answer.data.items[0].answer_id,
        answer.data.items[0].body,
        answer.data.items[0].score,
        answer.data.items[0].creation_date,
        answer.comments.data.items
    ))
    return answers;
}