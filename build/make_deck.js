// Builds slides/automated_research_evaluation.pptx (16 slides, speaker notes = the video script).
const pptxgen = require("pptxgenjs");
const { applyTheme } = require("/root/.claude/skills/synced/cf31925d-ed79-4198-8c58-103aab430456_7d7c4791-7f08-42fa-a6ec-ca5edc4e67d7/pptx/scripts/apply_theme.js");

const THEME = { name: "Evaluation", headFontFace: "Cambria", bodyFontFace: "Calibri",
  colors: { dk1: "1B2A33", lt1: "FFFFFF", dk2: "0F4C5C", lt2: "EEF4F4", accent1: "0F4C5C", accent2: "E36414", accent3: "5F8D96", accent4: "9FC3C8", accent5: "FCE9DC", accent6: "5B6B73", hlink: "0F4C5C", folHlink: "5F8D96" } };
const OUT = "slides/automated_research_evaluation.pptx";
const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
pres.title = "How Is Automated Research Evaluated?"; pres.author = "Gowri Preetham Gunisetty";
const C = pres.SchemeColor;
const FOOT = "Short story · CMPE 297 · Source: Zhang et al., arXiv:2610.11877 (2026)";

pres.defineSlideMaster({ title: "TITLE_DARK", background: { color: C.text2 }, objects: [
  { placeholder: { options: { name: "title", type: "title", x: 0.6, y: 1.35, w: 8.8, h: 1.7, fontSize: 38, bold: true, color: C.background1, valign: "top", align: "left", margin: 0 }, text: "" } },
  { placeholder: { options: { name: "body", type: "body", x: 0.6, y: 3.3, w: 8.8, h: 1.5, fontSize: 16, color: C.accent4, valign: "top", margin: 0 }, text: "" } } ] });
pres.defineSlideMaster({ title: "CONTENT", background: { color: C.background1 }, slideNumber: { x: 9.1, y: 5.2, w: 0.5, h: 0.25, fontSize: 10, color: C.accent6, align: "right" }, objects: [
  { placeholder: { options: { name: "title", type: "title", x: 0.5, y: 0.3, w: 9.0, h: 0.75, fontSize: 30, bold: true, color: C.text1, valign: "middle", align: "left", margin: 0 }, text: "" } },
  { text: { text: FOOT, options: { x: 0.5, y: 5.2, w: 7.5, h: 0.25, fontSize: 10, color: C.accent6, margin: 0 } } } ] });

let section = "";
const slide = (master, title, notes) => { const s = pres.addSlide({ masterName: master, sectionTitle: section }); s.addText(title, { placeholder: "title" }); s.addNotes(notes); return s; };
const T = (s, text, o) => s.addText(text, Object.assign({ isTextBox: true, margin: 0, color: C.text1, fontSize: 14, valign: "top" }, o));
const card = (s, x, y, w, h, fill) => s.addShape(pres.ShapeType.roundRect, { x, y, w, h, rectRadius: 0.08, fill: { color: fill || C.background2 }, line: { color: fill || C.background2, width: 0 } });
const stat = (s, x, y, w, big, label, color, size) => { T(s, big, { x, y, w, h: 0.75, fontSize: size || 40, bold: true, valign: "middle", color: color || C.accent2, fontFace: "Cambria" }); T(s, label, { x, y: y + 0.85, w, h: 1.2, fontSize: 15, color: C.text1 }); };
const badge = (s, x, y, n) => { s.addShape(pres.ShapeType.ellipse, { x, y, w: 0.42, h: 0.42, fill: { color: C.accent1 }, line: { color: C.accent1, width: 0 } }); T(s, String(n), { x, y, w: 0.42, h: 0.42, align: "center", valign: "middle", color: C.background1, bold: true, fontSize: 14 }); };
const chartLook = () => ({ catAxisLabelColor: "5B6B73", valAxisLabelColor: "5B6B73", catAxisLabelFontSize: 11, valAxisLabelFontSize: 10, catAxisLabelFontFace: "+mn-lt", valAxisLabelFontFace: "+mn-lt", dataLabelFontFace: "+mn-lt", legendFontFace: "+mn-lt",
  valGridLine: { color: "D9E2E4", size: 0.5 }, catGridLine: { style: "none" }, showValue: true, dataLabelFontSize: 11, dataLabelColor: "1B2A33", dataLabelFormatCode: '0.0"%"', valAxisMinVal: 0, valAxisMaxVal: 100, valAxisLabelFormatCode: '0"%"' });

// ---------------------------------------------------------------- 1
section = "Opening"; pres.addSection({ title: section });
let s = slide("TITLE_DARK", "How do we know if AI-generated research is any good?",
  "Hi, I'm Preetham, and this is my short story for CMPE 297. AI systems can now search the literature, propose ideas, run experiments, write the paper and even review it. So the natural question is: how good are they? But this talk is about the question underneath that one — how do we know? The paper I chose is a survey from October 2026 called 'How Is Automated Research Evaluated? A Survey of Benchmarks and Evaluation Practices', from the NLP2CT lab at the University of Macau. It doesn't rank AI scientists. It examines the tests we use on them, and asks what those tests actually prove. I'll cover its taxonomy, the main benchmarks, three lessons, and my own take.");
s.addText([{ text: "A short story on the survey “How Is Automated Research Evaluated?”", options: { breakLine: true } }, { text: "Zhang, Zhou et al., University of Macau · arXiv:2610.11877 · October 2026", options: { breakLine: true } }, { text: "Gowri Preetham Gunisetty · CMPE 297, Fall 2026" }], { placeholder: "body" });

// ---------------------------------------------------------------- 2
s = slide("CONTENT", "Three numbers that frame the problem",
  "Let me start with three numbers from the survey. First: on ScienceAgentBench, an agent's code ran without errors ninety-two percent of the time — but solved the task only thirty-two percent of the time. Same runs, two very different stories. Second: in AstaBench's end-to-end benchmark, sixteen percent of rubric items looked satisfied in the report the agent wrote, but were contradicted by the code and artifacts. The paper said one thing; the files said another. Third: the survey defines five levels of claim strength, and the top level is real scientific contribution. The number of evaluations that reach it is zero. So the gap between 'looks like research' and 'is research' is the whole subject of this talk.");
card(s, 0.5, 1.5, 2.85, 2.6); card(s, 3.575, 1.5, 2.85, 2.6); card(s, 6.65, 1.5, 2.85, 2.6);
T(s, "The gap between “looks like research” and “is research” is what this survey is about.", { x: 0.5, y: 4.35, w: 9, h: 0.45, fontSize: 15, italic: true, color: C.accent6 });
stat(s, 0.75, 1.7, 2.4, "92% → 32%", "Code that runs vs. task actually solved, on ScienceAgentBench", null, 30);
stat(s, 3.825, 1.7, 2.4, "16%", "Rubric items satisfied on paper but contradicted by the artifacts (AstaBench E2E)");
stat(s, 6.9, 1.7, 2.4, "0", "Evaluations that reach the top claim level: a real scientific contribution");

// ---------------------------------------------------------------- 3
section = "The survey"; pres.addSection({ title: section });
s = slide("CONTENT", "The survey at a glance",
  "A quick overview of the survey itself. It comes from eight authors at the University of Macau, with Derek Wong as corresponding author. They searched Google Scholar, arXiv, Semantic Scholar and the ACL Anthology, with citation tracing, up to May 2026. What's in scope: systems that support literature synthesis, ideation, experiments, writing and peer review — where the tasks and the scoring can actually be inspected. What's out: plain retrieval, single-paper question answering, generic coding benchmarks and robotic wet labs. The contribution is not a leaderboard. For each area, they compare four design choices: how tasks are constructed, what evidence the system gets, who or what judges, and how the score is computed. One stated limitation: it's mostly AI and machine-learning research.");
T(s, [{ text: "Who and when", options: { bold: true, breakLine: true } }, { text: "8 authors, NLP²CT Lab, University of Macau. Literature search up to May 2026.", options: { breakLine: true, paraSpaceAfter: 10 } },
  { text: "In scope", options: { bold: true, breakLine: true } }, { text: "Systems that synthesise literature, propose ideas, run experiments, write and review — where tasks and scoring can be inspected.", options: { breakLine: true, paraSpaceAfter: 10 } },
  { text: "Out of scope", options: { bold: true, breakLine: true } }, { text: "Plain retrieval, single-paper QA, generic coding, autonomous wet labs." }], { x: 0.5, y: 1.3, w: 4.4, h: 3.6, fontSize: 14 });
card(s, 5.2, 1.3, 4.3, 3.45);
T(s, "For every target it compares four design choices", { x: 5.45, y: 1.5, w: 3.8, h: 0.6, fontSize: 15, bold: true });
[["1", "Task construction"], ["2", "Evidence given to the system"], ["3", "Evaluator: tests, references, LLM judge, humans"], ["4", "Scoring procedure"]].forEach(([n, t], i) => { badge(s, 5.45, 2.25 + i * 0.6, n); T(s, t, { x: 6.05, y: 2.25 + i * 0.6, w: 3.3, h: 0.42, valign: "middle", fontSize: 14 }); });

// ---------------------------------------------------------------- 4
section = "Taxonomy"; pres.addSection({ title: section });
s = slide("CONTENT", "The taxonomy: six evaluation targets",
  "Here's the taxonomy, and it's intuitive. Follow a research project from start to finish. First, literature synthesis: writing surveys, comparison tables and cited answers. Second, research ideation: are the ideas novel and feasible. Third, executable workflows: scientific coding, data analysis and machine-learning experiments. Fourth, scholarly writing: sections, citations, posters and figures. Fifth, automatic peer review. And sixth, underneath all of them, end-to-end systems that connect the whole chain. I'll go through each target in the next four slides — the main benchmarks, how they measure, and the catch the survey points out for each. Keep one thing in mind: these are different targets with different kinds of evidence, so a score in one tells you very little about another.");
const st = [["1", "Literature synthesis", "surveys, tables, cited answers"], ["2", "Research ideation", "novelty, feasibility, feedback"], ["3", "Executable workflows", "scientific code, analysis, ML"], ["4", "Scholarly writing", "sections, citations, figures"], ["5", "Peer review", "review quality, error finding"]];
st.forEach(([n, t, sub], i) => { const x = 0.5 + i * 1.82; card(s, x, 1.4, 1.66, 1.75, C.accent1);
  T(s, n, { x: x + 0.15, y: 1.5, w: 0.5, h: 0.45, fontSize: 22, bold: true, color: C.accent4, fontFace: "Cambria" });
  T(s, t, { x: x + 0.15, y: 1.98, w: 1.4, h: 0.6, fontSize: 14, bold: true, color: C.background1 });
  T(s, sub, { x: x + 0.15, y: 2.58, w: 1.4, h: 0.5, fontSize: 10.5, color: C.accent4 }); });
card(s, 0.5, 3.4, 8.94, 0.95, C.accent5);
T(s, [{ text: "6  End-to-end research systems  ", options: { bold: true } }, { text: "— the whole chain connected, with hand-offs between stages" }], { x: 0.75, y: 3.4, w: 8.5, h: 0.95, valign: "middle", fontSize: 15 });
T(s, "A score on one target says little about another: each uses different evidence and different judges.", { x: 0.5, y: 4.55, w: 9, h: 0.4, fontSize: 13, italic: true, color: C.accent6 });

// ---------------------------------------------------------------- 5
s = slide("CONTENT", "Targets 1–2: literature and ideas",
  "Target one, literature synthesis. Benchmarks include AutoSurvey, SurGE with 205 human-written surveys, and OpenScholar, where sixteen experts judged cited answers. My favourite is SurveyBench. Instead of asking 'is this survey good', it asks: can a reader answer quiz questions from it? A deep-research system scored 4.4 out of 5 on content quality, but under 2 out of 10 on topic-specific questions. Fluent, but not useful. Target two, ideation. The famous study by Si and colleagues had over a hundred researchers rate ideas blind. AI ideas were rated more novel. But nobody ran them. And in MLRC-Bench, novelty ratings had basically zero correlation with how well the methods performed. So 'judged novel' and 'actually works' are separate facts.");
card(s, 0.5, 1.3, 4.35, 3.55); card(s, 5.15, 1.3, 4.35, 3.55);
T(s, "1 · Literature synthesis", { x: 0.75, y: 1.45, w: 3.9, h: 0.4, fontSize: 17, bold: true, color: C.accent1 });
T(s, [{ text: "Benchmarks: AutoSurvey, SurGE, ArxivDIGESTables, OpenScholar, SurveyBench", options: { breakLine: true, paraSpaceAfter: 8 } }, { text: "SurveyBench asks whether a reader can answer quiz questions from the survey", options: { breakLine: true, paraSpaceAfter: 8 } }, { text: "The catch: ", options: { bold: true, color: C.accent2 } }, { text: "4.42/5 on content, about 1.97/10 on topic questions. And “citation recall” means different things in different benchmarks." }], { x: 0.75, y: 1.95, w: 3.9, h: 2.8, fontSize: 15.5 });
T(s, "2 · Research ideation", { x: 5.4, y: 1.45, w: 3.9, h: 0.4, fontSize: 17, bold: true, color: C.accent1 });
T(s, [{ text: "Benchmarks: Si et al. blind study, AI Idea Bench (3,495 papers), ScholarEval, Scideator", options: { breakLine: true, paraSpaceAfter: 8 } }, { text: "100+ researchers rated AI ideas as more novel than human ones", options: { breakLine: true, paraSpaceAfter: 8 } }, { text: "The catch: ", options: { bold: true, color: C.accent2 } }, { text: "nobody ran the ideas. In MLRC-Bench, novelty ratings vs. measured effectiveness: correlation −0.06." }], { x: 5.4, y: 1.95, w: 3.9, h: 2.8, fontSize: 15.5 });

// ---------------------------------------------------------------- 6
s = slide("CONTENT", "Target 3: can it run the experiment?",
  "Target three is executable workflows, and it's the most mature area, because code can be run and checked. SciCode has 65 research problems split into 288 sub-problems. A strong model solved 26 percent of the sub-problems, but only 4.6 percent of the full problems — the pieces work, the whole doesn't. MLE-bench uses 75 Kaggle competitions with medal thresholds. RE-Bench compares agents against 61 human experts under a time limit, which is why the survey places it at a higher claim level. And BLADE checks something subtle: not whether the analysis runs, but whether the agent made the same analysis decisions an expert would. There, 96 percent of analyses ran, but coverage of expert decisions stayed below 13 percent.");
[["SciCode", "26% → 4.6%", "sub-problems solved vs. full problems solved (65 problems, 288 sub-problems)"], ["MLE-bench", "75", "Kaggle competitions, scored against historical medal thresholds"], ["RE-Bench", "61", "human experts as the comparison, at fixed time budgets"], ["BLADE", "96% vs <13%", "analyses that run vs. expert analysis decisions covered"]].forEach(([name, big, lab], i) => {
  const x = 0.5 + (i % 2) * 4.6, y = 1.3 + Math.floor(i / 2) * 1.85; card(s, x, y, 4.4, 1.65);
  T(s, name, { x: x + 0.25, y: y + 0.15, w: 1.6, h: 0.35, fontSize: 14, bold: true, color: C.accent1 });
  T(s, big, { x: x + 0.25, y: y + 0.5, w: 3.9, h: 0.55, fontSize: 26, bold: true, color: C.accent2, fontFace: "Cambria" });
  T(s, lab, { x: x + 0.25, y: y + 1.07, w: 3.9, h: 0.5, fontSize: 12.5 }); });

// ---------------------------------------------------------------- 7
s = slide("CONTENT", "Targets 4–5: writing it up and reviewing it",
  "Target four, scholarly writing. The recurring finding is that word-overlap metrics agree poorly with human judgments of factual accuracy. In an expert study called GREP, a current model passed a section-level faithfulness check only twenty percent of the time. Citation checkers also shift between datasets: one tool's precision fell from about .95 to .75 while recall barely moved. Target five, peer review. The survey separates three questions. Is the generated review good? Can the system find real errors — FLAWS has 713 paper-error pairs. And does AI feedback help human reviewers — there was a randomized study at ICLR with over twenty-two thousand reviews. One warning from the SPOT benchmark: experts found a genuine error that wasn't in the answer key, so a system finding it would be marked wrong.");
T(s, "4 · Scholarly writing", { x: 0.5, y: 1.3, w: 4.3, h: 0.4, fontSize: 17, bold: true, color: C.accent1 });
T(s, [{ text: "Overlap metrics agree weakly with human factuality judgments", options: { bullet: true, breakLine: true, paraSpaceAfter: 6 } }, { text: "GREP: 20% section-level faithfulness pass rate, judged by 16 experts", options: { bullet: true, breakLine: true, paraSpaceAfter: 6 } }, { text: "CiteAudit: precision .947 → .749 across collections, recall stays above .95", options: { bullet: true } }], { x: 0.5, y: 1.8, w: 4.3, h: 2.2, fontSize: 14 });
T(s, "5 · Automatic peer review", { x: 5.2, y: 1.3, w: 4.3, h: 0.4, fontSize: 17, bold: true, color: C.accent1 });
T(s, [{ text: "Review quality: ReviewEval, five dimensions, expert comparison", options: { bullet: true, breakLine: true, paraSpaceAfter: 6 } }, { text: "Error finding: FLAWS (713 paper–error pairs), SPOT (91 acknowledged errors)", options: { bullet: true, breakLine: true, paraSpaceAfter: 6 } }, { text: "Feedback use: randomized ICLR study, 22,000+ reviews", options: { bullet: true } }], { x: 5.2, y: 1.8, w: 4.3, h: 2.2, fontSize: 14 });
card(s, 0.5, 4.05, 9.0, 0.85, C.accent5);
T(s, [{ text: "Watch out: ", options: { bold: true, color: C.accent2 } }, { text: "in SPOT, experts found a real error that was not in the answer key — a system that found it would be scored as wrong." }], { x: 0.75, y: 4.05, w: 8.5, h: 0.85, valign: "middle", fontSize: 14 });

// ---------------------------------------------------------------- 8
s = slide("CONTENT", "Target 6: end-to-end AI scientists",
  "Target six: systems that do the whole thing, like AI Scientist and DeepScientist, and the suites built to test them — AstaBench, MLR-Bench, ResearchGym, AIRS-Bench and FIRE-Bench. This is where the gap between report and reality is clearest. In AstaBench's end-to-end track, 16 percent of rubric items looked satisfied in the written report but were contradicted by the code and artifacts. In MLR-Bench, eight out of ten coding-agent runs contained placeholder or synthetic results that were never verified. In ResearchGym, the agent beat the strongest provided baseline in one of fifteen runs. And DeepScientist reports more than twenty thousand GPU hours. So the starting resources, the hand-offs and the compute all differ between systems — which makes direct comparison very hard.");
stat(s, 0.5, 1.35, 2.8, "16%", "AstaBench E2E: rubric items met in the report, contradicted by artifacts");
stat(s, 3.6, 1.35, 2.8, "8 of 10", "MLR-Bench: coding-agent runs with unverified placeholder or synthetic results");
stat(s, 6.7, 1.35, 2.8, "1 of 15", "ResearchGym: runs where the agent beat the strongest visible baseline");
card(s, 0.5, 3.45, 9.0, 1.4);
T(s, [{ text: "Why comparison is hard", options: { bold: true, breakLine: true } }, { text: "Systems start with different resources, hand work between stages differently, and use very different compute — DeepScientist reports 20,000+ GPU hours. Reading only the generated paper misses what artifact checks reveal." }], { x: 0.75, y: 3.55, w: 8.5, h: 1.2, fontSize: 14 });

// ---------------------------------------------------------------- 9
section = "Claim strength"; pres.addSection({ title: section });
s = slide("CONTENT", "How strong is the claim? Five levels",
  "The second idea I found really useful is this ladder. It describes how strong a claim an evaluation can support. Level one: the output looks like research — style and form. Level two: it passes defined checks under specified inputs. Level three: the process holds up — someone inspected how the result was produced, not only the result. Level four: it's calibrated against people — it matches experts or measurably helps users. Level five: it's a scientific contribution. When the authors place benchmarks on this ladder, most sit at level two. A few reach level three, like BLADE, AstaBench end-to-end and MLR-Bench. RE-Bench and Scideator reach level four. Nothing reaches level five. The authors are clear that this is a reading aid, not a validated scale — but it's a great question to ask of any headline.");
const lv = [["L1", "Surface plausibility", "It looks like research", ""], ["L2", "Task correctness under specified evidence", "It passes defined checks", "Most benchmarks: SurveyBench, AI Idea Bench, MLE-bench"], ["L3", "Process-grounded competence", "The process holds up when inspected", "BLADE, AstaBench E2E, MLR-Bench"], ["L4", "Human- or utility-calibrated performance", "Matches experts or helps users", "RE-Bench, Scideator"], ["L5", "Scientific contribution", "It advances a field", "No evaluation reaches this yet"]];
const fills = [C.background2, C.accent4, C.accent3, C.accent1, C.text1];
lv.forEach(([tag, name, plain, who], i) => { const y = 4.2 - i * 0.72, x = 0.5 + i * 0.3, dark = i >= 2;
  card(s, x, y, 4.3, 0.62, fills[i]);
  T(s, tag, { x: x + 0.15, y, w: 0.55, h: 0.62, valign: "middle", fontSize: 18, bold: true, fontFace: "Cambria", color: dark ? C.background1 : C.text1 });
  T(s, name, { x: x + 0.75, y, w: 3.45, h: 0.62, valign: "middle", fontSize: 12.5, bold: true, color: dark ? C.background1 : C.text1 });
  T(s, [{ text: plain, options: { breakLine: true } }, { text: who, options: { fontSize: 11, color: i === 4 ? C.accent2 : C.accent6, bold: i === 4 } }], { x: x + 4.45, y, w: 9.5 - (x + 4.45), h: 0.62, valign: "middle", fontSize: 13 }); });

// ---------------------------------------------------------------- 10
section = "Lessons"; pres.addSection({ title: section });
s = slide("CONTENT", "Lesson 1: check the process, not just output",
  "Now the three cross-cutting lessons. Lesson one: output checks and process checks tell you different things. This chart shows four systems, each under two checks. Light bars are the easy check; orange bars are the one that matters. ScienceAgentBench: ninety-two percent of code runs, thirty-two percent solves the task. Curie, an experimentation agent: about ninety-eight percent of design checks pass, thirty-six percent of conclusions are right. BLADE: ninety-six percent of analyses run, under thirteen percent of expert decisions are covered. SurveyBench: eighty-eight percent on content quality, twenty percent on answering questions. The survey's advice is not to pick one. Output checks, process checks and human studies each catch something the others miss — use them together, and report them separately instead of blending them into one number.");
s.addChart(pres.charts.BAR, [{ name: "The easy check", labels: ["ScienceAgentBench", "Curie", "BLADE", "SurveyBench"], values: [92.2, 97.9, 96, 88.4] }, { name: "The check that matters", labels: ["ScienceAgentBench", "Curie", "BLADE", "SurveyBench"], values: [32.4, 36.1, 13, 19.7] }],
  Object.assign(chartLook(), { x: 0.5, y: 1.2, w: 5.9, h: 3.8, barDir: "col", barGrouping: "clustered", chartColors: ["9FC3C8", "E36414"], showLegend: true, legendPos: "b", legendFontSize: 11, legendColor: "1B2A33", barGapWidthPct: 60 }));
T(s, [{ text: "What each pair compares", options: { bold: true, breakLine: true, paraSpaceAfter: 6 } }, { text: "ScienceAgentBench: code runs → task solved", options: { bullet: true, breakLine: true } }, { text: "Curie: design checks → correct conclusions", options: { bullet: true, breakLine: true } }, { text: "BLADE: analysis runs → expert decisions covered (below 13%)", options: { bullet: true, breakLine: true } }, { text: "SurveyBench: content score → quiz answerable (rescaled to %)", options: { bullet: true } }], { x: 6.6, y: 1.35, w: 2.9, h: 3.5, fontSize: 12.5, paraSpaceAfter: 5 });

// ---------------------------------------------------------------- 11
s = slide("CONTENT", "Lesson 2: calibrate the judge to the property",
  "Lesson two is about the judge. LLM judges are used everywhere in these benchmarks, and they have known habits: they can favour longer answers, answers in a particular position, and possibly their own outputs. But the survey makes a sharper point: validation doesn't transfer. If experts confirmed that your judge ranks structure well, that says nothing about whether it can verify citations. In SurGE, for example, expert rankings calibrate structure and content, but not the citation judgments. And when a claim-verification system was tried on real peer-review claims, its best four-class accuracy was about .29. There's also a level effect: one study showed that agreement with experts at the system level can hide much weaker agreement on individual items. So always ask: this judge was validated — for what, exactly, and on how many examples?");
[["Judges have habits", "LLM judges can favour position, length and possibly their own outputs. Each scientific setting needs its own checks."], ["Validation does not transfer", "A judge checked against experts for structure is not thereby checked for citation accuracy (SurGE)."], ["Hard properties stay hard", "Verifying real peer-review claims: best four-class accuracy .287 (Peerispect)."], ["System level hides item level", "Agreement on rankings of systems can mask weak agreement on individual outputs."]].forEach(([h, t], i) => {
  const x = 0.5 + (i % 2) * 4.6, y = 1.3 + Math.floor(i / 2) * 1.85; card(s, x, y, 4.4, 1.65); badge(s, x + 0.2, y + 0.2, i + 1);
  T(s, h, { x: x + 0.8, y: y + 0.2, w: 3.4, h: 0.42, valign: "middle", fontSize: 15, bold: true });
  T(s, t, { x: x + 0.25, y: y + 0.75, w: 3.95, h: 0.85, fontSize: 14 }); });

// ---------------------------------------------------------------- 12
s = slide("CONTENT", "Lesson 3: budgets are part of the result",
  "Lesson three: the budget and the selection rule are part of the result. On MLE-bench, the same model wins a medal in about seventeen percent of single attempts, and thirty-four percent if you allow eight attempts and keep the best. Neither number is wrong — they answer different questions. A paper that reports one without saying which hasn't told you much. The same applies to time limits, hardware and whether the agent was given a starting solution. RE-Bench's human result at thirty-two hours, for instance, comes from selecting among four independent attempts. And SciCode's full-problem score nearly triples, from 4.6 to 12.3 percent, when the model is given background information. So when you compare two systems, check that the attempts, compute and help were actually matched.");
s.addChart(pres.charts.BAR, [{ name: "MLE-bench medal rate (o1-preview)", labels: ["One attempt", "Best of 8 attempts"], values: [16.9, 34.1] }],
  Object.assign(chartLook(), { x: 0.5, y: 1.2, w: 4.6, h: 3.8, barDir: "col", chartColors: ["9FC3C8", "E36414"], showLegend: false, showTitle: true, title: "MLE-bench medal rate, same model", titleFontSize: 13, titleColor: "1B2A33", titleFontFace: "+mn-lt", valAxisMaxVal: 50, barGapWidthPct: 80 }));
card(s, 5.4, 1.3, 4.1, 1.05); card(s, 5.4, 2.55, 4.1, 1.05); card(s, 5.4, 3.8, 4.1, 1.05);
T(s, [{ text: "Selection rule. ", options: { bold: true } }, { text: "16.9% and 34.1% are both correct; they answer different questions." }], { x: 5.6, y: 1.3, w: 3.7, h: 1.05, valign: "middle", fontSize: 13.5 });
T(s, [{ text: "Human baselines too. ", options: { bold: true } }, { text: "RE-Bench's 32-hour human result is chosen from four independent attempts." }], { x: 5.6, y: 2.55, w: 3.7, h: 1.05, valign: "middle", fontSize: 13.5 });
T(s, [{ text: "Supplied help. ", options: { bold: true } }, { text: "SciCode full problems: 4.6% → 12.3% when background is provided." }], { x: 5.6, y: 3.8, w: 3.7, h: 1.05, valign: "middle", fontSize: 13.5 });

// ---------------------------------------------------------------- 13
s = slide("CONTENT", "What to report: a five-line label",
  "So what do the authors recommend? In the appendix they give reporting recommendations for twelve specific settings. I've condensed them into a five-line label that I'd like to see on every automated-research result. One, the claim: what is the task and what are you claiming it shows. Two, the inputs: what the system was given, including data versions and retrieval cut-off dates. Three, the evaluator: who or what judged, with which rubric, and how it was calibrated. Four, the sample: how many items and runs, and what the denominator is — including outputs that failed to parse. Five, the budget: time, compute, retries, and how the reported run was chosen. And finally, publish the artifacts — the code, logs and outputs — so someone else can check the report against what actually ran.");
[["Claim", "The task, and what you say it shows"], ["Inputs", "What the system was given; data version and cut-off date"], ["Evaluator", "Who or what judged, the rubric, and its calibration"], ["Sample", "Items, runs and the denominator, including failed outputs"], ["Budget", "Time, compute, retries, and how the reported run was chosen"]].forEach(([h, t], i) => {
  const x = 0.5 + i * 1.82; card(s, x, 1.35, 1.66, 2.55); badge(s, x + 0.18, 1.5, i + 1);
  T(s, h, { x: x + 0.18, y: 2.05, w: 1.35, h: 0.4, fontSize: 16, bold: true, color: C.accent1 });
  T(s, t, { x: x + 0.18, y: 2.5, w: 1.35, h: 1.35, fontSize: 12.5 }); });
card(s, 0.5, 4.1, 8.94, 0.8, C.accent5);
T(s, [{ text: "And publish the artifacts ", options: { bold: true } }, { text: "— code, logs, outputs — so the report can be checked against what actually ran." }], { x: 0.75, y: 4.1, w: 8.5, h: 0.8, valign: "middle", fontSize: 14 });

// ---------------------------------------------------------------- 14
section = "Context and opinion"; pres.addSection({ title: section });
s = slide("CONTENT", "How it fits with two other surveys",
  "The rubric asks to connect more than one survey, so here are two that frame this one. First, the 'Survey on Evaluation of LLM-based Agents' by Yehudai and colleagues, published in ACL Findings. It maps agent evaluation in general: core capabilities like planning and tool use, application benchmarks for web and software agents, generalist agents, and developer tooling. Automated research is one demanding application inside that map — the Macau survey is the deep dive. Second, 'Log Analysis for LLM-Based Agents', from October 2026, which reviews ninety studies across three stages: agent logging, log structuring and log mining. Its key warning matches lesson one perfectly: having detailed logs does not mean you have sufficient evidence. Logs are raw material; someone still has to design the process check.");
card(s, 0.5, 1.3, 4.35, 3.55); card(s, 5.15, 1.3, 4.35, 3.55);
T(s, [{ text: "The wider map", options: { fontSize: 12, color: C.accent2, bold: true, breakLine: true } }, { text: "Survey on Evaluation of LLM-based Agents", options: { bold: true, fontSize: 17, breakLine: true } }, { text: "Yehudai et al., ACL Findings · arXiv:2503.16416", options: { fontSize: 11, color: C.accent6, breakLine: true, paraSpaceAfter: 8 } },
  { text: "Covers core capabilities, application benchmarks, generalist agents and developer tooling. Automated research is one application inside this map." }], { x: 0.75, y: 1.5, w: 3.9, h: 3.2, fontSize: 15.5 });
T(s, [{ text: "The evidence underneath", options: { fontSize: 12, color: C.accent2, bold: true, breakLine: true } }, { text: "Log Analysis for LLM-Based Agents", options: { bold: true, fontSize: 17, breakLine: true } }, { text: "Wang et al., Oct 2026 · arXiv:2611.23281", options: { fontSize: 11, color: C.accent6, breakLine: true, paraSpaceAfter: 8 } },
  { text: "90 studies across logging, structuring and mining. Its warning: detailed logs are not the same as sufficient evidence — which is Lesson 1 from another angle." }], { x: 5.4, y: 1.5, w: 3.9, h: 3.2, fontSize: 15.5 });

// ---------------------------------------------------------------- 15
s = slide("CONTENT", "My two cents",
  "Now my own take. First, this matched my experience. In this course I built a small autoresearch harness, where an agent proposes machine-learning experiments and a referee decides which ones count. Before reading this survey, I already needed the controls it describes: labels the agent can't see, a fixed experiment budget, and a test set that's opened only once. In another project, one self-improvement method picked a rule that scored well on training cases and then crashed on unseen ones — an output-only check would have called that a success. Second, the claim ladder is what I'll reuse: 'which level is this claim?' takes thirty seconds to ask. Third, what's missing: the authors compare what papers report, they didn't re-run anything, and I'd like cost to get more attention. Twenty thousand GPU hours for one result changes what 'it works' means.");
[["It matched what I saw", "My own autoresearch harness needed hidden labels, a fixed budget and a one-shot test set. One run looked fine on training data and crashed on unseen cases."], ["The ladder is reusable", "“Which level is this claim?” is a 30-second question for any result — including my own."], ["What I would add", "The survey compares reported results without re-running them. Cost deserves more space: 20,000 GPU hours changes what “it works” means."]].forEach(([h, t], i) => {
  const x = 0.5 + i * 3.07; card(s, x, 1.35, 2.86, 3.45); badge(s, x + 0.22, 1.55, i + 1);
  T(s, h, { x: x + 0.22, y: 2.12, w: 2.45, h: 0.45, fontSize: 16, bold: true, color: C.accent1 });
  T(s, t, { x: x + 0.22, y: 2.62, w: 2.45, h: 2.1, fontSize: 14.5 }); });

// ---------------------------------------------------------------- 16
section = "Close"; pres.addSection({ title: section });
s = slide("TITLE_DARK", "Three questions for any “AI scientist” result",
  "To wrap up: three questions to ask whenever you see a claim about an AI scientist. One: what was checked — the output, the process, or the effect on people? Two: who judged, and what was that judge validated for? Three: how many attempts, how much compute, and how was the reported run chosen? The honest summary of where the field is today: most results show correctness on defined checks, under a stated budget, on AI and machine-learning tasks. That is real progress — but it isn't yet evidence of doing science, and the tests that could tell the difference mostly haven't been built. The references and all my materials — the article, slides and figures — are in my GitHub repository. Thank you for watching.");
s.addText([{ text: "1  What was checked — the output, the process, or the effect on people?", options: { breakLine: true, paraSpaceAfter: 6 } }, { text: "2  Who judged, and what was that judge validated for?", options: { breakLine: true, paraSpaceAfter: 6 } }, { text: "3  How many attempts, how much compute, and how was the run chosen?", options: { breakLine: true, paraSpaceAfter: 12 } },
  { text: "Zhang et al., arXiv:2610.11877 · Yehudai et al., arXiv:2503.16416 · Wang et al., arXiv:2611.23281", options: { fontSize: 11 } }], { placeholder: "body" });

(async () => { await pres.writeFile({ fileName: OUT }); await applyTheme(OUT, THEME); console.log("wrote", OUT); })();
