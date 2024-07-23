import { notFound } from "next/navigation";

export default function Home() {
  return (
    <div>{notFound()}</div>
    // <div>main page</div>
  );
}
