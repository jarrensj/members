'use client'

import { useEffect, useState } from "react";
import Image from "next/image";

interface Member {
  name: string;
  bio?: string;
  image: string;
}

export default function Home() {
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    const fetchMembers = async () => {
      const response = await fetch('/api/members');
      const data = await response.json();
      setMembers(data);
    };

    fetchMembers();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-2xl font-bold mb-12">Our Team</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {members.map((member, index) => (
          <div key={index} className="flex flex-col items-center m-4">
            <Image
              src={member.image}
              alt={`${member.name}'s profile picture`}
              width={150}
              height={150}
              className="rounded"
            />
            <h2 className="text-xl font-semibold mt-4">{member.name}</h2>
            <p className="text-center mt-2">{member.bio}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
