import { createClient } from "microcms-js-sdk";
import type { Product, Skill } from "@/types/microcms";

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN!,
  apiKey: process.env.MICROCMS_API_KEY!,
});

export async function getProducts() {
  const data = await client.getList<Product>({
    endpoint: "products",
  });
  return data;
}

export async function getProduct(id: string) {
  const data = await client.getListDetail<Product>({
    endpoint: "products",
    contentId: id,
  });
  return data;
}

export async function getSkills() {
  const data = await client.getList<Skill>({
    endpoint: "skills",
    queries: { limit: 100 },
  });
  return data;
}
