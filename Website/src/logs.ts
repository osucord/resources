import { exec } from 'child-process-promise';

function padNumber(number: number): string {
  return number.toString().padStart(2, '0');
}

export async function getLastCommitDate() {
  const { stdout } = await exec('git log -1 --pretty=format:"%ad" --date=iso');
  const date = new Date(stdout);
  return `${date.getFullYear()}-${padNumber(date.getMonth() + 1)}-${padNumber(date.getDate())}`;
}