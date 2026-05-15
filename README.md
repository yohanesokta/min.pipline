# min-pipeline

A high-performance, minimalist event-driven automation engine. `min-pipeline` serves as a lightweight bridge between GitHub webhooks and local shell scripts, enabling seamless CI/CD workflows with zero infrastructure bloat.

## Overview

`min-pipeline` is designed for developers who require absolute control over their deployment pipelines without the complexity of traditional CI/CD platforms. It functions as a dedicated webhook listener that validates incoming requests and executes corresponding automation logic based on the event type.

## System Architecture

The engine operates on a simple but robust execution flow:

1.  **Ingress:** The server listens for POST requests on the `/webhook` endpoint.
2.  **Authentication:** Every payload is verified using HMAC-SHA256 signatures against a pre-shared `APP_SECRET`.
3.  **Routing:** The engine maps the `X-GitHub-Event` header to a specific script in the `scripts/` directory (e.g., a `push` event triggers `push.sh`).
4.  **Execution:** A subprocess is spawned to execute the script, passing critical metadata (branch, repository URLs, pusher info) as positional arguments.
5.  **Observability:** All execution streams (stdout/stderr) and event metadata are captured via structured logging.

## Getting Started

### Installation

`min-pipeline` can be installed globally for system-wide access or managed as a local project dependency.

```bash
# Global installation
npm install -g min-pipeline

# Local development setup
git clone https://github.com/yohanesokta/min-pipeline.git
cd min-pipeline
npm install
```

### Configuration

Operational parameters are managed through environment variables to ensure secure and flexible deployments.

| Variable | Description | Default |
| :--- | :--- | :--- |
| `APP_SECRET` | Secret key for GitHub webhook signature validation. | *Randomly generated* |
| `APP_PORT` | The port on which the server listens for requests. | `9013` |
| `SCRIPT_DIR` | Directory containing the automation scripts. | `./scripts/` |
| `CUSTOM_DOMAIN` | Target domain when running with Tunnelmole. | `null` |

## Webhook Integration

To connect your repository, configure a new webhook in your GitHub settings:

- **Payload URL:** `http://<your-server-address>:<port>/webhook`
- **Content type:** `application/json`
- **Secret:** The value of your `APP_SECRET`
- **SSL Verification:** Recommended for production environments

### Script Interface

When an event triggers a script, the following positional parameters are available:

- `$1`: Target Branch (e.g., `main`)
- `$2`: Repository Clone URL (HTTPS)
- `$3`: Full Repository Name (`owner/repo`)
- `$4`: SSH Clone URL
- `$5`: Force Push Status (`true`/`false`)
- `$6`: Pusher Username

## Security and Validation

Security is a core priority. `min-pipeline` implements `crypto.timingSafeEqual` to prevent timing attacks during signature verification. Requests without a valid `X-Hub-Signature-256` or those failing the HMAC check are rejected with a `401 Unauthorized` status.

## Monitoring

Activities are logged to `logs.json` using a structured JSON format, facilitating integration with log aggregators. During development, the console transport provides colorized, human-readable output for real-time debugging.

---

**License:** MIT  
**Author:** Yohanes Oktanio
