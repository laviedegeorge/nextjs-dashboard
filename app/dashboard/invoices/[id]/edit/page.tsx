import { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import AddEditInvoiceForm from "@/app/ui/invoices/add-edit-form";
import { fetchCustomers, fetchInvoiceById } from "@/app/lib/data";

export const metadata: Metadata = {
  title: "Edit invoice",
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);

  if (!invoice) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Invoices", href: "/dashboard/invoices" },
          {
            label: "Edit Invoice",
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <AddEditInvoiceForm invoice={invoice} customers={customers} />
    </main>
  );
}
