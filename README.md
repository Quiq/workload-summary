# Workload Summary Dashboard

A dashboard that shows your current queues.

### Dependencies

1. NodeJS - Version 10.16.3
2. Yarn - Version 1.17.3

### Build - Dashboard

Temporary Build Step: Add your Font Awesome token to the end of the second line of `./.npmrc`. This step is temporary since the icons will be replaced with free icons in an upcoming release.

1. Open terminal and navigate to the application's root directory.
2. Run `yarn build`.
3. A new directory will be created at `./build/`.

### Build - Server

No steps needed to build server. It is ready to run using NodeJS.

### ngrok

You can use your own [ngrok](https://ngrok.com/) account to expose a local server to the public web.

1. Sign up for the appropriate account.
2. Download the ngrok application.
3. Add your ngrok account token to the ngrok.yml file: `./ngrok authtoken {YOUR_TOKEN}`.
4. Start ngrok: `./ngrok http 3000`.
5. Start the Workload Summary server (see below).

### Start Workload Summary Server

1. Register your public URL (see above for ngrok) in Admin UI under the "Webhooks" section: `/app/admin/webhooks`.
2. Copy your secret hook token by clicking the button title "Show Secret" on the Webhook page.
3. Open a terminal window and change your directory to `app_root_dir/build`.
4. Run the following command while replacing _HOOK_TOKEN_ with your own secret token: `HOOK_TOKEN="your-secret-token" node ../server/main.js`.
5. The server will run at `http://localhost:3000`.
