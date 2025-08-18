본 문서는 React 기반 프로젝트의 전체 폴더 구조와 설계 원칙을 정의합니다. 전역(Global)과 도메인별(Local) 구조를 구분하여 일관된 관리 방식을 제공합니다.

---

<br />

## 1. 전체 구조 개요

```bash
src/
├── assets/          # 정적 리소스 (이미지, 아이콘 등)
│
├── components/      # 전역 UI 컴포넌트
│
├── contexts/        # 전역 Context API
│
├── domain/          # 도메인 단위의 기능 모듈 (solving, control, team 등)
│   └── {domain}/
│       ├── components/     # 도메인 전용 UI 컴포넌트
│       ├── hooks/          # 도메인 전용 커스텀 훅
│       ├── layouts/        # 도메인 전용 레이아웃
│       ├── pages/          # 도메인별 라우트 엔드포인트
│       ├── {domain}.constants.ts
│       ├── {domain}.route.ts
│       └── {domain}.types.ts
│
├── hooks/           # 전역 커스텀 훅
│
├── layouts/         # 전역 레이아웃
│
├── store/           # 전역 상태관리
│
├── utils/           # 전역 유틸 함수
│
├── app.constants.ts # 전역 상수 및 enum
│
└── index.tsx        # 앱 진입점
```

<br />

## 2. 디렉토리명/파일명 컨벤션

### **📂 디렉토리명**

- 케밥케이스(kebab-case) 사용

### **📄 파일명**

1) 도메인 내부 파일

- 상위 디렉토리명을 prefix로 붙이고, 파스칼케이스(PascalCase)로 작성
- 예:
    
    `domain/solving/components/common/SolvingContentBlankAnswer.tsx`
    `domain/solving/components/live/winner/SolvingLiveWinnerList.tsx`
    

2) assets 내 리소스

- 케밥케이스(kebab-case) 사용
- icons/는 `ic_` prefix 고정

3) 도메인 전용 설정 파일

- {도메인명}.{역할}.ts 로 작성
- 역할 구분: constants, types, route 등

<br />

## 3. 도메인 구조 규칙 (예: solving 도메인)

### ✅ 최상위 도메인

- 각 도메인의 루트는 `src/domain/{domain}/` 디렉토리입니다.
- 루트 하위에는 다음과 같은 폴더를 둘 수 있습니다:
    - `components/`
    - `hooks/`
    - `layouts/`
    - `utils/`
    - `pages/`
    - 기타 필요에 따라 확장 가능
- 하위 폴더는 **common**과 **세부 도메인별 폴더**로 구분합니다.
    - common/은 도메인 내부에서 공통으로 사용하는 리소스를 관리하며, 반드시 존재합니다.
- 도메인 내 라우팅, 상수, 타입 정의 파일은 각각 하나씩만 생성합니다.
    - 상수와 enum은 `*.constants.ts` 파일에서 함께 관리합니다.

### 🚫 세부 도메인 제한

- 세부 도메인(live, review 등)은 그 하위에 `components`, `hooks` 등의 폴더를 직접 생성할 수 없습니다.
- 대신, 최상위 도메인의 각 폴더(`components`, `hooks`, `utils`, `constants`, `apis`, `layouts`) 안에 세부 도메인 이름(live, review)으로 하위 폴더를 만들어 관리합니다.

<br />

## 4. 전체 구조 예시

```bash
src/
├── assets/                 
│   ├── icons/             
│   │   ├── ic-close.svg           
│   │   ├── ...
│   │   
│   ├── images/            
│   └── lotties/          
│
├── components/                         
│
├── domain/               
│   ├── solving/                
│   │   ├── components/         
│   │   │   ├── common/         
│   │   │   │   ├── SolvingCorrect.tsx
│   │   │   │   └── ...
│   │   │   ├── live/       
│   │   │   │   ├── SolvingLiveSolving.tsx 
│   │   │   │   └── ...
│   │   │   └── review/     
│   │   │       └── ...
│   │   │
│   │   ├── hooks/          
│   │   │   ├── common/
│   │   │   ├── live/
│   │   │   └── review/
│   │   │
│   │   ├── layouts/        
│   │   ├── pages/          
│   │   │
│   │   ├── solving.constants.ts 
│   │   ├── solving.route.ts 
│   │   └── solving.types.ts 
│   │
│   ├── control/            
│   ├── creation/           
│   ├── home/               
│   ├── management/        
│   ├── search/         
│   ├── team/               
│   └── ...         
│
├── hooks/                  
│
├── layouts/               
│
├── store/                 
│
├── utils/                
│
├── app.constants.ts       
│
└── index.tsx               
```