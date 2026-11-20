"""Draws the article's figures. All diagrams are my own; numbers are those reported in the survey (arXiv 2610.11877)."""
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch

INK, MUTED, TEAL, ORANGE, PALE, GRID = "#1B2A33", "#5B6B73", "#0F4C5C", "#E36414", "#EEF4F4", "#D9E2E4"
plt.rcParams.update({"font.family": "DejaVu Sans", "font.size": 11, "text.color": INK, "axes.edgecolor": GRID, "axes.labelcolor": MUTED, "xtick.color": MUTED, "ytick.color": MUTED})


def box(ax, x, y, w, h, text, fc=PALE, ec=TEAL, color=INK, size=10.5, weight="normal"):
    ax.add_patch(FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.02,rounding_size=0.08", fc=fc, ec=ec, lw=1.4))
    ax.text(x + w / 2, y + h / 2, text, ha="center", va="center", fontsize=size, color=color, weight=weight, linespacing=1.35)


def save(fig, name):
    fig.savefig(f"figures/{name}.png", dpi=170, bbox_inches="tight", facecolor="white")
    plt.close(fig)


# 1 — the six evaluation targets
fig, ax = plt.subplots(figsize=(11, 4.6)); ax.set_xlim(0, 11); ax.set_ylim(0, 4.6); ax.axis("off")
stages = [("1  Literature\nsynthesis", "surveys, comparison\ntables, cited answers"), ("2  Research\nideation", "novelty, feasibility,\nproposal feedback"),
          ("3  Executable\nworkflows", "scientific code, data\nanalysis, ML experiments"), ("4  Scholarly\nwriting", "sections, citations,\nposters, figures"), ("5  Peer\nreview", "review quality, error\ndetection, feedback use")]
for i, (t, sub) in enumerate(stages):
    x = 0.2 + i * 2.15
    box(ax, x, 2.35, 1.9, 0.95, t, fc=TEAL, color="white", weight="bold")
    ax.text(x + 0.95, 1.85, sub, ha="center", va="center", fontsize=9, color=MUTED, linespacing=1.35)
    if i < 4:
        ax.annotate("", xy=(x + 2.13, 2.82), xytext=(x + 1.92, 2.82), arrowprops=dict(arrowstyle="-|>", color=MUTED, lw=1.4))
box(ax, 0.2, 0.35, 10.5, 0.8, "6  End-to-end research systems — the whole chain connected, with hand-offs between stages", fc="#FCE9DC", ec=ORANGE, weight="bold")
ax.text(0.2, 4.2, "What gets evaluated: six targets along the research pipeline", fontsize=14, weight="bold")
ax.text(0.2, 3.75, "The survey compares, for each target: how tasks are built · what evidence is used · who or what judges · how scores are computed", fontsize=10, color=MUTED)
save(fig, "fig1_six_targets")

# 2 — claim-strength ladder
fig, ax = plt.subplots(figsize=(11, 5.4)); ax.set_xlim(0, 11); ax.set_ylim(0, 5.6); ax.axis("off")
levels = [("L1", "Surface plausibility", "It looks like research", "", "#DCE9EA"), ("L2", "Task correctness under\nspecified evidence", "It passes defined checks", "most benchmarks sit here:\nSurveyBench · AI Idea Bench · MLE-bench · SciCode", "#B9D3D6"),
          ("L3", "Process-grounded\ncompetence", "The process holds up when inspected", "BLADE · AstaBench E2E · MLR-Bench", "#7FAEB4"),
          ("L4", "Human- or utility-\ncalibrated performance", "It matches experts or helps real users", "RE-Bench · Scideator", "#3F7F8A"), ("L5", "Scientific contribution", "It advances a field", "no evaluation reaches this yet", TEAL)]
for i, (tag, name, plain, who, col) in enumerate(levels):
    y, x = 0.25 + i * 0.98, 0.2 + i * 0.55
    dark = i >= 3
    ax.add_patch(FancyBboxPatch((x, y), 4.3, 0.8, boxstyle="round,pad=0.02,rounding_size=0.08", fc=col, ec="white", lw=1.5))
    ax.text(x + 0.2, y + 0.4, tag, fontsize=15, weight="bold", va="center", color="white" if dark else INK)
    ax.text(x + 0.95, y + 0.4, name, fontsize=10.5, va="center", weight="bold", color="white" if dark else INK, linespacing=1.25)
    ax.text(x + 4.5, y + 0.55, plain, fontsize=10.5, va="center", color=INK)
    ax.text(x + 4.5, y + 0.2, who, fontsize=9, va="center", color=ORANGE if i == 4 else MUTED, weight="bold" if i == 4 else "normal", linespacing=1.3)
ax.text(0.2, 5.3, "How strong a claim can an evaluation support? The survey's five levels", fontsize=14, weight="bold")
save(fig, "fig2_claim_ladder")

# 3 — output vs process
fig, ax = plt.subplots(figsize=(10.5, 4.8))
labels = ["ScienceAgentBench\nruns without error → task solved", "Curie\ndesign checks → correct conclusions", "BLADE (GPT-4o)\nrunnable analysis → expert decisions covered", "SurveyBench (DeepResearch)\ncontent score → quiz answerable from survey"]
easy, hard = [92.2, 97.9, 96, 88.4], [32.4, 36.1, 13, 19.7]
ys = range(len(labels))
ax.barh([y - 0.2 for y in ys], easy, height=0.36, color="#9FC3C8", label="the easy check")
ax.barh([y + 0.2 for y in ys], hard, height=0.36, color=ORANGE, label="the check that matters")
for y, a, b in zip(ys, easy, hard):
    ax.text(a + 1, y - 0.2, f"{a:g}%", va="center", fontsize=10); ax.text(b + 1, y + 0.2, ("<" if b == 13 else "") + f"{b:g}%", va="center", fontsize=10, weight="bold")
ax.set_yticks(list(ys)); ax.set_yticklabels(labels, fontsize=9.5, color=INK); ax.invert_yaxis(); ax.set_xlim(0, 112); ax.set_xlabel("% of maximum")
ax.spines[["top", "right", "left"]].set_visible(False); ax.grid(axis="x", color=GRID, lw=0.7); ax.set_axisbelow(True); ax.tick_params(length=0)
ax.legend(frameon=False, loc="lower left", bbox_to_anchor=(0, 1.0), ncol=2, fontsize=10)
ax.set_title("Looking right is not being right: the same systems under two checks", loc="left", fontsize=13.5, weight="bold", pad=34)
fig.text(0.01, -0.03, "Numbers as reported in the survey. SurveyBench scores rescaled to % (4.42/5 and 1.97/10). BLADE coverage is 'below 13%'.", fontsize=8.5, color=MUTED)
save(fig, "fig3_output_vs_process")

# 4 — attempts and help change the number
fig, axes = plt.subplots(1, 3, figsize=(11, 3.9))
panels = [("MLE-bench (o1-preview)\nmedal rate", ["one attempt", "best of 8"], [16.9, 34.1]), ("ScienceAgentBench\nbest of 3, self-debugging", ["code runs", "task solved"], [92.2, 32.4]), ("SciCode (main problems)\nClaude 3.5 Sonnet", ["no background", "background given"], [4.6, 12.3])]
for ax, (title, names, vals) in zip(axes, panels):
    ax.bar(names, vals, color=["#9FC3C8", ORANGE], width=0.55)
    for i, v in enumerate(vals):
        ax.text(i, v + max(vals) * 0.03, f"{v}%", ha="center", fontsize=11, weight="bold")
    ax.set_title(title, fontsize=10.5, loc="left", color=INK); ax.set_ylim(0, max(vals) * 1.25); ax.set_yticks([])
    ax.spines[["top", "right", "left"]].set_visible(False); ax.tick_params(length=0, labelsize=9.5)
fig.suptitle("Same model, different headline: how attempts, the success rule and supplied help move the score", x=0.01, ha="left", fontsize=13, weight="bold")
fig.tight_layout(rect=(0, 0, 1, 0.92))
save(fig, "fig4_protocol_changes_score")

# 5 — reporting checklist
fig, ax = plt.subplots(figsize=(11, 4.2)); ax.set_xlim(0, 11); ax.set_ylim(0, 4.2); ax.axis("off")
items = [("Claim", "What is the task, and what\nare you claiming it shows?"), ("Inputs", "What was the system given?\nData version, cut-off date"), ("Evaluator", "Who or what judged, with\nwhat rubric and calibration?"),
         ("Sample", "How many items and runs?\nWhat is the denominator?"), ("Budget", "Time, compute, retries, and\nhow the reported run was chosen")]
for i, (h, t) in enumerate(items):
    x = 0.2 + i * 2.15
    box(ax, x, 0.9, 1.95, 1.9, "", fc=PALE)
    ax.add_patch(plt.Circle((x + 0.45, 2.35), 0.24, color=TEAL)); ax.text(x + 0.45, 2.35, str(i + 1), color="white", ha="center", va="center", weight="bold", fontsize=11)
    ax.text(x + 0.8, 2.35, h, fontsize=12, weight="bold", va="center"); ax.text(x + 0.2, 1.55, t, fontsize=9.3, va="center", color=MUTED, linespacing=1.4)
ax.text(0.2, 3.75, "A five-line label every automated-research result should carry", fontsize=14, weight="bold")
ax.text(0.2, 3.3, "My condensed version of the survey's reporting recommendations (its Table 2 gives 12 setting-specific versions)", fontsize=10, color=MUTED)
ax.text(0.2, 0.35, "Plus: publish the artifacts — code, logs, outputs — so someone else can check the report against what actually ran.", fontsize=10, color=INK)
save(fig, "fig5_reporting_label")
print("figures done")
