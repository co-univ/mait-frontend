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
- **타이포그래피**: `typo-display-large`, `typo-heading-medium`, `typo-body-small` 등

## 타이포그래피 토큰 사용법

타이포그래피 토큰은 Tailwind CSS의 `@tailwindcss/typography` 플러그인과 함께 사용할 수 있습니다.

### 설정

`tailwind.config.js`에서 typography 토큰을 사용하도록 설정:

```javascript
const tokens = require('./config/tailwind.tokens.js');

module.exports = {
  // ... 기타 설정
  plugins: [
    require('@tailwindcss/typography'),
  ],
  theme: {
    extend: {
      ...tokens.theme,
      // typography 토큰을 prose 클래스에서 사용할 수 있도록 설정
      typography: (theme) => ({
        ...tokens.theme.typography,
        // 커스텀 prose 스타일 추가 가능
      }),
    },
  },
};
```

### 사용 예시

#### 1. CSS에서 직접 사용

```css
.my-title {
  @apply typo-display-large;
}

.my-heading {
  @apply typo-heading-medium;
}

.my-body {
  @apply typo-body-small;
}
```

#### 2. React/JSX에서 사용

```jsx
// 디스플레이 타이틀
<h1 className="typo-display-large">
  메인 타이틀
</h1>

// 섹션 제목
<h2 className="typo-heading-medium">
  섹션 제목
</h2>

// 본문 텍스트
<p className="typo-body-small">
  본문 내용입니다.
</p>

// 강조 텍스트
<span className="typo-body-medium-bold">
  강조된 텍스트
</span>

// 링크 텍스트
<a href="#" className="typo-underline-medium">
  링크 텍스트
</a>
```

#### 3. 커스텀 컴포넌트에서 사용

```jsx
const Typography = ({ variant, children, ...props }) => {
  const variantClasses = {
    'display-large': 'typo-display-large',
    'heading-medium': 'typo-heading-medium',
    'body-small': 'typo-body-small',
    'body-bold': 'typo-body-medium-bold',
  };

  return (
    <span className={variantClasses[variant]} {...props}>
      {children}
    </span>
  );
};

// 사용
<Typography variant="display-large">메인 타이틀</Typography>
<Typography variant="body-small">본문 텍스트</Typography>
```

### 사용 가능한 타이포그래피 스타일

#### 디스플레이 (Display)
- `typo-display-large` - 60px, Bold, Paperlogy
- `typo-display-medium` - 44px, Bold, Paperlogy  
- `typo-display-small` - 36px, Bold, Paperlogy

#### 제목 (Heading)
- `typo-heading-xlarge` - 44px, Bold, Paperlogy
- `typo-heading-large` - 32px, Bold, Paperlogy
- `typo-heading-medium` - 24px, Bold, Paperlogy
- `typo-heading-small` - 19px, Bold, Paperlogy
- `typo-heading-xsmall` - 17px, Bold, Paperlogy
- `typo-heading-xxsmall` - 15px, Bold, Paperlogy

#### 본문 (Body)
- `typo-body-large` - 19px, Medium, Paperlogy
- `typo-body-medium` - 17px, Medium, Paperlogy
- `typo-body-small` - 15px, Medium, Paperlogy
- `typo-body-xsmall` - 13px, Medium, Paperlogy

#### 본문 굵게 (Body Bold)
- `typo-body-large-bold` - 19px, Bold, Paperlogy
- `typo-body-medium-bold` - 17px, Bold, Paperlogy
- `typo-body-small-bold` - 15px, Bold, Paperlogy
- `typo-body-xsmall-bold` - 13px, Bold, Paperlogy

#### 밑줄 (Underline)
- `typo-underline-large` - 19px, Regular, Paperlogy
- `typo-underline-medium` - 17px, Regular, Paperlogy
- `typo-underline-small` - 15px, Regular, Paperlogy
- `typo-underline-xsmall` - 13px, Regular, Paperlogy

### 폰트 오버라이드

다른 폰트로 오버라이드하고 싶은 경우:

```jsx
// 기본 Paperlogy 폰트로 사용
<div className="typo-display-large">
  기본 Paperlogy 폰트로 렌더링
</div>

// Pretendard 폰트로 오버라이드
<div className="typo-display-large font-pretendard">
  Pretendard로 렌더링되는 디스플레이 스타일
</div>

// 명시적으로 Paperlogy 폰트 사용
<div className="typo-heading-medium font-paperlogy">
  명시적으로 Paperlogy 폰트 사용
</div>
```

이렇게 하면 typography 토큰의 크기, 굵기, 라인 높이는 유지하면서 폰트만 변경할 수 있습니다.

### 주의사항

1. **기본 폰트**: 모든 타이포그래피 토큰은 기본적으로 Paperlogy 폰트를 사용합니다.

2. **폰트 오버라이드**: `font-pretendard`, `font-paperlogy` 클래스를 함께 사용하여 폰트만 변경할 수 있습니다.

3. **라인 높이**: 모든 스타일은 150% 라인 높이를 사용합니다.

4. **자간**: Display와 일부 Heading 스타일은 1% 자간을, 나머지는 0% 자간을 사용합니다.

5. **반응형**: 현재는 고정 크기이지만, 필요시 반응형 토큰을 추가할 수 있습니다.