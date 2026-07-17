import { notFound } from "next/navigation";
import EditForm from "./EditForm";

export default function EditPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return <EditForm />;
}
