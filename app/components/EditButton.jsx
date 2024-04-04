import Link from "next/link"

export default function EditButton({ id }) {
  return (
    <button className=" text-blue-500"><Link href={`../tickets/${id}/edit`}>Edit</Link></button>
  )
}
