# 쏜 홈페이지 프로젝트 CLAUDE.md

## 프로젝트 개요
- 업체명(정식): 횡성우림측량
- 업종: 토지측량 및 인허가 전문 (개발행위·농지전용·산지전용·태양광·도로점용·현황측량)
- 주소: 강원특별자치도 횡성군 태기로 16, 3층 302호
- 전화번호: 033-345-1253
- 소개: 횡성군청 10년 실무경력, 횡성·원주·평창·홍천 등 강원 지역 전반 대응
- 목표: 구글 SEO 최적화 홈페이지 제작
- 타겟: 토지측량 및 인허가가 필요한 개인/기업 고객
- **GitHub 계정명**: urim-survey (권장)
- **저장소명**: urim-survey-website (권장)

## 기술 스택
- Frontend: Next.js + TypeScript + Tailwind CSS
- Backend: Supabase (상담 신청폼 데이터 저장)
- 배포: Vercel (https://[추후 입력].vercel.app)
- 에디터: TipTap (블로그 관리)

## URL 구조
- / → 메인
- /about → 회사소개
- /services → 서비스안내
- /guide → 업무절차
- /blog → 블로그
- /faq → FAQ
- /contact → 문의상담

## 디자인 방향
- 참고 사이트: [siwolarchi.com](https://www.siwolarchi.com/) (건축사사무소, 미니멀 모노톤 포트폴리오 스타일 벤치마킹)
- 톤: 전문적이고 미니멀한 느낌
- 컬러: 완전 모노톤 (배경 #FFFFFF / 텍스트 #111111 / 보조텍스트 #6B6B6B / 보더 #E5E5E5, 포인트 컬러 없음)
- 폰트: Pretendard
- 애니메이션: Framer Motion, 스크롤 진입시 미묘한 페이드인 (`whileInView`, opacity+translateY)
- 모바일 반응형 필수
- 로고: 실물 로고 파일 없음 → 텍스트 로고("횡성우림측량")로 대체
- 상세 설계: `docs/superpowers/specs/2026-07-01-homepage-redesign-design.md` 참조

## 연락 수단
- 전화 상담
- 카카오톡 상담
- 온라인 문의폼 (Supabase 저장)

## Git 작업 규칙 ⚠️
> 🔧 추후 설정 예정

## AI 코딩 작업 원칙 (Karpathy Guidelines)

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

## 새 PC 스킬 설치 방법
새 컴퓨터에서 작업 시작할 때 아래 순서대로 설치하세요.

### 1단계: PowerShell에서 실행
```powershell
npx skills add rohitg00/agentmemory -y
npx skills add DaleSeo/korean-skills --skill humanizer
npx skills add bradautomates/claude-video -y
```

### 2단계: 플러그인 설치 (Claude Code 슬래시 명령)
```
/plugin marketplace add multica-ai/andrej-karpathy-skills
/plugin install karpathy-guidelines@karpathy-skills
/plugin marketplace add obra/superpowers-marketplace
/plugin install superpowers@superpowers-marketplace
/plugin marketplace add Egonex-AI/Understand-Anything
/plugin install understand-anything
/reload-plugins
```

## 작업 이력

### 초기 세팅
- [ ] GitHub 계정 생성
- [ ] Vercel 계정 생성
- [ ] Supabase 계정 생성
- [x] Next.js 프로젝트 초기 세팅
- [x] 7개 페이지 기본 구조 완성 (기존 네이비 디자인, 재설계 예정)

### 2026-07-01: 홈페이지 전체 재설계 — 설계 완료
- [x] 참고 사이트(siwolarchi.com) 벤치마킹 분석
- [x] 업체 실제 정보 확보 (업체명/주소/전화/서비스 6종, 구글비즈니스 기반)
- [x] 디자인 방향 확정: 네이비 → 완전 모노톤, Noto Sans KR → Pretendard
- [x] 설계 문서 작성·커밋: `docs/superpowers/specs/2026-07-01-homepage-redesign-design.md`
- [ ] 구현 계획(writing-plans) 수립
- [ ] 실제 구현 (Tailwind 재작성 + Framer Motion 애니메이션)

## 다음 작업 목록

### 초기 세팅
- [ ] 계정 생성 (GitHub, Vercel, Supabase)
- [ ] Claude Code 설치

### 콘텐츠
- [x] 업체 실제 정보 입력 (전화번호, 주소, 업체명) — 위 설계 문서 참조
- [ ] 업체 로고 적용 (현재 로고 파일 없음, 텍스트 로고로 대체 확정)
- [ ] 페이지별 실제 콘텐츠 작성
- [ ] 블로그 첫 글 작성
- [ ] 실사진(현장/측량장비) `public/images/`에 추가

### 기능
- [ ] 문의폼 Supabase 연동 (이번 재설계 스코프 제외, 별도 진행)
- [ ] 카카오톡 채널 링크 연동
- [ ] 구글 지도 실제 위치 적용

### SEO
- [ ] 구글 서치콘솔 등록
- [ ] 네이버 플레이스 등록
- [ ] 카카오맵 등록
