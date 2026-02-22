import { useState } from "react";

type SectionId =
  | "dashboard"
  | "overview"
  | "income"
  | "reallocation"
  | "expense"
  | "systems"
  | "checklist"
  | "contacts"
  | "security";

const SECTION_LABEL: Record<SectionId, string> = {
  dashboard: "대시보드",
  overview: "업무 개요",
  income: "수입 업무 튜토리얼",
  reallocation: "대체결의 튜토리얼",
  expense: "지출 업무 튜토리얼",
  systems: "시스템별 상세",
  checklist: "체크리스트 및 자주 하는 실수",
  contacts: "담당자·계정 정보",
  security: "보안 및 유의사항"
};

/** 검색 시 매칭용 키워드 (해당 섹션으로 이동) */
const SECTION_KEYWORDS: Record<SectionId, string[]> = {
  dashboard: ["대시보드", "오늘", "처리", "마감"],
  overview: ["업무개요", "4대시스템", "e-Branch", "연구비종합", "베스트케어", "통합이지바로", "흐름"],
  income: ["수입", "사업비", "병원대응자금", "수입결의", "계좌거래"],
  reallocation: ["대체결의", "간접비", "인건비", "퇴직적립금", "징수결의"],
  expense: ["지출", "일반청구", "카드청구", "세금계산서", "계좌이체", "비목코드", "73733", "73732"],
  systems: ["시스템", "e-Branch", "연구비종합", "베스트케어", "통합이지바로", "메뉴"],
  checklist: ["체크리스트", "실수", "과제기간", "비목", "증빙", "결재"],
  contacts: ["담당자", "계정", "연락처", "연락"],
  security: ["보안", "ID", "PW", "비밀번호", "계좌", "마스킹"]
};

function findSectionByKeyword(query: string): SectionId | null {
  const q = query.trim().toLowerCase().replace(/\s/g, "");
  if (!q) return null;
  const ids = Object.keys(SECTION_KEYWORDS) as SectionId[];
  for (const id of ids) {
    if (SECTION_LABEL[id].toLowerCase().replace(/\s/g, "").includes(q)) return id;
    if (SECTION_KEYWORDS[id].some((k) => k.toLowerCase().replace(/\s/g, "").includes(q))) return id;
    if (SECTION_KEYWORDS[id].some((k) => q.includes(k.toLowerCase().replace(/\s/g, "")))) return id;
  }
  return null;
}

function App() {
  const [active, setActive] = useState<SectionId>("overview");
  const [searchInput, setSearchInput] = useState("");

  const runSearch = () => {
    const found = findSectionByKeyword(searchInput);
    if (found) setActive(found);
  };

  return (
    <div className="app-root">
      <aside className="sidebar">
        <div>
          <div className="sidebar-title">바이오코어 사업단</div>
          <div className="sidebar-title">수입·지출 업무 튜토리얼</div>
          <p className="sidebar-subtitle">
            인계인수서(2026.02.13)와 매뉴얼을 기반으로 한
            <br />
            화면 단위 시뮬레이션 가이드
          </p>
        </div>
        <div className="search-box">
          <input
            type="text"
            className="search-input"
            placeholder="메뉴 검색 (예: 수입, 지출, 체크리스트)"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && runSearch()}
          />
          <button type="button" className="search-btn" onClick={runSearch} aria-label="검색">
            검색
          </button>
        </div>
        <nav>
          <ul className="nav-list">
            {(Object.keys(SECTION_LABEL) as SectionId[]).map((id) => (
              <li
                key={id}
                className={`nav-item ${active === id ? "active" : ""}`}
                onClick={() => setActive(id)}
              >
                <span className="bullet" />
                {SECTION_LABEL[id]}
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className="content">
        <header className="content-header">
          <h1 className="content-title">{SECTION_LABEL[active]}</h1>
          <p className="content-subtitle">
            {active === "overview" &&
              "4대 시스템(e-Branch, 연구비종합관리시스템, 베스트케어, 통합이지바로)의 역할과 전체 흐름을 한눈에 봅니다."}
            {active === "income" && "사업비 및 병원대응자금 수입결의 절차를 화면 단위로 따라갑니다."}
            {active === "reallocation" &&
              "간접비·인건비·퇴직적립금 등 대체결의 업무 흐름과 주의사항을 정리했습니다."}
            {active === "expense" &&
              "세금계산서·카드·회의비 등 지출 성격별로 연구비종합관리 → 베스트케어 → e-Branch 흐름을 학습합니다."}
            {active === "systems" &&
              "각 시스템별 로그인, 메뉴 경로, 화면 요소를 정리해 실제 시스템 사용을 시뮬레이션합니다."}
            {active === "checklist" && "업무 시작 전·결재 전 체크해야 할 항목과 자주 발생하는 실수를 모았습니다."}
            {active === "contacts" && "시스템·업무별 담당자 및 계정 정보 안내. ID/PW는 보안 문서로 관리합니다."}
            {active === "security" && "ID/PW, 계좌, 연락처 등 민감 정보 취급 시 유의해야 할 사항을 안내합니다."}
            {active === "dashboard" &&
              "오늘 처리해야 할 업무 유형과 현재 단계별 진행 현황을 요약해서 보여주는 개념 대시보드입니다."}
          </p>
        </header>

        {active === "overview" && <OverviewSection />}
        {active === "income" && <IncomeSection />}
        {active === "reallocation" && <ReallocationSection />}
        {active === "expense" && <ExpenseSection />}
        {active === "systems" && <SystemsSection />}
        {active === "checklist" && <ChecklistSection />}
        {active === "contacts" && <ContactsSection />}
        {active === "security" && <SecuritySection />}
        {active === "dashboard" && <DashboardSection />}
      </main>
    </div>
  );
}

function OverviewSection() {
  return (
    <div className="scroll-section">
      <section className="section">
        <div className="pill-label">
          <span className="pill-dot" />
          신규 담당자용 시작 페이지
        </div>
        <h2>사업단 재정 구조와 4대 시스템 한눈에 보기</h2>
        <p>
          이 튜토리얼은 바이오코어 사업단 인계인수서(2026.02.13)와 업무 매뉴얼을 기반으로,{" "}
          <strong>수입·지출·대체결의·정산</strong> 업무를
          <strong> 화면 단위로 시뮬레이션</strong>할 수 있도록 설계되었습니다. 실제 업무는 네 가지 시스템이
          유기적으로 연결되어 처리됩니다.
        </p>

        <div className="card-grid">
          <div className="card">
            <h3>4대 시스템 역할 요약</h3>
            <table className="table">
              <thead>
                <tr>
                  <th>시스템</th>
                  <th>주요 기능</th>
                  <th>업무 흐름 상 위치</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>e-Branch</td>
                  <td>계좌 입금 확인, 실제 이체 처리</td>
                  <td>수입 확인 · 지출 송금</td>
                </tr>
                <tr>
                  <td>연구비종합관리시스템</td>
                  <td>청구(결의)서 작성, 예산·비목 관리, 통합이지바로 연계 전송</td>
                  <td>지출 1차 결의</td>
                </tr>
                <tr>
                  <td>베스트케어</td>
                  <td>지출결의서 작성, 세목코드·전표 생성</td>
                  <td>지출 2차 결의(병원 내부 회계)</td>
                </tr>
                <tr>
                  <td>통합이지바로</td>
                  <td>대외 정산, 사용실적보고서 제출, IRIS 연계</td>
                  <td>집행 등록·정산 보고</td>
                </tr>
              </tbody>
            </table>
            <div className="warning">
              지출 업무는 반드시{" "}
              <strong>연구비종합관리(청구서) → 베스트케어(지출결의서) → e-Branch(이체)</strong> 순으로 진행해야
              하며, 통합이지바로에는 최종 집행 내역을 반영합니다.
            </div>
          </div>

          <div className="card">
            <h3>전체 업무 상위 흐름</h3>
            <div className="flow-box">
              {[
                "1. 예산 편성 / 배정",
                "2. 수입 발생 · 입금 확인 (e-Branch)",
                "3. 수입결의 등록 (연구비종합관리 → 베스트케어)",
                "4. 지출 계획 수립",
                "5. 지출결의 (연구비종합관리 청구서)",
                "6. 지출결의 (베스트케어 전표)",
                "7. 실제 이체 (e-Branch)",
                "8. 사용실적보고 및 정산 (통합이지바로, IRIS 등)"
              ].join("\n")}
            </div>
            <p className="muted">
              각 단계는 이 튜토리얼의 다른 메뉴에서{" "}
              <strong>“어느 시스템의 어느 화면을 열어야 하는지”</strong> 기준으로 상세히 시뮬레이션됩니다.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function IncomeSection() {
  return (
    <div className="scroll-section">
      <section className="section">
        <h2>수입 업무 튜토리얼</h2>
        <p>
          사업비·병원대응자금이 입금된 후 e-Branch → 연구비종합관리시스템 → 베스트케어 순으로 수입결의를
          완료하는 절차를 시나리오별로 따라갑니다.
        </p>

        <h3>1. 사업비 수입결의</h3>
        <p>
          <strong>상황</strong>: 한국연구재단에서 사업비가 입금되었고,{" "}
          <strong>기업은행 55402028004050(유경하_바이오코어)</strong> 계좌로 유입된 금액을 사업단 예산으로
          반영해야 합니다.
        </p>

        <div className="two-column">
          <div>
            <h3>Step 1. e-Branch – 입금 내역 확인</h3>
            <p>
              <span className="tag">시스템: e-Branch</span>
            </p>
            <ul>
              <li>① 바탕화면 e-Branch 실행 → 로그인(ID/PW 입력)</li>
              <li>② 상단 메뉴에서 [금융관리] → [일반계좌거래내역관리] → [거래내역조회]</li>
              <li>③ 사업장: 이화의대부속목동병원 선택</li>
              <li>④ 조회기간 설정 (입금 예상일 포함)</li>
              <li>⑤ 은행: 기업은행 / 계좌: 55402028004050 선택</li>
              <li>⑥ 입출구분: 입금</li>
              <li>⑦ [조회] 버튼 클릭 후 입금 내역 확인</li>
            </ul>
            <div className="warning">
              입금자명, 금액, 사업명/과제명이 인계인수서에 정리된 협약 내용과 일치하는지 반드시 확인합니다.
            </div>
          </div>

          <div>
            <h3>Step 2. 연구비종합관리 – 수입결의 등록</h3>
            <p>
              <span className="tag">시스템: 연구비종합관리시스템</span>
            </p>
            <ul>
              <li>① 연구비관리자 계정(직번)으로 로그인</li>
              <li>② [연구비관리] → [수입관리] → [수입결의(계좌거래)] 메뉴 진입</li>
              <li>③ [작성] → [추가] 버튼으로 신규 수입결의 생성</li>
              <li>④ 사업(과제)번호, 계정과목, 재원(국고/병원 등) 선택</li>
              <li>⑤ e-Branch에서 확인한 입금 금액 입력</li>
              <li>⑥ 적요에 입금 목적·재단명·협약번호 등 기재</li>
              <li>⑦ [신청] → 전자결재 → 결재자(담당자) 선택 후 상신</li>
            </ul>
            <ul className="checklist">
              <li>
                <span className="box" /> 과제번호·사업명 일치 여부
              </li>
              <li>
                <span className="box" /> 재원(국고 / 병원대응자금 등) 선택 오류 여부
              </li>
              <li>
                <span className="box" /> 금액(부가세 포함/제외) 기준 일치
              </li>
            </ul>
          </div>
        </div>

        <section className="section">
          <h3>Step 3. 베스트케어 – 수입결의서 작성</h3>
          <p>
            <span className="tag">시스템: 베스트케어</span>
          </p>
          <ul>
            <li>① 로그인 → [부서행정] → [메뉴] → [결의관리]</li>
            <li>② [수입금미확인내역]에서 해당 입금건 선택</li>
            <li>③ ‘확인일자’를 실제 입금일자와 동일하게 입력</li>
            <li>④ [수입결의서등록] 버튼 클릭</li>
            <li>⑤ 계정코드: 64031 / 품명: 과제명 또는 사업명으로 명확히 기입</li>
            <li>⑥ 저장 후 [수입결의서 조회] → 해당 건 검색 → [미리보기] → 인쇄</li>
            <li>⑦ 수기결재 후 재무팀 제출</li>
          </ul>
          <div className="warning">
            연구비종합관리시스템의 수입결의서, 베스트케어 수입결의서, e-Branch 입출금명세서를{" "}
            <strong>셋트로 묶어 결재</strong>하는 것이 원칙입니다.
          </div>
        </section>

        <h3>2. 병원대응자금 수입결의</h3>
        <p>
          <strong>상황</strong>: 병원대응자금이 동일 계좌(기업은행 55402028004050) 또는 병원 지정 계좌로 입금된 후,
          <strong> 재원을 병원대응자금으로 구분</strong>하여 수입결의를 진행하는 경우입니다.
        </p>
        <div className="two-column">
          <div>
            <p><span className="tag">사업비 수입결의와 동일 흐름</span></p>
            <ul>
              <li>① e-Branch에서 입금 내역 확인 (사업장·계좌 동일)</li>
              <li>② 연구비종합관리시스템 [수입결의(계좌거래)]에서 <strong>재원을 병원대응자금으로 선택</strong></li>
              <li>③ 과제·비목·계정은 인계인수서의 병원대응자금 기준과 일치하게 입력</li>
            </ul>
          </div>
          <div>
            <p><span className="tag">체크 포인트</span></p>
            <ul className="checklist">
              <li><span className="box" /> 재원: 국고 vs 병원대응자금 선택 오류 주의</li>
              <li><span className="box" /> 입금 계좌·과제 매칭 확인</li>
              <li><span className="box" /> 베스트케어 수입결의서 등록 시 계정코드 64031 유지</li>
            </ul>
            <div className="warning">
              사업비와 병원대응자금을 같은 계좌로 받는 경우, 입금 건별로 <strong>재원 구분</strong>을 정확히 해야
              정산·보고 시 혼선이 없습니다.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ReallocationSection() {
  return (
    <div className="scroll-section">
      <section className="section">
        <h2>대체결의 개요</h2>
        <p>
          대체결의는 간접비, 인건비, 퇴직적립금, 퇴직금, 이자수입, 이월금 등{" "}
          <strong>재원 간 이동·정산을 위한 결의</strong>입니다. 인계인수서에는 각 항목별로 연구비종합관리시스템과
          베스트케어 처리 절차가 상세히 정리되어 있습니다.
        </p>

        <div className="card-grid">
          <div className="card">
            <h3>대표 유형</h3>
            <ul>
              <li>1) 간접비 대체결의</li>
              <li>2) 인건비 대체결의</li>
              <li>3) 퇴직적립금 대체결의</li>
              <li>4) 퇴직금 대체결의</li>
              <li>5) 이자수입 대체결의</li>
              <li>6) 이월금·국고재원 대체결의</li>
            </ul>
          </div>

          <div className="card">
            <h3>공통 흐름 요약</h3>
            <div className="flow-box">
              {[
                "① (연구비종합관리시스템) 연구비신청서 또는 일반대체 청구서 작성",
                "② 전자결재 상신 및 결재 완료",
                "③ (베스트케어) 수입/대체결의서 작성",
                "④ 대변·차변 계정 및 계좌 설정",
                "⑤ 미리보기 후 인쇄, 수기결재, 재무팀 제출",
                "⑥ 연구비종합 결의서 + 베스트케어 결의서 + 증빙 묶어 보관"
              ].join("\n")}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <h3>간접비 대체결의 (예시)</h3>
        <div className="two-column">
          <div>
            <p>
              <span className="tag">연구비종합관리시스템</span>
            </p>
            <ul>
              <li>① 청구(결의서) 유형에서 [징수결의] 선택</li>
              <li>② 간접비 징수 대상 금액 입력</li>
              <li>③ 적요에 징수 기준 및 기간 기재</li>
              <li>④ [신청] 후 전자결재 → 징수결의서 출력</li>
            </ul>
          </div>
          <div>
            <p>
              <span className="tag">베스트케어 – 대체결의서</span>
            </p>
            <ul>
              <li>① [수입/대체결의관리] → [대체] 선택</li>
              <li>② [초기화] → [+행추가] 후 내역 입력</li>
              <li>③ 저장 → [미리보기] → 인쇄</li>
              <li>④ 수기결재 후 재무팀 제출</li>
            </ul>
            <div className="warning">
              연구비종합 징수결의서와 베스트케어 대체결의서를{" "}
              <strong>한 묶음으로 관리</strong>해야 추후 정산·감사 시 추적이 용이합니다.
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <h3>인건비 대체결의 (예시)</h3>
        <p>
          인건비는 일반적으로 <strong>1월에 일괄 결의</strong>하는 경우가 많습니다. 대변(11113 보통예금) → 차변(11114 당좌예금)
          이동으로 처리하며, 급여지급내역·4대보험 집행내역·소득원천징수부 등 증빙을 함께 관리합니다.
        </p>
        <div className="two-column">
          <div>
            <p><span className="tag">연구비종합관리시스템</span></p>
            <ul>
              <li>① [연구비관리] 또는 청구(결의) 메뉴에서 인건비 관련 청구서/연구비신청서 선택</li>
              <li>② 급여·4대보험 등 인건비 집행 내역에 맞춰 금액·비목 입력</li>
              <li>③ 적요에 기간·인원·지급 기준 기재</li>
              <li>④ [신청] 후 전자결재 → 결의서 출력</li>
            </ul>
          </div>
          <div>
            <p><span className="tag">베스트케어 – 대체결의서</span></p>
            <ul>
              <li>① [수입/대체결의관리] → [대체] 선택</li>
              <li>② 대변: 보통예금(11113), 차변: 당좌예금(11114) 등 계정 설정</li>
              <li>③ 인건비 비목코드(73731) 확인 후 저장 → [미리보기] → 인쇄</li>
              <li>④ 수기결재 후 재무팀 제출 (급여지급내역·소득원천징수부 등 증빙 첨부)</li>
            </ul>
            <ul className="checklist">
              <li><span className="box" /> 11113(보통예금) ↔ 11114(당좌예금) 계정 구분</li>
              <li><span className="box" /> 증빙 금액과 시스템 입력 금액 일치</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

function ExpenseSection() {
  return (
    <div className="scroll-section">
      <section className="section">
        <h2>지출 전체 흐름</h2>
        <div className="flow-box">
          {[
            "1) 연구비종합관리시스템 – 청구(결의)서 작성",
            "2) (세금계산서/계좌이체 건) 분개수정 후 전자결재",
            "3) 연계관리 – 결의정보 통합이지바로 전송",
            "4) 이체전송(e-Branch) – 이체 대상 결의서 전송",
            "5) e-Branch – 실제 이체 처리",
            "6) 베스트케어 – 지출결의서 작성 및 결재",
            "7) 증빙과 함께 재무팀 제출"
          ].join("\n")}
        </div>
      </section>

      <section className="section">
        <h3>1. 일반청구 (세금계산서·계좌이체)</h3>
        <p>
          <strong>시나리오 개요</strong>: 세금계산서 또는 계좌이체로 납부한 비용을 연구비종합관리시스템에서 청구서로
          작성한 뒤, 분개수정·전자결재 → 통합이지바로 전송 → e-Branch 이체 → 베스트케어 지출결의서 순으로 처리합니다.
        </p>
        <div className="step-block">
          <h4>Step 1. 연구비종합관리시스템 – 청구서 작성</h4>
          <p><span className="tag">메뉴 경로</span> 연구비관리 → 지출관리 → 일반청구(또는 해당 청구 유형)</p>
          <ul>
            <li>① 전자세금계산서 XML 불러오기 시 열람 비밀번호: 사업자등록번호 1178201074</li>
            <li>② 금액·부가세 자동 반영 여부 확인 후 비목·과제 선택</li>
            <li>③ 계좌이체 건은 거래처·금액·계좌 정보 입력</li>
            <li>④ 분개수정(세금계산서/계좌이체) 후 [신청] → 전자결재 상신</li>
          </ul>
        </div>
        <div className="step-block">
          <h4>Step 2. 연계관리 – 통합이지바로 전송</h4>
          <p><span className="tag">메뉴 경로</span> 연계관리(또는 결의정보전송) → 통합이지바로 전송 대상 선택 → 전송</p>
          <ul>
            <li>① 결재 완료된 청구(결의)서를 통합이지바로 전송 대상으로 선택</li>
            <li>② 송신 여부·확정 처리 확인</li>
          </ul>
        </div>
        <div className="step-block">
          <h4>Step 3. 이체전송(e-Branch) 및 실제 이체</h4>
          <p><span className="tag">메뉴 경로</span> e-Branch: 지급대상 전송 연계 확인 후 실제 이체 실행</p>
          <ul>
            <li>① 연구비종합·통합이지바로에서 이체 대상 전송 완료 후 e-Branch에서 수신 확인</li>
            <li>② e-Branch에서 이체 처리 실행</li>
          </ul>
        </div>
        <div className="step-block">
          <h4>Step 4. 베스트케어 – 지출결의서 작성</h4>
          <p><span className="tag">메뉴 경로</span> 부서행정 → 결의관리 → 지출결의 (또는 해당 메뉴)</p>
          <ul>
            <li>① 비목코드(73733 장비/연구활동, 73732 재료비 등) 설정</li>
            <li>② 차변·대변 계정 및 거래처 입력, 전표 생성</li>
            <li>③ 미리보기 → 인쇄 후 수기결재, 증빙과 함께 재무팀 제출</li>
          </ul>
        </div>
        <ul className="checklist">
          <li><span className="box" /> XML·매입세금계산서 금액과 시스템 입력 금액 일치</li>
          <li><span className="box" /> 과제기간·예산 비목 내 집행 여부 확인</li>
        </ul>
        <div className="warning">
          세금계산서 열람 비밀번호는 사업자등록번호입니다. XML 불러오기 후 공급가·세액이 자동 반영되는지 반드시
          확인하세요.
        </div>
      </section>

      <section className="section">
        <h3>2. 카드청구</h3>
        <p>
          <strong>시나리오 개요</strong>: 사업단 공용 카드로 결제한 내역을 청구할 때, 결제일자(매월 23일 출금) 기준으로
          미청구 카드내역을 선택해 청구서를 작성합니다. 발급자별 카드번호(전상표·이후정·유경하 등)를 구분해야 합니다.
        </p>
        <div className="step-block">
          <h4>Step 1. 연구비종합관리시스템 – 카드청구서 작성</h4>
          <p><span className="tag">메뉴 경로</span> 연구비관리 → 지출관리 → 카드청구</p>
          <ul>
            <li>① 카드 매출내역(카드대금 청구서) 준비, 결제일자 = 당월 출금일(23일) 기준 확인</li>
            <li>② 미청구 카드내역 선택, 사용 건별로 비목·과제 지정</li>
            <li>③ 발급자(전상표·이후정·유경하)별 카드번호 구분하여 입력</li>
            <li>④ [신청] → 전자결재 상신</li>
          </ul>
        </div>
        <div className="step-block">
          <h4>Step 2. 연계·이체·베스트케어</h4>
          <p><span className="tag">흐름</span> 일반청구와 동일: 연계관리(통합이지바로 전송) → 이체전송(e-Branch) → 베스트케어 지출결의서</p>
          <ul>
            <li>① 결재 완료 후 연계관리에서 통합이지바로 전송</li>
            <li>② e-Branch 이체 후 베스트케어에서 지출결의서 작성, 비목코드·차변·대변 설정</li>
            <li>③ 카드 매출내역·청구서 증빙 첨부하여 재무팀 제출</li>
          </ul>
        </div>
        <ul className="checklist">
          <li><span className="box" /> 결제일자(23일)와 청구 대상 기간 일치</li>
          <li><span className="box" /> 카드 발급자별 번호 구분 입력</li>
        </ul>
        <div className="warning">
          카드 사용일과 결제일, 청구 대상 기간이 맞지 않으면 정산 시 불인정될 수 있으므로 인계인수서의 카드
          발급정보를 참고해 구분하여 입력하세요.
        </div>
      </section>

      <section className="section">
        <h3>지출 유형별 핵심 포인트</h3>
        <table className="table">
          <thead>
            <tr>
              <th>지출유형</th>
              <th>필수 증빙</th>
              <th>주의사항</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>인건비</td>
              <td>급여지급내역, 4대보험 집행내역, 소득원천징수부</td>
              <td>일반적으로 1월에 일괄 결의, 대체결의 시 보통예금(11113) ↔ 당좌예금(11114) 이동</td>
            </tr>
            <tr>
              <td>퇴직적립금</td>
              <td>퇴직금 적립금 산정내역</td>
              <td>사업비 통장 → 퇴직금 계좌(55402028004149)로 이체, 연구비신청서와 대체결의서 묶음 보관</td>
            </tr>
            <tr>
              <td>세금계산서</td>
              <td>전자세금계산서 XML, 매입세금계산서</td>
              <td>열람 비밀번호는 사업자등록번호 1178201074, XML 불러오기 후 금액·부가세 자동 반영 여부 확인</td>
            </tr>
            <tr>
              <td>카드청구</td>
              <td>카드 매출내역, 카드대금 청구서</td>
              <td>결제일자(매월 23일) 기준 미청구 카드내역 선택, 발급자별 카드번호 구분 필수</td>
            </tr>
            <tr>
              <td>회의비</td>
              <td>회의비 사전신청서, 회의록, 참석자 명단, 영수증</td>
              <td>반드시 사전회의비신청 후 집행, PI계정(00342)으로 회의사전신청 → 연구비관리자 결재선 지정</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="section">
        <h3>베스트케어 비목코드 요약</h3>
        <div className="chip-row">
          <span className="chip">연구활동비/장비비: 73733</span>
          <span className="chip">재료비: 73732</span>
          <span className="chip">인건비: 73731</span>
          <span className="chip">간접비: 73734</span>
          <span className="chip">보통예금: 11113</span>
          <span className="chip">당좌예금: 11114</span>
          <span className="chip">기타소득세: 21513</span>
          <span className="chip">기타지방소득세: 21514</span>
        </div>
      </section>
    </div>
  );
}

function SystemsSection() {
  return (
    <div className="scroll-section">
      <section className="section">
        <h2>시스템별 화면·업무 흐름</h2>
        <p>
          실제 시스템 화면 캡처를 업로드하면, 아래 설명 블록 옆에{" "}
          <strong>“관련 시스템 화면 보기” 버튼</strong>을 배치하여 팝업 또는 오버레이로 볼 수 있도록 설계하면
          좋습니다.
        </p>
      </section>

      <section className="section">
        <h3>e-Branch</h3>
        <p>은행 계좌의 입금 확인과 실제 이체를 담당하는 시스템입니다.</p>
        <ul>
          <li>· 주요 메뉴: 입금내역 조회, 이체, 지급대상전송 연계 확인</li>
          <li>· 업무 연결: 수입 업무 Step 1, 지출 업무 최종 단계</li>
        </ul>
      </section>

      <section className="section">
        <h3>연구비종합관리시스템</h3>
        <p>사업비 예산 편성, 청구(결의)서 작성, 단계 이월 및 정산을 관리합니다.</p>
        <ul>
          <li>· 수입관리: 수입결의(계좌거래) 작성 및 결재</li>
          <li>· 지출관리: 일반청구, 카드청구, 인건비, 간접비 등 비목별 청구서 작성</li>
          <li>· 연계관리: 결의정보 통합이지바로 전송</li>
        </ul>
      </section>

      <section className="section">
        <h3>베스트케어</h3>
        <p>병원 내부 회계 기준에 따라 지출결의서를 작성하고 전표를 생성하는 시스템입니다.</p>
        <ul>
          <li>· 지출결의: 비목코드(73731~73734 등) 및 자금종류 설정</li>
          <li>· 결의서 조회: 부서 전체 결의서 조회(직번 삭제 후 조회)</li>
          <li>· 카드/세금계산서 결의: 차변·대변 구조 설정, 거래처 등록 필요 시 재무팀 요청</li>
        </ul>
      </section>

      <section className="section">
        <h3>통합이지바로</h3>
        <p>연구비종합관리시스템에서 전송된 결의정보를 기반으로 이체 및 정산을 관리합니다.</p>
        <ul>
          <li>· 결의정보전송관리: 송신여부 확인, 확정처리</li>
          <li>· 이체전송(e-Branch): 지급대상 전송 후 e-Branch 연계</li>
          <li>· 단계이월금 반영 여부 확인, 정산 시점 확인</li>
        </ul>
      </section>
    </div>
  );
}

function ChecklistSection() {
  return (
    <div className="scroll-section">
      <section className="section">
        <h2>공통 체크리스트</h2>
        <ul className="checklist">
          <li>
            <span className="box" /> 과제 기간 내 집행인지 확인 (시작일·종료일 대비)
          </li>
          <li>
            <span className="box" /> 예산 비목과 실제 지출 비목 일치 여부 (변경 필요 시 협약변경 선행)
          </li>
          <li>
            <span className="box" /> 세금계산서·영수증·계약서 등 증빙 금액과 시스템 입력 금액 일치
          </li>
          <li>
            <span className="box" /> 카드 사용일과 결제일, 청구 대상 기간 일치
          </li>
          <li>
            <span className="box" /> 내부 결재선(관리자·실장·부원장 등) 정확히 지정
          </li>
          <li>
            <span className="box" /> 수기결재 후 재무팀 제출 여부 확인
          </li>
        </ul>
      </section>

      <section className="section">
        <h3>업무 유형별 체크 포인트</h3>
        <div className="card-grid">
          <div className="card">
            <h4>수입결의 결재 전</h4>
            <ul className="checklist">
              <li><span className="box" /> 입금액과 수입결의 금액 일치</li>
              <li><span className="box" /> 재원(국고/병원대응자금) 선택 확인</li>
              <li><span className="box" /> 계정코드 64031 등 확인</li>
            </ul>
          </div>
          <div className="card">
            <h4>대체결의 결재 전</h4>
            <ul className="checklist">
              <li><span className="box" /> 징수/대체 금액과 증빙 일치</li>
              <li><span className="box" /> 대변·차변 계정(11113, 11114 등) 확인</li>
              <li><span className="box" /> 연구비종합 결의서 + 베스트케어 결의서 셋트</li>
            </ul>
          </div>
          <div className="card">
            <h4>지출결의 결재 전</h4>
            <ul className="checklist">
              <li><span className="box" /> XML·증빙 금액과 입력 금액 일치</li>
              <li><span className="box" /> 비목코드(73731~73734) 적합 여부</li>
              <li><span className="box" /> 통합이지바로 전송·e-Branch 이체 완료 후 베스트케어</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>자주 하는 실수</h2>
        <div className="card-grid">
          <div className="card">
            <h3>1. 과제 기간 외 집행</h3>
            <p>
              과제 종료일 이후 또는 개시일 이전의 영수증을 사용하여 결의하는 경우 정산 시 불인정될 수 있습니다.
              기간이 애매한 경우 반드시 선배 연구원이나 연구지원팀에 확인합니다.
            </p>
          </div>
          <div className="card">
            <h3>2. 비목 오집행</h3>
            <p>
              예산은 연구활동비, 장비비, 재료비, 인건비, 간접비 등으로 구분되어 있습니다. 예산과 다른 비목으로
              집행하면 추후 정산·감사에서 문제될 수 있으므로, 필요 시 협약변경을 통해 비목 조정 후 집행해야 합니다.
            </p>
          </div>
          <div className="card">
            <h3>3. 증빙 누락</h3>
            <p>
              전자세금계산서 XML, 카드전표, 계약서, 참석자 명단 등 필수 증빙이 누락되면 정산 시 추가 소명자료를
              요구받게 됩니다. 인계인수서의 비목별 증빙 목록을 참고하여 미리 준비합니다.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactsSection() {
  return (
    <div className="scroll-section">
      <section className="section">
        <h2>담당자·계정 정보</h2>
        <p>
          시스템·업무별 담당자 및 계정 정보는 <strong>인계인수서(2026.02.13)</strong>와 내부 문서로 관리합니다.
          ID/PW는 본 튜토리얼에 적지 않으며, 별도 보안 문서에서 확인하세요.
        </p>
        <div className="card-grid">
          <div className="card">
            <h3>시스템별 담당·계정</h3>
            <table className="table">
              <thead>
                <tr>
                  <th>구분</th>
                  <th>비고</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>e-Branch</td><td>인계인수서 참고 (사업장·계좌 정보)</td></tr>
                <tr><td>연구비종합관리시스템</td><td>연구비관리자 계정(직번), 결재선 지정</td></tr>
                <tr><td>베스트케어</td><td>부서행정·결의관리, 비목코드 73731~73734</td></tr>
                <tr><td>통합이지바로</td><td>연계관리·이체전송 확인</td></tr>
              </tbody>
            </table>
          </div>
          <div className="card">
            <h3>주요 계좌·계정 요약</h3>
            <ul>
              <li>· 사업비 계좌: 기업은행 55402028004050 (인계인수서 확인)</li>
              <li>· 퇴직금 계좌: 55402028004149 (대체결의 이체 시)</li>
              <li>· 베스트케어: 보통예금 11113, 당좌예금 11114, 인건비 73731 등</li>
            </ul>
            <p className="muted">연락처·내선은 내부망 또는 인계인수서에서 확인하세요.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

function SecuritySection() {
  return (
    <div className="scroll-section">
      <section className="section">
        <h2>보안 및 유의사항</h2>
        <ul>
          <li>
            · e-Branch, 연구비종합관리시스템, 베스트케어, 통합이지바로의 ID/PW는{" "}
            <strong>본 웹 튜토리얼에 직접 노출하지 않습니다.</strong>
          </li>
          <li>· 계좌번호, 카드번호, 주민등록번호 등의 노출은 마스킹 처리하거나 별도 내부 문서로 분리합니다.</li>
          <li>
            · 튜토리얼 화면 캡처를 업로드할 때, 브라우저 주소창·사용자명·계좌잔액 등 불필요한 정보를 가립니다.
          </li>
          <li>· 외부망 공개 시에는 사업단 내부 연락처 및 내선번호도 최소한으로 제한합니다.</li>
        </ul>
      </section>
    </div>
  );
}

function DashboardSection() {
  return (
    <div className="scroll-section">
      <section className="section">
        <h2>대시보드(컨셉)</h2>
        <p>
          실제 구현 시 오늘 처리해야 할 수입결의·대체결의·지출결의 건수, 결재 대기 문서, 정산 마감 기한 등을
          집계하여 보여줄 수 있습니다.
        </p>
        <div className="card-grid">
          <div className="card">
            <h3>오늘 처리해야 할 업무</h3>
            <ul>
              <li>· 수입결의 대기: 0건</li>
              <li>· 지출결의(세금계산서): 0건</li>
              <li>· 지출결의(카드): 0건</li>
              <li>· 대체결의(간접비/인건비): 0건</li>
            </ul>
          </div>
          <div className="card">
            <h3>다가오는 마감 일정</h3>
            <ul>
              <li>· 단계 정산 (IRIS/재단): 3월~4월</li>
              <li>· 회계 내부감사: 매년 3월경</li>
              <li>· 자산 재물조사: 관리팀 일정에 따름</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;

