import { Suspense } from "react";
import { Metadata } from "next";
import Table from "@/app/ui/customers/table";
import Pagination from "@/app/ui/invoices/pagination";

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

  const totalPages = 1;

  return (
    <div className="w-full">
      <Suspense key={query + currentPage} fallback={<p>Loading...</p>}>
        <Table />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
