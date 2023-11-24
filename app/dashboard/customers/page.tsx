import { Suspense } from "react";
import { Metadata } from "next";
import { lusitana } from "@/app/ui/fonts";
import Table from "@/app/ui/customers/table";
import { fetchCustomersPages } from "@/app/lib/data";
import Pagination from "@/app/ui/invoices/pagination";
import { CustomersTableSkeleton } from "@/app/ui/skeletons";

export const metadata: Metadata = {
  title: "Customers",
};
export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchCustomersPages(query);

  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
        Customers
      </h1>
      <Suspense key={query + currentPage} fallback={<CustomersTableSkeleton />}>
        <Table currentPage={currentPage} query={query} />
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </Suspense>
    </div>
  );
}
