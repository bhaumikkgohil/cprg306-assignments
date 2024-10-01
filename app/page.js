import Link from "next/link";

export default function Page() {
  return (
    <main className="flex flex-col pl-40 pt-32 h-screen bg-black text-white">
      <div>
        <h1 className="text-4xl font-bold mb-5">
          CPRG 306: Web Development 2 - Assignments
        </h1>
      </div>
      <div className="text-lg">
        <ul>
          <li className="hover:text-green-400 hover:underline">
            <Link href="/week-2">Week 2 Assignment</Link>
          </li>
          <li className="hover:text-green-400 hover:underline">
            <Link href="/week-3">Week 3 Assignment</Link>
          </li>
        </ul>
      </div>
    </main>
  );
}
