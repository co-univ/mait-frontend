## PR 제목 규칙 (PR Title Convention)

[타입][티켓 번호] 작업 내용 형식으로 작성해주세요.

**예시 (Examples):**

[FEAT][EDU-123] Implement login feature

[FIX][EDU-456] Resolve header ui in mobile size

<br>

## 🤷‍♂️ 어떤 종류의 PR인가요? (What's the PR about?)
해당하는 모든 항목에 x로 체크해주세요.

[ ] 🆕 새로운 기능 (A new feature)

[ ] ✨ 기능 개선 (Feature enhancement)

[ ] 🐛 버그 수정 (A bug fix)

[ ] ♻️ 리팩토링 (Code refactoring)

[ ] 🎨 스타일 및 UI 수정 (Styling and UI adjustments)

[ ] 🏗️ 빌드 및 환경설정 관련 (Build and configuration related)

[ ] 📝 문서 업데이트 (Documentation update)

[ ] 🧪 테스트 코드 추가/수정 (Adding or updating tests)

<br>

## 📝 PR에 대한 간략한 설명 (A brief description of the PR)
이 PR이 해결하려는 문제나 추가하려는 기능에 대해 간단히 설명해주세요.

(여기에 내용을 작성하세요)

<br>

## 📌 관련 JIRA 티켓 (Related Jira Ticket)
관련된 JIRA 티켓이 있다면 티켓 번호를 링크와 함께 적어주세요.

예: [EDU-123](https://youthing.atlassian.net/jira/software/projects/EDU/summary)

[티켓 번호](Jira 티켓 링크)

<br>

## ✨ 주요 변경 사항 (Key changes)
변경 전(AS-IS)과 변경 후(TO-BE)를 명확하게 비교하여 설명해주세요.

**AS-IS**

(기존 상태나 문제점을 작성하세요)

**TO-BE**

(개선된 점이나 해결책을 작성하세요)

<br>

## 📸 스크린샷 또는 동영상 (Screenshots or videos) (선택 사항)
UI 변경 사항이 있는 경우, 변경 전후를 비교할 수 있는 스크린샷이나 작동 방식을 보여주는 GIF, 동영상을 첨부해주세요.

변경 전 (Before)

변경 후 (After)

(이미지 첨부)

(이미지 첨부)

<br>

## 🚀 배포 시 주의사항 (Deployment Notes)
배포 전후에 특별한 조치가 필요한 경우, 체크리스트나 설명을 추가해주세요.

[ ] **환경 변수 추가/변경**: .env 파일에 새로운 변수 (변수명) 추가가 필요합니다.

[ ] **특정 순서의 배포**: 이 PR은 백엔드 PR (PR 번호) 이후에 배포되어야 합니다.

[ ] **기타**: (예: 배포 후 특정 기능 플래그 활성화 필요, 캐시 초기화 등)

<br>

## ✅ 리뷰어가 확인할 체크리스트 (Checklist for reviewers)
리뷰어가 중점적으로 확인해야 할 부분을 체크리스트로 만들어주세요.

[ ] **(기능)** OOO 기능이 JIRA 티켓의 요구사항대로 작동하는가?

[ ] **(UI/UX)** 모바일, 데스크톱 등 다양한 해상도에서 UI가 깨지지 않는가?

[ ] **(코드)** 컴포넌트가 재사용 가능하게 잘 분리되었는가?

[ ] **(성능)** 불필한 리렌더링이 발생하지 않는가? (필요 시)

[ ] **(테스트)** 추가/수정된 기능에 대한 테스트 코드가 있는가?

<br>

## 🤚 셀프 리뷰 (Self-review)
PR을 올리기 전, 스스로 확인한 사항들을 체크해주세요.

[ ] 브랜치명을 컨벤션에 맞게 작성했나요? (예: feature/PROJ-123-login, fix/PROJ-456-header-bug)

[ ] console.log, debugger 등 불필요한 코드를 제거했나요?

[ ] 스스로 코드 리뷰를 진행했나요?

[ ] 충돌 없이 main 또는 develop 브랜치에 병합할 수 있나요?

[ ] **(Merge 후)** 작업 브랜치를 삭제할 예정인가요? (로컬 및 원격)

<br>

## 💬 추가 공유 사항 (Additional comments)
리뷰어에게 특별히 알리고 싶은 사항이나, 논의가 필요한 부분이 있다면 자유롭게 작성해주세요.

(여기에 내용을 작성하세요)

