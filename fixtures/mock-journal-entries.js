export const entries = [
  {
    name: 'CREATE_USER',
    ts: {
      type: 'timestamp',
      value: 0,
    },
    facts: [
      ['assert', /* Patrick */ { type: 'uuid', value: 0 }, 'user/name', 'Patrick'],
    ],
  },
  {
    name: 'CREATE_USER',
    ts: {
      type: 'timestamp',
      value: 1,
    },
    facts: [
      ['assert', /* Denton */ { type: 'uuid', value: 1 }, 'user/name', 'Denton'],
    ],
  },
  {
    name: 'ASSIGN_DAY',
    ts: {
      type: 'timestamp',
      value: 2,
    },
    facts: [
      ['assert', /* Monday */ { type: 'day', value: 0 }, 'day/user', /* Patrick */ { type: 'uuid', value: 0 }],
    ],
  },
  {
    name: 'ASSIGN_DAY',
    ts: {
      type: 'timestamp',
      value: 3,
    },
    facts: [
      ['assert', /* Tuesday */ { type: 'day', value: 1 }, 'day/user', /* Denton */ { type: 'uuid', value: 1 }],
    ],
  },
  {
    name: 'ASSIGN_HOLIDAY',
    ts: {
      type: 'timestamp',
      value: 4,
    },
    facts: [
      ['assert', /* Wednesday */ { type: 'day', value: 2 }, 'day/holidayName', 'Colombus day'],
    ],
  },
  {
    name: 'UNASSIGN_HOLIDAY',
    ts: {
      type: 'timestamp',
      value: 5,
    },
    facts: [
      ['retract', /* Wednesday */ { type: 'day', value: 2 }, 'day/holidayName'],
    ],
  },
  {
    name: 'ASSIGN_UNAVAILABILITY',
    ts: {
      type: 'timestamp',
      value: 6,
    },
    facts: [
      ['assert', { type: 'uuid', value: 2 }, 'unavailability/user', /* Patrick */ { type: 'uuid', value: 0 }],
      ['assert', { type: 'uuid', value: 2 }, 'unavailability/day', /* Thursday */ { type: 'day', value: 3 }],
    ],
  },
  {
    name: 'UNASSIGN_UNAVAILABILITY',
    ts: {
      type: 'timestamp',
      value: 7,
    },
    facts: [
      ['retract', { type: 'uuid', value: 2 }],
    ],
  },
  {
    name: 'SWAP_ASSIGNMENT',
    ts: {
      type: 'timestamp',
      value: 8,
    },
    facts: [
      // Denton monday, patrick tuesday - Initiated by denton therefor denton unavailable tuesday
      ['assert', { type: 'day', value: 0 }, 'day/user', /* Denton */ { type: 'uuid', value: 1 }],
      ['assert', { type: 'day', value: 1 }, 'day/user', /* Patrick */ { type: 'uuid', value: 0 }],
      ['assert', { type: 'uuid', value: 3 }, 'unavailability/user', /* Denton */ { type: 'uuid', value: 1 }],
      ['assert', { type: 'uuid', value: 3 }, 'unavailability/day', /* Tuesday */ { type: 'day', value: 1 }],
    ],
  },
]
