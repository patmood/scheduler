# Scheduler App

Scheduling Web app using the Koa framework.

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
    - support hero (user)
    - isHoliday

2. Commands
  - load starting order and initial users (list of user names) - Loop over create user & set support command
  - set unavailable day (user, day)
  - set available day (user, day)
  - create user (user)
  - remove user (user)
  - set support hero (user, day)
  - swap support hero (user1, user2, day1, day2)

3. Queries
  - get todays support hero
  - get schedule for user (including unavailable days)
  - get each day's support hero (iteration of today support)
  - get full schedule of users available on a day
