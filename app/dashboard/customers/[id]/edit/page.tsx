import { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchCustomerById } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import AddEditCustomerForm from "@/app/ui/customers/add-edit-form";

export const metadata: Metadata = {
  title: "Edit customer",
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const customer = await fetchCustomerById(id);

  if (!customer) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Invoices", href: "/dashboard/invoices" },
          {
            label: "Edit Customer",
            href: `/dashboard/customers/${id}/edit`,
            active: true,
          },
        ]}
      />
      <AddEditCustomerForm customer={customer} />
    </main>
  );
}
