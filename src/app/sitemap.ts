import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { serviceCategories } from "@/content/services";
import { solutions } from "@/content/solutions";
import { demos } from "@/content/demos";
import { projects } from "@/content/work";
import { industries } from "@/content/industries";
import { companyPages } from "@/content/company";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const staticRoutes = [
    "",
    "/services",
    "/solutions",
    "/industries",
    "/demo-lab",
    "/work",
    "/resources",
    "/company",
    "/start",
    "/contact",
    "/privacy",
    "/terms",
  ];

  const routes: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: `${base}${r}`,
    lastModified: new Date("2026-07-16"),
  }));

  serviceCategories.forEach((c) => {
    routes.push({ url: `${base}/services/${c.slug}` });
    c.services.forEach((s) =>
      routes.push({ url: `${base}/services/${c.slug}/${s.slug}` }),
    );
  });
  solutions.forEach((s) => routes.push({ url: `${base}/solutions/${s.slug}` }));
  demos.forEach((d) => routes.push({ url: `${base}/demo-lab/${d.slug}` }));
  projects.forEach((p) => routes.push({ url: `${base}/work/${p.slug}` }));
  industries.forEach((i) => routes.push({ url: `${base}/industries/${i.slug}` }));
  companyPages.forEach((c) => routes.push({ url: `${base}/company/${c.slug}` }));

  return routes;
}
