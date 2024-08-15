# Comment Collector Chrome Plugin

## Description

Comment Collector is a Chrome browser extension that extracts and displays all comments from the current web page. It collects comments from HTML, JavaScript, and CSS, including inline styles.

## Features

- Collects HTML comments (`<!-- -->`)
- Collects JavaScript single-line comments (`//`)
- Collects JavaScript and CSS multi-line comments (`/* */`)
- Collects hash comments (`#`) used in some template languages
- Displays collected comments in an easy-to-read list

## Installation

1. Clone this repository or download the source code.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" by toggling the switch in the top right corner.
4. Click "Load unpacked" and select the directory containing the extension files.

## Usage

1. Navigate to any web page.
2. Click on the Comment Collector icon in your Chrome toolbar.
3. In the popup window, click the "Collect Comments" button.
4. View the list of comments collected from the current page.

## Files

- `manifest.json`: Extension manifest file
- `popup.html`: HTML structure for the extension popup
- `popup.js`: JavaScript for handling user interactions in the popup
- `content.js`: JavaScript for extracting comments from the web page

