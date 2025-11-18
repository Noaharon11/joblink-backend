import Job, { IJob, JobType } from "../models/job.model";

export interface CreateJobInput {
  title: string;
  company: string;
  description: string;
  location: string;
  type?: JobType;
  salaryMin?: number;
  salaryMax?: number;
  requiredSkills?: string[];
}

export interface JobFilters {
  location?: string;
  type?: JobType;
  isActive?: boolean;
}

export const createJob = async (
  jobData: CreateJobInput,
  userId: string
): Promise<IJob> => {
  const {
    title,
    company,
    description,
    location,
    type,
    salaryMin,
    salaryMax,
    requiredSkills,
  } = jobData;

  if (!title || !company || !description || !location) {
    const error = new Error(
      "Title, company, description and location are required"
    );
    (error as any).statusCode = 400;
    throw error;
  }

  const job = await Job.create({
    title,
    company,
    description,
    location,
    type: type || "full-time",
    salaryMin,
    salaryMax,
    requiredSkills: requiredSkills || [],
    createdBy: userId,
    isActive: true,
  });

  return job;
};

export const getAllJobs = async (filters: JobFilters = {}): Promise<IJob[]> => {
  const query: any = {};

  if (filters.location) {
    query.location = filters.location;
  }

  if (filters.type) {
    query.type = filters.type;
  }

  if (typeof filters.isActive !== "undefined") {
    query.isActive = filters.isActive;
  }

  const jobs = await Job.find(query).sort({ createdAt: -1 });
  return jobs;
};

export const getJobById = async (jobId: string): Promise<IJob> => {
  const job = await Job.findById(jobId);

  if (!job) {
    const error = new Error("Job not found");
    (error as any).statusCode = 404;
    throw error;
  }

  return job;
};
