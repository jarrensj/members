import { NextResponse, NextRequest } from 'next/server';
import members from './members.json';

export function GET(request: NextRequest) {
  return NextResponse.json(members);
}