import { Metadata } from "next";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import AddCustomerForm from "@/app/ui/customers/add-form";

export const metadata: Metadata = {
  title: "Add customer",
};

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Customers", href: "/dashboard/customers" },
          {
            label: "Add customer",
            href: "/customers/invoices/add",
            active: true,
          },
        ]}
      />
      <AddCustomerForm />
    </main>
  );
}
