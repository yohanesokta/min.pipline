# Min Pipeline

A lightweight CI/CD engine designed for simplicity and full control. `min-pipeline` acts as a webhook receiver that triggers local scripts (e.g., Bash) whenever a code push occurs. It's minimalist, fast, and powerful without the bloat of traditional CI/CD systems.

## 🚀 Features

- **Lightweight:** Minimal overhead, runs as a simple Node.js process.
- **Script-Driven:** Define your automation logic in simple Bash scripts.
- **Secure:** HMAC-SHA256 signature verification for GitHub webhooks.
- **Real-time Logs:** Monitor activities with structured logging.
- **Tunneling Support:** Built-in `tunnelmole` support for local testing.

## 🛠️ Setup

### 1. Installation

Install `min-pipeline` globally via npm:

```bash
npm install -g min-pipeline
```

Or clone and install locally:

```bash
git clone https://github.com/yohanesokta/min-pipeline.git
cd min-pipeline
npm install
```

### 2. Configure Environment

Set your `APP_SECRET` for webhook verification. If not set, a random secret will be generated on startup.

```bash
export APP_SECRET="your-very-secure-secret"
export APP_PORT=9013  # Optional, defaults to 9013
```

### 3. Prepare Your Scripts

Place your automation scripts in the `scripts/` directory. By default, it looks for `push.sh` for push events.

```bash
chmod +x scripts/*.sh
```

### 4. Start the Engine

```bash
# Basic start
min-pipeline

# Start with tunnel (for local development)
min-pipeline tunnel=true
```

## 🔗 GitHub Integration

1.  Navigate to your repository: **Settings > Webhooks > Add webhook**.
2.  **Payload URL:** `http://your-server-ip:9013/webhook`.
3.  **Content type:** `application/json`.
4.  **Secret:** Use the same `APP_SECRET` defined in your environment.
5.  **Events:** Select `Just the push event` or any events you wish to handle.

## 📜 Script Parameters

When a script is triggered, `min-pipeline` passes the following arguments:

- `$1`: Branch name (e.g., `main`)
- `$2`: Repository Clone URL
- `$3`: Full Repository Name (e.g., `user/repo`)
- `$4`: SSH URL
- `$5`: Forced Push (boolean)
- `$6`: Pusher Name

## 🏗️ Tech Specs

- **Runtime:** Node.js (Express)
- **Security:** HMAC-SHA256 Verification
- **Logging:** Winston (logs to `logs.json`)
- **Proxy:** Tunnelmole (optional)

---

**License:** MIT  
**Author:** Yohanes Oktanio
