if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
}

window.addEventListener('DOMContentLoaded', () => {
    const parsedUrl = new URL(window.location);
    
    // searchParams.get() will properly handle decoding the values.
    shareText = parsedUrl.searchParams.get('text');
    
    if (shareText !== null)
        document.querySelector('#text').innerHTML = shareText;

    if (shareText !== null)
        document.querySelector('#output').innerHTML = rot13me(shareText);

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

function rot13me(message){
	return message.replace(/[a-zA-Z]/g, function(c){
		return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
	});
};
