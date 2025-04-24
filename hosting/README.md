# LearnToday 웹사이트 호스팅 가이드

이 폴더에는 LearnToday 웹사이트를 Fastcomet 호스팅에 배포하는 데 필요한 모든 파일이 포함되어 있습니다.

## 포함된 파일

- `.next`: 빌드된 Next.js 애플리케이션 파일
- `public`: 정적 자산 파일 (이미지, 아이콘 등)
- `package.json` 및 `package-lock.json`: 의존성 정보
- `next.config.js`: Next.js 설정 파일
- `.env.production`: 프로덕션 환경 변수 (Supabase 설정 포함)

## 호스팅 설정 방법

1. 이 폴더의 모든 파일을 Fastcomet 호스팅의 `public_html` 디렉토리에 업로드합니다.

2. SSH를 통해 서버에 접속합니다.

3. `public_html` 디렉토리로 이동합니다:
   ```bash
   cd public_html
   ```

4. 의존성을 설치합니다:
   ```bash
   npm install --production
   ```

5. PM2를 사용하여 애플리케이션을 실행합니다:
   ```bash
   npm install -g pm2
   pm2 start npm --name "learntoday" -- start
   pm2 save
   pm2 startup
   ```

6. 도메인이 Node.js 애플리케이션이 실행 중인 포트(8080)로 연결되도록 설정합니다.

## 주의사항

- Supabase 프로젝트 설정에서 Fastcomet 호스팅의 도메인을 허용 목록에 추가했는지 확인하세요.
- 포트 8080이 Fastcomet에서 사용 가능한지 확인하세요. 필요한 경우 `package.json`의 start 스크립트에서 포트를 변경할 수 있습니다.
