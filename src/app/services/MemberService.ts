import { serverApi } from "../../libs/config";

import axios from "axios";
import {
  LoginInput,
  Member,
  MemberInput,
  MemberUpdateInput,
} from "../../libs/types/member";

class MemberService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  public async getTopUsers(): Promise<Member[]> {
    try {
      let url = `${this.path}/member/top-users`;
      const result = await axios.get(url);
      return result.data;
    } catch (error) {
      console.log("error, getTopUsers", error);
      throw error;
    }
  }

  public async getAdmin(): Promise<Member> {
    try {
      let url = `${this.path}/member/admin`;
      const result = await axios.get(url);
      console.log("tt", result.data);
      return result.data;
    } catch (error) {
      console.log("error, admin", error);
      throw error;
    }
  }

  public async signup(input: MemberInput): Promise<Member> {
    try {
      let url = `${this.path}/member/signup`;
      const result = await axios.post(url, input, { withCredentials: true });
      console.log("signup", result.data);
      const member: Member = result.data.member;
      localStorage.setItem("memberData", JSON.stringify(member));
      return member;
    } catch (error) {
      console.log("error, signup", error);
      throw error;
    }
  }
  public async login(input: LoginInput): Promise<Member> {
    try {
      let url = `${this.path}/member/login`;
      const result = await axios.post(url, input, { withCredentials: true });
      console.log("signup", result.data);
      const member: Member = result.data.member;
      localStorage.setItem("memberData", JSON.stringify(member));
      return member;
    } catch (error) {
      console.log("error, login", error);
      throw error;
    }
  }
  public async logout(): Promise<boolean> {
    try {
      let url = `${this.path}/member/logout`;
      const result = await axios.post(url, {}, { withCredentials: true });

      localStorage.removeItem("memberData");
      console.log("logout", result.data.logout);
      return result.data.logout;
    } catch (error) {
      console.log("error, login", error);
      throw error;
    }
  }

  public async updateMember(input: MemberUpdateInput): Promise<Member> {
    try {
      const formData = new FormData();
      formData.append("memberNick", input.memberNick || "");
      formData.append("memberPhone", input.memberEmail || "");
      formData.append("memberAddress", input.memberAddress || "");
      formData.append("memberDescription", input.memberDescription || "");
      formData.append("memberImage", input.memberImage || "");

      const result = await axios(`${this.path}/member/update`, {
        method: "POST",
        data: formData,
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(" updateMember", result);
      const member: Member = result.data;
      localStorage.setItem("memberData", JSON.stringify(member));
      return member;
    } catch (error) {
      console.log("error, updateMember", error);
      throw error;
    }
  }
}

export default MemberService;
