const {isNullUndefinedOrEmpty, isNotEmptyObject, isNotEmptyString} = require('./utils');
const {EVENT_TYPE_WORKLOAD_SUMMARY} = require('./constants');

//
//
//------------------------- Private State -------------------------//
let _workloadSummaryEvent = null;
const _onWorkloadSummaryChangeCallbacks = new Set();

//
//
//------------------------- Private Methods -------------------------//
function isWorkloadSummaryWebhook(event) {
  // Verifies:
  //  - eventType is a workload summary
  //  - An id exists
  //  - A timestamp exists
  // Ignoring
  //  - data
  return (
    isNotEmptyObject(event) &&
    isNotEmptyString(event.id) &&
    event.eventType === EVENT_TYPE_WORKLOAD_SUMMARY &&
    typeof event.timestamp === 'number'
  );
}

function isValidWorkloadSummary(workloadSummary) {
  return (
    isNotEmptyObject(workloadSummary) &&
    // Agent Summary
    isValidAgentsSummary(workloadSummary.agentsSummary) &&
    // Queue Summaries
    Array.isArray(workloadSummary.queueSummaries) &&
    workloadSummary.queueSummaries.every(isValidQueueSummary) &&
    // Metadata
    typeof workloadSummary.totalItems === 'number' &&
    typeof workloadSummary.waitingItems === 'number'
  );
}

function isValidQueueSummary(queueSummary) {
  return (
    isNotEmptyString(queueSummary.queue) &&
    isValidAgentsSummary(queueSummary.agentsSummary) &&
    typeof queueSummary.totalItems === 'number' &&
    typeof queueSummary.waitingItems === 'number'
  );
}

function isValidAgentsSummary(agentsSummary) {
  return (
    isNotEmptyObject(agentsSummary) &&
    Array.isArray(agentsSummary.available) &&
    Array.isArray(agentsSummary.unavailable) &&
    Array.isArray(agentsSummary.availableForExisting)
  );
}

//
//
//------------------------- Public API -------------------------//
module.exports = {
  addWorkloadSummaryEvent: function addWorkloadSummaryEvent(event) {
    // Validate
    if (!isWorkloadSummaryWebhook(event)) {
      throw new Error(
        'Unable to add the workload summary. The request is not a Workload Summary event.',
      );
    }

    if (!isValidWorkloadSummary(event.data)) {
      throw new Error("Unable to add the workload summary. The event's data is not valid.");
    }

    // Only update if the event has changed
    if (isNullUndefinedOrEmpty(_workloadSummaryEvent) || _workloadSummaryEvent.id !== event.id) {
      _workloadSummaryEvent = event;

      // Notify subscribers
      _onWorkloadSummaryChangeCallbacks.forEach(callback => {
        if (typeof callback === 'function') {
          callback(event.data);
        }
      });
    }
  },
  getWorkloadSummary: function getCurrentWorkloadSummary() {
    return isNotEmptyObject(_workloadSummaryEvent) ? _workloadSummaryEvent.data : null;
  },
  addEventListener: function addEventListener(callback) {
    if (typeof callback !== 'function') {
      throw new Error(
        "Unable to add the callback for the 'workload summary change' event. The callback is not a function.",
      );
    }

    _onWorkloadSummaryChangeCallbacks.add(callback);
  },
  removeEventListener: function removeEventListener(callback) {
    _onWorkloadSummaryChangeCallbacks.delete(callback);
  },
};
