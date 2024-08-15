function collectComments() {
    const comments = [];
    
    // Collect HTML comments
    const htmlComments = document.evaluate(
        '//comment()', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
    );
    for (let i = 0; i < htmlComments.snapshotLength; i++) {
        comments.push(htmlComments.snapshotItem(i).textContent.trim());
    }
    
    // Collect JavaScript, CSS, and other comments
    const scripts = document.getElementsByTagName('script');
    const styles = document.getElementsByTagName('style');
    
    function extractComments(text) {
        // Match single-line comments (//), multi-line comments (/* */), 
        // HTML comments (<!-- -->), and hash comments (#)
        const regex = /\/\/.*?(?:\r\n|\n|$)|\/\*[\s\S]*?\*\/|<!--[\s\S]*?-->|#.*?(?:\r\n|\n|$)/g;
        const matches = text.match(regex);
        if (matches) {
            comments.push(...matches.map(m => m.trim()));
        }
    }
    
    // Extract comments from script tags
    Array.from(scripts).forEach(script => {
        if (script.textContent) {
            extractComments(script.textContent);
        }
    });
    
    // Extract comments from style tags
    Array.from(styles).forEach(style => {
        if (style.textContent) {
            extractComments(style.textContent);
        }
    });
    
    // Extract comments from inline event handlers and style attributes
    const allElements = document.getElementsByTagName('*');
    Array.from(allElements).forEach(element => {
        for (let attr of element.attributes) {
            if (attr.name.startsWith('on') || attr.name === 'style') {
                extractComments(attr.value);
            }
        }
    });
    
    // Extract comments from the entire HTML source
    const htmlSource = document.documentElement.outerHTML;
    extractComments(htmlSource);
    
    return comments;
}

// Instead of returning, we'll send a message with the results
chrome.runtime.sendMessage({comments: collectComments()});