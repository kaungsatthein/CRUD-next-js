"use client";

import { useRouter } from "next/navigation";

export default function DeleteButton({ id }) {
  const router = useRouter();
  const remove = async () => {
    const confirmed = confirm("Are you sure?");
    if (confirmed) {
      const res = await fetch(`http://localhost:4000/tickets/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.push("/tickets");
        router.refresh();
      }
    }
  };
  return (
    <button onClick={remove} className=" text-red-500">
      Delete
    </button>
  );
}
