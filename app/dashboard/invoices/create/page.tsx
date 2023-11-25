import { Metadata } from "next";
import { fetchCustomers } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import AddEditInvoiceForm from "@/app/ui/invoices/add-edit-form";

export const metadata: Metadata = {
  title: "Create invoice",
};

export default async function Page() {
  const customers = await fetchCustomers();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Invoices", href: "/dashboard/invoices" },
          {
            label: "Create Invoice",
            href: "/dashboard/invoices/create",
            active: true,
          },
        ]}
      />
      <AddEditInvoiceForm customers={customers} />
    </main>
  );
}
