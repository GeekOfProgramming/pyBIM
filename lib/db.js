// Mock DB returning empty arrays to prevent frontend crashes
// Admin and Prisma have been completely removed from this phase of the project
export const db = {
  project: { findMany: async () => [], findUnique: async () => null },
  teamMember: { findMany: async () => [] },
  jobPosition: { findMany: async () => [], findUnique: async () => null },
};
