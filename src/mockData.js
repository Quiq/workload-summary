import type {WorkloadSummaryEvent} from './types/Dashboard';

// export const agents = [
//   {
//     id: 'bill-oneill',
//     firstname: 'Bill',
//     lastname: "O'Neill",
//     username: "Bill O'Neill",
//     roles: ['everyone', 'sales'],
//     profilePicture: 'https://imgur.com/0OAbAe9',
//     availabilityRate: 0.9,
//   },
//   {
//     id: 'mike-myer',
//     firstname: 'Mike',
//     lastname: 'Myer',
//     username: 'Mike Myer',
//     roles: ['everyone', 'premium'],
//     profilePicture: 'https://imgur.com/d71mhCG',
//     availabilityRate: 0.9,
//   },
//   {
//     id: 'andrew-jenkins',
//     firstname: 'Andrew',
//     lastname: 'Jenkins',
//     username: 'Andrew Jenkins',
//     roles: ['everyone', 'sales'],
//     profilePicture: 'https://imgur.com/5bVkHdx',
//     availabilityRate: 0.8,
//   },
//   {
//     id: 'dani-wanderer',
//     firstname: 'Dani',
//     lastname: 'Wanderer',
//     username: 'Dani Wanderer',
//     roles: ['everyone', 'premium'],
//     profilePicture: 'https://imgur.com/XvMMa2N',
//     availabilityRate: 0.8,
//   },
//   {
//     id: 'jesse-romine',
//     firstname: 'Jesse',
//     lastname: 'Romine',
//     username: 'Jesse Romine',
//     roles: ['everyone', 'sales'],
//     profilePicture: 'https://imgur.com/q7CxbAx',
//     availabilityRate: 0.7,
//   },
//   {
//     id: 'michael-hartsog',
//     firstname: 'Michael',
//     lastname: 'Hartsog',
//     username: 'Michael Hartsog',
//     roles: ['everyone', 'premium'],
//     profilePicture: 'https://imgur.com/wGFSVzz',
//     availabilityRate: 0.7,
//   },
//   {
//     id: 'dawn-sampson',
//     firstname: 'Dawn',
//     lastname: 'Sampson',
//     username: 'Dawn Sampson',
//     roles: ['everyone', 'support'],
//     profilePicture: 'https://imgur.com/bqLgd4c',
//     availabilityRate: 0.9,
//   },
//   {
//     id: 'matt-west',
//     firstname: 'Matt',
//     lastname: 'West',
//     username: 'Matt West',
//     roles: ['everyone', 'support'],
//     profilePicture: 'https://imgur.com/DE0sUsB',
//     availabilityRate: 0.8,
//   },
//   {
//     id: 'gretchen-dickie',
//     firstname: 'Gretchen',
//     lastname: 'Dickie',
//     username: 'Gretchen Dickie',
//     roles: ['everyone', 'support'],
//     profilePicture: 'https://imgur.com/IhyCjuG',
//     availabilityRate: 0.7,
//   },
//   {
//     id: 'marciela-ross',
//     firstname: 'Marciela',
//     lastname: 'Ross',
//     username: 'Marciela Ross',
//     roles: ['everyone', 'premium'],
//     profilePicture: 'https://imgur.com/HXVaFhQ',
//     availabilityRate: 0.6,
//   },
// ];

export const queues = [
  {
    id: 'support',
    label: 'Support',
    members: ['support'],
    totalSeed: 100,
    waitingSeed: 25,
    estimatedWaitTimeSeed: 80000,
  },
  {
    id: 'returns',
    label: 'Returns',
    members: ['sales'],
    totalSeed: 50,
    waitingSeed: 10,
    estimatedWaitTimeSeed: 60000,
  },
  {
    id: 'renewals',
    label: 'Renewals',
    members: ['everyone'],
    totalSeed: 40,
    waitingSeed: 7,
    estimatedWaitTimeSeed: 50000,
  },
  // {
  //   id: 'premium',
  //   label: 'Premium',
  //   members: ['premium'],
  //   totalSeed: 250,
  //   waitingSeed: 10,
  //   estimatedWaitTimeSeed: 20000,
  // },
  // {
  //   id: 'support',
  //   label: 'Support',
  //   members: ['support'],
  //   totalSeed: 450,
  //   waitingSeed: 40,
  //   estimatedWaitTimeSeed: 125000,
  // },
];

export const roles = [
  {
    id: 'everyone',
    label: 'Everyone',
  },
  {
    id: 'sales',
    label: 'Sales',
  },
  {
    id: 'premium',
    label: 'Premium',
  },
  {
    id: 'suppport',
    label: 'Support',
  },
];

const createGuid = (): string => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
};

const generateBareAgent = () => ({
  id: createGuid(),
  roles: ['everyone', roles[Math.ceil(Math.random() * 3)]],
  availabilityRate: Math.random() / 2 + 0.5,
});

const agents = [];
for (let i = 0; i < 50; i++) {
  agents.push(generateBareAgent());
}

let availableAgents = [],
  availableForExistingAgents = [],
  unavailableAgents = [];

const updateAgents = () => {
  availableAgents = [];
  availableForExistingAgents = [];
  unavailableAgents = [];
  agents.forEach(a => Math.random() <= a.availabilityRate && availableAgents.push(a));
  agents
    .filter(a => !availableAgents.map(aa => aa.id).includes(a.id))
    .forEach(a => Math.random() <= 0.5 && availableForExistingAgents.push(a));
  agents
    .filter(
      a =>
        !availableAgents.map(aa => aa.id).includes(a.id) &&
        !availableForExistingAgents.map(aa => aa.id).includes(a.id),
    )
    .forEach(a => unavailableAgents.push(a));
};

const updateQueues = () =>
  [...queues].map(q => {
    const waitingItems = Math.max(0, Math.floor(q.waitingSeed * (Math.random() * 0.2 + 0.9)));
    let itemsExceedingFiveMinutes = 0;
    for (let i = 0; i < waitingItems; i++) {
      if (Math.random() > 0.88) {
        itemsExceedingFiveMinutes++;
      }
    }

    return {
      queue: q.label,
      agentsSummary: {
        available: [...availableAgents.filter(a => a.roles.some(r => q.members.includes(r)))].map(
          a => a.id,
        ),
        unavailable: [
          ...unavailableAgents.filter(a => a.roles.some(r => q.members.includes(r))),
        ].map(a => a.id),
        availableForExisting: [
          ...availableForExistingAgents.filter(a => a.roles.some(r => q.members.includes(r))),
        ].map(a => a.id),
      },
      totalItems: Math.max(0, Math.floor(q.totalSeed * (Math.random() * 0.2 + 0.9))),
      waitingItems,
      estimatedWaitTime: Math.max(
        0,
        Math.floor(q.estimatedWaitTimeSeed * (Math.random() * 0.2 + 0.9)),
      ),
      itemsExceedingFiveMinutes,
    };
  });

const generateSummary = (timestamp?: number): WorkloadSummaryEvent => {
  updateAgents();
  const queueSummaries = updateQueues();

  return {
    eventType: 'WorkloadSummary',
    data: {
      agentsSummary: {
        available: [...availableAgents.map(a => a.id)],
        unavailable: [...unavailableAgents.map(a => a.id)],
        availableForExisting: [...availableForExistingAgents.map(a => a.id)],
      },
      queueSummaries,
      totalItems: queueSummaries.map(q => q.totalItems).reduce((a, b) => a + b),
      waitingItems: queueSummaries.map(q => q.waitingItems).reduce((a, b) => a + b),
    },
    id: createGuid(),
    timestamp: timestamp || Date.now(),
  };
};

// Generate 1 hour's worth of history
const generateHistory = (): Array<WorkloadSummaryEvent> => {
  const now = Date.now();
  const summaries: Array<WorkloadSummaryEvent> = [];
  for (let i = 0; i < 60; i++) {
    summaries.push(generateSummary(now - i * 60000));
  }
  return summaries.reverse();
};

let connected;
export const connect = (callback: (updates: Array<WorkloadSummaryEvent>) => any) => {
  if (connected) return;
  connected = true;

  setInterval(() => {
    callback([generateSummary()]);
  }, 30000);

  callback(generateHistory());
  setTimeout(() => {
    callback([generateSummary()]);
  }, 1000);
};

export default connect;
