# irlQuests

irlQuests aims to make a boring task list into a fun quest! A user provides their list of tasks and a few rewards that will keep them motivated. As they knock out their to-do's, they earn points and unlock rewards.


## Features
**User Authentication**
- Users can create an account
- Once an account is created, users can return and sign in

**User Profile**
- When signed in, a user is brought to a profile page
- A user sees a list of their quests
User stats are displayed: 
- how many quests have been completed 
- the total number of tasks checked off
- a visual history of tasks completed over the past 60 days

**Quests**
- A user creates quest and adds tasks and rewards
- When tasks and rewards are created, a point value is assigned
- When tasks are checked off, points are added to the quest's current points total
- When there are enough points, rewards become available
- When rewards are used, points are deducted from the current total
- If a task or reward was clicked by mistake, a user an uncheck a task or "undo" using a reward
- Quests, tasks, and rewards can be deleted by the user

![Screenshot 2023-02-27 at 1 39 26 AM](https://user-images.githubusercontent.com/98292550/221500230-97d1b26f-d007-4af3-a1e5-071bf619ddf5.png)


## Installation
After cloning the repo, install the packages.
```
$ yarn install
```
Then initialize the database.
```
$ createdb life-quests_development
$ cd server
$ yarn migrate:latest
$ yarn db:seed
$ cd ..
```
Run the application.
```
$ yarn run dev
```
Visit `localhost:3000` in your browser.

## Technologies Used
Front End: React, JavaScript, Sass/CSS, HTML

Back End: Node.js, Express, Objection.js, Knex.js

Additional libraries: react-icons, dnd-kit (React), nivo (D3/React) date-fns (JS/Node)

## Future Features
- Move forms into popup modals
- Create edit forms for quests, tasks, and rewards
- Add a progress bar for quests
- Reorganize the point system and create rewards that unlock when all tasks have been completed
- Add Google Calendar integration
