
/* ================================================================
   PAOS — PERSONAL ACADEMIC OPERATING SYSTEM
   app.js
   Vanilla JavaScript • Local-first • No framework • No backend
   ================================================================ */

(() => {
  "use strict";

  /* ==============================================================
     1. CONFIG / STORAGE
     ============================================================== */

  const STORAGE_KEY = "paos_complete_v1";

  const DEFAULT_STATE = {
    version: 1,
    profile: {
      name: "Student",
      target: "Competitive Exam",
      dailyTarget: 6,
      weeklyTarget: 42,
      wakeTime: "06:00",
      sleepTime: "23:00"
    },

    settings: {
      theme: "dark",
      notifications: true,
      autoAdaptive: true,
      smartRevision: true,
      showRiskAlerts: true,
      compactMode: false
    },

    subjects: [
      {
        id: "sub-physics",
        name: "Physics",
        code: "PHY",
        color: "#667fff",
        targetHours: 12,
        completedHours: 7.5,
        attendance: 88,
        priority: "high",
        syllabus: 62
      },
      {
        id: "sub-maths",
        name: "Mathematics",
        code: "MAT",
        color: "#54d6b1",
        targetHours: 14,
        completedHours: 10.5,
        attendance: 94,
        priority: "high",
        syllabus: 76
      },
      {
        id: "sub-english",
        name: "English",
        code: "ENG",
        color: "#a98cff",
        targetHours: 7,
        completedHours: 5,
        attendance: 97,
        priority: "normal",
        syllabus: 71
      },
      {
        id: "sub-gk",
        name: "General Knowledge",
        code: "GK",
        color: "#f1c768",
        targetHours: 9,
        completedHours: 4,
        attendance: 82,
        priority: "normal",
        syllabus: 45
      }
    ],

    topics: [
      { id:"top-1", subjectId:"sub-physics", name:"Kinematics", progress:78, priority:"normal", weak:false },
      { id:"top-2", subjectId:"sub-physics", name:"Newton's Laws", progress:54, priority:"high", weak:true },
      { id:"top-3", subjectId:"sub-physics", name:"Work, Energy & Power", progress:39, priority:"high", weak:true },
      { id:"top-4", subjectId:"sub-maths", name:"Algebra", progress:84, priority:"normal", weak:false },
      { id:"top-5", subjectId:"sub-maths", name:"Trigonometry", progress:61, priority:"high", weak:true },
      { id:"top-6", subjectId:"sub-maths", name:"Calculus", progress:43, priority:"high", weak:true },
      { id:"top-7", subjectId:"sub-english", name:"Grammar", progress:82, priority:"normal", weak:false },
      { id:"top-8", subjectId:"sub-gk", name:"Indian Polity", progress:38, priority:"high", weak:true }
    ],

    sessions: [
      { id:"ses-1", date:dateOffset(-6), subjectId:"sub-physics", topic:"Kinematics", minutes:75, plannedMinutes:90, start:"07:10", end:"08:25" },
      { id:"ses-2", date:dateOffset(-6), subjectId:"sub-maths", topic:"Algebra", minutes:120, plannedMinutes:120, start:"10:00", end:"12:00" },
      { id:"ses-3", date:dateOffset(-5), subjectId:"sub-english", topic:"Grammar", minutes:55, plannedMinutes:60, start:"08:00", end:"08:55" },
      { id:"ses-4", date:dateOffset(-5), subjectId:"sub-physics", topic:"Newton's Laws", minutes:90, plannedMinutes:90, start:"18:00", end:"19:30" },
      { id:"ses-5", date:dateOffset(-4), subjectId:"sub-maths", topic:"Trigonometry", minutes:110, plannedMinutes:120, start:"07:00", end:"08:50" },
      { id:"ses-6", date:dateOffset(-3), subjectId:"sub-gk", topic:"Indian Polity", minutes:65, plannedMinutes:90, start:"19:00", end:"20:05" },
      { id:"ses-7", date:dateOffset(-2), subjectId:"sub-maths", topic:"Calculus", minutes:100, plannedMinutes:120, start:"06:30", end:"08:10" },
      { id:"ses-8", date:dateOffset(-1), subjectId:"sub-physics", topic:"Work, Energy & Power", minutes:55, plannedMinutes:90, start:"18:30", end:"19:25" },
      { id:"ses-9", date:todayISO(), subjectId:"sub-maths", topic:"Calculus", minutes:70, plannedMinutes:90, start:"07:00", end:"08:10" },
      { id:"ses-10", date:todayISO(), subjectId:"sub-physics", topic:"Newton's Laws", minutes:45, plannedMinutes:60, start:"10:00", end:"10:45" }
    ],

    plans: [
      { id:"plan-1", date:todayISO(), time:"06:30", duration:90, title:"Calculus — Problem Set", subjectId:"sub-maths", type:"study", status:"done" },
      { id:"plan-2", date:todayISO(), time:"08:30", duration:30, title:"Breakfast + Reset", subjectId:"", type:"routine", status:"done" },
      { id:"plan-3", date:todayISO(), time:"10:00", duration:60, title:"Newton's Laws — Concepts", subjectId:"sub-physics", type:"study", status:"done" },
      { id:"plan-4", date:todayISO(), time:"12:00", duration:45, title:"Revision Queue", subjectId:"sub-physics", type:"revision", status:"pending" },
      { id:"plan-5", date:todayISO(), time:"15:00", duration:90, title:"Trigonometry — Practice", subjectId:"sub-maths", type:"study", status:"pending" },
      { id:"plan-6", date:todayISO(), time:"18:30", duration:60, title:"Work, Energy & Power", subjectId:"sub-physics", type:"study", status:"pending" },
      { id:"plan-7", date:todayISO(), time:"21:00", duration:30, title:"Mistake Bank + Reflection", subjectId:"", type:"review", status:"pending" }
    ],

    exams: [
      { id:"exam-1", title:"CDS Mock Test 01", date:dateOffset(4), type:"Mock", subject:"Full Syllabus", target:80 },
      { id:"exam-2", title:"Physics Sectional", date:dateOffset(7), type:"Test", subject:"Physics", target:75 },
      { id:"exam-3", title:"Weekly Maths Mock", date:dateOffset(10), type:"Mock", subject:"Mathematics", target:85 }
    ],

    tests: [
      { id:"test-1", title:"Maths Mock 01", date:dateOffset(-6), subjectId:"sub-maths", marks:72, maxMarks:100, accuracy:78, attempts:100, weakAreas:["Calculus","Trigonometry"] },
      { id:"test-2", title:"Physics Sectional 01", date:dateOffset(-4), subjectId:"sub-physics", marks:58, maxMarks:100, accuracy:64, attempts:80, weakAreas:["Newton's Laws","WEP"] },
      { id:"test-3", title:"English Practice 01", date:dateOffset(-2), subjectId:"sub-english", marks:81, maxMarks:100, accuracy:88, attempts:95, weakAreas:["Vocabulary"] },
      { id:"test-4", title:"Full Mock 02", date:dateOffset(-1), subjectId:"", marks:118, maxMarks:200, accuracy:73, attempts:160, weakAreas:["Physics","GK"] }
    ],

    revisions: [
      { id:"rev-1", topic:"Newton's Laws", subjectId:"sub-physics", due:dateOffset(-2), stage:2, interval:3, status:"overdue" },
      { id:"rev-2", topic:"Calculus", subjectId:"sub-maths", due:dateOffset(-1), stage:1, interval:2, status:"overdue" },
      { id:"rev-3", topic:"Indian Polity", subjectId:"sub-gk", due:todayISO(), stage:1, interval:2, status:"due" },
      { id:"rev-4", topic:"Trigonometry", subjectId:"sub-maths", due:dateOffset(1), stage:2, interval:4, status:"upcoming" },
      { id:"rev-5", topic:"Grammar", subjectId:"sub-english", due:dateOffset(3), stage:3, interval:7, status:"upcoming" },
      { id:"rev-6", topic:"Kinematics", subjectId:"sub-physics", due:dateOffset(5), stage:3, interval:7, status:"upcoming" }
    ],

    mistakes: [
      { id:"mis-1", topic:"Newton's Laws", subjectId:"sub-physics", type:"Conceptual", date:dateOffset(-1), note:"Mixed up action-reaction pair in an isolated-body question.", solution:"Draw a separate free-body diagram for each object before applying F=ma.", revisited:false },
      { id:"mis-2", topic:"Calculus", subjectId:"sub-maths", type:"Calculation", date:dateOffset(-2), note:"Lost negative sign while differentiating a composite expression.", solution:"Write the chain rule explicitly and check sign before simplifying.", revisited:false },
      { id:"mis-3", topic:"Indian Polity", subjectId:"sub-gk", type:"Recall", date:dateOffset(-3), note:"Confused constitutional article numbers.", solution:"Use a 10-minute active-recall card set and revisit after 2 days.", revisited:true },
      { id:"mis-4", topic:"Trigonometry", subjectId:"sub-maths", type:"Application", date:dateOffset(-5), note:"Used the wrong identity in a transformation question.", solution:"Identify the target form first, then select the identity.", revisited:false }
    ],

    habits: [
      { id:"hab-1", name:"Wake on time", target:"06:00", done:true, streak:8 },
      { id:"hab-2", name:"Exercise", target:"30 min", done:false, streak:4 },
      { id:"hab-3", name:"No phone during study", target:"4 blocks", done:true, streak:6 },
      { id:"hab-4", name:"Daily revision", target:"30 min", done:true, streak:11 },
      { id:"hab-5", name:"Sleep on time", target:"23:00", done:false, streak:3 }
    ],

    lifeLogs: [
      { id:"life-1", type:"Sleep", icon:"◒", value:"7h 10m", note:"Good recovery", date:todayISO() },
      { id:"life-2", type:"Exercise", icon:"⌁", value:"22 min", note:"Below target", date:todayISO() },
      { id:"life-3", type:"Phone", icon:"▣", value:"2h 14m", note:"34m above limit", date:todayISO() },
      { id:"life-4", type:"Free time", icon:"◷", value:"1h 05m", note:"Within plan", date:todayISO() }
    ],

    goals: [
      { id:"goal-1", title:"CDS/AFCAT Preparation", parentId:"", progress:61, target:"Exam readiness", priority:"high" },
      { id:"goal-2", title:"Mathematics", parentId:"goal-1", progress:73, target:"85% syllabus", priority:"high" },
      { id:"goal-3", title:"Physics", parentId:"goal-1", progress:57, target:"80% syllabus", priority:"high" },
      { id:"goal-4", title:"English", parentId:"goal-1", progress:71, target:"90% accuracy", priority:"normal" },
      { id:"goal-5", title:"GK", parentId:"goal-1", progress:45, target:"65% syllabus", priority:"normal" }
    ],

    calendarEvents: [
      { id:"cal-1", date:todayISO(), title:"Study Sprint", type:"study" },
      { id:"cal-2", date:dateOffset(4), title:"CDS Mock", type:"exam" },
      { id:"cal-3", date:dateOffset(7), title:"Physics Test", type:"exam" },
      { id:"cal-4", date:dateOffset(10), title:"Maths Mock", type:"exam" }
    ],

    achievements: [
      { id:"ach-1", icon:"⚡", title:"7 Day Streak", note:"Studied every day", unlocked:true },
      { id:"ach-2", icon:"◈", title:"50 Hours", note:"Total study milestone", unlocked:true },
      { id:"ach-3", icon:"◎", title:"Revision Master", note:"20 revisions completed", unlocked:false },
      { id:"ach-4", icon:"◆", title:"Zero Backlog", note:"No overdue tasks", unlocked:false }
    ],

    timer: {
      running: false,
      startedAt: null,
      elapsedSeconds: 0,
      subjectId: "sub-maths",
      topic: "Calculus",
      plannedMinutes: 60
    },

    ui: {
      currentPage: "dashboard",
      plannerTab: "daily",
      calendarDate: todayISO(),
      chartPeriod: "week"
    }
  };

  let state = loadState();
  let timerInterval = null;
  let timerSessionStartedAt = null;
  let toastTimeout = null;

  /* ==============================================================
     2. BASIC HELPERS
     ============================================================== */

  function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function uid(prefix) {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  }

  function todayISO() {
    return formatDateISO(new Date());
  }

  function dateOffset(days) {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return formatDateISO(d);
  }

  function formatDateISO(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  function parseISO(value) {
    const [y,m,d] = String(value).split("-").map(Number);
    return new Date(y, (m || 1)-1, d || 1);
  }

  function escapeHTML(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function clamp(n, min, max) {
    return Math.min(max, Math.max(min, n));
  }

  function num(value, fallback=0) {
    const n = Number(value);
    return Number.isFinite(n) ? n : fallback;
  }

  function fmtHours(minutes) {
    const m = Math.max(0, Math.round(minutes));
    const h = Math.floor(m / 60);
    const r = m % 60;
    if (!h) return `${r}m`;
    if (!r) return `${h}h`;
    return `${h}h ${r}m`;
  }

  function formatLongDate(dateStr) {
    return parseISO(dateStr).toLocaleDateString(undefined, {
      weekday:"long",
      month:"short",
      day:"numeric",
      year:"numeric"
    });
  }

  function formatShortDate(dateStr) {
    return parseISO(dateStr).toLocaleDateString(undefined, {
      month:"short",
      day:"numeric"
    });
  }

  function getSubject(id) {
    return state.subjects.find(s => s.id === id);
  }

  function subjectName(id) {
    return getSubject(id)?.name || "General";
  }

  function priorityClass(priority) {
    return priority === "high" ? "high" : priority === "low" ? "low" : "normal";
  }

  function daysBetween(a, b) {
    const ms = parseISO(b) - parseISO(a);
    return Math.round(ms / 86400000);
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return clone(DEFAULT_STATE);
      const parsed = JSON.parse(raw);
      return mergeDefaults(clone(DEFAULT_STATE), parsed);
    } catch {
      return clone(DEFAULT_STATE);
    }
  }

  function mergeDefaults(base, source) {
    if (!source || typeof source !== "object") return base;
    Object.keys(source).forEach(key => {
      if (
        source[key] &&
        typeof source[key] === "object" &&
        !Array.isArray(source[key]) &&
        base[key] &&
        typeof base[key] === "object" &&
        !Array.isArray(base[key])
      ) {
        base[key] = mergeDefaults(base[key], source[key]);
      } else {
        base[key] = source[key];
      }
    });
    return base;
  }

  function getAllSessionsMinutes(date) {
    return state.sessions
      .filter(s => !date || s.date === date)
      .reduce((sum, s) => sum + num(s.minutes), 0);
  }

  function getPlannedMinutes(date) {
    return state.plans
      .filter(p => !date || p.date === date && p.type === "study")
      .reduce((sum, p) => sum + num(p.duration), 0);
  }

  function getCompletedPlans(date) {
    return state.plans.filter(p => p.date === date && p.status === "done").length;
  }

  function getTodayPlanCount() {
    return state.plans.filter(p => p.date === todayISO()).length;
  }

  function getDueRevisions() {
    const today = todayISO();
    return state.revisions.filter(r => r.due <= today);
  }

  function getOverdueRevisions() {
    const today = todayISO();
    return state.revisions.filter(r => r.due < today);
  }

  function getBacklogCount() {
    return state.plans.filter(p => p.status !== "done" && p.date < todayISO()).length +
      getOverdueRevisions().length;
  }

  function getWeakTopics() {
    const fromTests = {};
    state.tests.forEach(t => {
      (t.weakAreas || []).forEach(name => {
        fromTests[name] = (fromTests[name] || 0) + 1;
      });
    });

    return state.topics
      .map(t => ({
        ...t,
        signal: (t.weak ? 2 : 0) + (t.priority === "high" ? 1 : 0) + (fromTests[t.name] || 0)
      }))
      .sort((a,b) => b.signal - a.signal);
  }

  function calculateDiscipline() {
    const habitScore = state.habits.length
      ? state.habits.filter(h => h.done).length / state.habits.length * 100
      : 0;

    const todayPlanned = getPlannedMinutes(todayISO());
    const todayActual = getAllSessionsMinutes(todayISO());
    const planScore = todayPlanned ? clamp(todayActual / todayPlanned * 100, 0, 100) : 70;

    const backlogPenalty = clamp(getBacklogCount() * 2.5, 0, 25);
    return Math.round(clamp(habitScore * .35 + planScore * .45 + (100 - backlogPenalty) * .20, 0, 100));
  }

  function calculateReadiness() {
    const syllabus = state.subjects.length
      ? state.subjects.reduce((a,s) => a + s.syllabus, 0) / state.subjects.length
      : 0;

    const tests = state.tests.length
      ? state.tests.reduce((a,t) => a + t.marks / Math.max(1,t.maxMarks) * 100, 0) / state.tests.length
      : 0;

    const discipline = calculateDiscipline();
    const backlog = clamp(getBacklogCount() * 2, 0, 30);

    return Math.round(clamp(syllabus*.4 + tests*.3 + discipline*.3 - backlog, 0, 100));
  }

  function calculateRisk() {
    let risk = 0;
    const factors = [];

    const overdue = getOverdueRevisions().length;
    if (overdue) {
      risk += Math.min(25, overdue * 6);
      factors.push({type:"Revision", detail:`${overdue} overdue item${overdue > 1 ? "s" : ""}`, level:"high"});
    }

    const backlog = getBacklogCount();
    if (backlog) {
      risk += Math.min(25, backlog * 4);
      factors.push({type:"Backlog", detail:`${backlog} pending task${backlog > 1 ? "s" : ""}`, level:"high"});
    }

    const weak = getWeakTopics().filter(t => t.signal >= 2).slice(0,4);
    if (weak.length) {
      risk += Math.min(20, weak.length * 4);
      factors.push({type:"Weak areas", detail:weak.map(t => t.name).slice(0,2).join(", "), level:"medium"});
    }

    const planned = getPlannedMinutes(todayISO());
    const actual = getAllSessionsMinutes(todayISO());
    if (planned > 0 && actual < planned * .55) {
      risk += 15;
      factors.push({type:"Plan gap", detail:`${Math.round(actual / planned * 100)}% of today's plan`, level:"medium"});
    }

    const attendanceLow = state.subjects.filter(s => s.attendance < 85);
    if (attendanceLow.length) {
      risk += 10;
      factors.push({type:"Attendance", detail:attendanceLow.map(s=>s.name).join(", "), level:"medium"});
    }

    risk = Math.round(clamp(risk, 0, 100));
    const level = risk >= 65 ? "high" : risk >= 35 ? "medium" : "low";

    return {score:risk, level, factors};
  }

  function calculateNextAction() {
    const risk = calculateRisk();
    const overdue = getOverdueRevisions();
    const weak = getWeakTopics().filter(t => t.signal >= 2);
    const pendingToday = state.plans
      .filter(p => p.date === todayISO() && p.status !== "done")
      .sort((a,b) => a.time.localeCompare(b.time));

    if (overdue.length) {
      return {
        title:`Revise ${overdue[0].topic}`,
        reason:"Overdue revision has the highest recovery value right now.",
        tags:["Overdue", subjectName(overdue[0].subjectId), `Stage ${overdue[0].stage}`],
        why:"Revision decay risk",
        impact:"High",
        effort:"20–30 min"
      };
    }

    if (weak.length) {
      return {
        title:`Practice ${weak[0].name}`,
        reason:"Recent test performance and topic weakness make this your highest-priority academic gap.",
        tags:["Weak topic", subjectName(weak[0].subjectId), "Practice"],
        why:"Performance gap",
        impact:"High",
        effort:"45–60 min"
      };
    }

    if (pendingToday.length) {
      return {
        title:pendingToday[0].title,
        reason:"This is the next unfinished block in today's plan.",
        tags:[subjectName(pendingToday[0].subjectId), fmtHours(pendingToday[0].duration), pendingToday[0].type],
        why:"Plan adherence",
        impact:"Medium",
        effort:fmtHours(pendingToday[0].duration)
      };
    }

    return {
      title:"Run a 30-minute review",
      reason:"Your planned work is currently caught up. Use a short review to protect today's progress.",
      tags:["Maintenance","Revision","Low friction"],
      why:"Consistency",
      impact:"Medium",
      effort:"30 min"
    };
  }

  /* ==============================================================
     3. DOM HELPERS
     ============================================================== */

  const $ = (selector, root=document) => root.querySelector(selector);
  const $$ = (selector, root=document) => [...root.querySelectorAll(selector)];

  function setHTML(selector, html) {
    const el = $(selector);
    if (el) el.innerHTML = html;
  }

  function safeCall(fn) {
    try { fn(); } catch (error) { console.error("PAOS:", error); }
  }

  /* ==============================================================
     4. ICONS
     ============================================================== */

  const ICON = {
    dashboard:"▦",
    academic:"▤",
    planner:"◫",
    timer:"◷",
    tests:"◉",
    revision:"↻",
    mistakes:"⚠",
    intelligence:"✦",
    discipline:"♟",
    analytics:"⌁",
    settings:"⚙",
    plus:"+",
    edit:"✎",
    delete:"⌫",
    check:"✓",
    close:"×",
    arrow:"→",
    calendar:"□",
    play:"▶",
    pause:"Ⅱ",
    stop:"■",
    download:"↓",
    upload:"↑",
    refresh:"↻"
  };

  /* ==============================================================
     5. PAGE / NAVIGATION
     ============================================================== */

  const PAGE_META = {
    dashboard: {
      title:"Command Center",
      subtitle:"Your academic operating picture at a glance."
    },
    academic: {
      title:"Academic Control",
      subtitle:"Subjects, syllabus, attendance, goals and backlog."
    },
    planner: {
      title:"Planning",
      subtitle:"Build, adapt and execute your study system."
    },
    timer: {
      title:"Study Tracking",
      subtitle:"Track every focused session against the plan."
    },
    tests: {
      title:"Tests & Performance",
      subtitle:"Marks, accuracy, attempts and weak-area intelligence."
    },
    revision: {
      title:"Revision Engine",
      subtitle:"Never lose a topic to forgetting."
    },
    mistakes: {
      title:"Mistake Bank",
      subtitle:"Turn errors into targeted improvement."
    },
    intelligence: {
      title:"PAOS Intelligence",
      subtitle:"Decisions driven by your actual study data."
    },
    discipline: {
      title:"Life & Discipline",
      subtitle:"Build the routines that make your study plan sustainable."
    },
    analytics: {
      title:"Analytics & Reports",
      subtitle:"See trends, gaps and readiness over time."
    },
    settings: {
      title:"Control Center",
      subtitle:"Everything in PAOS stays editable and exportable."
    }
  };

  function navigate(page) {
    if (!PAGE_META[page]) page = "dashboard";
    state.ui.currentPage = page;
    saveState();

    $$(".page-view").forEach(v => {
      v.classList.toggle("active", v.dataset.page === page);
    });

    $$(".nav-item").forEach(item => {
      item.classList.toggle("active", item.dataset.page === page);
    });

    const meta = PAGE_META[page];
    const title = $("#pageTitle");
    const subtitle = $("#pageSubtitle");
    if (title) title.textContent = meta.title;
    if (subtitle) subtitle.textContent = meta.subtitle;

    if (window.innerWidth <= 680) {
      document.body.classList.remove("sidebar-open");
    }

    renderPage(page);
  }

  function renderPage(page) {
    switch(page) {
      case "dashboard": renderDashboard(); break;
      case "academic": renderAcademic(); break;
      case "planner": renderPlanner(); break;
      case "timer": renderTimerPage(); break;
      case "tests": renderTests(); break;
      case "revision": renderRevision(); break;
      case "mistakes": renderMistakes(); break;
      case "intelligence": renderIntelligence(); break;
      case "discipline": renderDiscipline(); break;
      case "analytics": renderAnalytics(); break;
      case "settings": renderSettings(); break;
      default: renderDashboard();
    }
    renderGlobal();
  }

  /* ==============================================================
     6. GLOBAL HEADER
     ============================================================== */

  function renderGlobal() {
    const date = $("#currentDate");
    if (date) {
      date.textContent = parseISO(todayISO()).toLocaleDateString(undefined,{
        weekday:"short",
        month:"short",
        day:"numeric"
      });
    }

    const name = $("#profileName");
    if (name) name.textContent = state.profile.name || "Student";

    const miniProgress = $("#sidebarProgress");
    if (miniProgress) {
      const readiness = calculateReadiness();
      miniProgress.style.width = `${readiness}%`;
    }

    const progressText = $("#sidebarProgressText");
    if (progressText) progressText.textContent = `${calculateReadiness()}% readiness`;

    const badge = $("#revisionBadge");
    if (badge) {
      const due = getDueRevisions().length;
      badge.textContent = due;
      badge.classList.toggle("hidden", !due);
    }

    const riskBadge = $("#riskBadge");
    if (riskBadge) {
      const risk = calculateRisk();
      riskBadge.textContent = risk.score;
      riskBadge.classList.toggle("hidden", !risk.score);
    }
  }

  /* ==============================================================
     7. DASHBOARD
     ============================================================== */

  function renderDashboard() {
    const todayActual = getAllSessionsMinutes(todayISO());
    const todayPlanned = getPlannedMinutes(todayISO());
    const planPct = todayPlanned ? Math.round(todayActual/todayPlanned*100) : 0;
    const discipline = calculateDiscipline();
    const risk = calculateRisk();
    const readiness = calculateReadiness();
    const due = getDueRevisions().length;
    const backlog = getBacklogCount();
    const next = calculateNextAction();

    setText("#dashStudyHours", fmtHours(todayActual));
    setText("#dashStudyMeta", `${fmtHours(todayPlanned)} planned`);
    setText("#dashStudyProgress", `${clamp(planPct,0,100)}%`);
    setWidth("#dashStudyBar", clamp(planPct,0,100));

    setText("#dashDiscipline", discipline);
    setText("#dashDisciplineMeta", discipline >= 80 ? "Strong consistency" : discipline >= 60 ? "Needs attention" : "Recovery needed");

    setText("#dashAttendance", `${Math.round(avg(state.subjects.map(s=>s.attendance)))}%`);
    setText("#dashAttendanceMeta", `${state.subjects.filter(s=>s.attendance<85).length} below safe zone`);

    setText("#dashTarget", `${readiness}%`);
    setText("#dashTargetMeta", `${state.subjects.length} subjects tracked`);

    setText("#dashBacklog", backlog);
    setText("#dashBacklogMeta", `${due} revisions due`);

    setText("#dashRiskScore", risk.score);
    setText("#dashRiskStatus", risk.level.toUpperCase());
    setText("#dashRiskSummary", risk.score < 35 ? "System is stable. Keep executing the plan." : risk.score < 65 ? "A few gaps could compound if left unattended." : "Immediate recovery action is recommended.");
    $("#dashRiskStatus")?.classList.remove("status-low","status-medium","status-high");
    $("#dashRiskStatus")?.classList.add(`status-${risk.level}`);

    const riskList = $("#dashboardRiskList");
    if (riskList) {
      riskList.innerHTML = risk.factors.length
        ? risk.factors.slice(0,4).map(f => `
          <div class="risk-item">
            <div class="risk-item-icon">⚠</div>
            <div class="risk-item-copy">
              <strong>${escapeHTML(f.type)}</strong>
              <small>${escapeHTML(f.detail)}</small>
            </div>
            <span class="status-badge status-${f.level}">${f.level}</span>
          </div>
        `).join("")
        : `<div class="empty-state small"><div class="empty-icon">✓</div><strong>No active risks</strong></div>`;
    }

    const planList = $("#dashboardTodayPlan");
    if (planList) {
      const plans = state.plans.filter(p=>p.date===todayISO()).sort((a,b)=>a.time.localeCompare(b.time));
      planList.innerHTML = plans.length
        ? plans.map(p => {
            const s = getSubject(p.subjectId);
            return `
              <div class="timeline-item ${p.status==="done" ? "completed" : ""}">
                <div class="timeline-time">${escapeHTML(p.time)}</div>
                <div class="timeline-dot-wrap"><div class="timeline-dot"></div></div>
                <div class="timeline-content">
                  <strong>${escapeHTML(p.title)}</strong>
                  <small>${escapeHTML(s?.name || p.type)} · ${fmtHours(p.duration)}</small>
                </div>
                <button class="timeline-check" data-action="toggle-plan" data-id="${p.id}" title="Toggle">${p.status==="done" ? "✓" : "○"}</button>
              </div>
            `;
          }).join("")
        : `<div class="empty-state"><div class="empty-icon">◫</div><strong>No plan for today</strong><p>Create your first study block.</p><button class="button button-primary" data-action="open-add-plan">Add plan</button></div>`;
    }

    setText("#nextActionTitle", next.title);
    setText("#nextActionReason", next.reason);
    setHTML("#nextActionTags", next.tags.map(t=>`<span class="action-tag">${escapeHTML(t)}</span>`).join(""));
    setText("#nextActionWhy", next.why);
    setText("#nextActionImpact", next.impact);
    setText("#nextActionEffort", next.effort);

    renderStudyHoursChart("#dashboardStudyChart", "week");
    renderUpcoming("#dashboardUpcoming");
  }

  /* ==============================================================
     8. ACADEMIC
     ============================================================== */

  function renderAcademic() {
    const container = $("#subjectGrid");
    if (container) {
      container.innerHTML = state.subjects.map(s => {
        const target = Math.max(1, s.targetHours * 60);
        const actual = state.sessions.filter(x=>x.subjectId===s.id).reduce((a,x)=>a+x.minutes,0);
        const pct = clamp(Math.round(actual/target*100),0,100);

        return `
          <article class="subject-card">
            <div class="subject-card-top">
              <div class="subject-card-name">
                <strong>${escapeHTML(s.name)}</strong>
                <small>${escapeHTML(s.code)} · Priority ${escapeHTML(s.priority)}</small>
              </div>
              <div class="subject-card-menu">
                <button class="mini-icon-button" data-action="edit-subject" data-id="${s.id}">${ICON.edit}</button>
                <button class="mini-icon-button" data-action="delete-subject" data-id="${s.id}">${ICON.delete}</button>
              </div>
            </div>

            <div class="subject-card-stats">
              <div class="subject-card-stat"><span>Syllabus</span><strong>${s.syllabus}%</strong></div>
              <div class="subject-card-stat"><span>Attendance</span><strong>${s.attendance}%</strong></div>
              <div class="subject-card-stat"><span>Study</span><strong>${fmtHours(actual)}</strong></div>
            </div>

            <div class="subject-progress">
              <div class="subject-progress-top"><span>Target completion</span><strong>${pct}%</strong></div>
              <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
            </div>
          </article>
        `;
      }).join("");
    }

    renderGoalTree();
    renderAcademicTable();
  }

  function renderGoalTree() {
    const el = $("#goalTree");
    if (!el) return;

    const roots = state.goals.filter(g=>!g.parentId);
    const html = [];

    function node(goal, depth=0) {
      html.push(`
        <div class="goal-node ${depth===0 ? "root" : "child"}">
          <div class="goal-top">
            <div class="goal-title">
              <strong>${escapeHTML(goal.title)}</strong>
              <small>${escapeHTML(goal.target)} · ${escapeHTML(goal.priority)}</small>
            </div>
            <div class="goal-actions">
              <button class="mini-icon-button" data-action="edit-goal" data-id="${goal.id}">${ICON.edit}</button>
            </div>
          </div>
          <div class="goal-progress">
            <div class="subject-progress-top"><span>Progress</span><strong>${goal.progress}%</strong></div>
            <div class="progress-track"><div class="progress-fill" style="width:${clamp(goal.progress,0,100)}%"></div></div>
          </div>
        </div>
      `);
      state.goals.filter(g=>g.parentId===goal.id).forEach(child=>node(child, depth+1));
    }

    roots.forEach(r=>node(r));
    el.innerHTML = html.join("") || `<div class="empty-state small"><div class="empty-icon">◎</div><strong>No goals yet</strong></div>`;
  }

  function renderAcademicTable() {
    const body = $("#academicTableBody");
    if (!body) return;

    body.innerHTML = state.topics.map(t => {
      const s = getSubject(t.subjectId);
      return `
        <tr>
          <td><strong>${escapeHTML(t.name)}</strong><span class="row-sub">${escapeHTML(s?.name || "General")}</span></td>
          <td>${t.progress}%</td>
          <td><span class="priority-pill ${priorityClass(t.priority)}">${escapeHTML(t.priority)}</span></td>
          <td>${t.weak ? `<span class="status-pill pending">Weak</span>` : `<span class="status-pill done">Stable</span>`}</td>
          <td class="actions-cell">
            <button class="table-button" data-action="edit-topic" data-id="${t.id}">Edit</button>
            <button class="table-button danger" data-action="delete-topic" data-id="${t.id}">Delete</button>
          </td>
        </tr>
      `;
    }).join("");
  }

  /* ==============================================================
     9. PLANNER
     ============================================================== */

  function renderPlanner() {
    const tab = state.ui.plannerTab || "daily";
    $$(".planner-tab").forEach(b => b.classList.toggle("active", b.dataset.tab===tab));
    $$(".planner-tab-panel").forEach(p => p.classList.toggle("hidden", p.dataset.tabPanel!==tab));

    renderDailyPlanner();
    renderWeeklyPlanner();
    renderCalendar();
    renderMasterTimetable();
    renderPlanGap();
  }

  function renderDailyPlanner() {
    const date = $("#plannerDate");
    if (date) date.textContent = formatLongDate(state.ui.calendarDate || todayISO());

    const list = $("#plannerTimeline");
    if (!list) return;

    const targetDate = state.ui.calendarDate || todayISO();
    const plans = state.plans
      .filter(p=>p.date===targetDate)
      .sort((a,b)=>a.time.localeCompare(b.time));

    list.innerHTML = plans.length
      ? plans.map(p=>{
          const s=getSubject(p.subjectId);
          return `
            <div class="planner-slot ${p.status==="done" ? "done" : ""}">
              <div class="planner-slot-time">${escapeHTML(p.time)}</div>
              <div class="planner-slot-marker"></div>
              <div class="planner-slot-card">
                <strong>${escapeHTML(p.title)}</strong>
                <small>${escapeHTML(s?.name || p.type)} · ${fmtHours(p.duration)} · ${escapeHTML(p.type)}</small>
              </div>
              <div class="planner-slot-duration">
                <button class="mini-icon-button" data-action="toggle-plan" data-id="${p.id}">${p.status==="done" ? "✓" : "○"}</button>
              </div>
            </div>
          `;
        }).join("")
      : `<div class="empty-state"><div class="empty-icon">◫</div><strong>No plan for ${targetDate===todayISO()?"today":"this date"}</strong><p>Add study blocks, revision, tests or routines.</p><button class="button button-primary" data-action="open-add-plan">Add block</button></div>`;
  }

  function renderWeeklyPlanner() {
    const el = $("#weeklyGrid");
    if (!el) return;

    const base = parseISO(state.ui.calendarDate || todayISO());
    const monday = new Date(base);
    const day = monday.getDay() || 7;
    monday.setDate(monday.getDate() - day + 1);

    const days = [];
    for(let i=0;i<7;i++){
      const d=new Date(monday);
      d.setDate(monday.getDate()+i);
      days.push(formatDateISO(d));
    }

    el.innerHTML = days.map(d=>{
      const plans=state.plans.filter(p=>p.date===d).sort((a,b)=>a.time.localeCompare(b.time));
      const date=parseISO(d);
      return `
        <div class="week-day ${d===todayISO()?"today":""}">
          <div class="week-day-head">
            <strong>${date.toLocaleDateString(undefined,{weekday:"short"})}</strong>
            <small>${date.toLocaleDateString(undefined,{month:"short",day:"numeric"})}</small>
          </div>
          <div class="week-day-list">
            ${plans.length ? plans.map(p=>`
              <div class="week-task">
                <strong>${escapeHTML(p.time)} · ${escapeHTML(p.title)}</strong>
                <small>${fmtHours(p.duration)} ${p.status==="done"?"· Done":""}</small>
              </div>
            `).join("") : `<div style="padding:12px;color:#56647c;font-size:7px">No blocks</div>`}
          </div>
        </div>
      `;
    }).join("");
  }

  function renderCalendar() {
    const el=$("#calendarGrid");
    const title=$("#calendarMonth");
    if(!el) return;

    const base=parseISO(state.ui.calendarDate || todayISO());
    if(title) title.textContent=base.toLocaleDateString(undefined,{month:"long",year:"numeric"});

    const first=new Date(base.getFullYear(),base.getMonth(),1);
    const last=new Date(base.getFullYear(),base.getMonth()+1,0);
    const start=(first.getDay()+6)%7;
    const cells=[];

    for(let i=0;i<start;i++) cells.push(`<div class="calendar-day muted"></div>`);

    for(let day=1;day<=last.getDate();day++){
      const d=new Date(base.getFullYear(),base.getMonth(),day);
      const iso=formatDateISO(d);
      const events=state.calendarEvents.filter(e=>e.date===iso);
      cells.push(`
        <button class="calendar-day ${iso===todayISO()?"today":""}" data-action="select-calendar-date" data-date="${iso}">
          <span class="calendar-day-number">${day}</span>
          ${events.slice(0,2).map(e=>`<span class="calendar-event-dot">${escapeHTML(e.title)}</span>`).join("")}
        </button>
      `);
    }

    while(cells.length%7) cells.push(`<div class="calendar-day muted"></div>`);
    el.innerHTML=cells.join("");
  }

  function renderMasterTimetable() {
    const el=$("#masterTimetable");
    if(!el) return;

    const names=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
    const blocks=[
      ["06:00","Morning routine"],
      ["07:00","Deep Work"],
      ["10:00","Practice"],
      ["14:00","Revision"],
      ["18:30","Mock / Weak Area"],
      ["21:00","Review"]
    ];

    el.innerHTML=names.map(day=>`
      <div class="master-day">
        <div class="master-day-head">${day}</div>
        ${blocks.map(([time,title])=>`
          <div class="master-slot">
            <strong>${time}</strong>
            <small>${title}</small>
          </div>
        `).join("")}
      </div>
    `).join("");
  }

  function renderPlanGap() {
    const planned=getPlannedMinutes(todayISO());
    const actual=getAllSessionsMinutes(todayISO());
    const gap=Math.max(0,planned-actual);

    setText("#plannedGapValue",fmtHours(planned));
    setText("#actualGapValue",fmtHours(actual));
    setText("#gapResult",gap ? `${fmtHours(gap)} remains to close today's planned study gap.` : "Today's planned study target is currently covered.");
  }

  /* ==============================================================
     10. TIMER
     ============================================================== */

  function renderTimerPage() {
    const t=state.timer;
    const seconds=t.running && t.startedAt
      ? t.elapsedSeconds + Math.floor((Date.now()-t.startedAt)/1000)
      : t.elapsedSeconds;

    setText("#studyTimerDisplay",formatTimer(seconds));
    setText("#timerStatusText",t.running ? "Focus session running" : seconds ? "Session paused" : "Ready to focus");
    $("#timerStatus")?.classList.toggle("running",t.running);

    const sub=$("#timerSubject");
    if(sub){
      sub.innerHTML=state.subjects.map(s=>`<option value="${s.id}" ${s.id===t.subjectId?"selected":""}>${escapeHTML(s.name)}</option>`).join("");
    }

    setValue("#timerTopic",t.topic);
    setValue("#timerPlannedMinutes",t.plannedMinutes);

    const today=getAllSessionsMinutes(todayISO());
    const week=getAllSessionsMinutesForRange(7);
    const month=getAllSessionsMinutesForRange(30);

    setText("#timerTodayHours",fmtHours(today));
    setText("#timerWeekHours",fmtHours(week));
    setText("#timerMonthHours",fmtHours(month));

    renderStudyDistribution("#studyDistribution");
    renderStudyHoursChart("#timerStudyChart", state.ui.chartPeriod || "week");
  }

  function formatTimer(seconds) {
    const s=Math.max(0,Math.floor(seconds));
    const h=Math.floor(s/3600);
    const m=Math.floor((s%3600)/60);
    const sec=s%60;
    return `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(sec).padStart(2,"0")}`;
  }

  function startTimer() {
    if(state.timer.running) return;
    state.timer.running=true;
    state.timer.startedAt=Date.now();
    if(!timerSessionStartedAt) timerSessionStartedAt=Date.now();
    saveState();
    clearInterval(timerInterval);
    timerInterval=setInterval(()=>{
      renderTimerPage();
      renderGlobal();
    },1000);
    showToast("Focus session started.");
  }

  function pauseTimer() {
    if(!state.timer.running) return;
    const now=Date.now();
    state.timer.elapsedSeconds += Math.floor((now-state.timer.startedAt)/1000);
    state.timer.running=false;
    state.timer.startedAt=null;
    saveState();
    clearInterval(timerInterval);
    renderTimerPage();
    showToast("Session paused.");
  }

  function stopTimer(save=true) {
    if(state.timer.running){
      const now=Date.now();
      state.timer.elapsedSeconds += Math.floor((now-state.timer.startedAt)/1000);
    }

    const totalSeconds=state.timer.elapsedSeconds;
    state.timer.running=false;
    state.timer.startedAt=null;

    if(save && totalSeconds>=60){
      const minutes=Math.max(1,Math.round(totalSeconds/60));
      state.sessions.push({
        id:uid("ses"),
        date:todayISO(),
        subjectId:state.timer.subjectId,
        topic:state.timer.topic || "General Study",
        minutes,
        plannedMinutes:num(state.timer.plannedMinutes,minutes),
        start:timerSessionStartedAt ? new Date(timerSessionStartedAt).toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"}) : "",
        end:new Date().toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"})
      });

      updateSubjectStudyHours(state.timer.subjectId, minutes);
      showToast(`${fmtHours(minutes)} study session saved.`);
    } else if(save) {
      showToast("Session was too short to save.");
    }

    state.timer.elapsedSeconds=0;
    timerSessionStartedAt=null;
    clearInterval(timerInterval);
    saveState();
    renderTimerPage();
    renderGlobal();
  }

  function updateSubjectStudyHours(subjectId, minutes) {
    const s=getSubject(subjectId);
    if(s) s.completedHours=num(s.completedHours)+minutes/60;
  }

  function getAllSessionsMinutesForRange(days) {
    const cutoff=parseISO(dateOffset(-(days-1)));
    return state.sessions.reduce((sum,s)=>{
      return parseISO(s.date)>=cutoff ? sum+s.minutes : sum;
    },0);
  }

  /* ==============================================================
     11. TESTS
     ============================================================== */

  function renderTests() {
    const total=state.tests.reduce((a,t)=>a+t.marks,0);
    const max=state.tests.reduce((a,t)=>a+t.maxMarks,0);
    const avgScore=max ? Math.round(total/max*100) : 0;
    const accuracy=state.tests.length ? Math.round(avg(state.tests.map(t=>t.accuracy))) : 0;

    setText("#testsCount",state.tests.length);
    setText("#testsAverage",`${avgScore}%`);
    setText("#testsAccuracy",`${accuracy}%`);
    setText("#testsBest",state.tests.length ? `${Math.max(...state.tests.map(t=>Math.round(t.marks/t.maxMarks*100)))}%` : "—");

    const body=$("#testsTableBody");
    if(body){
      body.innerHTML=state.tests
        .slice()
        .sort((a,b)=>b.date.localeCompare(a.date))
        .map(t=>{
          const pct=Math.round(t.marks/Math.max(1,t.maxMarks)*100);
          return `
            <tr>
              <td><strong>${escapeHTML(t.title)}</strong><span class="row-sub">${formatShortDate(t.date)} · ${escapeHTML(subjectName(t.subjectId))}</span></td>
              <td>${t.marks}/${t.maxMarks}</td>
              <td>${pct}%</td>
              <td>${t.accuracy}%</td>
              <td>${t.attempts}</td>
              <td>${(t.weakAreas||[]).slice(0,2).map(x=>`<span class="priority-pill high">${escapeHTML(x)}</span>`).join(" ") || "—"}</td>
              <td class="actions-cell">
                <button class="table-button" data-action="edit-test" data-id="${t.id}">Edit</button>
                <button class="table-button danger" data-action="delete-test" data-id="${t.id}">Delete</button>
              </td>
            </tr>
          `;
        }).join("");
    }

    renderWeakAreasRanking("#weakAreasRanking");
    renderTestTrendChart("#testTrendChart");
  }

  function renderWeakAreasRanking(selector) {
    const el=$(selector);
    if(!el)return;

    const counts={};
    state.tests.forEach(t=>{
      (t.weakAreas||[]).forEach(w=>counts[w]=(counts[w]||0)+1);
    });

    const items=Object.entries(counts).sort((a,b)=>b[1]-a[1]).slice(0,6);

    el.innerHTML=items.length ? items.map(([name,count],i)=>`
      <div class="rank-item">
        <div class="rank-number">${i+1}</div>
        <div class="rank-copy">
          <strong>${escapeHTML(name)}</strong>
          <small>Flagged in ${count} test${count>1?"s":""}</small>
        </div>
        <div class="rank-score">${count}×</div>
      </div>
    `).join("") : `<div class="empty-state small"><div class="empty-icon">◎</div><strong>No weak areas yet</strong></div>`;
  }

  /* ==============================================================
     12. REVISION
     ============================================================== */

  function renderRevision() {
    const today=todayISO();
    const overdue=state.revisions.filter(r=>r.due<today);
    const due=state.revisions.filter(r=>r.due===today);
    const upcoming=state.revisions.filter(r=>r.due>today).sort((a,b)=>a.due.localeCompare(b.due));

    setText("#revisionOverdueCount",overdue.length);
    setText("#revisionDueCount",due.length);
    setText("#revisionUpcomingCount",upcoming.length);

    renderRevisionColumn("#revisionOverdueList",overdue,true);
    renderRevisionColumn("#revisionDueList",due,false);
    renderRevisionColumn("#revisionUpcomingList",upcoming,false);
  }

  function renderRevisionColumn(selector,items,isOverdue){
    const el=$(selector);
    if(!el)return;

    el.innerHTML=items.length ? items.map(r=>`
      <div class="revision-card ${isOverdue?"overdue":""}">
        <div class="revision-card-top">
          <div>
            <strong>${escapeHTML(r.topic)}</strong>
            <small>${escapeHTML(subjectName(r.subjectId))} · Stage ${r.stage}</small>
          </div>
          <span class="priority-pill ${isOverdue?"high":"normal"}">${isOverdue?"Overdue":"Due"}</span>
        </div>
        <div class="revision-card-bottom">
          <span class="revision-due">${isOverdue ? `${Math.abs(daysBetween(r.due,todayISO()))}d late` : `Due ${formatShortDate(r.due)}`}</span>
          <button class="revision-action" data-action="complete-revision" data-id="${r.id}">Revise now</button>
        </div>
      </div>
    `).join("") : `<div class="empty-state small"><div class="empty-icon">✓</div><strong>Queue clear</strong></div>`;
  }

  function completeRevision(id){
    const r=state.revisions.find(x=>x.id===id);
    if(!r)return;

    const today=new Date();
    const nextInterval=Math.min(60,Math.max(2,r.interval*2));
    r.stage=num(r.stage)+1;
    r.interval=nextInterval;
    today.setDate(today.getDate()+nextInterval);
    r.due=formatDateISO(today);
    r.status="upcoming";

    const topic=state.topics.find(t=>t.name===r.topic);
    if(topic) topic.progress=clamp(num(topic.progress)+5,0,100);

    saveState();
    showToast(`${r.topic} revised. Next review in ${nextInterval} days.`);
    renderRevision();
    renderDashboard();
    renderGlobal();
  }

  /* ==============================================================
     13. MISTAKES
     ============================================================== */

  function renderMistakes() {
    const total=state.mistakes.length;
    const open=state.mistakes.filter(m=>!m.revisited).length;
    const conceptual=state.mistakes.filter(m=>m.type==="Conceptual").length;

    setText("#mistakeTotal",total);
    setText("#mistakeOpen",open);
    setText("#mistakeConceptual",conceptual);

    const el=$("#mistakeList");
    if(!el)return;

    el.innerHTML=state.mistakes.length ? state.mistakes
      .slice()
      .sort((a,b)=>b.date.localeCompare(a.date))
      .map(m=>`
        <article class="mistake-card">
          <div class="mistake-card-top">
            <div>
              <h4>${escapeHTML(m.topic)}</h4>
              <div class="mistake-card-meta">${escapeHTML(subjectName(m.subjectId))} · ${formatShortDate(m.date)}</div>
            </div>
            <span class="mistake-type">${escapeHTML(m.type)}</span>
          </div>
          <div class="mistake-solution"><strong>Error:</strong> ${escapeHTML(m.note)}<br><strong>Fix:</strong> ${escapeHTML(m.solution)}</div>
          <div style="display:flex;justify-content:flex-end;gap:6px;margin-top:8px">
            <button class="table-button" data-action="toggle-mistake" data-id="${m.id}">${m.revisited ? "Mark open" : "Mark revisited"}</button>
            <button class="table-button danger" data-action="delete-mistake" data-id="${m.id}">Delete</button>
          </div>
        </article>
      `).join("")
      : `<div class="empty-state"><div class="empty-icon">✓</div><strong>Mistake bank is empty</strong><p>Add mistakes after every mock or practice session.</p></div>`;
  }

  /* ==============================================================
     14. INTELLIGENCE
     ============================================================== */

  function renderIntelligence() {
    const readiness=calculateReadiness();
    const risk=calculateRisk();
    const next=calculateNextAction();
    const weak=getWeakTopics().filter(t=>t.signal>=2).slice(0,5);
    const backlog=getBacklogCount();

    setText("#intelReadiness",readiness);
    setText("#intelReadinessLabel",readiness>=80?"Exam ready":readiness>=60?"Building readiness":"Needs recovery");

    const ring=$("#intelRingProgress");
    if(ring){
      const circumference=452;
      ring.style.strokeDashoffset=String(circumference-(circumference*readiness/100));
    }

    setText("#intelForecast",`${clamp(readiness+Math.round((calculateDiscipline()-60)*.18),0,100)}%`);
    setText("#intelForecastNote",readiness>=75 ? "On track if consistency holds." : "Requires stronger consistency.");

    const pressure=$("#backlogPressureChart");
    if(pressure){
      const groups=[
        ["Academic",state.plans.filter(p=>p.status!=="done" && p.subjectId).length],
        ["Revision",getDueRevisions().length],
        ["Mistakes",state.mistakes.filter(m=>!m.revisited).length],
        ["Tests",state.exams.filter(e=>e.date>=todayISO()).length]
      ];
      pressure.innerHTML=groups.map(([name,val])=>{
        const pct=clamp(val*16,4,100);
        return `
          <div class="pressure-row">
            <span>${name}</span>
            <div class="pressure-track"><i style="width:${pct}%"></i></div>
            <strong>${val}</strong>
          </div>
        `;
      }).join("");
    }

    setText("#intelNextAction",next.title);
    setText("#intelRiskScore",risk.score);
    setText("#intelBacklogCount",backlog);
    setText("#intelWeakCount",weak.length);

    const risks=$("#intelRiskList");
    if(risks){
      risks.innerHTML=risk.factors.length ? risk.factors.map(f=>`
        <div class="risk-item">
          <div class="risk-item-icon">⚠</div>
          <div class="risk-item-copy">
            <strong>${escapeHTML(f.type)}</strong>
            <small>${escapeHTML(f.detail)}</small>
          </div>
          <span class="status-badge status-${f.level}">${f.level}</span>
        </div>
      `).join("") : `<div class="empty-state small"><div class="empty-icon">✓</div><strong>Nothing critical</strong></div>`;
    }

    const weakEl=$("#intelWeakTopics");
    if(weakEl){
      weakEl.innerHTML=weak.length ? weak.map(t=>`
        <div class="compact-row">
          <span class="priority-dot ${priorityClass(t.priority)}"></span>
          <div class="compact-row-copy">
            <strong>${escapeHTML(t.name)}</strong>
            <small>${escapeHTML(subjectName(t.subjectId))} · Signal ${t.signal}</small>
          </div>
          <span class="status-badge status-high">Focus</span>
        </div>
      `).join("") : `<div class="empty-state small"><div class="empty-icon">✓</div><strong>No high-risk weak topics</strong></div>`;
    }
  }

  /* ==============================================================
     15. DISCIPLINE
     ============================================================== */

  function renderDiscipline() {
    const score=calculateDiscipline();
    setText("#disciplineScore",score);

    const ring=$("#disciplineRingProgress");
    if(ring){
      const circumference=553;
      ring.style.strokeDashoffset=String(circumference-(circumference*score/100));
    }

    const todayPlan=getPlannedMinutes(todayISO());
    const todayActual=getAllSessionsMinutes(todayISO());
    const planScore=todayPlan ? clamp(Math.round(todayActual/todayPlan*100),0,100) : 0;

    setText("#scoreHabit",state.habits.length ? Math.round(state.habits.filter(h=>h.done).length/state.habits.length*100) : 0);
    setText("#scorePlan",planScore);
    setText("#scoreBacklog",Math.max(0,100-getBacklogCount()*5));

    const habitList=$("#habitList");
    if(habitList){
      habitList.innerHTML=state.habits.map(h=>`
        <div class="habit-row">
          <button class="habit-check ${h.done?"checked":""}" data-action="toggle-habit" data-id="${h.id}">${h.done?"✓":""}</button>
          <div class="habit-copy">
            <strong>${escapeHTML(h.name)}</strong>
            <small>${escapeHTML(h.target)} · ${h.streak} day streak</small>
          </div>
          <span class="status-badge ${h.done?"status-low":"status-neutral"}">${h.done?"Done":"Open"}</span>
        </div>
      `).join("");
    }

    const life=$("#lifeLogList");
    if(life){
      life.innerHTML=state.lifeLogs.map(l=>`
        <div class="life-log-row">
          <div class="life-log-icon">${escapeHTML(l.icon)}</div>
          <div class="life-log-copy">
            <strong>${escapeHTML(l.type)}</strong>
            <small>${escapeHTML(l.note)}</small>
          </div>
          <div class="life-log-value">${escapeHTML(l.value)}</div>
        </div>
      `).join("");
    }

    const achievements=$("#achievementsGrid");
    if(achievements){
      achievements.innerHTML=state.achievements.map(a=>`
        <div class="achievement ${a.unlocked?"unlocked":""}">
          <div class="achievement-icon">${escapeHTML(a.icon)}</div>
          <strong>${escapeHTML(a.title)}</strong>
          <small>${escapeHTML(a.note)}</small>
        </div>
      `).join("");
    }
  }

  /* ==============================================================
     16. ANALYTICS
     ============================================================== */

  function renderAnalytics() {
    const readiness=calculateReadiness();
    const discipline=calculateDiscipline();
    const attendance=Math.round(avg(state.subjects.map(s=>s.attendance)));
    const actual=getAllSessionsMinutesForRange(30);
    const planned=state.plans
      .filter(p=>p.date>=dateOffset(-29))
      .reduce((a,p)=>a+num(p.duration),0);

    setText("#analyticsReadiness",`${readiness}%`);
    setText("#analyticsDiscipline",discipline);
    setText("#analyticsAttendance",`${attendance}%`);
    setText("#analyticsStudyHours",fmtHours(actual));
    setText("#analyticsGap",fmtHours(Math.max(0,planned-actual)));
    setText("#analyticsBacklog",getBacklogCount());

    renderStudyHoursChart("#analyticsStudyChart","month");
    renderSubjectComparison("#subjectComparisonChart");
    renderAttendanceChart("#attendanceChart");
    renderBacklogTrend("#backlogTrendChart");

    const grade=readiness>=90?"A+":readiness>=80?"A":readiness>=70?"B+":readiness>=60?"B":"C";
    setText("#reportGrade",grade);

    const reportNarrative=$("#reportNarrative");
    if(reportNarrative){
      const weak=getWeakTopics()[0];
      reportNarrative.textContent =
        `Your current readiness is ${readiness}%. ` +
        (weak ? `${weak.name} is the strongest improvement opportunity. ` : "") +
        `You have ${getBacklogCount()} backlog/revision pressure item(s). ` +
        `The best strategy is to protect daily consistency, close overdue revision first, and use test data to allocate practice time.`;
    }
  }

  /* ==============================================================
     17. SETTINGS
     ============================================================== */

  function renderSettings() {
    setValue("#settingsName",state.profile.name);
    setValue("#settingsTarget",state.profile.target);
    setValue("#settingsDailyTarget",state.profile.dailyTarget);
    setValue("#settingsWeeklyTarget",state.profile.weeklyTarget);
    setValue("#settingsWake",state.profile.wakeTime);
    setValue("#settingsSleep",state.profile.sleepTime);

    setChecked("#settingNotifications",state.settings.notifications);
    setChecked("#settingAdaptive",state.settings.autoAdaptive);
    setChecked("#settingSmartRevision",state.settings.smartRevision);
    setChecked("#settingRisk",state.settings.showRiskAlerts);

    $$(".appearance-option").forEach(o=>o.classList.toggle("active",o.dataset.theme===state.settings.theme));
  }

  /* ==============================================================
     18. CHART ENGINE
     ============================================================== */

  function renderStudyHoursChart(selector, period="week") {
    const el=$(selector);
    if(!el)return;

    const days=period==="month" ? 30 : 7;
    const values=[];
    const labels=[];

    for(let i=days-1;i>=0;i--){
      const d=dateOffset(-i);
      values.push(getAllSessionsMinutes(d)/60);
      const date=parseISO(d);
      labels.push(period==="month"
        ? (i%5===0 ? String(date.getDate()) : "")
        : date.toLocaleDateString(undefined,{weekday:"short"}).slice(0,2));
    }

    const plannedPerDay=state.profile.dailyTarget || 6;
    const max=Math.max(plannedPerDay,Math.ceil(Math.max(...values,1)*1.25));
    setSVG(el, lineChartSVG(values,labels,max,plannedPerDay));
  }

  function lineChartSVG(values,labels,maxValue,target) {
    const width=760;
    const height=250;
    const pad={l:42,r:18,t:18,b:28};
    const innerW=width-pad.l-pad.r;
    const innerH=height-pad.t-pad.b;

    const x=i=>pad.l+(values.length===1?innerW/2:i/(values.length-1)*innerW);
    const y=v=>pad.t+innerH-(v/maxValue*innerH);

    let path="";
    values.forEach((v,i)=>{
      path += `${i===0?"M":"L"} ${x(i).toFixed(1)} ${y(v).toFixed(1)} `;
    });

    const area=`M ${x(0)} ${pad.t+innerH} L ${values.map((v,i)=>`${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" L ")} L ${x(values.length-1)} ${pad.t+innerH} Z`;

    const grid=[];
    for(let i=0;i<=4;i++){
      const v=maxValue*i/4;
      const yy=y(v);
      grid.push(`<line x1="${pad.l}" y1="${yy}" x2="${width-pad.r}" y2="${yy}"/>`);
      grid.push(`<text x="${pad.l-8}" y="${yy+3}" text-anchor="end">${Number(v).toFixed(v<10?1:0)}h</text>`);
    }

    const xLabels=labels.map((label,i)=>label ? `<text x="${x(i)}" y="${height-7}" text-anchor="middle">${escapeHTML(label)}</text>` : "").join("");

    const points=values.map((v,i)=>`
      <circle cx="${x(i)}" cy="${y(v)}" r="4" data-chart-value="${fmtHours(v*60)}"></circle>
    `).join("");

    const targetY=y(target);

    return `
      <svg class="chart-svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
        <g class="chart-grid-lines">${grid.slice(0,10).join("")}</g>
        <g class="chart-y-labels">${grid.filter((_,i)=>i%2===1).join("")}</g>
        <g class="chart-target-line">
          <line x1="${pad.l}" y1="${targetY}" x2="${width-pad.r}" y2="${targetY}"></line>
          <text x="${width-pad.r}" y="${targetY-5}" text-anchor="end">Target ${target}h</text>
        </g>
        <g class="chart-area"><path d="${area}"></path></g>
        <g class="chart-line"><path d="${path}"></path></g>
        <g class="chart-points">${points}</g>
        <g class="chart-x-labels">${xLabels}</g>
      </svg>
    `;
  }

  function renderTestTrendChart(selector) {
    const el=$(selector);
    if(!el)return;

    const tests=state.tests.slice().sort((a,b)=>a.date.localeCompare(b.date));
    const values=tests.map(t=>t.marks/Math.max(1,t.maxMarks)*100);
    const labels=tests.map(t=>t.title.replace(/Mock|Practice|Sectional/gi,"").trim().slice(0,8));

    setSVG(el,lineChartSVG(values,labels,100,75));
  }

  function renderSubjectComparison(selector) {
    const el=$(selector);
    if(!el)return;

    const width=760,height=260;
    const pad={l:55,r:18,t:20,b:40};
    const subjects=state.subjects;
    const innerW=width-pad.l-pad.r;
    const innerH=height-pad.t-pad.b;
    const groupW=innerW/Math.max(1,subjects.length);
    const barW=Math.min(34,groupW*.28);

    let bars="";
    subjects.forEach((s,i)=>{
      const actual=state.sessions.filter(x=>x.subjectId===s.id).reduce((a,x)=>a+x.minutes,0)/60;
      const target=Math.max(1,s.targetHours);
      const gx=pad.l+i*groupW+groupW/2;

      const actualH=actual/Math.max(target,actual,1)*innerH;
      const targetH=innerH;

      bars += `
        <rect x="${gx-barW-3}" y="${pad.t+innerH-actualH}" width="${barW}" height="${actualH}" rx="4" fill="#637fff" opacity=".9"></rect>
        <rect x="${gx+3}" y="${pad.t+innerH-targetH*.75}" width="${barW}" height="${targetH*.75}" rx="4" fill="#283650"></rect>
        <text x="${gx}" y="${height-13}" text-anchor="middle" fill="#65738c" font-size="9">${escapeHTML(s.code)}</text>
        <text x="${gx-barW/2-3}" y="${pad.t+innerH-actualH-5}" text-anchor="middle" fill="#91a2c2" font-size="8">${actual.toFixed(1)}</text>
      `;
    });

    setSVG(el,`
      <svg class="chart-svg" viewBox="0 0 ${width} ${height}">
        <g class="chart-grid-lines">
          ${[0,.25,.5,.75,1].map(v=>`<line x1="${pad.l}" y1="${pad.t+innerH*(1-v)}" x2="${width-pad.r}" y2="${pad.t+innerH*(1-v)}"></line>`).join("")}
        </g>
        ${bars}
      </svg>
    `);
  }

  function renderAttendanceChart(selector) {
    const el=$(selector);
    if(!el)return;

    const width=760,height=250;
    const pad={l:42,r:18,t:20,b:35};
    const items=state.subjects;
    const groupW=(width-pad.l-pad.r)/Math.max(1,items.length);
    const bars=items.map((s,i)=>{
      const h=s.attendance/100*(height-pad.t-pad.b);
      const x=pad.l+i*groupW+groupW*.25;
      const w=groupW*.5;
      return `
        <rect x="${x}" y="${pad.t+(height-pad.t-pad.b)-h}" width="${w}" height="${h}" rx="5" fill="#5b7cff"></rect>
        <text x="${x+w/2}" y="${pad.t+(height-pad.t-pad.b)-h-6}" text-anchor="middle" fill="#a2b0c9" font-size="9">${s.attendance}%</text>
        <text x="${x+w/2}" y="${height-12}" text-anchor="middle" fill="#65738c" font-size="8">${escapeHTML(s.code)}</text>
      `;
    }).join("");

    setSVG(el,`
      <svg class="chart-svg" viewBox="0 0 ${width} ${height}">
        <g class="chart-grid-lines">
          ${[0,.25,.5,.75,1].map(v=>`<line x1="${pad.l}" y1="${pad.t+(height-pad.t-pad.b)*(1-v)}" x2="${width-pad.r}" y2="${pad.t+(height-pad.t-pad.b)*(1-v)}"></line>`).join("")}
        </g>
        ${bars}
      </svg>
    `);
  }

  function renderBacklogTrend(selector) {
    const el=$(selector);
    if(!el)return;

    const values=[];
    const labels=[];
    for(let i=13;i>=0;i--){
      const d=dateOffset(-i);
      const overdue=state.revisions.filter(r=>r.due<=d).length;
      const pending=state.plans.filter(p=>p.date<d && p.status!=="done").length;
      values.push(overdue+pending);
      labels.push(i%3===0 ? parseISO(d).getDate() : "");
    }

    setSVG(el,lineChartSVG(values,labels,Math.max(5,...values),0));
  }

  function renderStudyDistribution(selector) {
    const el=$(selector);
    if(!el)return;

    const totals=state.subjects.map(s=>({
      name:s.name,
      minutes:state.sessions.filter(x=>x.subjectId===s.id).reduce((a,x)=>a+x.minutes,0)
    })).filter(x=>x.minutes>0);

    const total=totals.reduce((a,x)=>a+x.minutes,0) || 1;
    const radius=78;
    const cx=130,cy=130;
    let angle=-Math.PI/2;
    const colors=["#637fff","#50d69b","#9b7cff","#f5c45f","#ff657d","#3dd8e6"];

    function arcPath(start,end){
      const x1=cx+radius*Math.cos(start),y1=cy+radius*Math.sin(start);
      const x2=cx+radius*Math.cos(end),y2=cy+radius*Math.sin(end);
      const large=end-start>Math.PI?1:0;
      return `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${large} 1 ${x2} ${y2} Z`;
    }

    const paths=[];
    totals.forEach((item,i)=>{
      const next=angle+(item.minutes/total)*Math.PI*2;
      paths.push(`<path d="${arcPath(angle,next)}" fill="${colors[i%colors.length]}"></path>`);
      angle=next;
    });

    const legend=totals.map((item,i)=>`
      <div class="chart-legend-row">
        <i class="chart-legend-color" style="background:${colors[i%colors.length]}"></i>
        <span>${escapeHTML(item.name)}</span>
        <strong>${Math.round(item.minutes/total*100)}%</strong>
      </div>
    `).join("");

    el.innerHTML=`
      <div class="chart-donut">
        <svg viewBox="0 0 260 260" class="chart-svg">
          <g class="donut-segments">${paths.join("")}</g>
          <circle cx="130" cy="130" r="48" class="donut-hole"></circle>
          <text x="130" y="126" class="donut-center-value">${fmtHours(total)}</text>
          <text x="130" y="143" class="donut-center-label">tracked</text>
        </svg>
      </div>
      <div class="chart-legend-list">${legend}</div>
    `;
  }

  function setSVG(el,svg) {
    if(typeof el==="string") el=$(el);
    if(el) el.innerHTML=svg;
  }

  /* ==============================================================
     19. UPCOMING
     ============================================================== */

  function renderUpcoming(selector) {
    const el=$(selector);
    if(!el)return;

    const events=[
      ...state.exams.map(e=>({date:e.date,title:e.title,note:`${e.type} · ${e.subject}`})),
      ...state.calendarEvents.filter(e=>e.date>=todayISO()).map(e=>({date:e.date,title:e.title,note:e.type}))
    ]
    .filter(x=>x.date>=todayISO())
    .sort((a,b)=>a.date.localeCompare(b.date))
    .slice(0,6);

    el.innerHTML=events.length ? events.map(e=>{
      const d=parseISO(e.date);
      const diff=daysBetween(todayISO(),e.date);
      return `
        <div class="upcoming-item">
          <div class="upcoming-date">
            <strong>${d.getDate()}</strong>
            <small>${d.toLocaleDateString(undefined,{month:"short"})}</small>
          </div>
          <div class="upcoming-copy">
            <strong>${escapeHTML(e.title)}</strong>
            <small>${escapeHTML(e.note)}</small>
          </div>
          <div class="upcoming-countdown">${diff===0?"Today":diff===1?"Tomorrow":`${diff}d`}</div>
        </div>
      `;
    }).join("") : `<div class="empty-state small"><div class="empty-icon">□</div><strong>No upcoming events</strong></div>`;
  }

  /* ==============================================================
     20. MODALS
     ============================================================== */

  function openModal(title, body, options={}) {
    const backdrop=$("#modalBackdrop");
    const modal=$("#modalWindow");
    if(!backdrop || !modal)return;

    setText("#modalTitle",title);
    setHTML("#modalBody",body);

    const footer=$("#modalFooter");
    if(footer){
      footer.innerHTML=options.footer ?? `
        <button class="button" data-action="close-modal">Cancel</button>
        <button class="button button-primary" data-action="${options.submitAction || ""}" data-id="${options.id || ""}">${options.submitLabel || "Save"}</button>
      `;
      if(!options.submitAction){
        const submit=footer.querySelector(".button-primary");
        if(submit) submit.remove();
      }
    }

    backdrop.classList.remove("hidden");
    document.body.style.overflow="hidden";
    options.afterOpen?.();
  }

  function closeModal() {
    $("#modalBackdrop")?.classList.add("hidden");
    document.body.style.overflow="";
  }

  function openDrawer() {
    $("#drawerBackdrop")?.classList.remove("hidden");
    document.body.style.overflow="hidden";
  }

  function closeDrawer() {
    $("#drawerBackdrop")?.classList.add("hidden");
    document.body.style.overflow="";
  }

  function openAddSubject() {
    openModal("Add subject",`
      <div class="form-grid">
        <div class="form-group"><label>Subject name</label><input class="input" id="modalSubjectName" placeholder="e.g. Economics"></div>
        <div class="form-group"><label>Code</label><input class="input" id="modalSubjectCode" placeholder="ECO"></div>
        <div class="form-group"><label>Weekly target (hours)</label><input class="input" id="modalSubjectTarget" type="number" min="1" value="8"></div>
        <div class="form-group"><label>Attendance (%)</label><input class="input" id="modalSubjectAttendance" type="number" min="0" max="100" value="90"></div>
        <div class="form-group"><label>Syllabus (%)</label><input class="input" id="modalSubjectSyllabus" type="number" min="0" max="100" value="0"></div>
        <div class="form-group"><label>Priority</label><select class="input" id="modalSubjectPriority"><option value="high">High</option><option value="normal" selected>Normal</option><option value="low">Low</option></select></div>
      </div>
    `,{submitAction:"save-subject",submitLabel:"Add subject"});
  }

  function editSubject(id) {
    const s=getSubject(id);
    if(!s)return;

    openModal("Edit subject",`
      <div class="form-grid">
        <div class="form-group"><label>Subject name</label><input class="input" id="modalSubjectName" value="${escapeHTML(s.name)}"></div>
        <div class="form-group"><label>Code</label><input class="input" id="modalSubjectCode" value="${escapeHTML(s.code)}"></div>
        <div class="form-group"><label>Weekly target (hours)</label><input class="input" id="modalSubjectTarget" type="number" value="${s.targetHours}"></div>
        <div class="form-group"><label>Attendance (%)</label><input class="input" id="modalSubjectAttendance" type="number" value="${s.attendance}"></div>
        <div class="form-group"><label>Syllabus (%)</label><input class="input" id="modalSubjectSyllabus" type="number" value="${s.syllabus}"></div>
        <div class="form-group"><label>Priority</label><select class="input" id="modalSubjectPriority">
          ${["high","normal","low"].map(p=>`<option value="${p}" ${s.priority===p?"selected":""}>${p}</option>`).join("")}
        </select></div>
      </div>
    `,{submitAction:"update-subject",submitLabel:"Save changes",id});
  }

  function saveSubject(id=null) {
    const name=$("#modalSubjectName")?.value.trim();
    if(!name){showToast("Subject name is required.");return;}

    const data={
      name,
      code:($("#modalSubjectCode")?.value.trim() || name.slice(0,3)).toUpperCase(),
      targetHours:num($("#modalSubjectTarget")?.value,8),
      attendance:clamp(num($("#modalSubjectAttendance")?.value,90),0,100),
      syllabus:clamp(num($("#modalSubjectSyllabus")?.value,0),0,100),
      priority:$("#modalSubjectPriority")?.value || "normal"
    };

    if(id){
      Object.assign(getSubject(id),data);
      showToast("Subject updated.");
    }else{
      state.subjects.push({
        id:uid("sub"),
        ...data,
        color:"#637fff",
        completedHours:0
      });
      showToast("Subject added.");
    }

    saveState();
    closeModal();
    renderPage(state.ui.currentPage);
  }

  function openAddPlan() {
    openModal("Add plan block",`
      <div class="form-grid">
        <div class="form-group"><label>Date</label><input class="input" id="modalPlanDate" type="date" value="${state.ui.calendarDate || todayISO()}"></div>
        <div class="form-group"><label>Time</label><input class="input" id="modalPlanTime" type="time" value="09:00"></div>
        <div class="form-group full"><label>Title</label><input class="input" id="modalPlanTitle" placeholder="e.g. Physics numericals"></div>
        <div class="form-group"><label>Subject</label><select class="input" id="modalPlanSubject"><option value="">General</option>${state.subjects.map(s=>`<option value="${s.id}">${escapeHTML(s.name)}</option>`).join("")}</select></div>
        <div class="form-group"><label>Duration (minutes)</label><input class="input" id="modalPlanDuration" type="number" min="5" value="60"></div>
        <div class="form-group"><label>Type</label><select class="input" id="modalPlanType">
          <option value="study">Study</option><option value="revision">Revision</option><option value="mock">Mock</option><option value="routine">Routine</option><option value="review">Review</option>
        </select></div>
      </div>
    `,{submitAction:"save-plan",submitLabel:"Add block"});
  }

  function savePlan() {
    const title=$("#modalPlanTitle")?.value.trim();
    if(!title){showToast("Plan title is required.");return;}

    state.plans.push({
      id:uid("plan"),
      date:$("#modalPlanDate")?.value || todayISO(),
      time:$("#modalPlanTime")?.value || "09:00",
      title,
      subjectId:$("#modalPlanSubject")?.value || "",
      duration:Math.max(5,num($("#modalPlanDuration")?.value,60)),
      type:$("#modalPlanType")?.value || "study",
      status:"pending"
    });

    saveState();
    closeModal();
    showToast("Plan block added.");
    renderPage(state.ui.currentPage);
  }

  function openAddTest() {
    openModal("Record test",`
      <div class="form-grid">
        <div class="form-group full"><label>Test title</label><input class="input" id="modalTestTitle" placeholder="e.g. Full Mock 03"></div>
        <div class="form-group"><label>Date</label><input class="input" id="modalTestDate" type="date" value="${todayISO()}"></div>
        <div class="form-group"><label>Subject</label><select class="input" id="modalTestSubject"><option value="">Full syllabus</option>${state.subjects.map(s=>`<option value="${s.id}">${escapeHTML(s.name)}</option>`).join("")}</select></div>
        <div class="form-group"><label>Marks</label><input class="input" id="modalTestMarks" type="number" value="0"></div>
        <div class="form-group"><label>Maximum marks</label><input class="input" id="modalTestMax" type="number" value="100"></div>
        <div class="form-group"><label>Accuracy (%)</label><input class="input" id="modalTestAccuracy" type="number" value="0"></div>
        <div class="form-group"><label>Attempts</label><input class="input" id="modalTestAttempts" type="number" value="0"></div>
        <div class="form-group full"><label>Weak areas (comma separated)</label><input class="input" id="modalTestWeak" placeholder="Calculus, Physics"></div>
      </div>
    `,{submitAction:"save-test",submitLabel:"Save test"});
  }

  function saveTest() {
    const title=$("#modalTestTitle")?.value.trim();
    if(!title){showToast("Test title is required.");return;}

    state.tests.push({
      id:uid("test"),
      title,
      date:$("#modalTestDate")?.value || todayISO(),
      subjectId:$("#modalTestSubject")?.value || "",
      marks:num($("#modalTestMarks")?.value),
      maxMarks:Math.max(1,num($("#modalTestMax")?.value,100)),
      accuracy:clamp(num($("#modalTestAccuracy")?.value),0,100),
      attempts:Math.max(0,num($("#modalTestAttempts")?.value)),
      weakAreas:($("#modalTestWeak")?.value || "").split(",").map(x=>x.trim()).filter(Boolean)
    });

    // Automatically increase revision pressure for new weak areas.
    const weakAreas=state.tests[state.tests.length-1].weakAreas;
    weakAreas.forEach(topicName=>{
      const topic=state.topics.find(t=>t.name.toLowerCase()===topicName.toLowerCase());
      if(topic){
        topic.weak=true;
        topic.priority="high";
        if(!state.revisions.some(r=>r.topic===topic.name && r.due<=dateOffset(1))){
          state.revisions.push({
            id:uid("rev"),
            topic:topic.name,
            subjectId:topic.subjectId,
            due:dateOffset(1),
            stage:1,
            interval:2,
            status:"upcoming"
          });
        }
      }
    });

    saveState();
    closeModal();
    showToast("Test recorded. Weak areas have been fed into PAOS intelligence.");
    renderPage(state.ui.currentPage);
  }

  function openAddMistake() {
    openModal("Add mistake",`
      <div class="form-grid">
        <div class="form-group"><label>Topic</label><input class="input" id="modalMistakeTopic" placeholder="Topic"></div>
        <div class="form-group"><label>Subject</label><select class="input" id="modalMistakeSubject">${state.subjects.map(s=>`<option value="${s.id}">${escapeHTML(s.name)}</option>`).join("")}</select></div>
        <div class="form-group"><label>Mistake type</label><select class="input" id="modalMistakeType">
          <option>Conceptual</option><option>Calculation</option><option>Recall</option><option>Application</option><option>Time Management</option>
        </select></div>
        <div class="form-group"><label>Date</label><input class="input" id="modalMistakeDate" type="date" value="${todayISO()}"></div>
        <div class="form-group full"><label>What went wrong?</label><textarea class="input" id="modalMistakeNote" rows="3"></textarea></div>
        <div class="form-group full"><label>Correct solution / fix</label><textarea class="input" id="modalMistakeSolution" rows="3"></textarea></div>
      </div>
    `,{submitAction:"save-mistake",submitLabel:"Save mistake"});
  }

  function saveMistake() {
    const topic=$("#modalMistakeTopic")?.value.trim();
    if(!topic){showToast("Topic is required.");return;}

    state.mistakes.push({
      id:uid("mis"),
      topic,
      subjectId:$("#modalMistakeSubject")?.value || "",
      type:$("#modalMistakeType")?.value || "Conceptual",
      date:$("#modalMistakeDate")?.value || todayISO(),
      note:$("#modalMistakeNote")?.value.trim() || "",
      solution:$("#modalMistakeSolution")?.value.trim() || "",
      revisited:false
    });

    const existing=state.topics.find(t=>t.name.toLowerCase()===topic.toLowerCase());
    if(existing){
      existing.weak=true;
      existing.priority="high";
    }

    saveState();
    closeModal();
    showToast("Mistake added to the bank.");
    renderPage(state.ui.currentPage);
  }

  /* ==============================================================
     21. QUICK ADD DRAWER
     ============================================================== */

  function quickAdd(type) {
    closeDrawer();
    if(type==="subject") return openAddSubject();
    if(type==="plan") return openAddPlan();
    if(type==="test") return openAddTest();
    if(type==="mistake") return openAddMistake();
    if(type==="revision"){
      openModal("Add revision",`
        <div class="form-grid">
          <div class="form-group full"><label>Topic</label><input class="input" id="modalRevisionTopic" placeholder="Topic to revise"></div>
          <div class="form-group"><label>Subject</label><select class="input" id="modalRevisionSubject">${state.subjects.map(s=>`<option value="${s.id}">${escapeHTML(s.name)}</option>`).join("")}</select></div>
          <div class="form-group"><label>Due date</label><input class="input" id="modalRevisionDue" type="date" value="${todayISO()}"></div>
        </div>
      `,{submitAction:"save-revision",submitLabel:"Add revision"});
    }
  }

  function saveRevision() {
    const topic=$("#modalRevisionTopic")?.value.trim();
    if(!topic){showToast("Topic is required.");return;}

    state.revisions.push({
      id:uid("rev"),
      topic,
      subjectId:$("#modalRevisionSubject")?.value || "",
      due:$("#modalRevisionDue")?.value || todayISO(),
      stage:1,
      interval:2,
      status:($("#modalRevisionDue")?.value || todayISO()) <= todayISO() ? "due" : "upcoming"
    });

    saveState();
    closeModal();
    showToast("Revision added to the queue.");
    renderPage(state.ui.currentPage);
  }

  /* ==============================================================
     22. CRUD / ACTIONS
     ============================================================== */

  function togglePlan(id) {
    const p=state.plans.find(x=>x.id===id);
    if(!p)return;
    p.status=p.status==="done"?"pending":"done";
    saveState();
    renderPage(state.ui.currentPage);
    renderGlobal();
  }

  function deleteSubject(id) {
    const s=getSubject(id);
    if(!s)return;

    if(!confirm(`Delete ${s.name}? Existing sessions remain but will show as General.`)) return;
    state.subjects=state.subjects.filter(x=>x.id!==id);
    state.topics=state.topics.filter(x=>x.subjectId!==id);
    state.revisions=state.revisions.filter(x=>x.subjectId!==id);
    saveState();
    showToast("Subject deleted.");
    renderPage(state.ui.currentPage);
  }

  function deleteTopic(id) {
    const t=state.topics.find(x=>x.id===id);
    if(!t)return;
    if(!confirm(`Delete topic "${t.name}"?`))return;
    state.topics=state.topics.filter(x=>x.id!==id);
    state.revisions=state.revisions.filter(x=>x.topic!==t.name);
    saveState();
    renderAcademic();
    showToast("Topic deleted.");
  }

  function toggleMistake(id) {
    const m=state.mistakes.find(x=>x.id===id);
    if(!m)return;
    m.revisited=!m.revisited;
    saveState();
    renderMistakes();
  }

  function deleteMistake(id) {
    if(!confirm("Delete this mistake permanently?"))return;
    state.mistakes=state.mistakes.filter(x=>x.id!==id);
    saveState();
    renderMistakes();
    showToast("Mistake deleted.");
  }

  function deleteTest(id) {
    if(!confirm("Delete this test record?"))return;
    state.tests=state.tests.filter(x=>x.id!==id);
    saveState();
    renderTests();
    showToast("Test deleted.");
  }

  function toggleHabit(id) {
    const h=state.habits.find(x=>x.id===id);
    if(!h)return;
    h.done=!h.done;
    if(h.done) h.streak+=1;
    saveState();
    renderDiscipline();
    renderGlobal();
  }

  function editGoal(id) {
    const g=state.goals.find(x=>x.id===id);
    if(!g)return;

    openModal("Edit goal",`
      <div class="form-grid">
        <div class="form-group full"><label>Goal</label><input class="input" id="modalGoalTitle" value="${escapeHTML(g.title)}"></div>
        <div class="form-group"><label>Progress (%)</label><input class="input" id="modalGoalProgress" type="number" value="${g.progress}"></div>
        <div class="form-group"><label>Priority</label><select class="input" id="modalGoalPriority">${["high","normal","low"].map(p=>`<option ${g.priority===p?"selected":""}>${p}</option>`).join("")}</select></div>
      </div>
    `,{submitAction:"update-goal",submitLabel:"Save",id});
  }

  function updateGoal(id) {
    const g=state.goals.find(x=>x.id===id);
    if(!g)return;
    g.title=$("#modalGoalTitle")?.value.trim() || g.title;
    g.progress=clamp(num($("#modalGoalProgress")?.value,g.progress),0,100);
    g.priority=$("#modalGoalPriority")?.value || g.priority;
    saveState();
    closeModal();
    renderAcademic();
    showToast("Goal updated.");
  }

  /* ==============================================================
     23. SETTINGS / THEME
     ============================================================== */

  function applyTheme() {
    document.body.classList.toggle("light",state.settings.theme==="light");
  }

  function saveSettingsFromUI() {
    state.profile.name=$("#settingsName")?.value.trim() || "Student";
    state.profile.target=$("#settingsTarget")?.value.trim() || "Competitive Exam";
    state.profile.dailyTarget=Math.max(1,num($("#settingsDailyTarget")?.value,6));
    state.profile.weeklyTarget=Math.max(1,num($("#settingsWeeklyTarget")?.value,42));
    state.profile.wakeTime=$("#settingsWake")?.value || "06:00";
    state.profile.sleepTime=$("#settingsSleep")?.value || "23:00";

    state.settings.notifications=$("#settingNotifications")?.checked ?? true;
    state.settings.autoAdaptive=$("#settingAdaptive")?.checked ?? true;
    state.settings.smartRevision=$("#settingSmartRevision")?.checked ?? true;
    state.settings.showRiskAlerts=$("#settingRisk")?.checked ?? true;

    saveState();
    showToast("Settings saved.");
    renderGlobal();
  }

  function setTheme(theme) {
    if(!["dark","light","system"].includes(theme))return;
    state.settings.theme=theme;
    if(theme==="system"){
      const prefers=window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
      document.body.classList.toggle("light",prefers);
    }else{
      document.body.classList.toggle("light",theme==="light");
    }
    saveState();
    renderSettings();
  }

  /* ==============================================================
     24. IMPORT / EXPORT / RESET
     ============================================================== */

  function exportJSON() {
    const payload={
      ...clone(state),
      exportedAt:new Date().toISOString(),
      app:"PAOS"
    };

    const blob=new Blob([JSON.stringify(payload,null,2)],{type:"application/json"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");
    a.href=url;
    a.download=`PAOS-backup-${todayISO()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("PAOS backup exported.");
  }

  function importJSON() {
    const input=document.createElement("input");
    input.type="file";
    input.accept=".json,application/json";
    input.onchange=async()=>{
      const file=input.files?.[0];
      if(!file)return;

      try{
        const text=await file.text();
        const imported=JSON.parse(text);
        state=mergeDefaults(clone(DEFAULT_STATE),imported);
        saveState();
        applyTheme();
        navigate(state.ui.currentPage || "dashboard");
        showToast("Backup imported successfully.");
      }catch{
        showToast("Invalid PAOS JSON backup.");
      }
    };
    input.click();
  }

  function resetAll() {
    if(!confirm("This will erase all PAOS local data and restore the demo system. Continue?"))return;
    state=clone(DEFAULT_STATE);
    saveState();
    applyTheme();
    navigate("dashboard");
    showToast("PAOS has been reset.");
  }

  /* ==============================================================
     25. EVENT DELEGATION
     ============================================================== */

  document.addEventListener("click",event=>{
    const target=event.target.closest("[data-action]");
    if(!target)return;

    const action=target.dataset.action;
    const id=target.dataset.id;

    switch(action){
      case "navigate": navigate(target.dataset.page); break;
      case "toggle-sidebar": document.body.classList.toggle("sidebar-open"); break;
      case "open-quick-add": openDrawer(); break;
      case "close-drawer": closeDrawer(); break;
      case "close-modal": closeModal(); break;

      case "open-add-subject": openAddSubject(); break;
      case "open-add-plan": openAddPlan(); break;
      case "open-add-test": openAddTest(); break;
      case "open-add-mistake": openAddMistake(); break;

      case "quick-add": quickAdd(target.dataset.type); break;

      case "save-subject": saveSubject(); break;
      case "update-subject": saveSubject(id); break;
      case "edit-subject": editSubject(id); break;
      case "delete-subject": deleteSubject(id); break;

      case "save-plan": savePlan(); break;
      case "toggle-plan": togglePlan(id); break;

      case "save-test": saveTest(); break;
      case "delete-test": deleteTest(id); break;

      case "save-mistake": saveMistake(); break;
      case "toggle-mistake": toggleMistake(id); break;
      case "delete-mistake": deleteMistake(id); break;

      case "save-revision": saveRevision(); break;
      case "complete-revision": completeRevision(id); break;

      case "toggle-habit": toggleHabit(id); break;

      case "edit-goal": editGoal(id); break;
      case "update-goal": updateGoal(id); break;

      case "delete-topic": deleteTopic(id); break;

      case "select-calendar-date":
        state.ui.calendarDate=target.dataset.date;
        state.ui.plannerTab="daily";
        saveState();
        navigate("planner");
        break;

      case "calendar-prev":
        changeCalendarMonth(-1);
        break;
      case "calendar-next":
        changeCalendarMonth(1);
        break;
      case "calendar-today":
        state.ui.calendarDate=todayISO();
        saveState();
        renderPlanner();
        break;

      case "start-timer": startTimer(); break;
      case "pause-timer": pauseTimer(); break;
      case "stop-timer": stopTimer(true); break;
      case "reset-timer": stopTimer(false); break;

      case "export-json": exportJSON(); break;
      case "import-json": importJSON(); break;
      case "reset-all": resetAll(); break;

      case "save-settings": saveSettingsFromUI(); break;
      case "set-theme": setTheme(target.dataset.theme); break;

      case "use-next-action":
        navigate("timer");
        break;

      case "mark-all-done":
        state.plans.filter(p=>p.date===todayISO()).forEach(p=>p.status="done");
        saveState();
        renderPage(state.ui.currentPage);
        showToast("Today's plan marked complete.");
        break;
    }
  });

  document.addEventListener("change",event=>{
    const el=event.target;

    if(el.id==="timerSubject"){
      state.timer.subjectId=el.value;
      saveState();
    }

    if(el.id==="timerTopic"){
      state.timer.topic=el.value;
      saveState();
    }

    if(el.id==="timerPlannedMinutes"){
      state.timer.plannedMinutes=Math.max(1,num(el.value,60));
      saveState();
    }

    if(el.matches("[data-setting-theme]")){
      setTheme(el.value);
    }
  });

  document.addEventListener("keydown",event=>{
    if(event.key==="Escape"){
      closeModal();
      closeDrawer();
      document.body.classList.remove("sidebar-open");
    }

    if((event.ctrlKey || event.metaKey) && event.key.toLowerCase()==="k"){
      event.preventDefault();
      openDrawer();
    }
  });

  /* ==============================================================
     26. CALENDAR
     ============================================================== */

  function changeCalendarMonth(delta){
    const base=parseISO(state.ui.calendarDate || todayISO());
    base.setMonth(base.getMonth()+delta);
    state.ui.calendarDate=formatDateISO(base);
    saveState();
    renderPlanner();
  }

  /* ==============================================================
     27. GENERIC UI HELPERS
     ============================================================== */

  function setText(selector,value){
    const el=$(selector);
    if(el) el.textContent=value;
  }

  function setValue(selector,value){
    const el=$(selector);
    if(el) el.value=value ?? "";
  }

  function setChecked(selector,value){
    const el=$(selector);
    if(el) el.checked=Boolean(value);
  }

  function setWidth(selector,value){
    const el=$(selector);
    if(el) el.style.width=`${clamp(num(value),0,100)}%`;
  }

  function avg(arr){
    if(!arr.length)return 0;
    return arr.reduce((a,b)=>a+num(b),0)/arr.length;
  }

  function showToast(message){
    const toast=$("#toast");
    if(!toast)return;

    const text=$("#toastText");
    if(text)text.textContent=message;

    toast.classList.add("show");
    clearTimeout(toastTimeout);
    toastTimeout=setTimeout(()=>toast.classList.remove("show"),3000);
  }

  /* ==============================================================
     28. INITIALIZATION / HTML COMPATIBILITY
     ============================================================== */

  function ensureElements() {
    // The HTML file owns the structure. This JS intentionally does not
    // create the whole interface, but it can safely report missing hooks.
    const expected=[
      "#pageTitle",
      "#pageSubtitle",
      "#currentDate",
      "#profileName",
      "#modalBackdrop",
      "#drawerBackdrop",
      "#toast"
    ];

    const missing=expected.filter(s=>!$(s));
    if(missing.length){
      console.warn("PAOS: Some HTML hooks are missing:",missing);
    }
  }

  function bindPageTabs(){
    $$(".planner-tab").forEach(tab=>{
      tab.addEventListener("click",()=>{
        state.ui.plannerTab=tab.dataset.tab;
        saveState();
        renderPlanner();
      });
    });
  }

  function bindChartPeriod(){
    $$("[data-chart-period]").forEach(btn=>{
      btn.addEventListener("click",()=>{
        const period=btn.dataset.chartPeriod;
        state.ui.chartPeriod=period;
        saveState();

        $$("[data-chart-period]").forEach(x=>x.classList.toggle("active",x===btn));
        if(state.ui.currentPage==="timer")renderTimerPage();
        if(state.ui.currentPage==="dashboard")renderDashboard();
      });
    });
  }

  function init() {
    ensureElements();
    applyTheme();
    bindPageTabs();
    bindChartPeriod();

    if(state.timer.running){
      // A page refresh should not lose the running session.
      if(!state.timer.startedAt){
        state.timer.running=false;
      }else{
        timerInterval=setInterval(()=>{
          if(state.ui.currentPage==="timer")renderTimerPage();
        },1000);
      }
    }

    navigate(state.ui.currentPage || "dashboard");
  }

  /* ==============================================================
     29. PUBLIC API
     ============================================================== */

  window.PAOS = {
    getState:()=>clone(state),
    save:saveState,
    reset:resetAll,
    export:exportJSON,
    import:importJSON,
    navigate,
    addSubject:openAddSubject,
    addPlan:openAddPlan,
    addTest:openAddTest,
    addMistake:openAddMistake,
    startTimer,
    pauseTimer,
    stopTimer
  };

  init();

})();
