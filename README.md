# Commit_test

성향 검사를 통해 어울리는 IT직종을 추천해드립니다.

## git 명령어

```
git checkout 브랜치명 // 브랜치 변경
git branch 만들브랜치명 갖고올브랜치명 // 브랜치 생성

git pull origin 브랜치명 // 기재한 브랜치명에서 소스들 가져옴
git push origin 브랜치명 // 기재한 브랜치명으로 소스를 기록함
```

- ✨ clone 후 `checkout` 명령어를 통해 본인 브랜치로 변경 후 작업하세요
- ✨ push 할 때 main/dev브랜치에 하시면 안됩니다!!
- ✨ 꼭 본인 브랜치에만 push 하세요
- pull 할 땐 보통 dev 브랜치를 이용하시면 됩니다.

```
(X) git push origin main/dev
(O) git push origin 본인 브랜치

(O) git pull origin dev
```

> git 본인 브랜치로 push 후 깃허브에서 PR 열어주시면 확인 후 dev브랜치로 merge해드리겠습니다.

## git 커밋 컨벤션

- feat: 새로운 기능 추가
- fix: 버그 수정
- docs: 문서 수정
- style: 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우
- refactor: 코드 리펙토링
- test: 테스트 코드, 리펙토링 테스트 코드 추가
- chore: 빌드 업무 수정, 패키지 매니저 후
- design: css 등 디자인 관련

## 설치라이브러리

- tawilwind css
- typescript
- react-router-dom
- react-icons
- firebase
