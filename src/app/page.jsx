// src/app/page.js
import Banner from "@/components/home/Banner";
import ProjectOverview from "@/components/home/ProjectOverview";
import RoleFeatures from "@/components/home/RoleFeatures";
import DashboardPreview from "@/components/home/DashboardPreview";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import PopularCities from "@/components/home/PopularCities";
import CustomerReviews from "@/components/home/CustomerReviews";
import { serverFetch } from "@/lib/core/server";
import RecentlyAddedProperties from "@/components/home/RecentlyAddedProperties";

export default async function Home() {
  const featuredProperties = await serverFetch("/api/properties/featured");
  const recentProperties = await serverFetch("/api/properties/recent");
  return (
    <section className="min-h-screen bg-background">
      <Banner />
      <ProjectOverview />
      <RoleFeatures />
      <DashboardPreview />
      <FeaturedProperties featuredProperties={featuredProperties} />
      <WhyChooseUs />
      <PopularCities />
      <CustomerReviews />
      <RecentlyAddedProperties recentProperties={recentProperties} />
    </section>
  );
}
