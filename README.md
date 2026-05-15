# min.pipline

Lightweight CI/CD engine built for people who want straight-up control without the Jenkins bloat. This is basically a webhook receiver that triggers bash scripts whenever you push code. Minimalist, fast, and lowkey powerful.

## How it works

1. GitHub hits your `/webhook` endpoint with a push event.
2. The server verifies the HMAC signature using your `APP_SECRET`.
3. If the vibes are right, it spawns a bash script from the `scripts/` folder.
4. Arguments like branch name, repo URL, and pusher info are passed directly to your script.
5. Everything gets logged into `logs.json`.

## Setup

### 1. Installation

You can install `minpipline` globally using npm:

```bash
npm install -g minpipline
```

Alternatively, you can clone the repository and install dependencies locally:

```bash
git clone https://github.com/yohanesokta/min.pipline.git
cd min.pipline
npm install
```

### 2. Configure Environment
You need an `APP_SECRET` for GitHub webhook verification. If you don't set one, it'll generate a random string on boot, but you should probably set it yourself:
```bash
export APP_SECRET="your-very-secure-secret"
```

### 3. Prepare your scripts
Drop your automation logic into the `scripts/` directory. By default, it looks for `push.sh`. Make sure they are executable:
```bash
chmod +x scripts/*.sh
```

### 4. Fire it up
Start the engine:
```bash
node main.js
```

## GitHub Integration

1. Go to your repo Settings > Webhooks > Add webhook.
2. Payload URL: `http://your-server-ip:9013/webhook`.
3. Content type: `application/json`.
4. Secret: The same `APP_SECRET` you set in your env.
5. Events: Just the `push` event is fine for now.

## Tech Specs

- Engine: Node.js (Express)
- Security: HMAC-SHA256 signature verification
- Logging: Winston (logs to `logs.json`)
- Runtime: Child process spawning (Bash)

License: MIT
Author: Yohanes Oktanio
