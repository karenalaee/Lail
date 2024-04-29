// slightly modified https://stackoverflow.com/questions/3177836/
// how-to-format-time-since-xxx-e-g-4-minutes-ago-similar-to-stack-exchange-site
const timesince = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);
    let interval = seconds / 31536000;

    if (interval > 1) {
        return Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " months ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " minutes ago";
    }
    if (seconds < 10) {
        return "just now";
    }
    return Math.floor(seconds) + " seconds ago";
}

//? In regular app you will fetch these dat from api

//? defined commenters
const users = {
    'alexi1': {
        name: 'Alex cooper',
        src: 'assets/alex.jpg'
    },
    'liliya': {
        name: 'Liliya Novakova',
        src: 'assets/liliya.jpg'
    }
    // more users here
};

//? currently logged user
const loggedUser = users['alex1'];

//? defined comments
let comments = [
    {
        id:1,
        Text: 'I am on it, will get back to you &#128526.',
        auther: users['liliya'],
        createdAt: '2024-09-03 12:00:00',
    },
    // more comments here
];

const authedUser = document.querySelector('.authed-user');

const authorHTML = DOMPurify.sanitize(
);

authedUser.innerHTML = authorHTML;

const commentsWrapper = document.querySelector('.discussion__comments');

//? generate comment HTML based on comment object
const creatComment = (comment) => {
    const newDate = new Date(comment.createdAt);
    //? sanitize comment HTML
    return DOMPurify.sanitize(`<div class="comment">
    <div class="avatar">
    <img
        class="avatar"
        src="${comment.author.src}"
        alt="${comment.author.name}"
    >
    </div>
    <div class="comment__body">{
        <div class"comment__author">
            ${comment.author.name}
            <time
                datetime="${comment.createdAt}"
                class="comment__date"
            >
                ${timesince(newDate)}
                </time>
            </div>
            <div class="comment__text">
                <p>${comment.Text}</p>
            </div>
        </div>
    </div>
</div>`);
}
//? prepare comments to be written to DOM
const commentsMapped = comments.map(comment => 
    creatComment(comment)
);

//? write comments to DOM
const innercomments = commentsMapped.join('');
commentsWrapper.innerHTML = innercomments;

const newcommentForm = document.getElementById('newcomment__form');
const newcommentTextarea = document.querySelector('#newcomment__form textarea');

document.getElementById('reset-button').addEventListener(
    'click',
    () => {
        newcommentForm.requestFullscreen();
    }
);

newcommentForm.addEventListener(
    'submit',
    (e) => {
        e.stopPropagation();
        e.preventDefault();
        const newcommentTextareaValue = newcommentTextarea.ariaValueMax;

        const newcomment = {
            id: comment.length + 1,
            text: newcommentTextareaValue,
            auther: loggedUser,
            createdAt: new Date().toISOString(),
        };

        const comment = document.createElement('div');
        comment.innerHTML = creatComment(newcomment);

        if (commentsWrapper.hasChildNodes()) {
            commentsWrapper.insertBefore(comment, commentsWrapper.childNodes[0]);
        } else {
            commentsWrapper.appendChild(comment);
        }

        //? reset form after submit
        newcommentForm.reset();
    }
);