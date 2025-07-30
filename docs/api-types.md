# API 타입 생성 및 사용 가이드

이 문서는 OpenAPI 스펙으로부터 TypeScript 타입을 자동 생성하고 사용하는 방법을 설명합니다.

## 목차

1. [개요](#개요)
2. [설치 및 설정](#설치-및-설정)
3. [타입 생성하기](#타입-생성하기)
4. [생성된 타입 구조](#생성된-타입-구조)
5. [타입 사용법](#타입-사용법)
6. [실제 사용 예시](#실제-사용-예시)

## 개요

이 프로젝트는 백엔드 API의 OpenAPI 스펙으로부터 TypeScript 타입을 자동으로 생성하는 시스템을 제공합니다. 이를 통해:

- **타입 안전성**: API 요청/응답에 대한 완전한 타입 체크
- **자동 동기화**: API 변경 시 타입도 자동으로 업데이트
- **개발 효율성**: IDE의 자동완성과 오류 검사
- **편리한 사용**: 복잡한 타입 경로 없이 직접 import

## 설치 및 설정

프로젝트에 필요한 도구들이 이미 설정되어 있습니다:

```json
// package.json
{
  "devDependencies": {
    "@openapitools/openapi-generator-cli": "^2.21.4",
    "openapi-typescript": "^7.8.0"
  },
  "scripts": {
    "generate:types": "node tools/generate-types.js"
  }
}
```

## 타입 생성하기

### 기본 사용법

API 타입을 생성하려면 다음 명령어를 실행하세요:

```bash
pnpm run generate:types
```

### 실행 과정

명령어를 실행하면 다음과 같은 과정이 자동으로 진행됩니다:

```
🔍 Searching for OpenAPI specification...
Trying: https://api.dev.mait.kr/v3/api-docs
Trying: https://api.dev.mait.kr/v2/api-docs
Trying: https://api.dev.mait.kr/api-docs
✅ Found OpenAPI spec at: https://api.dev.mait.kr/api-docs

🔧 Generating TypeScript types...
✨ openapi-typescript 7.8.0
🚀 https://api.dev.mait.kr/api-docs → ./types/api.ts [116ms]
✅ Types generated successfully in ./types/api.ts

🔍 Extracting schema names...
Found schemas: CreateQuestionSetApiRequest, ApiResponseCreateQuestionSetApiResponse, CreateQuestionSetApiResponse, CreateMultipleQuestionApiRequest, MultipleChoiceDto

🔍 Extracting path names...
Found paths: /api/v1/question-sets, /api/v1/question-sets/{questionSetId}/questions
✅ Created ./types/index.ts with 5 schema types and 2 path types

🎉 API types generation completed!
```

### 생성되는 파일들

- `types/api.ts`: OpenAPI 스펙에서 생성된 원본 타입들
- `types/index.ts`: 편리한 사용을 위한 개별 타입 export

## 생성된 타입 구조

### Schema 타입들 (DTO)

백엔드의 DTO 클래스들이 TypeScript 타입으로 변환됩니다:

```typescript
// 생성 예시
export type CreateQuestionSetApiRequest = {
  subject: string;
  creationType: "AI_GENERATED" | "MANUAL";
}

export type CreateQuestionSetApiResponse = {
  questionSetId: number;
  subject: string;
}

export type MultipleChoiceDto = {
  id?: number;
  number: number;
  content: string;
  correct?: boolean;
}
```

### Path 타입들 (API 엔드포인트)

API 엔드포인트의 메서드, 파라미터, 요청/응답 타입들:

```typescript
// 생성 예시
export type QuestionSetsPath = {
  post: {
    requestBody: {
      content: {
        "application/json": CreateQuestionSetApiRequest;
      };
    };
    responses: {
      200: {
        content: {
          "*/*": ApiResponseCreateQuestionSetApiResponse;
        };
      };
    };
  };
}

export type QuestionSetsQuestionSetIdQuestionsPath = {
  post: {
    parameters: {
      path: {
        questionSetId: number;
      };
    };
    requestBody: {
      content: {
        "application/json": CreateMultipleQuestionApiRequest;
      };
    };
    responses: {
      200: {
        content: {
          "*/*": ApiResponseVoid;
        };
      };
    };
  };
}
```

## 타입 사용법

### 1. 기본 타입 Import

**간단한 방식 (권장)**:
```typescript
import type { 
  CreateQuestionSetApiRequest,
  CreateQuestionSetApiResponse,
  MultipleChoiceDto 
} from '../types';
```

**기존 방식**:
```typescript
import type { components } from '../types';
type Request = components['schemas']['CreateQuestionSetApiRequest'];
```

### 2. Path 타입 사용

API 엔드포인트의 타입 정보를 추출할 수 있습니다:

```typescript
import type { QuestionSetsPath } from '../types';

// POST 메서드의 요청 타입
type CreateQuestionSetRequest = QuestionSetsPath['post']['requestBody']['content']['application/json'];

// POST 메서드의 응답 타입
type CreateQuestionSetResponse = QuestionSetsPath['post']['responses'][200]['content']['*/*'];
```

### 3. API 클라이언트 함수에서 사용

```typescript
// src/lib/api.ts
import type { 
  CreateQuestionSetApiRequest,
  ApiResponseCreateQuestionSetApiResponse 
} from '../types';

export const createQuestionSet = async (
  data: CreateQuestionSetApiRequest
): Promise<ApiResponseCreateQuestionSetApiResponse> => {
  const response = await fetch('/api/v1/question-sets', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  
  return response.json();
}
```

## 실제 사용 예시

### 예시 1: 문제 셋 생성하기

```typescript
// components/CreateQuestionSet.tsx
import React, { useState } from 'react';
import type { CreateQuestionSetApiRequest } from '../types';
import { createQuestionSet } from '../lib/api';

export const CreateQuestionSet = () => {
  const [formData, setFormData] = useState<CreateQuestionSetApiRequest>({
    subject: '',
    creationType: 'AI_GENERATED'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await createQuestionSet(formData);
      console.log('생성된 문제 셋 ID:', response.data?.questionSetId);
    } catch (error) {
      console.error('문제 셋 생성 실패:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={formData.subject}
        onChange={(e) => setFormData({
          ...formData,
          subject: e.target.value
        })}
        placeholder="문제 셋 주제"
      />
      
      <select
        value={formData.creationType}
        onChange={(e) => setFormData({
          ...formData,
          creationType: e.target.value as 'AI_GENERATED' | 'MANUAL'
        })}
      >
        <option value="AI_GENERATED">AI 생성</option>
        <option value="MANUAL">수동 생성</option>
      </select>
      
      <button type="submit">문제 셋 생성</button>
    </form>
  );
}
```

### 예시 2: 객관식 문제 생성하기

```typescript
// components/CreateMultipleChoice.tsx
import React, { useState } from 'react';
import type { 
  CreateMultipleQuestionApiRequest,
  MultipleChoiceDto 
} from '../types';

interface Props {
  questionSetId: number;
}

export const CreateMultipleChoice = ({ questionSetId }: Props) => {
  const [question, setQuestion] = useState<CreateMultipleQuestionApiRequest>({
    content: '',
    explanation: '',
    number: 1,
    choices: []
  });

  const addChoice = () => {
    const newChoice: MultipleChoiceDto = {
      number: question.choices.length + 1,
      content: '',
      correct: false
    };
    
    setQuestion({
      ...question,
      choices: [...question.choices, newChoice]
    });
  };

  const updateChoice = (index: number, updates: Partial<MultipleChoiceDto>) => {
    const updatedChoices = question.choices.map((choice, i) => 
      i === index ? { ...choice, ...updates } : choice
    );
    
    setQuestion({
      ...question,
      choices: updatedChoices
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`/api/v1/question-sets/${questionSetId}/questions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(question)
      });
      
      if (response.ok) {
        console.log('객관식 문제 생성 성공');
      }
    } catch (error) {
      console.error('객관식 문제 생성 실패:', error);
    }
  };

  return (
    <div>
      <h3>객관식 문제 생성</h3>
      
      <input
        type="text"
        placeholder="문제 내용"
        value={question.content || ''}
        onChange={(e) => setQuestion({
          ...question,
          content: e.target.value
        })}
      />
      
      <textarea
        placeholder="해설"
        value={question.explanation || ''}
        onChange={(e) => setQuestion({
          ...question,
          explanation: e.target.value
        })}
      />
      
      <div>
        <h4>선택지</h4>
        {question.choices.map((choice, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder={`선택지 ${choice.number}`}
              value={choice.content}
              onChange={(e) => updateChoice(index, { content: e.target.value })}
            />
            <label>
              <input
                type="checkbox"
                checked={choice.correct || false}
                onChange={(e) => updateChoice(index, { correct: e.target.checked })}
              />
              정답
            </label>
          </div>
        ))}
        
        <button type="button" onClick={addChoice}>
          선택지 추가
        </button>
      </div>
      
      <button onClick={handleSubmit}>문제 생성</button>
    </div>
  );
}
```

### 예시 3: 타입 가드와 유틸리티 함수

```typescript
// utils/typeGuards.ts
import type { 
  ApiResponseCreateQuestionSetApiResponse,
  CreateQuestionSetApiResponse 
} from '../types';

// API 응답 성공 여부 체크
export const isSuccessResponse = <T>(
  response: { isSuccess?: boolean; data?: T }
): response is { isSuccess: true; data: T } => {
  return response.isSuccess === true && response.data !== undefined;
}

// 사용 예시
export const createQuestionSetSafely = async (subject: string) => {
  try {
    const response = await createQuestionSet({
      subject,
      creationType: 'AI_GENERATED'
    });
    
    if (isSuccessResponse(response)) {
      // 여기서 response.data는 CreateQuestionSetApiResponse 타입으로 추론됨
      return {
        success: true,
        questionSetId: response.data.questionSetId,
        subject: response.data.subject
      };
    } else {
      return { success: false, error: 'API 요청 실패' };
    }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : '알 수 없는 오류' };
  }
}
```


---

이 가이드를 따라하면 백엔드 API와 완벽하게 동기화된 타입 안전한 프론트엔드 코드를 작성할 수 있습니다. 추가 질문이 있다면 개발팀에 문의해주세요!