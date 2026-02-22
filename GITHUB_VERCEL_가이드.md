# GitHub 저장소 생성 + 첫 푸시 + Vercel 배포 가이드

---

## Part 1. GitHub 저장소 만들고 첫 푸시

### 1-1. GitHub에서 새 저장소 생성

1. 브라우저에서 **https://github.com** 접속 후 로그인
2. 오른쪽 상단 **+** → **New repository** 클릭
3. 다음처럼 입력:
   - **Repository name**: `bio-core-tutorial` (또는 원하는 이름)
   - **Description**: (선택) `바이오코어 사업단 수입·지출 업무 튜토리얼`
   - **Public** 또는 **Private** 선택
   - **"Add a README file"** 체크하지 않음 (이미 로컬에 코드가 있음)
   - **Create repository** 클릭
4. 생성된 페이지에 나오는 **저장소 URL**을 복사해 둡니다.  
   예: `https://github.com/내아이디/bio-core-tutorial.git`

---

### 1-2. 로컬에서 Git 초기화 및 첫 푸시

**PowerShell**을 열고 프로젝트 폴더로 이동한 뒤, 아래 명령을 **순서대로** 실행하세요.

```powershell
cd C:\Users\user\.cursor\bio-core-tutorial
```

```powershell
git init
```

```powershell
git add .
```

```powershell
git status
```
→ `node_modules`가 목록에 없고, `src/`, `package.json` 등만 보이면 `.gitignore`가 잘 적용된 것입니다.

```powershell
git commit -m "Initial commit: 바이오코어 사업단 수입·지출 업무 튜토리얼"
```

```powershell
git branch -M main
```

```powershell
git remote add origin https://github.com/내아이디/bio-core-tutorial.git
```
※ **반드시 `내아이디`를 본인 GitHub 사용자명으로 바꾸세요.**

```powershell
git push -u origin main
```
- 처음이면 GitHub 로그인(또는 브라우저 인증) 창이 뜰 수 있습니다. 완료 후 다시 실행하면 됩니다.

여기까지 끝나면 **GitHub 저장소에 첫 푸시가 완료**된 상태입니다.

---

## Part 2. Vercel 배포 설정

### 2-1. Vercel 가입·로그인

1. **https://vercel.com** 접속
2. **Sign Up** → **Continue with GitHub** 선택 후 GitHub 계정으로 로그인
3. 필요 시 "Authorize Vercel" 등 권한 허용

---

### 2-2. GitHub 저장소 연결해서 배포

1. Vercel 대시보드에서 **Add New...** → **Project** 클릭
2. **Import Git Repository**에서 방금 푸시한 **bio-core-tutorial** 저장소가 보이면 **Import** 클릭  
   (안 보이면 "Adjust GitHub App Permissions"에서 해당 저장소 권한 허용 후 다시 시도)
3. **Configure Project** 화면:
   - **Framework Preset**: Vite (자동 감지될 수 있음)
   - **Build Command**: `npm run build` (기본값 유지)
   - **Output Directory**: `dist` (기본값 유지)
   - **Install Command**: `npm install` (기본값 유지)
4. **Deploy** 클릭
5. 1~2분 정도 기다리면 배포 완료. **Visit** 또는 배포 URL(예: `https://bio-core-tutorial-xxxx.vercel.app`)로 접속해 보면 됩니다.

---

### 2-3. 이후 동작

- **GitHub에 푸시할 때마다** Vercel이 자동으로 다시 빌드·배포합니다.
- 집에서 `git push` 하면 몇 분 뒤 배포 URL이 최신 상태로 갱신되므로, 회사에서 같은 링크로 항상 최신 화면을 볼 수 있습니다.

---

## 요약 체크리스트

- [ ] GitHub에 `bio-core-tutorial` 저장소 생성 (README 추가 안 함)
- [ ] 로컬에서 `git init` → `git add .` → `git commit` → `git remote add origin` → `git push -u origin main`
- [ ] Vercel 로그인( GitHub 연동 )
- [ ] Vercel에서 해당 저장소 Import → Deploy
- [ ] 배포 URL 북마크해 두고, 회사에서 링크로 접속해 확인

문제가 생기면 에러 메시지와 함께 알려주시면 됩니다.
