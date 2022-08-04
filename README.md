<h1 align='center'>OnlineChat</h1>

<h2 align='center'>
  <a href="https://online-chat-wine.vercel.app/">
    Open OnlineChat
  </a>
</h2>

<h2>Desctiption :</h2>

<p align="center">
  <img src="https://user-images.githubusercontent.com/98680950/182806459-babb958b-4bbd-4c83-9333-49cdd37341fc.gif" height="400px" />
<p>

<p align='center'>
  OnlineChat site.
  <br>
  All you have to do is come up with a username to start sending messages.
</p>

<br>

<h2>How to use :</h2>

<br>

1. You need to enter a name. The name is entered in the pop-up window that opens when you click "Log-in" and then click "Confirm".

2. Enter your message in the "Enter your message" field and press the Enter button.

3. To edit a message, you need to right-click on it or click on the item (with your finger), edit it and remove the focus (press enter or confirm on mobile).

<br>

<h2>About the project :</h2>

<br>

<h3>Components</h3>

<ul>
  <li>LogIn - component for entering a name.</li>
  <li>Messages - component that contains MessagesList and MessagesInput.</li>
  <li>MessagesInput - a form component for entering and creating messages.</li>
  <li>MessagesList - component for displaying all messages.</li>
  <li>PopUp - component for displaying messages sent with mentioning you with @ (@name).</li>
  <li>ContextMenu - component that will contain the 'Edit' button to change the text and the 'Delete' button to delete the message</li>
</ul>

<h3>React components reducers</h3>

<ul>
  <li>login - reducer that stores the name of the author of the entered, in LogIn.</li>
  <li>messages - reducer which stores an array of messages.</li>
  <li>unreadMessages - reducer that stores an array of unread messages sent to you.</li>
</ul>

<br>

<h2>Plugins (Client) :</h2>

<br>

<h3>@apollo/client</h3>

- Apollo Client is a fully-featured caching GraphQL client with integrations for React, Angular, and more. It allows you to easily build UI components that fetch data via GraphQL.

<br>

<h3>@apollo/react-hoc</h3>

- React Apollo `graphql` higher-order component.

<br>

<h3>@reduxjs/toolkit</h3>

- **The official, opinionated, batteries-included toolset for efficient Redux development**  
(Formerly known as "Redux Starter Kit")

<br>

<h3>react-redux</h3>

- Official React bindings for 
<a 
  style="color: brown" 
  href="https://github.com/reduxjs/redux">
  <b>Redux</b>
</a>.    
Performant and flexible.  

<br>

<h3>mathjs</h3>

- Math.js is an extensive math library for JavaScript and Node.js.

<br>

<h3>use-sound</h3>

- **A React Hook for Sound Effects**  
The web needs more (tasteful) sounds!

<br>

<h2>Plugins (Server) :</h2>

<br>

<h3>@graphql-tools/schema</h3>

- Plugin to create graphql schemes

<br>

<h3>apollo-server</h3>

- <b>Apollo Server is an 
  <a 
    style="color: #ad9bf6" 
    href="https://github.com/apollographql/apollo-server">open-source</a>, spec-compliant GraphQL server</b> that's compatible with any GraphQL client, including <a style="color: #ad9bf6" href="https://www.apollographql.com/docs/react/">Apollo Client</a>. It's the best way to build a production-ready, self-documenting GraphQL API that can use data from any source.

<br>

<h3>apollo-server-express</h3>

- This is the Express integration of Apollo Server

<br>

<h3>express</h3>

- Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

<br>

<h3>graphql</h3>

- GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data.

<br>

<h3>graphql-subscriptions</h3>

- GraphQL subscriptions is a simple npm package that lets you wire up GraphQL with a pubsub system (like Redis) to implement subscriptions in GraphQL.

<br>

<h3>mongoose</h3>

- Elegant mongodb object modeling for node.js

<br>

<h3>nodemon</h3>

- Nodemon is a tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected.

<br>

<h3>subscriptions-transport-ws</h3>

- A GraphQL WebSocket server and client to facilitate GraphQL queries, mutations and subscriptions over WebSocket.

<br>

<h2>Installing :</h2>

<h3>1) Cloning a repository</h3>

<br>

```
git clone https://github.com/WhoStoleMySleep/OnlineChat.git
```

<br>

<h3>2) Installing the necessary modules</h3>

<br>

```
npm install
```

<br>

<h3>3) Launch</h3>

<br>
<h4>Running the client (application) :</h4>

```
cd client

npm start
```

<br>
<h4>Running the server :</h4>

```
cd server

npm start
```

<br>

<h2>Future scope :</h2>

- Message alerts while you were away

- Code coverage with tests

- Make it look like telegram or discord
