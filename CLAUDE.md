# 우림측량 홈페이지 프로젝트 CLAUDE.md

## 프로젝트 개요
- 업체명: 우림측량
- 업종: 토지측량 및 인허가 전문
- 주소: 강원특별자치도 횡성군 태기로 16
- 전화: 033-345-1253
- 운영시간: 평일 09:00~19:00
- 목표: 구글 SEO 최적화 홈페이지 제작
- 타겟: 토지측량 및 인허가가 필요한 개인/기업 고객

## 기술 스택
- Frontend: Next.js (App Router) + TypeScript + Tailwind CSS
- Backend: Supabase (상담 신청폼 + 블로그 데이터 저장)
- 배포: Vercel (https://urim-website.vercel.app)
- 블로그 에디터: TipTap
- 폴더 구조: src/app 방식

## URL 구조 및 파일 경로

| 페이지 | URL | 파일 경로 |
|--------|-----|-----------|
| 메인 | / | src/app/page.tsx |
| 회사소개 | /about | src/app/about/page.tsx |
| 서비스안내 | /services | src/app/services/page.tsx |
| 업무절차 | /guide | src/app/guide/page.tsx |
| 블로그 | /blog | src/app/blog/page.tsx |
| FAQ | /faq | src/app/faq/page.tsx |
| 문의상담 | /contact | src/app/contact/page.tsx |
| 블로그 관리자 | /admin/blog | src/app/admin/blog/page.tsx |

## 디자인 방향
- 톤: 전문적이고 신뢰감 있는 느낌
- 메인 색상: 네이비 #003087 (신뢰감, 전문성)
- 보조 색상: 화이트 #ffffff
- 강조 색상: 블루 #0057b8
- 폰트: Noto Sans KR (Google Fonts)
- 모바일 반응형 필수 (모바일 퍼스트)
- 기존 업체 로고 활용

## 연락 수단
- 전화 상담: 033-345-1253
- 카카오톡 상담: 추후 연결 예정 (버튼은 미리 만들어 둘 것)
- 온라인 문의폼: Supabase 저장

## Supabase 데이터베이스 구조

### contacts 테이블 (문의 신청)
```
id (uuid, PK)
name (text, 필수) - 이름
phone (text, 필수) - 연락처
inquiry_type (text) - 문의유형
land_address (text) - 토지주소 (선택)
content (text, 필수) - 문의내용
privacy_agreed (boolean) - 개인정보동의
created_at (timestamptz)
```

### blog_posts 테이블 (블로그)
```
id (uuid, PK)
title (text, 필수) - 제목
category (text) - '업무사례' | '업계소식' | '공지사항' | '홍보'
thumbnail_url (text) - 썸네일 이미지
content (text) - 본문 내용
published_at (date) - 발행일
created_at (timestamptz)
```

## 페이지별 주요 콘텐츠

### 메인 페이지 (/)
- 타이틀: 토지, 제대로 알고 시작하세요
- 서브타이틀: 개발행위허가 · 농지전용 · 태양광 인허가 전문
- 설명: 복잡한 인허가 절차, 저희가 처음부터 끝까지 함께합니다. 강원도 횡성 기반 · 현장 방문 상담 가능
- 버튼1: 033-345-1253 전화 상담
- 버튼2: 카카오톡으로 문의하기 (추후 링크 연결)

### 서비스안내 (/services)
1. 개발행위허가 - 건축·공작물 설치·토지형질변경 전 반드시 필요한 허가
2. 농지전용허가 - 농지를 다른 목적으로 사용하고 싶을 때 필요한 허가
3. 태양광발전 인허가 - 부지 선정부터 발전사업 허가까지 원스톱 처리

### 업무절차 (/guide)
- STEP 1: 무료 상담 - 전화, 온라인 문의. 지번만 알려주시면 기본 검토 무료
- STEP 2: 현장 조사 - 담당자가 직접 현장 방문하여 지형, 접도, 주변 환경 확인
- STEP 3: 서류 준비 - 허가 종류에 맞는 서류 준비. 필요한 서류 목록과 방법 안내
- STEP 4: 허가 신청 - 관할 지자체에 허가 신청 및 담당 공무원과 협의
- STEP 5: 허가 완료 - 허가증 전달 및 이후 절차(착공신고 등) 안내
- 소요기간: 개발행위허가 3~8주 / 농지전용허가 4~8주 / 태양광 인허가 6~12주

### FAQ (/faq)
- Q1. 상담은 유료인가요? → 아니요, 초기 상담과 토지 기본 검토는 무료입니다.
- Q2. 지번만 알아도 상담이 가능한가요? → 네, 지번만 있으면 개발 가능 여부를 기본적으로 검토해 드립니다.
- Q3. 허가가 반드시 나는 건가요? → 토지 조건과 용도지역에 따라 달라집니다. 사전 검토로 가능성을 먼저 확인해 드립니다.
- Q4. 횡성 외 지역도 가능한가요? → 강원도 내 다른 지역도 상담 가능합니다.
- Q5. 서류 준비를 직접 해야 하나요? → 대부분의 서류는 저희가 대행합니다.
- Q6. 태양광 부지를 못 구했는데 상담 가능한가요? → 네, 어떤 조건의 토지를 찾아야 하는지 함께 검토해 드립니다.

### 문의상담 (/contact)
- 전화: 033-345-1253 (평일 09:00~19:00)
- 주소: 강원특별자치도 횡성군 태기로 16
- 카카오톡: 추후 추가 예정
- 문의폼 항목: 이름 / 연락처 / 문의유형 / 토지주소(선택) / 문의내용 / 개인정보동의
- 접수 안내: 접수 후 1영업일 이내 연락드립니다.

### 블로그 (/blog)
- 카테고리: 업무사례 / 업계소식 / 공지사항 / 홍보
- SEO 최적화 (지역명 + 서비스명 키워드 포함)
- 관리자 페이지(/admin/blog)에서 글 작성/수정/삭제

## Git 작업 규칙 ⚠️
- **작업 완료 후 자동으로 `git push`하지 말 것**
- **push는 사장님이 직접 "푸시해줘" 라고 요청할 때만 실행할 것**
- 작업 완료 후 자동으로 Vercel 배포 확인도 하지 말 것
- push 전 반드시 로컬(localhost:3000) 확인 먼저

## AI 코딩 작업 원칙

### 1. 코딩 전에 먼저 생각하기
- 구현하기 전에 가정을 명시적으로 밝힌다
- 여러 해석이 가능한 요청이면 선택지를 제시하고 물어본다
- 불명확한 부분이 있으면 작업을 멈추고 질문한다

### 2. 단순함 우선
- 요청한 것만 구현한다
- 추가 기능을 임의로 넣지 않는다
- 요청하지 않은 "유연성"이나 "확장성"을 위한 구조를 넣지 않는다

### 3. 외과적 수정 (필요한 것만 건드린다)
- 수정 요청과 무관한 코드는 건드리지 않는다
- 망가지지 않은 코드를 리팩터링하지 않는다
- 기존 코드 스타일을 그대로 따른다

### 4. 목표 중심 실행
- 작업을 검증 가능한 목표로 변환한다
- 여러 단계 작업에서는 간단한 계획을 먼저 제시한다

## 새 PC 설정 방법
새 컴퓨터에서 작업 시작할 때 아래 순서대로 설치하세요.

### 1단계: 필수 설치
```
1. Node.js (https://nodejs.org) LTS 버전
2. VS Code (https://code.visualstudio.com)
3. Git (winget install --id Git.Git)
4. Claude Code: npm install -g @anthropic-ai/claude-code
```

### 2단계: 프로젝트 클론
```bash
git clone https://github.com/urim-survey/urim-website.git
cd urim-website
npm install
```

### 3단계: 환경변수 설정
프로젝트 폴더에 .env.local 파일 생성:
```
NEXT_PUBLIC_SUPABASE_URL=https://twlgilmkqxzikvnzkisd.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[메모장에서 확인]
SUPABASE_SERVICE_ROLE_KEY=[메모장에서 확인]
ADMIN_PASSWORD=[메모장에서 확인]
```

### 4단계: 로컬 실행
```bash
npm run dev
# http://localhost:3000 에서 확인
```

## 작업 현황

### 완료된 작업 ✅
- [x] GitHub 계정 생성 (urim-survey)
- [x] Vercel 계정 생성 (Hobby 플랜)
- [x] Supabase 계정 생성 (urim-website, Seoul)
- [x] Next.js 프로젝트 초기 세팅
- [x] 환경변수 설정 (.env.local)
- [x] GitHub 저장소 생성 및 push
- [x] Vercel 배포 완료 (https://urim-website.vercel.app)

### 진행 중인 작업
- [ ] 7개 페이지 코드 작성
- [ ] Supabase 테이블 생성 (contacts, blog_posts)

### 남은 작업
- [ ] 업체 로고 적용
- [ ] 카카오톡 채널 링크 연동
- [ ] 구글 지도 실제 위치 적용
- [ ] 블로그 첫 글 작성
- [ ] 구글 서치콘솔 등록
- [ ] 네이버 플레이스 등록
- [ ] 카카오맵 등록
