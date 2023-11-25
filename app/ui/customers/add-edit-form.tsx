"use client";

import React from "react";
import Link from "next/link";
import { Button } from "../button";
import { useFormState, useFormStatus } from "react-dom";
import { Customer } from "@/app/lib/definitions";
import { useParams, usePathname } from "next/navigation";
import { addCustomer, editCustomer } from "@/app/lib/action";
import { UserCircleIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

export default function AddEditCustomerForm({
  customer,
}: {
  customer?: Customer;
}) {
  const pathName = usePathname();
  const { pending } = useFormStatus();
  const isEdit = pathName.includes("edit");
  const initialState = { message: null, errors: {} };
  const customerId = customer?.id || "";
  const btnText = isEdit ? "Edit customer" : "Add Customer";
  const editCustomerWithId = editCustomer.bind(null, customerId);
  const dispatchFn = isEdit ? editCustomerWithId : addCustomer;
  const [state, dispatch] = useFormState(dispatchFn, initialState);

  return (
    <form action={dispatch}>
      {/* Customer Name */}
      <div className="mb-4">
        <label htmlFor="amount" className="mb-2 block text-sm font-medium">
          Customer Name
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <input
              id="name"
              name="name"
              type="text"
              defaultValue={customer?.name}
              placeholder="Emeka Oluwa"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="name-error"
            />
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>
        <div id="amount-error" aria-live="polite" aria-atomic="true">
          {state.errors?.name &&
            state.errors.name.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>

      {/* Customer Email */}
      <div className="mb-4">
        <label htmlFor="amount" className="mb-2 block text-sm font-medium">
          Customer Email
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={customer?.email}
              placeholder="emekaOluwa@gmail.com"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="name-error"
            />
            <EnvelopeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>
        <div id="amount-error" aria-live="polite" aria-atomic="true">
          {state.errors?.email &&
            state.errors.email.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/customers"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">{btnText}</Button>
      </div>
    </form>
  );
}
