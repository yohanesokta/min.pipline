import { spawn } from "child_process"

const cwd = process.env.SCRIPT_DIR ?? "./scripts/";

export async function push_event() {
  const ev_proc = spawn("bash", ["push.sh"], {
    cwd: cwd
  });

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
