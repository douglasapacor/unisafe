import { normalizeObjectId } from "../lib/normalizeObjectId";
import { getAccessModel } from "../models/access";

const handle = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}): Promise<{
  list: {
    name: string;
    tag: string;
    path: string;
    icon: string;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
    _id: string;
  }[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}> => {
  try {
    const safeLimit = Math.min(Math.max(limit, 1), 100);
    const safePage = Math.max(page, 1);
    const offset = (safePage - 1) * safeLimit;

    const model = await getAccessModel();

    const [items, total] = await Promise.all([
      model.find(
        {},
        { sort: { createdAt: -1 }, skip: offset, limit: safeLimit },
      ),
      model.countDocuments({}),
    ]);

    return {
      list: normalizeObjectId(items),
      meta: {
        page: safePage,
        limit: safeLimit,
        total,
        totalPages: Math.ceil(total / safeLimit),
      },
    };
  } catch (error) {
    throw error;
  }
};

export default handle;
