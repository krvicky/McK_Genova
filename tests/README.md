# Tests

`cdp.mjs` launches headless Chrome over the DevTools protocol, opens `../genova_demo.html`, runs each phase in `tests.js` inside the page, and saves a screenshot after each phase. It also reports console errors and any network request that is not a local file.

Requirements: Node.js 22 or later (for the built-in `fetch` and `WebSocket`) and Google Chrome.

```sh
# from the repository root
node tests/cdp.mjs tests/out 1440 900
node tests/cdp.mjs tests/out720 1280 720
```

Optional environment variables:

- `CHROME`: path to the Chrome executable (default: `C:/Program Files/Google/Chrome/Application/chrome.exe`)
- `TESTS`: path to the test file (default: `tests/tests.js`)

Expected output: every phase prints `PASS`, followed by `ERRORS: none` and `EXTERNAL REQUESTS: none`. Screenshots land in the output folder, which git ignores.

Each block in `tests.js` starts with a `// ---- name` line and runs as one async phase. Helpers available in the page: `__c(selector)` clicks, `__has(text)` asserts visible text, `__set(selector, value)` fills a field, `__idle()` waits for simulated work to finish.
