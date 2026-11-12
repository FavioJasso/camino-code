import { beforeEach, describe, expect, it } from "vitest";
import { allowGlobalSend, allowSend, consumeToken, resetAbuseGuard } from "./abuse-guard";
import { visitorKeyFromIp } from "./booking";

beforeEach(() => resetAbuseGuard());

describe("consumeToken", () => {
  it("accepts a token once, then refuses it until its deadline passes", () => {
    expect(consumeToken("a", 1_000, 5_000)).toBe(true);
    expect(consumeToken("a", 2_000, 5_000)).toBe(false);
    expect(consumeToken("a", 4_999, 5_000)).toBe(false);
    expect(consumeToken("a", 5_000, 9_000)).toBe(true); // after its deadline the record is gone (and the token could not verify anyway)
  });
});

describe("allowSend", () => {
  it("allows `limit` sends per window per key, sliding", () => {
    for (let t = 0; t < 3; t++) expect(allowSend("k", t, 3, 100)).toBe(true);
    expect(allowSend("k", 50, 3, 100)).toBe(false);
    expect(allowSend("other", 50, 3, 100)).toBe(true);
    expect(allowSend("k", 100, 3, 100)).toBe(true); // the first send has left the window
  });

  it("keeps memory bounded under a flood of distinct keys", () => {
    for (let i = 0; i < 12_000; i++) allowSend(`k${i}`, i, 5, 1_000_000);
    expect(allowSend("k11999", 12_000, 1, 1_000_000)).toBe(false); // newest keys are kept
  });
});

describe("visitorKeyFromIp", () => {
  it("keeps IPv4 as is and truncates IPv6 to its /64", () => {
    expect(visitorKeyFromIp("203.0.113.7")).toBe("203.0.113.7");
    expect(visitorKeyFromIp("2001:db8:abcd:12::1")).toBe("2001:db8:abcd:12::/64");
    expect(visitorKeyFromIp("2001:0db8:ABCD:0012:ffff:1:2:3")).toBe("2001:db8:abcd:12::/64");
    expect(visitorKeyFromIp("::1")).toBe("0:0:0:0::/64");
    expect(visitorKeyFromIp("")).toBe("unknown");
    expect(visitorKeyFromIp("::ffff:203.0.113.7")).toBe("203.0.113.7");
  });
});

describe("allowGlobalSend", () => {
  it("is not reset by a flood of distinct per-visitor keys", () => {
    expect(allowGlobalSend(0, 1, 1_000_000)).toBe(true);
    for (let i = 0; i < 12_000; i++) allowSend(`mint:${i}`, i, 30, 1_000_000);
    expect(allowGlobalSend(12_000, 1, 1_000_000)).toBe(false);
  });
});
