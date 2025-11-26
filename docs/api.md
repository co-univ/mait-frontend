# API 사용 가이드

본 문서는 mait-frontend 프로젝트의 API 통신을 위한 `apiClient`와 `apiHooks`의 사용법을 안내합니다. 

mait-backend의 API 명세서가 변경되면 `update-api-spec.yml`이 실행되고, 변경된 항목에 대해서 **자동으로 Pull Request가 생성**됩니다. Pull Request를 merge한 이후 **develop 브랜치를 작업 브랜치로 merge**하여 변경 사항을 업데이트합니다.

이를 통해 **모든 API 요청과 응답에 대한 타입스크립트의 자동 완성 및 타입 검사** 혜택을 받을 수 있습니다.

자세한 사용 방법은 openapi-typescript 공식 문서(https://openapi-ts.dev/introduction)를 참조해 주세요.

---

## `apiClient` (`openapi-fetch`) 사용 방법

`apiClient`는 `fetch` API를 기반으로 한 경량 클라이언트입니다. React 컴포넌트의 생명주기와 관련 없는 API 호출이나, 간단한 일회성 데이터 요청/변경 작업에 유용합니다. (예: 폼 제출 시 이벤트 핸들러 내부)

`apiClient`의 메소드(GET, POST 등)를 사용할 때 **첫 번째 인자인 API 경로는 반드시 자동 완성으로 제공되는 목록에서 선택**해야 합니다. 이렇게 해야만 오타를 방지하고, **params와 body, 그리고 response에 대한 완벽한 타입 지원**을 받을 수 있습니다.


### GET 요청

GET 요청은 주로 데이터를 조회할 때 사용됩니다. `path` 또는 `query` 파라미터를 전달할 수 있습니다.

  - **Path Parameter 전달**

    URL 경로에 동적인 값을 포함해야 할 때 사용합니다.

    ```typescript
    import apiClient from "@/lib/api/client";

    async function fetchQuestionSet(questionSetId: number) {
      const { data, error } = await apiClient.GET("/api/v1/question-sets/{questionSetId}", {
        params: {
          path: {
            questionSetId, // {questionSetId} 부분에 값이 매핑됩니다.
          },
        },
      });

      if (error) {
        console.error("문제 셋 조회 실패:", error);
        return;
      }

      console.log("조회된 문제 셋:", data);
    }
    ```

  - **Query Parameter 전달**

    URL에 `?key=value` 형태로 데이터를 전달할 때 사용합니다.

    ```typescript
    import apiClient from "@/lib/api/client";

    async function fetchAllQuestionSets(teamId: number) {
      const { data, error } = await apiClient.GET("/api/v1/question-sets", {
        params: {
          query: {
            teamId, // -> /api/v1/question-sets?teamId=123
          },
        },
      });

      if (error) {
        console.error("문제 셋 목록 조회 실패:", error);
        return;
      }

      console.log("조회된 문제 셋 목록:", data);
    }
    ```

### POST, PUT, PATCH, DELETE 요청

이 메소드들은 주로 데이터를 생성, 수정, 삭제할 때 사용됩니다. 요청 본문(`body`)을 전달하는 것이 일반적입니다.

  - **POST 요청 (Request Body 전달)**

    `body` 객체에 서버로 보낼 데이터를 담습니다. `api.d.ts`에 정의된 타입에 맞춰 작성해야 합니다.

    ```typescript
    import apiClient from "@/lib/api/client";

    async function createNewTeam(teamName: string) {
      const { data, error } = await apiClient.POST("/api/v1/teams", {
        body: {
          name: teamName, // 타입이 자동으로 추론됩니다.
        },
      });

      if (error) {
        console.error("팀 생성 실패:", error);
        return;
      }

      alert("팀이 성공적으로 생성되었습니다!");
    }
    ```

  - **PUT, PATCH, DELETE 요청**

    `PUT`, `PATCH`, `DELETE`도 `POST`와 동일한 방식으로 사용합니다.

    ```typescript
    import apiClient from "@/lib/api/client";

    // 예시: 다음 문제 진출자 수정 (PUT)
    async function updateParticipants(questionSetId: number, userIds: number[]) {
      const { error } = await apiClient.PUT("/api/v1/question-sets/{questionSetId}/live-status/participants", {
          params: {
              path: { questionSetId },
          },
          body: {
              activeUserIds: userIds,
          },
      });

      if (error) {
        console.error("진출자 수정 실패", error);
      }
    }
    ```

---

## `apiHooks` (`openapi-react-query`) 사용 방법 

`apiHooks`는 `apiClient`를 TanStack Query(React Query)와 통합한 것입니다. React 컴포넌트 내에서 서버 상태를 관리(데이터 캐싱, 로딩/에러 상태 처리, 데이터 동기화 등)할 때 사용하는 것을 **강력히 권장**합니다.

`useQuery`, `useMutation` 등 `apiHooks`를 사용할 때도 **API 경로는 반드시 자동 완성으로 제공되는 경로를 선택**해야 합니다. 이는 `apiClient`와 마찬가지로 **타입 안정성을 보장**을 보장하는 방식입니다.

### `useQuery`: 데이터 조회

`useQuery`는 서버에서 데이터를 가져와 캐싱하는 데 사용됩니다.

  - **사용 형식**: `apiHooks.useQuery(method, path, options, queryOptions)`


  - **기본 사용 예시**

    `useParams`로 얻은 ID를 사용하여 특정 문제 세트의 정보를 조회합니다.

    ```jsx
    import apiHooks from "@/lib/api/hooks";
    import { useParams } from "react-router-dom";

    function QuestionSetDetail() {
      const { questionSetId } = useParams<{ questionSetId: string }>();
      const numericId = Number(questionSetId);

      const { data, isLoading, isError, error } = apiHooks.useQuery(
        "get", // 1. HTTP 메서드
        "/api/v1/question-sets/{questionSetId}", // 2. API 경로
        { // 3. 옵션
          params: {
            path: {
              questionSetId: numericId,
            },
          },
        },
        {  // 4. TanStack Query 옵션
          enabled: !!numericId,
          staleTime: 1000 * 60 * 5,
        },
      );

      if (isLoading) return <div>로딩 중...</div>;
      if (isError) return <div>에러 발생: {error.message}</div>;

      // 'data'에는 API 응답의 body 데이터가 담깁니다.
      return <h1>{data?.subject}</h1>;
    }
    ```

- **`queryKey`생성 방식**
  - `openapi-react-query`는 `useQuery`에 전달된 **method**, **path**, 그리고 **params**를 조합하여 TanStack Query가 내부적으로 사용하는 고유한 **queryKey**를 자동으로 생성합니다.

- **`useQuery` 인자 목록**
  1. **method** : `get`과 같은 HTTP method **(required)**
  2. **path** : 자동 완성되는 API 경로 **(required)**
  3. **options** : `params`, `body` 등 API 요청에 필요한 객체
  4. **queryOpions** : TanStack Query의 `useQuery` 옵션
  5. **queryClient** : `queryClient`의 옵션


### `useMutation`: 데이터 변경

`useMutation`은 데이터를 생성, 수정, 삭제하는 API를 호출할 때 사용합니다.

  - **사용 형식**: `apiHooks.useMutation(method, path, options, queryOptions)`

  - **기본 사용 예시**

    `mutate` 함수를 호출하여 팀 생성을 요청하고, 성공 시 `onSuccess` 콜백으로 관련 데이터를 다시 불러오도록(`invalidateQueries`) 설정합니다.

    ```jsx
    import apiHooks from "@/lib/api/hooks";
    import { useQueryClient } from "@tanstack/react-query";

    function TeamCreator() {
      const queryClient = useQueryClient();

      const { mutate: createTeam, isPending } = apiHooks.useMutation(
        "POST", // 1. HTTP 메서드
        "/api/v1/teams", // 2. API 경로
        { // 3. 옵션
          onSuccess: () => {
            alert("팀 생성 성공!");
            // `useQuery`와 동일한 규칙으로 queryKey를 생성하여
            // 관련된 쿼리의 캐시를 무효화합니다.
            queryClient.invalidateQueries({
              queryKey: apiHooks.queryOptions(
                "get",
                "/api/v1/question-sets",
                // 무효화할 쿼리에 params가 있었다면 여기에도 동일하게 명시합니다.
                { query: { teamId: 1 } }
              ).queryKey,
            });
          },
          onError: (error) => {
            alert(`팀 생성 실패: ${error.message}`);
          },
        }
      );

      const handleCreateTeam = (teamName: string) => {
        createTeam({
          body: { name: teamName },
        });
      };

      return (
        <button onClick={() => handleCreateTeam("새로운 팀")} disabled={isPending}>
          {isPending ? "생성 중..." : "팀 생성하기"}
        </button>
      );
    }
    ```

    >  **`queryOptions`**
      TanStack Query의 Query Options로 `queryKey`와 `queryFn` 등을 반환


- **`useMutation` 인자 목록**
  1. **method** : `post`, `put`과 같은 HTTP method **(required)**
  2. **path** : 자동 완성되는 API 경로 **(required)**
  3. **queryOpions** : TanStack Query의 `useMutation` 옵션
  4. **queryClient** : `queryClient`의 옵션

---

**핵심 요약:**

  - **`apiClient`**: 컴포넌트 외부나 간단한 이벤트 핸들러에서 API를 직접 호출할 때 사용합니다.
  - **`apiHooks`**: React 컴포넌트 내에서 서버 데이터를 다룰 때 (조회, 캐싱, 수정) 사용합니다. 데이터 관리의 복잡성을 크게 줄여주므로 **항상 우선적으로 사용**하는 것을 권장합니다.