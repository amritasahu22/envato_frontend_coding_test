# Envato Front End Coding Test

## Project Structure

The project is organized as follows:

```app/
├── index.html       # Main HTML file
├── tests.html       # Test cases for testing JavaScript
├── css/style.css    # CSS file for styling and layout
├── js/script.js     # JavaScript logic
├── _assets/            # Contains provided image assets
```

## Please indicate how you might handle other/older browsers using inline comments.

Below are strategies I would use to handle cross-browser compatibility:

- HTML: Using conditional comments for IE 9 and below.
- CSS Browser-specific prefixes & fallbacks for flexbox and media queries.
- JavaScript: Feature Detection using modernizr library can be used to check if a feature is supported or Browser-Specific workarounds with comments.
- Polyfills are scripts that "fill in" functionality missing in older browsers. You can conditionally include polyfills based on whether the browser supports the feature you're targeting.
- For older browsers, might need to include polyfills for Element.closest, Array.prototype.fill, fetch and Promise.

## Please add comments explaining how your solution might differ in a production environment.

In a production environment, the code would need to be optimized for performance, security and maintainability. Following improvments can be made for a production-ready version:

- Environment Variables - Use env variables to manage different configurations for development and production environments (API URL).
- Minification, Bundling and Code Splitting: Use tools like Webpack to bundle and minify JS and CSS files to reduce file size and improve load times.
- Improve Error handling and logging to capture and report errors.
- CI/CD (Continuous Integration/Continuous Deployment) : Automate the deployment pipeline with CI/CD tools (eg bamboo, github CI) to streamline the process of building, testing and deploying the application.
- Caching to reduce the number of network requests and improve performance.
- Serve static assets from a CDN (Content Delivery Network) for faster global delivery.
- Security best practices to protect against XSS and other attacks.

## Improvements

- Introduce dropdown to sort Author, Title alphabetically, new theme arrivals, rating
- Introduce pagination for handling large datasets
- Improve test coverage and styling

# Envato Front End Coding Test

Make sure you read **all** of this document carefully, and follow the guidelines in it. Pay particular attention to the "What We Care About" section.

## The task

Build a static page (`index.html`) that fetches a list of items and displays them in a _responsive_ layout according to `Mockup-1600px-2x.png` and `Mockup-450px-2x.png`.

The data source to use for this task is `https://envato.github.io/front-end-coding-test/test.json`. CORS is enabled on this API. It's computer generated data, don't worry if it doesn't make much sense.

- List the items in order of rating, from highest to lowest.

- Each item should display a star rating, where all ratings have been rounded down to the nearest whole number.

- Items with a 5 star rating should display a "Top rated!" banner on larger screen sizes.

- Clicking an item's `remove` link should remove it from the list (purely client side, this doesn't need to be communicated to the server or maintained across page reloads).

- Your solution is only required to work in the latest versions of Chrome and Firefox. Please indicate how you might handle other/older browsers using inline comments.

## Getting started

We've supplied a `index.html` to get you started. You will need to expand on this as well as create two supporting files (`style.css` and `script.js`) for your styles and JavaScript code respectively.

Image assets that you may wish to use or edit are located in `_assets`.

### Tooling

You're probably used to using build tools, task runners, module bundlers, preprocessors & postprocessors. We love & use those things too, but for the purposes of this test we want to see how you approach the problem with the basics - 3 handcoded files (HTML, CSS and JavaScript) that browsers can run natively.

When reviewing your submission, we'll start a [static server](https://www.npmjs.com/package/http-server) in the `app` directory.

### Third party libraries

As with tooling above, you might be used to working with libraries & frameworks. For this test, avoid using any third party libraries. We want to see _your_ code and _your_ approach to the problem, rather than seeing how well you know a particular library or framework.

### Tests

We've also provided a `tests.html` that includes the simple [expect](https://github.com/mjackson/expect) testing library. Where appropriate, write unit tests for your JavaScript in that file.

## What we care about

We're interested in your method and how you approach the problem just as much as we're interested in the end result. We'll go through your code with you afterwards, and you can talk to us about how you tackled it, why you chose the approach you did, etc.

Please add comments explaining how your solution might differ in a production environment.

When reviewing your code we care about:

- Modern CSS and JS techniques
- Efficient DOM manipulation
- Error handling
- Event delegation
- Loading states
- Asset handling
- Accessibility
- Semantic HTML
- Robust tests

**Use git!** This is already a git repo. Commit small changes to it often so we can see your approach, and progress. Include the .git directory in the packaged .tar.gz file you send to us.

We haven't hidden any nasty tricks in the test. Don't overthink it. Just write nice, solid code.

## Submitting The Test

Ensure the Git repository is clean—all code is committed and any unwanted files are removed. Then, in your project directory, run:

```
tar -czvf firstname_lastname.tar.gz .
```

Then email the generated tar.gz file back to the person that sent you the test.
