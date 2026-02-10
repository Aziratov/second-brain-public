---
title: Automated Investing Architecture Research
created: 2026-02-08
updated: 2026-02-08
tags: [investing, automation, trading, APIs, research]
summary: Feasibility report and phased roadmap for AI-driven investment automation
priority: medium
---

# Automated Investing Architecture Research

## 1. Regulatory Requirements

### SEC and FINRA Rules for Personal Algorithmic Trading

There is no law preventing an individual from writing code that trades on their behalf. Retail investors can legally automate trades through any broker that offers API access. However, several regulations apply:

**Pattern Day Trader (PDT) Rule — Major Update in Progress**

The PDT rule historically required $25,000 minimum equity in a margin account if you make 4+ day trades in 5 business days. In September 2025, FINRA's Board approved a major overhaul: replacing the flat $25K threshold with a risk-sensitive intraday margin requirement (essentially 25% of outstanding position value). This rule change was filed with the SEC in January 2026 and is expected to take effect in mid-2026.

Practical implication: If you are working with less than $25K and want to day-trade, either wait for the new rule or use a cash account (no PDT restriction, but T+1 settlement limits how often you can trade).

**SEC 2026 Examination Priorities**

The SEC's 2026 exam priorities specifically call out "registrants' use of AI or other automated investment tools, trading algorithms and the risks associated with emerging technologies." This applies primarily to registered investment advisers and broker-dealers — not individual retail traders. But it signals that regulatory scrutiny of AI-driven trading is increasing.

**What You DO NOT Need**

- You do not need to register with the SEC to trade your own money algorithmically.
- You do not need a Series 7 or any license to trade your own account.
- You do not need to report your algorithm to anyone.

**What You DO Need**

- A brokerage account with API access (Alpaca, Interactive Brokers, etc.)
- Compliance with wash sale rules for tax purposes (selling at a loss and rebuying within 30 days)
- Awareness of tax implications: short-term capital gains (positions held < 1 year) are taxed as ordinary income
- If you trade others' money or charge for advice, you enter a completely different regulatory world. Do not do this without a lawyer.

**Prohibited Behavior (Whether Manual or Automated)**

- Spoofing: placing orders you intend to cancel to manipulate prices
- Layering: stacking fake orders at multiple levels
- Wash trading: buying and selling the same security to inflate volume
- Market manipulation of any kind

**Crypto Exception**

Crypto trading has different (and murkier) regulatory oversight. The SEC and CFTC are still fighting over jurisdiction. For simplicity, start with equities/ETFs where the rules are clear.

---

## 2. Market Data Sources & APIs

### Comparison Table

| Provider | Free Tier | Paid Plans | Real-Time? | Rate Limits (Free) | Best For |
|----------|-----------|------------|------------|--------------------|---------|
| **Alpaca** | Yes (IEX only) | $99/mo (Algo Trader Plus) | IEX real-time free; full SIP paid | 200 req/min | Best all-in-one: free trading + data |
| **Alpha Vantage** | 25 calls/day | From $49.99/mo | Delayed (free), real-time (paid) | 25 calls/day | Simple REST API for beginners |
| **yfinance** | Unlimited* | N/A (unofficial) | Delayed ~15 min | Soft limits, IP bans | Quick prototyping only |
| **Polygon.io** | 5 calls/min | From $199/mo | Yes (paid) | 5 calls/min | Best raw data quality |
| **IEX Cloud** | **SHUT DOWN** | N/A | N/A | N/A | Dead. Do not use. |
| **Tiingo** | 100 req/day | From $7/mo | IEX real-time | 100 req/day | Best budget option |

### Detailed Notes

**Alpaca (Recommended Starting Point)**

Alpaca is the clear winner for a personal AI trading project. Commission-free trading API with paper trading built in. Free IEX real-time data. Official Python SDK (alpaca-py). 99.99% uptime since January 2025 with 1.5ms order processing. Official MCP Server for Claude integration — you can literally tell Claude "buy 10 shares of AAPL" through the MCP protocol with 43 available trading functions. Paper trading lets you test everything with zero risk.

Limitations: Free data is IEX-only (covers ~3% of market volume). Full market data (SIP) requires $99/month subscription.

**Alpha Vantage**

Simple REST API, easy to get started. But the free tier (25 calls/day) is almost unusable for anything beyond casual lookups. Paid plans start at $49.99/month. Good for supplementary fundamental data (earnings, balance sheets) but not a primary data source.

**yfinance (Yahoo Finance unofficial)**

Free and easy to use. But: Yahoo frequently changes its backend, breaking the library overnight. Historical data now requires a premium Yahoo Finance subscription. IP blocking occurs with heavy usage. Intraday data limited to 7 days (1-min) or 60 days (sub-daily). Not affiliated with or endorsed by Yahoo. Use it for prototyping only. Never rely on it for production.

**Polygon.io**

Excellent data quality and WebSocket streaming. But expensive: free tier is barely functional (5 calls/min), and real plans start at $199/month. Best suited if you eventually scale up and need institutional-quality data.

**IEX Cloud**

Shut down on August 31, 2024. Thousands of applications went dark overnight. Mentioned here only because many old tutorials reference it. Do not use.

**Tiingo**

Hidden gem. 30+ years of historical stock data for 65,000+ US securities. IEX real-time feed via WebSocket. Crypto and forex data. 5 years of fundamental data on free tier. Paid plans start at just $7/month. Best value-for-money data source if you need more than Alpaca's free tier.

---

## 3. Backtesting Frameworks

### Comparison

| Framework | Language | Speed | Live Trading | Learning Curve | Community | Status |
|-----------|----------|-------|-------------|----------------|-----------|--------|
| **Backtrader** | Python | Medium | Yes (IB, Alpaca) | Moderate | Large, loyal | Maintained but slow updates |
| **Zipline-reloaded** | Python | Slow | Limited | Steep | Small (post-Quantopian) | Community fork, fragile |
| **VectorBT** | Python | Very Fast | Via integration | Steep | Growing | Active development |
| **QuantConnect (LEAN)** | Python/C# | Fast | Yes (many brokers) | Moderate-Steep | Large | Very active, commercial backing |

### Detailed Assessment

**Backtrader — Best for Getting Started**

Event-driven backtester with the simplest path from idea to execution. Has broker integrations for Interactive Brokers, OANDA, and Alpaca. Large community with examples for every strategy type. Can connect to live brokers. Downsides: development has slowed, and setting up live trading requires extra plumbing. Good for swing trading strategies and learning. Install: `pip install backtrader`.

**Zipline-reloaded — Skip It**

Originally built by Quantopian (now defunct). The community fork (zipline-reloaded) exists but has installation headaches, especially on modern Python versions (designed for 3.5-3.6). Slow event-driven execution. Unless you are specifically doing Quantopian-style factor research, there are better options.

**VectorBT — Best for Research and Optimization**

Blazing fast thanks to NumPy/Numba vectorization. Excellent for testing thousands of parameter combinations quickly. Great visualization tools. Downsides: steep learning curve, no native live trading (requires integration layer), and the API is more "data science" than "trading system." Best for systematic trading and portfolio-level strategies.

**QuantConnect (LEAN) — Most Complete Platform**

Open-source engine (LEAN) can run locally for free. Cloud platform offers free 8 hours/month of backtesting. Handles 15,000+ backtests daily. Can complete a 10-year equity backtest in 33 seconds. Supports Python and C#. Live trading with many brokers. Cloud plans: $20/month (Organization), $40/month (Professional). Additional compute at $0.50/hour beyond plan limits.

### Recommendation

Start with **Backtrader** for learning and simple strategies. Move to **VectorBT** for serious research and optimization. Consider **QuantConnect** if you want a fully integrated platform with cloud infrastructure.

---

## 4. Trading Strategies for AI

### Realistic Strategies (Ordered by Feasibility)

**1. Dollar-Cost Averaging Automation (Easiest, Lowest Risk)**

What it is: Automatically invest fixed amounts at regular intervals regardless of price. AI enhancement: Optimize timing within the day/week, adjust amounts based on market conditions (buy more during dips).

Realistic? Absolutely. This is the simplest automation and provably works over long horizons. Many robo-advisors do exactly this. You could build this in a weekend with Alpaca's API.

Expected edge over manual: Small but consistent. Removes emotional decision-making.

**2. Portfolio Rebalancing (Easy, Low Risk)**

What it is: Maintain target asset allocation (e.g., 60% stocks, 30% bonds, 10% crypto) by periodically selling winners and buying losers.

AI enhancement: Tax-loss harvesting (selling losers to offset gains), threshold-based rebalancing (only rebalance when drift exceeds X%), cross-asset correlation monitoring.

Realistic? Yes. Wealthfront and Betterment charge 0.25% annually for essentially this. You can build it for free.

Expected edge: Saves on advisory fees. Tax-loss harvesting alone can add 1-2% annually.

**3. Momentum/Trend Following (Moderate Difficulty)**

What it is: Buy assets that have been going up, sell those going down. Use moving averages, RSI, or other technical indicators.

AI enhancement: Multi-factor momentum scoring, adaptive lookback periods, regime detection (trending vs. choppy markets).

Realistic? Partially. Simple momentum strategies work over long timeframes (monthly rebalancing). Short-term momentum (day trading) is a much harder game where you are competing against firms with billion-dollar infrastructure.

Expected edge: Academic research supports long-term momentum premium (~3-7% annually above market). Short-term is a coin flip for retail.

**4. Sentiment Analysis (Moderate-High Difficulty)**

What it is: Analyze news, social media, earnings calls to gauge market sentiment and trade accordingly.

AI enhancement: FinBERT (financial BERT model) achieves ~97% accuracy on sentiment classification. LLMs can summarize and interpret complex financial news. Social media sentiment has shown ~87% predictive accuracy up to 6 days ahead in research settings.

Realistic? The research is promising but the reality is harder. By the time news sentiment is detectable, institutional algos have already moved the price. Most useful as a supplementary signal, not a primary strategy. Best applied to: earnings surprises, sector rotation, avoiding obvious disasters.

Expected edge: Marginal as standalone. Useful as a filter on top of other strategies.

**5. Mean Reversion (High Difficulty)**

What it is: Bet that prices return to historical averages. Buy oversold assets, sell overbought ones.

Realistic? Works in ranges, fails spectacularly in trends. Requires precise timing and tight risk management. Not recommended as a starting strategy.

### What NOT to Do

- **High-frequency trading**: You cannot compete with firms that have colocation servers and nanosecond execution.
- **Options selling for "passive income"**: Complex, high-risk, and the "income" is just compensation for tail risk.
- **Leverage**: Amplifies losses equally. A 2x leveraged strategy that drops 50% needs a 100% gain to recover.
- **Crypto arbitrage**: Opportunities exist for milliseconds. You are not fast enough.

---

## 5. Risk Management

### The Non-Negotiable Rules

These rules are more important than any strategy. A mediocre strategy with good risk management will outperform a great strategy with poor risk management.

**Position Sizing**

- Never risk more than 1-2% of total portfolio on a single trade.
- Formula: Position Size = (Account Risk %) / (Stop Loss %) x Account Value
- Example: $10,000 account, 1% risk ($100), 5% stop loss = max position of $2,000
- Research shows position sizing accounts for 91% of portfolio performance variability.

**Stop-Loss Strategies**

- Fixed percentage stop: Exit when a position drops X% (common: 5-10% for swing trades).
- Trailing stop: Moves up with the price, locks in gains. Example: 8% trailing stop on a stock that rises 20% protects 12% of gains.
- Volatility-based stop (ATR): Set stops based on Average True Range. More adaptive to market conditions. Typically 2x ATR below entry.
- Time-based stop: If a trade has not moved in your direction within N days, exit. Prevents capital from sitting idle.

**Portfolio-Level Controls**

- Maximum drawdown limit: If total portfolio drops more than 15-20%, stop all trading and reassess. This is the circuit breaker.
- Correlation awareness: Holding 10 tech stocks is not diversification. Measure correlation between positions.
- Maximum sector exposure: No more than 25-30% in any single sector.
- Cash reserve: Always keep 10-20% in cash for opportunities and margin of safety.
- Daily loss limit: If down 3% in a day, stop all automated trading for the day.

**Algorithmic Safety Rails**

- Maximum daily loss limit: If the bot loses more than X% in a day, it shuts down automatically.
- Maximum position count: Limit total number of open positions.
- Order size sanity checks: Reject any order larger than X% of portfolio (prevents fat-finger errors in code).
- Kill switch: Physical ability to shut everything down immediately. Alpaca supports this via API.
- Paper trading minimum: Run any new strategy on paper for at least 30 days before going live.
- Notification system: Alert immediately when circuit breakers trigger, large trades execute, or errors occur.

---

## 6. Phased Roadmap

### Phase 1: Foundation (Weeks 1-4)

**Goal**: Set up infrastructure and learn the tools.

- [ ] Open Alpaca paper trading account
- [ ] Install and configure alpaca-py SDK
- [ ] Set up Alpaca MCP Server for Claude/Jarvis integration
- [ ] Build basic data pipeline: fetch daily prices, store in SQLite/Parquet
- [ ] Implement simple DCA bot (paper trading): buy $X of SPY every week
- [ ] Learn Backtrader basics with tutorial strategies
- [ ] Set up a local development environment with Jupyter notebooks

**Deliverable**: Working paper-trading bot that executes DCA on schedule.
**Cost**: $0

### Phase 2: Strategy Research (Weeks 5-12)

**Goal**: Develop and backtest real strategies.

- [ ] Backtest simple momentum strategy (12-month lookback, monthly rebalancing)
- [ ] Backtest mean reversion strategy for comparison
- [ ] Implement portfolio rebalancing logic (target allocation + threshold triggers)
- [ ] Add tax-loss harvesting rules
- [ ] Explore sentiment analysis: set up FinBERT, test on historical earnings data
- [ ] Build strategy performance dashboard (returns, Sharpe ratio, max drawdown)
- [ ] Run all strategies through paper trading for minimum 30 days

**Deliverable**: 2-3 backtested strategies with documented performance metrics, running on paper.
**Cost**: $0-10/mo (Tiingo for extra historical data)

### Phase 3: Risk Management & Hardening (Weeks 13-16)

**Goal**: Make the system production-ready.

- [ ] Implement all risk management rules from Section 5
- [ ] Build monitoring/alerting system (Telegram notifications for trades, daily P&L)
- [ ] Add circuit breakers: daily loss limit, max drawdown shutdown
- [ ] Stress test against historical crashes (2008, 2020 COVID, 2022 bear market)
- [ ] Code review all trading logic for bugs (a bug in a trading bot = lost money)
- [ ] Set up automated health checks (is the bot running? is the API connected?)
- [ ] Run hardened system on paper trading for another 30 days

**Deliverable**: Production-ready system with safety rails, fully tested on paper.
**Cost**: $0-10/mo

### Phase 4: Live Trading (Week 17+)

**Goal**: Deploy with real (small) money.

- [ ] Fund Alpaca live account with a small amount you can afford to lose entirely ($500-$2,000)
- [ ] Switch from paper to live API endpoint (one line of code in Alpaca)
- [ ] Start with DCA and rebalancing only (lowest risk strategies)
- [ ] Monitor daily for first 30 days. Compare live performance to paper performance
- [ ] If live matches paper within reasonable deviation: gradually add momentum strategy
- [ ] Scale position sizes slowly over months, not days
- [ ] Keep detailed records for tax purposes

**Deliverable**: Live automated trading with real money, with performance tracking.
**Cost**: $500-2,000 trading capital, $0 platform fees

### Ongoing

- Review and adjust strategies quarterly
- Monitor for regulatory changes (especially PDT rule update in 2026)
- Update data pipelines as APIs change
- Never stop paper-testing new strategies before going live

---

## 7. Feasibility Assessment

### The Honest Truth

**Is this worth pursuing?** Yes, with caveats.

**What IS realistic:**

- Automating DCA and portfolio rebalancing: 100% achievable and genuinely useful. This alone saves you advisory fees (0.25-0.50% annually) and removes emotional decision-making. Worth it even if you do nothing else.
- Tax-loss harvesting: Genuinely adds 1-2% annually. Real money.
- Basic momentum strategies with monthly rebalancing: Academic evidence supports this. Realistic 3-7% annual alpha over decades, with significant drawdown periods.
- AI as a research assistant: Using Claude/LLMs to analyze earnings calls, summarize financial news, screen stocks based on criteria. This is where AI adds the most value right now.
- Alpaca MCP + Jarvis integration: The tooling exists today. Natural language trade execution and portfolio queries through your existing assistant infrastructure. This is a genuine competitive advantage in convenience.
- Learning experience: Even if you never go live, building this teaches you Python, APIs, financial markets, data analysis, and systems design. That knowledge has real career value.

**What is NOT realistic:**

- Beating the market consistently with a home-built algorithm. Hedge funds with PhDs, petabytes of data, and billion-dollar infrastructure struggle to do this. Your edge is not in speed or data — it is in simplicity and discipline.
- Getting rich from algorithmic trading. The realistic outcome is matching or slightly outperforming index funds, with less emotional stress.
- Set-it-and-forget-it. Markets change. Strategies decay. Algorithms need maintenance. Plan to spend a few hours per month monitoring and adjusting.
- Short-term trading profits. Day trading is a negative-sum game for retail investors after accounting for taxes, slippage, and opportunity cost.
- Pure sentiment trading. By the time retail-accessible sentiment data is processed, institutional algos have already moved the price.

**The real value proposition:**

The best outcome is not "beating Wall Street." It is building an automated system that:
1. Invests consistently without you having to think about it (DCA)
2. Keeps your portfolio balanced (rebalancing)
3. Saves you money on taxes (harvesting)
4. Gives you data-driven confidence instead of gut-feeling anxiety
5. Teaches you how markets actually work
6. Integrates with Jarvis for natural language portfolio management

That alone is worth more than most people get from their financial adviser.

**Cost to get started:** $0 (Alpaca paper trading + free data tier). Cost to go live: $500-$2,000 in trading capital, with $0 in platform fees.

**Biggest risk:** Not market losses — it is overconfidence. The most dangerous moment is when your backtest shows 30% annual returns and you put real money on it. Backtests always look better than reality. Always.

### Bottom Line

Start with Phase 1. It costs nothing. Build the DCA bot. Run it on paper. If you enjoy the process, continue to Phase 2. The journey itself has value regardless of whether you ever trade real money.

The Alpaca MCP Server integration is particularly interesting — it means Jarvis can be directly involved in trade execution and monitoring through natural language, which fits perfectly into the existing architecture. This is not fantasy; the tooling exists and works today.

---

## Architecture for Jarvis Integration

```
Mo (Telegram) <-> Jarvis <-> Trading Module
                              |
                              +-- Alpaca API (trading + real-time data)
                              +-- Alpaca MCP Server (natural language trading)
                              +-- Tiingo API (historical data)
                              +-- Backtrader/VectorBT (backtesting)
                              +-- Risk Engine (position sizing, stop-loss, kill switch)
                              +-- Portfolio DB (SQLite — holdings, history, performance)
```

### Jarvis Commands (Future)
- "How's my portfolio?" — Current holdings, P&L, allocation
- "Buy $100 of VTI" — Execute trade via Alpaca
- "Backtest momentum strategy on SPY, 5 years" — Run backtest, report results
- "Rebalance my portfolio" — Calculate and execute rebalancing trades
- "What's my tax situation?" — Estimated capital gains/losses YTD

---

## Sources & References

- [FINRA Algorithmic Trading Rules](https://www.finra.org/rules-guidance/key-topics/algorithmic-trading)
- [SEC 2026 Examination Priorities](https://www.sec.gov/files/2026-exam-priorities.pdf)
- [FINRA PDT Rule Overhaul (September 2025)](https://www.finra.org/media-center/newsreleases/2025/september-board-of-governors-meeting-report)
- [PDT Rule Change Details — NerdWallet](https://www.nerdwallet.com/investing/news/pattern-day-trading-rule-change)
- [Federal Register: FINRA PDT Rule Filing (January 2026)](https://www.federalregister.gov/documents/2026/01/14/2026-00519/self-regulatory-organizations-financial-industry-regulatory-authority-inc-notice-of-filing-of-a)
- [Alpaca Trading API](https://alpaca.markets/)
- [Alpaca MCP Server for AI Trading](https://github.com/alpacahq/alpaca-mcp-server)
- [Alpaca Python SDK](https://alpaca.markets/sdks/python/)
- [Alpaca + Claude MCP Setup Guide](https://mcp.harishgarg.com/use/alpaca/mcp-server/with/claude-code)
- [Alpha Vantage API Guide 2026](https://alphalog.ai/blog/alphavantage-api-complete-guide)
- [Tiingo API Pricing](https://www.tiingo.com/about/pricing)
- [Polygon.io](https://polygon.io)
- [yfinance Reliability Issues](https://medium.com/@trading.dude/why-yfinance-keeps-getting-blocked-and-what-to-use-instead-92d84bb2cc01)
- [Backtesting Framework Comparison — AutoTradeLab](https://autotradelab.com/blog/backtrader-vs-nautilusttrader-vs-vectorbt-vs-zipline-reloaded)
- [VectorBT vs Zipline vs Backtrader](https://medium.com/@trading.dude/battle-tested-backtesters-comparing-vectorbt-zipline-and-backtrader-for-financial-strategy-dee33d33a9e0)
- [QuantConnect LEAN Engine](https://github.com/QuantConnect/Lean)
- [QuantConnect Platform Review](https://www.luxalgo.com/blog/quantconnect-review-best-platform-for-algo-trading-2/)
- [Risk Management for Algo Trading](https://www.luxalgo.com/blog/risk-management-strategies-for-algo-trading/)
- [Position Sizing Strategies](https://medium.com/@jpolec_72972/position-sizing-strategies-for-algo-traders-a-comprehensive-guide-c9a8fc2443c8)
- [Reducing Drawdown Techniques](https://tradetron.tech/blog/reducing-drawdown-7-risk-management-techniques-for-algo-traders)
- [Sentiment Analysis in Trading (Academic)](https://journals.sagepub.com/doi/10.1177/21582440251369559)
- [FinBERT Sentiment Analysis for S&P 500](https://arxiv.org/html/2507.09739v1)
- [Financial Data APIs 2025 Guide](https://www.ksred.com/the-complete-guide-to-financial-data-apis-building-your-own-stock-market-data-pipeline-in-2025/)
