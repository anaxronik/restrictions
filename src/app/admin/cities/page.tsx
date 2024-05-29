"use client";

import CitiesList from "@/components/CitiesList";
import CreateCityForm from "@/components/CreateCityForm";

export default function CitiesPage() {
  return (
    <div className={"flex flex-column gap-4"}>
      <CreateCityForm />
      <CitiesList />
    </div>
  );
}
