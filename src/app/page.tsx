import Image from "next/image";

const user ="John Doe"
const time = "3 hours"

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>
          Welcome, {user}, you've successfully done nothing for {time}
        </h1>
      </main>
    </>
  );
}
