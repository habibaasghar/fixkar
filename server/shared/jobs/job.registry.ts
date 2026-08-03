import { JobDefinition } from "./job.types";

const jobs = new Map<string, JobDefinition>();

export function registerJob(job: JobDefinition): void {
  if (jobs.has(job.name)) {
    throw new Error(`Job "${job.name}" is already registered.`);
  }
  jobs.set(job.name, job);
}

export function getJob(name: string): JobDefinition | undefined {
  return jobs.get(name);
}

export function listJobs(): { name: string; description: string }[] {
  return [...jobs.values()].map((j) => ({ name: j.name, description: j.description }));
}
