import request from 'request';
import QuiqSocket, {Events as QuiqSocketEvents} from 'quiq-socket';
import {WorkloadSummary} from '../types/dashboard';

//
//
//------------------------- Private Methods -------------------------//
async function fetchWorkloadSummary(): Promise<WorkloadSummary> {
  return await new Promise((resolve, reject) => {
    request(
      `${window.location.protocol}//${window.location.host}/current`,
      (error, response, body) => {
        let parsedBody: WorkloadSummary | null = null;

        if (error) {
          reject(error);
        }

        if (typeof body === 'string' && body.trim() !== '') {
          try {
            parsedBody = JSON.parse(body);
          } catch (exception) {
            reject(exception);
          }
        }

        resolve(parsedBody);
      },
    );
  });
}

function handleFatalError(event) {
  console.error('Websocket fatal error.', event);
}

function handleConnectionLoss(event) {
  console.warn('Websocket connection lost.', event);
}

//
//
//------------------------- Public API -------------------------//
export function connect(callback: (workloadSummary: WorkloadSummary) => void): void {
  // Fetch the current workload summary
  fetchWorkloadSummary().then(callback);

  // Setup websocket that subscribes to all workload summary changes
  let websocketProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  let websocketURL = `${websocketProtocol}//${window.location.host}/connect`;

  let quiqSocket = new QuiqSocket()
    .withURL(websocketURL)
    .addEventListener(QuiqSocketEvents.FATAL_ERROR, handleFatalError)
    .addEventListener(QuiqSocketEvents.CONNECTION_LOSS, handleConnectionLoss)
    .addEventListener(QuiqSocketEvents.MESSAGE, (data: WorkloadSummary) => {
      callback(data);
    });

  quiqSocket.connect();
}

export default connect;
