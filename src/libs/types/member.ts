import { MemberStatus, MemberType } from "../data/enums/member.enum";

export interface Member {
  _id: string;
  memberType: MemberType;
  memberStatus: MemberStatus;
  memberNick: string;
  memberPassword?: string;
  memberEmail: string;
  memberAddress?: string;
  memberImage?: string;
  memberDescription?: string;
  memberPoints: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface MemberInput {
  memberType?: MemberType;
  memberStatus?: MemberStatus;
  memberNick: string;
  memberPassword: string;
  memberEmail: string;
  memberAddress?: string;
  memberImage?: string;
  memberDescription?: string;
  memberPoints?: number;
}

export interface LoginInput {
  memberNick: string;
  memberPassword: string;
}

export interface MemberUpdateInput {
  memberNick?: string;
  memberPassword?: string;
  memberEmail?: string;
  memberAddress?: string;
  memberImage?: string;
  memberDescription?: string;
}
