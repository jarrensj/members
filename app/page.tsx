'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { Instagram, Twitter } from '@geist-ui/icons';
import Link from 'next/link';
import { Grid, Card } from '@geist-ui/react';

interface Member {
  name: string;
  bio?: string;
  image: string;
  socials?: {
    instagram?: string;
    twitter?: string;
  };
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
      <Grid.Container gap={2} justify="center">
        {members.map((member, index) => (
          <Grid xs={12} sm={6} lg={4} key={index}>
            <Card shadow width="100%" height="100%">
              <div className="flex flex-col items-center">
                <Image
                  src={member.image}
                  alt={`${member.name}'s profile picture`}
                  width={150}
                  height={150}
                  className="rounded"
                />
                <h2 className="text-xl font-semibold mt-4">{member.name}</h2>
                <p className="text-center mt-2">{member.bio}</p>
                <div className="flex mt-4 space-x-4">
                  {member.socials?.instagram && (
                    <Link
                      href={`https://instagram.com/${member.socials.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-400"
                    >
                      <Instagram />
                    </Link>
                  )}
                  {member.socials?.twitter && (
                    <Link
                      href={`https://twitter.com/${member.socials.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-400"
                    >
                      <Twitter />
                    </Link>
                  )}
                </div>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid.Container>
    </main>
  );
}
