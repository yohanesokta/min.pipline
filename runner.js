import { spawn } from "child_process"
const cwd = process.env.SCRIPT_DIR ?? "./scripts/";

export async function push_event(script_name, payload) {
  let args = [];
  const branch = payload.ref.replace("refs/heads/", "");
  args.push(
    script_name,
    branch,
    payload.repository.clone_url,
    payload.repository.full_name,
    payload.repository.ssh_url,
    payload.forced,
    payload.pusher.name
  )

  const ev_proc = spawn("bash", args, { cwd });

  ev_proc.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  ev_proc.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  ev_proc.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
}
