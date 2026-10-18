const fs = require("node:fs");
const path = require("node:path");
const { randomBytes } = require("node:crypto");
const { hashPassword } = require("../../server/adminPassword");

const generate = async () => {
  const filename = path.resolve(process.cwd(), ".admin-credentials.local");
  const password = randomBytes(48).toString("base64url");
  const hash = await hashPassword(password);
  const secret = randomBytes(32).toString("hex");
  const text = [
    "관리자 로그인 비밀번호 (비밀번호 관리자에 보관하세요)",
    password,
    "",
    "Vercel 서버 환경변수 두 개 (REACT_APP_ 접두어를 붙이지 마세요)",
    `ADMIN_PASSWORD_HASH=${hash}`,
    `ADMIN_SESSION_SECRET=${secret}`,
    "",
    "이 파일은 Git에서 제외됩니다. 외부에 공유하지 마세요.",
    "",
  ].join("\n");
  fs.writeFileSync(filename, text, { flag: "wx", mode: 0o600 });
  console.log(`관리자 인증 정보를 생성했습니다: ${filename}`);
  console.log("비밀번호와 비밀 값은 콘솔에 출력하지 않았습니다.");
};

generate().catch((error) => {
  console.error(error.code === "EEXIST" ? "기존 인증 파일이 있습니다. 보관 후 파일 이름을 변경하고 다시 실행해주세요." : "인증 정보 파일을 생성하지 못했습니다.");
  process.exitCode = 1;
});
