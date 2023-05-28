import type { UserInfo } from "@celeris/types";

export interface FakeUserInfo extends UserInfo {
  token: string;
  extraInfo: {
    password: string;
  };
}
