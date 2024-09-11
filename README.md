# CS-465-Full-Stack-Development

## Architecture
Compare and contrast the types of frontend development you used in your full stack project, including Express HTML, JavaScript, and the single-page application (SPA).
Why did the backend use a NoSQL MongoDB database?

- Express HTML: expansive framework that handles HTTP requests from the browser through middleware, supports HTML templates, and encourages modularity with it's built-in router.
- JavaScript: dominant language for web browsers, uses JSON like MongoDB, compatible with all technologies in the MEAN stack architecture.
- Angular single-page application: fast performance as logic & assets don't need to be reloaded, two-way data binding, slow-to-start, poor search-engine-optimization. Used for admin purposes (adding/editing/removing trips).
- MongoDB: this NoSQL database was used for this web application because it does not have a defined schema, one must be made first & multiple different schema can be made to suit different data types (such as trips, reviews, or hotels in the case of this application).

## Functionality
How is JSON different from Javascript and how does JSON tie together the frontend and backend development pieces?
Provide instances in the full stack process when you refactored code to improve functionality and efficiencies, and name the benefits that come from reusable user interface (UI) components.

- JSON is a light data-structure incorperated as apart of JavaScript. In this application, JSON ties MongoDB and the front-end together because both use JSON throughout the architecture. MongoDB explicitly uses JavaScript, and the server-side in Node.js used JSON quite a bit, whether that be for a response to an HTTP request (either returned by Mongo or generated as apart of the request) or for populating data in HTML using the Express framework, it made the work easier to read, refactor, and extend for potential developments in the future (such as exporting the data over to MongoDB so the data can be modified in a database and pulled in later).
  
- One area I refactored was the navbar used for the client-facing site. The code in the navbar that updated the CSS class which changed the look of the button to show the button as a different color when hovering and to represent the current page did not function properly with code provided by the course that was deemed out of scope after refactoring the static HTML to use Express and we weren't instructed to fix it, but I took the oppertunity to learn how to write conditional operations as you would in a traditional programming language in Express and managed to figure out how to pass a variable through a controller (this project used a Model-View-Controller architecture) to check if the variable that kept track of which page the user was currently on was activated to make sure when the user hovered over the different buttons of the navbar pointing to the different pages that the buttons updated their class id to show the correct state (hovered, selected, unselected).

- Another refactor I did for the website was to modularize more areas of the site that could be expanded on in the future. For instance, this website is for a hypothetical company that would sell trip offers to customers and on the home page there's a testimonials section with reviews by some customers and a sidebar of different images that acted as buttons that navigated to the other pages. I refactored both of these elements to instead run through a for-loop using Express for both JSON data structures. In total I did this with the latest news, news, rooms, meals, vacation tips, trips, sidebar, and tesitmonials. This makes maintaining and adding to the site much easier, and it makes integration with a databse very easy as the fields can be requested and fed into the for-loop rather than hard-coding each element's HTML. This also means easy integration into the SPA site as well in the future if this site was to developed further as the foundation for all the different calls have been made for trips, so the same logic could be extended to include the other data types that were modularized in a similar way.
  
## Testing
Methods for request and retrieval necessitate various types of API testing of endpoints, in addition to the difficulties of testing with added layers of security. Explain your understanding of methods, endpoints, and security in a full stack application.

- The different API endpoints for this application were for CRUD operations with a "trip" MongoDB Mongoose model. When a HTTP request was recieved through the API server-side there's a router that will catch the request, read the URL and determine the API route to invoke. At this point for this application we also created a user authentication system to grab the authorization header from the HTTP request and used a getUser() callback function that encapsulated each API method in the related controller to the route to ensure only an authorized user with the proper bearer authentication token generated from a login request could call an opperation that could impact data integrity. Then the methods would do what they needed to, often importing a Mongoose model, then using Mongoose to scan through a collection in MongoDB for the related info, and then return that data through an HTTP response back to the browser as JSON. We also implimented cross-origin-resource-sharing (CORS) controls to further ensure only specific connections from other sites in the application (the admin SPA) could interact with application-data in MongoDB.
- The difficulties these security measures produced for testing was primarily around sending a authorization header along with a request with each API call, and the related callback on the server-side to authenticate those requests with the token provided in the header. Sometimes errors could be thrown because of storage issues with the browser, or there could be issues that could occur with the added step of reading from Mongo for authentication. Without the authentication it is easy to test the logic underlying the security, but with the security layer then sometimes the error between layers could become obscure.

## How has this course helped you in reaching your professional goals? What skills have you learned, developed, or mastered in this course to help you become a more marketable candidate in your career field?

- I think this course gave me a very good understanding of seeing how a fully-developed application with a number of complicated archiectures is made and communicate with one-another. I think this class especially puts into focus how important it is to understand the foundational information of all the different components you use in applications and why it's important to make your code as modular and readible as possible. There was a number of outdated dependencies throughout this class and a number of no-longer functioning logic that required an understanding of the code-base that came before in order to write new logic that was compliant. In addition, this is my first real experience with web-development and I think understanding this type of application development specifically is a very good skill to know as a software-engineer and makes me a more-prepared candidate because I can understand how aspects of front-end need to tie into the back-end, how to integrate and manage API calls to a database, where the weakpoints of security are, and how to build applications with the idea of returning to the code later to improve in mind (build functionality, then efficiency).
- This course also gave me very good practice with **communication**. I was often first to start a new week and would encounter a variety of errors with the guidance of the course, when I would figure out what these issues were I would make a post in our class's general questions section with formatted breakdown of an error message or symptom I would have, what it is, what's causing it, then instruct how to fix it. I did this to better my own understanding of the material of this course and help fellow students along the way, I found that fully understanding why I was encountering unknown issues and explaining that problem to others to give me a more full understanding of the dependencies I was using and how to diagnose issues more proactively in the future.
