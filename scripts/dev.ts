import { spawn } from 'node:child_process';
import { watch } from 'node:fs';
import { existsSync } from 'node:fs';
const executable = process.execPath;
async function build() {
  await new Promise<void>((done, reject) => {
    const process = spawn(executable, ['--import', 'tsx', 'scripts/build.ts'], { stdio: 'inherit' });
    process.on('exit', code => code === 0 ? done() : reject(new Error(`Build exited ${code}`)));
  });
}
await build();
const server = spawn(executable, ['--import', 'tsx', 'scripts/serve.ts', '--port', '5173'], { stdio: 'inherit' });
let busy = false;
for (const directory of ['src', 'scripts']) if (existsSync(directory)) watch(directory, { recursive: true }, () => {
  if (busy) return; busy = true;
  setTimeout(() => { void build().catch(console.error).finally(() => { busy = false; }); }, 300);
});
process.on('SIGINT', () => { server.kill(); process.exit(); });
