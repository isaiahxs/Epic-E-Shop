# Epic-E-Shop
![image](https://github.com/isaiahxs/Epic-E-Shop/assets/107521578/883cb473-12ef-4fc0-a574-852473be5dfd)


Epic-E-Shop is a full-stack e-commerce application that offers real-time inventory and reminder system for Fortnite's item shop. Users can browse every item in Fortnite's history, as well as today's daily items and featured items. The live data is retrieved using FNBR's community-made third-party API.

Not only can users view items, but they can also engage in several ways. They can comment on items, vote on items, and even set reminders for items. When an item returns to the shop, the user is notified by email. There's also an e-commerce aspect to the site; each new user is given 20,000 V-Bucks to start shopping. They can add items to their carts, remove items, and check out. Once purchased, items go to their inventory. Users can also view all items they own, have set reminders for, have voted on, and have commented on in their profile page.

The live site can be found [here](https://epic-e-shop.onrender.com/).

![image](https://github.com/isaiahxs/Epic-E-Shop/assets/107521578/cd020cd9-21bf-46f2-ab8e-2719672995c8)
![image](https://github.com/isaiahxs/Epic-E-Shop/assets/107521578/590ffed0-219f-4ff4-b31f-ab8eb2a3ac3a)

## Technologies Used
- JavaScript
- Python
- PostgreSQL
- Flask
- Redux
- React
- [FNBR API](https://fnbr.co/)

## Features
- Comment on items
- Vote on items
- Set reminders for items
- E-commerce functionalities (Add to cart, remove from cart, checkout)
- User profile (View owned items, reminders, votes, and comments)

![image](https://github.com/isaiahxs/Epic-E-Shop/assets/107521578/e2f77e85-dae0-4a64-acca-0f6a1278f692)
![image](https://github.com/isaiahxs/Epic-E-Shop/assets/107521578/d181b2f4-bacc-49a5-8728-b203921687b3)
![image](https://github.com/isaiahxs/Epic-E-Shop/assets/107521578/c6f19dc4-6102-4824-8154-fd6b51d45cef)
![image](https://github.com/isaiahxs/Epic-E-Shop/assets/107521578/2d8368dd-ef3e-4b55-9051-199781c8f621)
![image](https://github.com/isaiahxs/Epic-E-Shop/assets/107521578/31cf4efd-49c4-4949-b9dc-c32fb7169700)

## Inventory
![image](https://github.com/isaiahxs/Epic-E-Shop/assets/107521578/c6f68710-2dec-4941-8812-f67369301523)
![image](https://github.com/isaiahxs/Epic-E-Shop/assets/107521578/f8372a35-d268-4275-a4ba-da2e1a231fac)
![image](https://github.com/isaiahxs/Epic-E-Shop/assets/107521578/e60a8eeb-d2a7-4801-8ef7-94735e075688)
![image](https://github.com/isaiahxs/Epic-E-Shop/assets/107521578/d05a8ef2-476a-4e5f-80e7-5654c58a304e)



## Future Features
- Ability to gift items to a friend
- Gain additional V-Bucks by interacting with the features of the site

## Challenges and Solutions
While developing the project, I encountered several challenges. Here are some of the most significant ones, along with the ways they were addressed:

### Handling Asynchronous Data Fetching

One of the major challenges was dealing with fetching data asynchronously from an external API and synchronizing that data with the application's state. This was resolved by using Redux along with Redux thunk. Redux helped manage the global state of the application, while Redux thunk allowed me to handle asynchronous actions. Thus, I was able to dispatch actions to update the state after the data from the API was successfully retrieved.

### Rendering Optimization

Another challenge faced was ensuring that the application rendered efficiently. This was particularly relevant when dealing with components like FanFavorites, DailyItems, FeaturedItems, which needed to display a dynamic list of items. This was addressed using localStorage to reduce unnecessary API fetches while also speeding up the rendering.

### Data Filtering and Sorting

Filtering and sorting the items based on various parameters like price, rarity, etc., was a complex task. For this, JavaScript's built-in array methods were used to filter and sort the data as per the requirements. Redux was used to manage the state for filter and sort parameters, allowing for a seamless user experience.

### Responsive UI

Designing a UI that worked equally well on all device sizes was a challenging task. This was handled using CSS media queries and a desktop-first approach to ensure that the UI scaled well from large to small screen sizes. Libraries such as React-Slick were also leveraged to provide responsive and accessible components.

### User Authentication and Authorization

Implementing a secure and efficient user authentication system was crucial for the project. I used Flask-SQLAlchemy for the backend and Redux for the frontend to manage user sessions. I also implemented protective measures such as hashed passwords and user input validations to ensure a secure user experience.

### Data Persistency

A significant challenge was to maintain the state across the sessions, like preserving user's login state or cached data. LocalStorage was leveraged for this purpose. It helped persist data across sessions and improved the user experience by eliminating unnecessary data fetches and re-rendering.

Each of these challenges allowed me to explore and learn various aspects of React, Redux, and Flask in depth, and I was able to find effective solutions by leveraging the features of these technologies and best practices of software development.

## Code Snippets

### Home Page Component

Our Home Page component is the landing page of the application and where most of the action occurs. Here, I fetch and display all the items featured, handle user sessions and reminders, and control the page loading state.

Here are some key excerpts from the `HomePage` component:

```
// Dependencies and initial state setup
const HomePage = () => {
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user)
    const reminders = useSelector(state => state.reminders);
    const seedItems = useSelector(state => state.items.seedItems);
    const dailyItems = useSelector(state => state.items.dailyItems);
    const featuredItems = useSelector(state => state.items.featuredItems);

    const [isLoading, setIsLoading] = useState(true);
    ...
```

This first chunk shows the component setup, where I utilize the useSelector hook to grab the necessary slices of state from our Redux store.

```
// Data fetching and loading state management
useEffect(() => {
    const fetchData = async () => {
        await Promise.all([
            dispatch(getSeedItems()),
            setIsLoading(false),
            dispatch(getDailyItems()),
            dispatch(getFeaturedItems()),
            dispatch(getReminders()),
        ]);
    };

    fetchData();
}, [dispatch])
```
In this section, I use the useEffect hook to fetch data from our backend when the component first loads. I use Promise.all to ensure that our setIsLoading function does not change the loading state until all of our dispatch functions have completed their asynchronous operations.

```
// Rendering the component
if (isLoading) {
    return (
        <div className='loading-message-container'>
            <h2 className='loading-message'>Loading...</h2>
        </div>
    )
}

return (
    <div className='home-container'>
        ...
    )
}
```
Finally, in the rendering part of our component, I first check if the component is still in its loading state. If so, I render a simple "Loading..." message. Once loading is complete, the full component renders, displaying all the features of the application to the user.

## Documents
- [Feature List](https://github.com/isaiahxs/Epic-E-Shop/wiki/Features)
- [Figma Wireframes](https://github.com/isaiahxs/Epic-E-Shop/wiki/Figma-Wireframes)
- [React Components List](link_to_react_components_list_here)
- [Database Schema](https://github.com/isaiahxs/Epic-E-Shop/wiki/Database-Schema)
- [Frontend Routes](https://github.com/isaiahxs/Epic-E-Shop/wiki/Front-End-Routes)
- [API Routes](https://github.com/isaiahxs/Epic-E-Shop/wiki/API-Routes)
- [Redux Store Tree](https://github.com/isaiahxs/Epic-E-Shop/wiki/Redux-State)

## About Me
![image](https://github.com/isaiahxs/Epic-E-Shop/assets/107521578/6d486df4-647e-42bf-9e44-13bcdcf3e92e)
![image](https://github.com/isaiahxs/Epic-E-Shop/assets/107521578/e5b0bd3a-2160-4787-baea-40dd13bd3931)

## Installation

## Getting started
1. Clone this repository (only this branch)

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.


## Deployment through Render.com

First, refer to your Render.com deployment articles for more detailed
instructions about getting started with [Render.com], creating a production
database, and deployment debugging tips.

From the [Dashboard], click on the "New +" button in the navigation bar, and
click on "Web Service" to create the application that will be deployed.

Look for the name of the application you want to deploy, and click the "Connect"
button to the right of the name.

Now, fill out the form to configure the build and start commands, as well as add
the environment variables to properly deploy the application.

### Part A: Configure the Start and Build Commands

Start by giving your application a name.

Leave the root directory field blank. By default, Render will run commands from
the root directory.

Make sure the Environment field is set set to "Python 3", the Region is set to
the location closest to you, and the Branch is set to "main".

Next, add your Build command. This is a script that should include everything
that needs to happen _before_ starting the server.

For your Flask project, enter the following command into the Build field, all in
one line:

```shell
# build command - enter all in one line
npm install --prefix react-app &&
npm run build --prefix react-app &&
pip install -r requirements.txt &&
pip install psycopg2 &&
flask db upgrade &&
flask seed all
```

This script will install dependencies for the frontend, and run the build
command in the __package.json__ file for the frontend, which builds the React
application. Then, it will install the dependencies needed for the Python
backend, and run the migration and seed files.

Now, add your start command in the Start field:

```shell
# start script
gunicorn app:app
```

_If you are using websockets, use the following start command instead for increased performance:_

`gunicorn --worker-class eventlet -w 1 app:app`

### Part B: Add the Environment Variables

Click on the "Advanced" button at the bottom of the form to configure the
environment variables your application needs to access to run properly. In the
development environment, you have been securing these variables in the __.env__
file, which has been removed from source control. In this step, you will need to
input the keys and values for the environment variables you need for production
into the Render GUI.

Click on "Add Environment Variable" to start adding all of the variables you
need for the production environment.

Add the following keys and values in the Render GUI form:

- SECRET_KEY (click "Generate" to generate a secure secret for production)
- FLASK_ENV production
- FLASK_APP app
- SCHEMA (your unique schema name, in snake_case)
- REACT_APP_BASE_URL (use render.com url, located at top of page, similar to
  https://this-application-name.onrender.com)

In a new tab, navigate to your dashboard and click on your Postgres database
instance.

Add the following keys and values:

- DATABASE_URL (copy value from Internal Database URL field)

_Note: Add any other keys and values that may be present in your local __.env__
file. As you work to further develop your project, you may need to add more
environment variables to your local __.env__ file. Make sure you add these
environment variables to the Render GUI as well for the next deployment._

Next, choose "Yes" for the Auto-Deploy field. This will re-deploy your
application every time you push to main.

Now, you are finally ready to deploy! Click "Create Web Service" to deploy your
project. The deployment process will likely take about 10-15 minutes if
everything works as expected. You can monitor the logs to see your build and
start commands being executed, and see any errors in the build process.

When deployment is complete, open your deployed site and check to see if you
successfully deployed your Flask application to Render! You can find the URL for
your site just below the name of the Web Service at the top of the page.

[Render.com]: https://render.com/
[Dashboard]: https://dashboard.render.com/

## License
[MIT](https://choosealicense.com/licenses/mit/)
