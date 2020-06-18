if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
}

const tweetUrl = document.querySelector('#tweetUrl');
const tootUrl = document.querySelector('.mastodon-embed');

window.addEventListener('DOMContentLoaded', () => {
    const parsedUrl = new URL(window.location);
    
    // searchParams.get() will properly handle decoding the values.
    shareText = parsedUrl.searchParams.get('text');
    
    if (shareText !== null)
        document.querySelector('#text').innerHTML = shareText;

    if (shareText !== null)
        document.querySelector('#output').innerHTML = splitLines(rot13me(shareText));

    getUrl(shareText);

});

function reShare(message){
    message = cleanText(message);
    console.log(message);
    
    if (navigator.share) {
        navigator.share({
            url: message,
        })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    }
}

function splitLines(message){
    newMessage = message.split(".").join(".<br><br>");
    newMessage = newMessage.split(":").join(":<br><br>");
    newMessage = newMessage.split("?").join("?<br><br>");
    newMessage = newMessage.split(",").join(",<br><br>");
    newMessage = newMessage.split(";").join(";<br><br>");

    return newMessage;
}

function rot13me(message){
    pattern = /(https*:\/\/[^\s]*)/;
    newMessage = message.replace(pattern,'');

	return newMessage.replace(/[a-zA-Z]/g, function(c){
		return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
	});
};

function getUrl(message){
    pattern = /(https*:\/\/[^\s]*)/;
    links = message.match(pattern);

    twitterPattern = /(https:\/\/twitter.com).*/;
    mastoPattern = /(https*:\/\/[^\/]*\/\@[^\/]*\/[0-9]*)/;
    console.log(links[1])
    if (links[1].match(twitterPattern)){
        console.log("twitter");
        populateTweet(links[1]);
    }

    if (links[1].match(mastoPattern)){
        console.log("mastodon");
        populateToot(links[1]);
    }

    return links[1];
}

function populateTweet(url){
    tweetUrl.href=url;

}

function populateToot(url){
    tootUrl.src=url+"/embed";
    tootUrl.classList.add("show");
}
