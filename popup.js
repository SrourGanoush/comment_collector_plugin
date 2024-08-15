document.getElementById('collectComments').addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            {file: 'content.js'},
            function() {
                if (chrome.runtime.lastError) {
                    console.error(chrome.runtime.lastError);
                    return;
                }
            }
        );
    });
});

// Listen for the message from content.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.comments) {
        const comments = request.comments;
        const commentList = document.getElementById('commentList');
        commentList.innerHTML = '';
        
        if (comments.length === 0) {
            commentList.textContent = 'No comments found.';
        } else {
            comments.forEach(function(comment) {
                const commentDiv = document.createElement('div');
                commentDiv.className = 'comment';
                commentDiv.textContent = comment;
                commentList.appendChild(commentDiv);
            });
        }
    }
});