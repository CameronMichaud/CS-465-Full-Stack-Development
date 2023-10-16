# CS-465-Full-Stack-Development

## Architecture
Compare and contrast the types of frontend development you used in your full stack project, including Express HTML, JavaScript, and the single-page application (SPA).
Why did the backend use a NoSQL MongoDB database?

- Express HTML: expansive framework that handles HTTP requests from the browser through middleware, supports HTML templates, and encourages modularity with it's built-in router.
- JavaScript: used by browsers, uses JSON like MongoDB, compatible with all MEAN stack architectures, can support and handle async operations well.
- Angular single-page application: fast performance as logic & assets don't need to be reloaded, two-way data binding, slow-to-start, poor search-engine-optimization. Used for admin purposes (adding/editing/removing trips).
- MongoDB: a NoSQL database was used for this web application because

## Functionality
How is JSON different from Javascript and how does JSON tie together the frontend and backend development pieces?
Provide instances in the full stack process when you refactored code to improve functionality and efficiencies, and name the benefits that come from reusable user interface (UI) components.

- JSON is a light data-structure incorperated as apart of JavaScript. In this application, JSON ties MongoDB and the front-end together because both use JSON throughout the architecture. MongoDB explicitly uses JavaScript, and the server-side in Node.js for this project used JSON quite a bit, whether that be for a response to an HTTP request (either returned by Mongo or generated as apart of the request) or for populating data in HTML using the Express framework.
- One area I refactored was the navbar used for the client-facing site. The code in the navbar that updated the CSS class that changed the look of the button did not function properly with the provided CSS after refactoring the static HTML to use Express and we weren't instructed to fix it, but I found out how to do some different conditional operations like you would in a normal programming language in Express and managed to figure out how to pass a variable through a controller and check if it was activated to make sure when the user hovered over the different buttons of the navbar pointing to the different pages that the buttons updated their class id to show the correct state (hovered, selected, unselected).
  
## Testing
Methods for request and retrieval necessitate various types of API testing of endpoints, in addition to the difficulties of testing with added layers of security. Explain your understanding of methods, endpoints, and security in a full stack application.

- The different API endpoints for this application were for CRUD operations with a "trip" MongoDB Mongoose model. When a HTTP request was recieved through the API server-side there's a router that will catch the request, read the URL and determine the API route to invoke. At this point for this application we also created a user authentication system to grab the authorization header from the HTTP request and use a getUser() callback function that encapsulated each API method in the related controller to the route to ensure only an authorized user with the proper bearer authentication token generated from a login request could call an opperation that could impact data integrity. Then the methods would do what they needed to, often importing a Mongoose model, then using Mongoose to scan through a collection in MongoDB for the related info, and then return that data through an HTTP response back to the browser as JSON. We also implimented cross-origin-resource-sharing controls to further ensure only specific connections from other sites in the application (the admin SPA) could interact with application-data in MongoDB.
Reflection

## How has this course helped you in reaching your professional goals? What skills have you learned, developed, or mastered in this course to help you become a more marketable candidate in your career field?

- I think this course gave me a very good understanding of seeing how a fully-developed application with a number of complicated archiectures is made and communicate with one-another. I think this class especially puts into focus how important it is to understand the foundational information of all the different components you use in applications and why it's important to make your code as modular and readible as possible. There was a number of outdated dependencies throughout this class and a number of no-longer functioning logic that required an understanding of the code-base that came before in order to write new logic that was compliant. In addition, this is my first real experience with web-development and I think understanding this type of application development specifically is a very good skill to know as a software-engineer and makes me a more-prepared candidate because I can understand how aspects of front-end need to tie into the back-end, how to integrate and manage API calls to a database, where the weakpoints of security are, and how to build applications with the knowledge of how to retroactively figure out and improve on what I'm working on in order to make my work easier to improve by myself and others who need to look back and understand the processes going on to improve them.
