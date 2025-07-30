# Design Tokens Tools

이 폴더에는 디자인 토큰을 처리하는 도구들이 포함되어 있습니다.

## 파일 설명

### `simple-tokens-parser.cjs`
- 디자인 토큰 JSON 파일들을 Tailwind CSS 설정으로 변환하는 스크립트
- `tokens/` 폴더의 모든 토큰 파일을 읽어서 `config/tailwind.tokens.js` 생성

## 사용법

```bash
# 토큰 빌드
pnpm run build:tokens

# 개발 서버 (토큰 빌드 포함)
pnpm run dev

# 프로덕션 빌드 (토큰 빌드 포함)
pnpm run build
```

## 토큰 구조

```
tokens/
├── $metadata.json           # 토큰 세트 순서 정의
├── $themes.json            # 테마 정의 (현재 사용 안 함)
├── global.json             # 전역 토큰 (그림자, 폰트 등)
├── primitive/
│   └── Mode 1.json         # 기본 색상 팔레트
├── Token/
│   └── Mode 1.json         # 기본 토큰 (간격, 크기 등)
├── semantic/
│   └── Value-set.json      # 시맨틱 토큰 (gap, padding, radius 등)
├── Mode/
│   └── Mode 1.json         # 모드별 토큰 (색상 역할 정의)
└── responsive/
    ├── Pc.json             # PC용 반응형 토큰
    └── Mobile.json         # 모바일용 반응형 토큰
```

## 생성되는 토큰

- **색상**: `gray-5`, `primary-50`, `danger-60` 등
- **폰트**: `fontsize-0` (60px), `paperlogy` 등
- **간격**: `gap-1` (2px), `padding-4` (8px) 등
- **테두리**: `radius-medium1` (6px), `max` (9999px) 등
- **그림자**: `sm`, `base`, `xl` 등