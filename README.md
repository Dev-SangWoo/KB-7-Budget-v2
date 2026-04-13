# 💸 소비 유형 기반 가계부 [씀씀]

사용자 소비 유형 기반 맞춤형 UI와 수입/지출 기록, 분석을 제공하는 웹 가계부 애플리케이션

---

## 🔗 링크

- Repo: https://github.com/Dev-SangWoo/KB-7-Budget-v2
- Demo: http://ssmssm.duckdns.org/

---

## 👥 팀원
| <a href="https://github.com/Dev-SangWoo"><img src="https://github.com/Dev-SangWoo.png" width="80" /></a> | <a href="https://github.com/KSBoscoKim"><img src="https://github.com/KSBoscoKim.png" width="80" /></a> | <a href="https://github.com/Jiwon-0326"><img src="https://github.com/Jiwon-0326.png" width="80" /></a> | <a href="https://github.com/Ahyoung00"><img src="https://github.com/Ahyoung00.png" width="80" /></a> | <a href="https://github.com/JIEUN223"><img src="https://github.com/JIEUN223.png" width="80" /></a> |
|:--:|:--:|:--:|:--:|:--:|
| [홍상우](https://github.com/Dev-SangWoo) | [김기선](https://github.com/KSBoscoKim) | [황지원](https://github.com/Jiwon-0326) | [이아영](https://github.com/Ahyoung00) | [이지은](https://github.com/JIEUN223) |
| FE | FE | FE | FE | FE |

---

## 🖥️ 화면

| 기능 | 화면 |
|------|------|
| 소비 유형 분석 | <img width="200" height="400" alt="2-설문조사" src="https://github.com/user-attachments/assets/f081b1f5-3485-42fb-96ba-3e778db9f56f" /><img width="200" height="400" alt="3-분석완료" src="https://github.com/user-attachments/assets/8d4956a0-a189-45f8-a800-4745d79c9598" />|
| 메인 | <img width="200" height="400" alt="5-가계부화면(플렉스형)" src="https://github.com/user-attachments/assets/88583a16-f179-4d02-84bb-b2a9d7fe6e9e" /><img width="200" height="400" alt="4-가계부화면(계획형)" src="https://github.com/user-attachments/assets/473c265e-d7b9-43f4-94e1-076cc91e1a06" /> |
| 달력 및  통계 | <img width="200" height="400" alt="8-달력화면" src="https://github.com/user-attachments/assets/b5068388-e3a8-40f6-afa9-8dbb4246b5da" /> <img width="200" height="400" alt="9-통계화면" src="https://github.com/user-attachments/assets/3bfaf1c2-bf2b-4c49-97f5-b0ee68ac3651" /> |
| 소비 유형 | <img width="200" height="200" alt="KakaoTalk_Photo_2026-04-10-17-31-31-4" src="https://github.com/user-attachments/assets/696c9cef-3d6b-4aa3-927a-e503d355fe16" /> <img width="200" height="200" alt="KakaoTalk_Photo_2026-04-10-17-31-31-3" src="https://github.com/user-attachments/assets/f18bdc40-23e1-464f-8b7e-74c316c53e78" /> <img width="200" height="200" alt="KakaoTalk_Photo_2026-04-10-17-31-31-1" src="https://github.com/user-attachments/assets/c8946869-f683-49de-9b77-78d92377651c" /> <img width="200" height="200" alt="KakaoTalk_Photo_2026-04-13-11-02-31" src="https://github.com/user-attachments/assets/4b625462-060f-49a7-a095-ed770b530b1f" /> |

---

## ✨ 주요 기능

- 수입 / 지출 기록 (날짜, 금액, 카테고리, 메모)
- 거래 내역 조회 및 필터링
- 리스트 / 달력 뷰 제공
- 월별 수입·지출 요약
- 소비 유형 분석 및 피드백

---

## 🛠️ 기술 스택

**Frontend**
- Vue 3
- Vue Router
- Pinia
- Axios

**Backend**
- json-server (Mock API)

---

## 🚀 실행 방법

```bash
git clone https://github.com/Dev-SangWoo/KB-7-Budget-v2.git
cd KB-7-Budget-v2

npm install
npm run dev

# mock server
npx json-server --watch db.json --port 3000
