# **Ovierview**

웹 메모장 API Server

회원 가입 및 메모 CRUD, 태그 기능을 가진 간단한 서비스입니다

아키텍쳐, 테스트, 개발 프로세스 등의 학습 목표를 가지고 개발 했습니다.


# **목표**

@`2020/01/06` → `2020/02/27`

- 회원
- 메모 관리
- 고정, 보관, 휴지통 기능
- `태그` 분류

# **문서**

[프로젝트 관리](https://github.com/junha-ahn/memo-server/projects/1)

[API Document](https://app.gitbook.com/@junha-ahn-dev/s/memo-back/)

# 구조

```
test                # Test 관련
src
│   app.js          # App entry point
└───api             # Express route 컨트롤러
└───config          # 환경변수
└───loaders         # 모듈 로더
└───models          # DB Models (Moongose)
└───services        # 비지니스 로직
└───helpers         # 함수 모음
```

# 정책

## 개발 프로세스

1. `issue` 생성
    - 라벨 및 `Projects` 선택
2. 담당 개발자 assign
3.  `issue/<이슈 번호>` 네이밍을 가진 브랜치를 `master`에서 체크아웃 후 개발
4. 작업 완료 시, `master` 브랜치로 `pull request`. 

    ~~reviewer 기능을 통해 리뷰를 요청~~, Projects를 선택

5. 리뷰가 approve되면 `merge`, 작업이 완료시 `issue close` 작업 브랜치를 제거

리뷰는 일인 개발 관계로 생략했습니다

## 테스트

`Mocha` 이용 `SuperTest` 진행

## 기타

### Time format

- `UTC, ISO 8601 format`(YYYY-MM-DDTHH:mm:ss.SSS±hh:mm)
- `DATETIME`

### Naming convention

- `Camel Case`

## 기술

- `Node.js` (`Express.js`)
- `MongoDB`  with `Mongoose`
- `Redis`
- `Mocha` - 테스트 프레임워크

---

- `Docker`

## **참고**

`city7310`님의 [백엔드가 이정도는 해줘야함](https://velog.io/@city7310/%EB%B0%B1%EC%97%94%EB%93%9C%EA%B0%80-%EC%9D%B4%EC%A0%95%EB%8F%84%EB%8A%94-%ED%95%B4%EC%A4%98%EC%95%BC-%ED%95%A8-1.-%EC%BB%A8%ED%85%90%EC%B8%A0%EC%9D%98-%EB%8F%99%EA%B8%B0%EC%99%80-%EA%B0%9C%EC%9A%94)

`Sam Ouinn`님의 [Bulletproof node.js project architecture](https://dev.to/santypk4/bulletproof-node-js-project-architecture-4epf)

`Samuele Zaza`님의 [Test a Node RESTful API with Mocha and Chai](https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai)

`Ekunola Ezekiel`님의 [Testing Node API with Mocha & Chai](https://dev.to/easybuoy/testing-node-api-with-mocha-chai-248b)
