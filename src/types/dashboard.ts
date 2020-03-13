export type AgentsSummary = {
  available: string[];
  unavailable: string[];
  availableForExisting: string[];
};

export type QueueSummary = {
  queue: string;
  agentsSummary: AgentsSummary;
  totalItems: number;
  waitingItems: number;
  estimatedWaitTime: number;
  itemsExceedingFiveMinutes: number;
};

export type WorkloadSummary = {
  agentsSummary: AgentsSummary;
  queueSummaries: QueueSummary[];
  totalItems: number;
  waitingItems: number;
};

export type WorkloadSummaryEvent = {
  eventType: 'WorkloadSummary';
  data: WorkloadSummary;
  id: string;
  timestamp: number;
};
