'use strict';
const userNameInput = document.getElementById('user-name');
const assesmentButton = document.getElementById('assesment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した要素の子をすべて削除
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element){
    while (element.firstChild){
        element.removeChild(element.firstChild);
    }
}

assesmentButton.onclick = () => {
    const userName = userNameInput.value;
    if (userName.length === 0){ //名前が空の時は処理を終了
        return;
    }

    //診断表示エリアの作成
    removeAllChildren(resultDivided);
    const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p');
    const result = assesment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);

    //ツイートエリアの作成
    //<a href="https://twitter.com/intent/tweet?button_hashtag=いいところ&ref_src=twsrc%5Etfw" class="twitter-hashtag-button" data-text="診断結果の文章" data-show-count="false">Tweet #いいところ</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
    removeAllChildren(tweetDivided);
    const anchor = document.createElement('a');
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
        + encodeURIComponent('いいところ')
        + '&ref_src=twsrc%5Etfw';

    anchor.setAttribute('href', hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #あなたのいいところ';

    tweetDivided.appendChild(anchor);

    //widget.jsの設定
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);
};

const answers = [
    '{userName}のいいところ１',
    '{userName}のいいところ２',
    '{userName}のいいところ３',
    '{userName}のいいところ４',
    '{userName}のいいところ５',
    '{userName}のいいところ６',
    '{userName}のいいところ７',
    '{userName}のいいところ８',
    '{userName}のいいところ９',
    '{userName}のいいところ１０',
    '{userName}のいいところ１１'
]

/*
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */

function assesment(userName) {
    //全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCode = 0;
    for (let i = 0; i < userName.length; i++){
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    }
    //文字のコード番号の合計を回答の数で割って添字の数値を求める
    const index = sumOfCharCode % answers.length;
    let result = answers[index];

    //TODO {userName} をユーザーの名前に書き換える
    result = result.replace(/\{userName}/g, userName);
    return result;
}

console.log(assesment('一郎'));
console.log(assesment('たぬき'));
console.log(assesment('一郎'));
