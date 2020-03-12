const path = require('path');
const morgan = require('morgan');
const manager = require('./manager');

// Express + Websockets
const express = require('express');
const app = express();
const expressWebsocket = require('express-ws')(app);

app.use(morgan('combined'));
app.use(express.static('build'));

// Single JSON Parser Instance
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

//
//
//------------------------- Server State -------------------------//
let _hookToken = '';

//
//
//------------------------- Endpoints -------------------------//
// GET - Browser Application
app.get('/', async (request, response) => {
  return response.sendFile(path.join(__dirname, '../build/index.html'));
});

// GET - Current Workload Summary
app.get('/current', async (request, response) => {
  return response.send(manager.getWorkloadSummary());
});

// Webhook - Workload Summary
app.post('/hooks/WorkloadSummary', bodyParser.json(), async (request, response) => {
  const event = request.body;

  let status = 204;
  let statusMessage = '';

  // Hook Token Validation - Request Header
  if (
    typeof request.headers['x-centricient-hook-token'] !== 'string' ||
    request.headers['x-centricient-hook-token'] !== _hookToken
  ) {
    status = 400;
    statusMessage = 'Invalid verification token provided';
  }

  // Attempt to add the workload summary event (if valid)
  else {
    try {
      manager.addWorkloadSummaryEvent(event);
    } catch (exception) {
      status = 500;
      statusMessage = exception.toString();
    }
  }

  // Return Response
  response.statusMessage = statusMessage;
  return response.status(status).end();
});

//
//
//------------------------- Websockets -------------------------//
app.ws('/connect', function(websocket, request) {
  function onWorkloadSummaryChange(data) {
    let serializedData = JSON.stringify(data);
    websocket.send(serializedData);
  }

  // Listen for changes
  manager.addEventListener(onWorkloadSummaryChange);

  // On close, remove the listener
  websocket.on('close', request => {
    console.log('ON CLOSE', request);
    manager.removeEventListener(onWorkloadSummaryChange);
  });
});

//
//
//------------------------- Start Server -------------------------//
app.listen(3000, function() {
  console.log('Server running on port 3000');

  // Hook Token Validation
  if (typeof process.env.HOOK_TOKEN !== 'string') {
    throw new Error("Unable to start the server.  No 'HOOK_TOKEN' environment variable was set.");
  }

  // Server State
  _hookToken = process.env.HOOK_TOKEN;
});
