export type AgentsSummary = {
  available: Array<string>,
  unavailable: Array<string>,
  availableForExisting: Array<string>,
};

export type QueueSummary = {
  queue: String,
  agentsSummary: AgentsSummary,
  totalItems: number,
  waitingItems: number,
  estimatedWaitTime: number,
  itemsExceedingFiveMinutes: number,
};

export type WorkloadSummary = {
  agentsSummary: AgentsSummary,
  queueSummaries: Array<QueueSummary>,
  totalItems: number,
  waitingItems: number,
};

export type WorkloadSummaryEvent = {
  eventType: 'WorkloadSummary',
  data: WorkloadSummary,
  id: string,
  timestamp: number,
};
