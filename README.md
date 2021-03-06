# Scheduler App

Scheduling Web app using the Koa framework.

Streaming big pipe style rendering.

Journal/Command style architecture

run server: `nodemon -q -x 'clear & ./run db-reset & npm start'`
build and watch js: `./run watch`
reset and seed database: `./run db-reset`


# Specs

- Display person scheduled for today
- View month's schedule for a given person
- View full schedule for all people
- Users can mark unavailable days (Californian holidays are accounted for)
- Users can swap days

# Architecture

1. Entities
  - User (identified by uuid)
    - name
    - days unavailable

  - Day (identified by timestamp)
    - assigned waterer (user)
    - isHoliday

2. Commands
  - load starting order and initial users (list of user names) - Loop over create user & set support command
  - set unavailable day (user, day)
  - set available day (user, day)
  - create user (user)
  - remove user (user)
  - set assigned waterer (user, day)
  - swap assigned waterer (user1, user2, day1, day2)

3. Queries
  - get todays assigned waterer
  - get schedule for user (including unavailable days)
  - get each day's assigned waterer (iteration of today support)
  - get full schedule of users available on a day

# Issues

- Cant require .jsx files with browserify
- Best place to bootstrap server rendered data? Once globally or scoped to individual component

# TODO

- Move optimistic update rollbacks to middleware in reducer
- Persist all other actions optimistically
- Method to fetch all 'ASSIGN_DAY' commands from db and find latest
- Dispatch command to assign next day to the least assigned person
- Repeat until days are assigned up to 30 days ahead
- Run the command with setInterval daily
