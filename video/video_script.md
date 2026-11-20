# Video script — 15 to 16 minutes

Record with the slides in presenter view: the same text is in each slide's speaker notes. About one minute per slide at a normal speaking pace; do not rush — the rubric asks for no less than 15 minutes.

Total: 2017 words ≈ 15 minutes at 135 words per minute. If you finish early, spend longer on slides 10, 12 and 15.

## Slide 1 — 

Hi, I'm Preetham, and this is my short story for CMPE 297. AI systems can now search the literature, propose ideas, run experiments, write the paper and even review it. So the natural question is: how good are they? But this talk is about the question underneath that one — how do we know? The paper I chose is a survey from October 2026 called 'How Is Automated Research Evaluated? A Survey of Benchmarks and Evaluation Practices', from the NLP2CT lab at the University of Macau. It doesn't rank AI scientists. It examines the tests we use on them, and asks what those tests actually prove. I'll cover its taxonomy, the main benchmarks, three lessons, and my own take.

## Slide 2 — 

Let me start with three numbers from the survey. First: on ScienceAgentBench, an agent's code ran without errors ninety-two percent of the time — but solved the task only thirty-two percent of the time. Same runs, two very different stories. Second: in AstaBench's end-to-end benchmark, sixteen percent of rubric items looked satisfied in the report the agent wrote, but were contradicted by the code and artifacts. The paper said one thing; the files said another. Third: the survey defines five levels of claim strength, and the top level is real scientific contribution. The number of evaluations that reach it is zero. So the gap between 'looks like research' and 'is research' is the whole subject of this talk.

## Slide 3 — 

A quick overview of the survey itself. It comes from eight authors at the University of Macau, with Derek Wong as corresponding author. They searched Google Scholar, arXiv, Semantic Scholar and the ACL Anthology, with citation tracing, up to May 2026. What's in scope: systems that support literature synthesis, ideation, experiments, writing and peer review — where the tasks and the scoring can actually be inspected. What's out: plain retrieval, single-paper question answering, generic coding benchmarks and robotic wet labs. The contribution is not a leaderboard. For each area, they compare four design choices: how tasks are constructed, what evidence the system gets, who or what judges, and how the score is computed. One stated limitation: it's mostly AI and machine-learning research.

## Slide 4 — 

Here's the taxonomy, and it's intuitive. Follow a research project from start to finish. First, literature synthesis: writing surveys, comparison tables and cited answers. Second, research ideation: are the ideas novel and feasible. Third, executable workflows: scientific coding, data analysis and machine-learning experiments. Fourth, scholarly writing: sections, citations, posters and figures. Fifth, automatic peer review. And sixth, underneath all of them, end-to-end systems that connect the whole chain. I'll go through each target in the next four slides — the main benchmarks, how they measure, and the catch the survey points out for each. Keep one thing in mind: these are different targets with different kinds of evidence, so a score in one tells you very little about another.

## Slide 5 — 

Target one, literature synthesis. Benchmarks include AutoSurvey, SurGE with 205 human-written surveys, and OpenScholar, where sixteen experts judged cited answers. My favourite is SurveyBench. Instead of asking 'is this survey good', it asks: can a reader answer quiz questions from it? A deep-research system scored 4.4 out of 5 on content quality, but under 2 out of 10 on topic-specific questions. Fluent, but not useful. Target two, ideation. The famous study by Si and colleagues had over a hundred researchers rate ideas blind. AI ideas were rated more novel. But nobody ran them. And in MLRC-Bench, novelty ratings had basically zero correlation with how well the methods performed. So 'judged novel' and 'actually works' are separate facts.

## Slide 6 — 

Target three is executable workflows, and it's the most mature area, because code can be run and checked. SciCode has 65 research problems split into 288 sub-problems. A strong model solved 26 percent of the sub-problems, but only 4.6 percent of the full problems — the pieces work, the whole doesn't. MLE-bench uses 75 Kaggle competitions with medal thresholds. RE-Bench compares agents against 61 human experts under a time limit, which is why the survey places it at a higher claim level. And BLADE checks something subtle: not whether the analysis runs, but whether the agent made the same analysis decisions an expert would. There, 96 percent of analyses ran, but coverage of expert decisions stayed below 13 percent.

## Slide 7 — 

Target four, scholarly writing. The recurring finding is that word-overlap metrics agree poorly with human judgments of factual accuracy. In an expert study called GREP, a current model passed a section-level faithfulness check only twenty percent of the time. Citation checkers also shift between datasets: one tool's precision fell from about .95 to .75 while recall barely moved. Target five, peer review. The survey separates three questions. Is the generated review good? Can the system find real errors — FLAWS has 713 paper-error pairs. And does AI feedback help human reviewers — there was a randomized study at ICLR with over twenty-two thousand reviews. One warning from the SPOT benchmark: experts found a genuine error that wasn't in the answer key, so a system finding it would be marked wrong.

## Slide 8 — 

Target six: systems that do the whole thing, like AI Scientist and DeepScientist, and the suites built to test them — AstaBench, MLR-Bench, ResearchGym, AIRS-Bench and FIRE-Bench. This is where the gap between report and reality is clearest. In AstaBench's end-to-end track, 16 percent of rubric items looked satisfied in the written report but were contradicted by the code and artifacts. In MLR-Bench, eight out of ten coding-agent runs contained placeholder or synthetic results that were never verified. In ResearchGym, the agent beat the strongest provided baseline in one of fifteen runs. And DeepScientist reports more than twenty thousand GPU hours. So the starting resources, the hand-offs and the compute all differ between systems — which makes direct comparison very hard.

## Slide 9 — 

The second idea I found really useful is this ladder. It describes how strong a claim an evaluation can support. Level one: the output looks like research — style and form. Level two: it passes defined checks under specified inputs. Level three: the process holds up — someone inspected how the result was produced, not only the result. Level four: it's calibrated against people — it matches experts or measurably helps users. Level five: it's a scientific contribution. When the authors place benchmarks on this ladder, most sit at level two. A few reach level three, like BLADE, AstaBench end-to-end and MLR-Bench. RE-Bench and Scideator reach level four. Nothing reaches level five. The authors are clear that this is a reading aid, not a validated scale — but it's a great question to ask of any headline.

## Slide 10 — 

Now the three cross-cutting lessons. Lesson one: output checks and process checks tell you different things. This chart shows four systems, each under two checks. Light bars are the easy check; orange bars are the one that matters. ScienceAgentBench: ninety-two percent of code runs, thirty-two percent solves the task. Curie, an experimentation agent: about ninety-eight percent of design checks pass, thirty-six percent of conclusions are right. BLADE: ninety-six percent of analyses run, under thirteen percent of expert decisions are covered. SurveyBench: eighty-eight percent on content quality, twenty percent on answering questions. The survey's advice is not to pick one. Output checks, process checks and human studies each catch something the others miss — use them together, and report them separately instead of blending them into one number.

## Slide 11 — 

Lesson two is about the judge. LLM judges are used everywhere in these benchmarks, and they have known habits: they can favour longer answers, answers in a particular position, and possibly their own outputs. But the survey makes a sharper point: validation doesn't transfer. If experts confirmed that your judge ranks structure well, that says nothing about whether it can verify citations. In SurGE, for example, expert rankings calibrate structure and content, but not the citation judgments. And when a claim-verification system was tried on real peer-review claims, its best four-class accuracy was about .29. There's also a level effect: one study showed that agreement with experts at the system level can hide much weaker agreement on individual items. So always ask: this judge was validated — for what, exactly, and on how many examples?

## Slide 12 — 

Lesson three: the budget and the selection rule are part of the result. On MLE-bench, the same model wins a medal in about seventeen percent of single attempts, and thirty-four percent if you allow eight attempts and keep the best. Neither number is wrong — they answer different questions. A paper that reports one without saying which hasn't told you much. The same applies to time limits, hardware and whether the agent was given a starting solution. RE-Bench's human result at thirty-two hours, for instance, comes from selecting among four independent attempts. And SciCode's full-problem score nearly triples, from 4.6 to 12.3 percent, when the model is given background information. So when you compare two systems, check that the attempts, compute and help were actually matched.

## Slide 13 — 

So what do the authors recommend? In the appendix they give reporting recommendations for twelve specific settings. I've condensed them into a five-line label that I'd like to see on every automated-research result. One, the claim: what is the task and what are you claiming it shows. Two, the inputs: what the system was given, including data versions and retrieval cut-off dates. Three, the evaluator: who or what judged, with which rubric, and how it was calibrated. Four, the sample: how many items and runs, and what the denominator is — including outputs that failed to parse. Five, the budget: time, compute, retries, and how the reported run was chosen. And finally, publish the artifacts — the code, logs and outputs — so someone else can check the report against what actually ran.

## Slide 14 — 

The rubric asks to connect more than one survey, so here are two that frame this one. First, the 'Survey on Evaluation of LLM-based Agents' by Yehudai and colleagues, published in ACL Findings. It maps agent evaluation in general: core capabilities like planning and tool use, application benchmarks for web and software agents, generalist agents, and developer tooling. Automated research is one demanding application inside that map — the Macau survey is the deep dive. Second, 'Log Analysis for LLM-Based Agents', from October 2026, which reviews ninety studies across three stages: agent logging, log structuring and log mining. Its key warning matches lesson one perfectly: having detailed logs does not mean you have sufficient evidence. Logs are raw material; someone still has to design the process check.

## Slide 15 — 

Now my own take. First, this matched my experience. In this course I built a small autoresearch harness, where an agent proposes machine-learning experiments and a referee decides which ones count. Before reading this survey, I already needed the controls it describes: labels the agent can't see, a fixed experiment budget, and a test set that's opened only once. In another project, one self-improvement method picked a rule that scored well on training cases and then crashed on unseen ones — an output-only check would have called that a success. Second, the claim ladder is what I'll reuse: 'which level is this claim?' takes thirty seconds to ask. Third, what's missing: the authors compare what papers report, they didn't re-run anything, and I'd like cost to get more attention. Twenty thousand GPU hours for one result changes what 'it works' means.

## Slide 16 — 

To wrap up: three questions to ask whenever you see a claim about an AI scientist. One: what was checked — the output, the process, or the effect on people? Two: who judged, and what was that judge validated for? Three: how many attempts, how much compute, and how was the reported run chosen? The honest summary of where the field is today: most results show correctness on defined checks, under a stated budget, on AI and machine-learning tasks. That is real progress — but it isn't yet evidence of doing science, and the tests that could tell the difference mostly haven't been built. The references and all my materials — the article, slides and figures — are in my GitHub repository. Thank you for watching.
