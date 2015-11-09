export const entries = [
  {
    type: 'CREATE_USER',
    ts: {
      type: 'timestamp',
      value: 0,
    },
    facts: [
      ['assert', /* Patrick */ { type: 'uuid', value: 0 }, 'user/name', 'Patrick'],
    ],
  },
  {
    type: 'CREATE_USER',
    ts: {
      type: 'timestamp',
      value: 1,
    },
    facts: [
      ['assert', /* Denton */ { type: 'uuid', value: 1 }, 'user/name', 'Denton'],
    ],
  },
  {
    type: 'ASSIGN_DAY',
    ts: {
      type: 'timestamp',
      value: 2,
    },
    facts: [
      ['assert', /* Monday */ { type: 'day', value: 0 }, 'day/user', /* Patrick */ { type: 'uuid', value: 0 }],
    ],
  },
  {
    type: 'ASSIGN_DAY',
    ts: {
      type: 'timestamp',
      value: 3,
    },
    facts: [
      ['assert', /* Tuesday */ { type: 'day', value: 1 }, 'day/user', /* Denton */ { type: 'uuid', value: 1 }],
    ],
  },
  {
    type: 'ASSIGN_HOLIDAY',
    ts: {
      type: 'timestamp',
      value: 4,
    },
    facts: [
      ['assert', /* Wednesday */ { type: 'day', value: 2 }, 'day/holidayName', 'Colombus day'],
    ],
  },
  {
    type: 'UNASSIGN_HOLIDAY',
    ts: {
      type: 'timestamp',
      value: 5,
    },
    facts: [
      ['retract', /* Wednesday */ { type: 'day', value: 2 }, 'day/holidayName'],
    ],
  },
  {
    type: 'ASSIGN_UNAVAILABILITY',
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
    type: 'UNASSIGN_UNAVAILABILITY',
    ts: {
      type: 'timestamp',
      value: 7,
    },
    facts: [
      ['retract', { type: 'uuid', value: 2 }],
    ],
  },
  {
    type: 'SWAP_ASSIGNMENT',
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
