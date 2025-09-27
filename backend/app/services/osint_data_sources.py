"""
AethonAI OSINT Data Sources Configuration
Production-Ready Public Data Intelligence Platform
"""

# Primary News APIs
NEWS_SOURCES = {
    "reuters": {
        "api": "https://api.reuters.com/",
        "rate_limit": "1000/hour",
        "data_types": ["breaking_news", "financial_news", "market_updates"]
    },
    "bloomberg": {
        "api": "https://api.bloomberg.com/",
        "rate_limit": "500/hour", 
        "data_types": ["market_data", "financial_news", "economic_indicators"]
    },
    "financial_times": {
        "api": "https://api.ft.com/",
        "rate_limit": "2000/day",
        "data_types": ["business_news", "market_analysis", "regulatory_updates"]
    },
    "bbc_news": {
        "api": "https://newsapi.org/bbc",
        "rate_limit": "1000/day",
        "data_types": ["general_news", "business_news", "technology_news"]
    },
    "guardian": {
        "api": "https://open-platform.theguardian.com/",
        "rate_limit": "5000/day",
        "data_types": ["news", "opinion", "business", "technology"]
    },
    "associated_press": {
        "api": "https://api.ap.org/",
        "rate_limit": "10000/day",
        "data_types": ["breaking_news", "business_news", "international_news"]
    }
}

# Regional & Specialized Sources
REGIONAL_NEWS = {
    "uk": {
        "sources": ["sky_news", "telegraph", "independent"],
        "focus": ["uk_politics", "brexit_impact", "uk_economy"]
    },
    "us": {
        "sources": ["nyt", "washington_post", "usa_today"],
        "focus": ["us_politics", "federal_regulations", "us_economy"]
    },
    "eu": {
        "sources": ["euronews", "politico_eu", "deutsche_welle"],
        "focus": ["eu_regulations", "eurozone_economy", "eu_politics"]
    },
    "asia": {
        "sources": ["nikkei", "scmp", "straits_times"],
        "focus": ["asian_markets", "trade_relations", "regional_economy"]
    }
}

# Social Media Intelligence
SOCIAL_PLATFORMS = {
    "twitter": {
        "api": "https://api.twitter.com/2/",
        "endpoints": ["tweets/search/recent", "users/by/username", "tweets/counts/recent"],
        "rate_limit": "300 requests/15min",
        "data_types": ["sentiment", "mentions", "trending", "network_analysis"]
    },
    "linkedin": {
        "api": "https://api.linkedin.com/v2/",
        "endpoints": ["people", "companies", "shares"],
        "focus": ["executive_moves", "company_updates", "industry_sentiment"]
    },
    "reddit": {
        "api": "https://reddit.com/api/v1/",
        "endpoints": ["search", "subreddit/posts", "comments"],
        "focus": ["market_sentiment", "product_reviews", "industry_discussions"]
    }
}

# UK Government Sources
UK_SOURCES = {
    "companies_house": {
        "api": "https://api.company-information.service.gov.uk/",
        "data": ["company_filings", "director_info", "financial_statements", "charges"],
        "update_frequency": "real_time"
    },
    "uk_government": {
        "api": "https://www.gov.uk/api/",
        "data": ["policy_updates", "regulatory_changes", "procurement", "consultations"]
    },
    "ons_data": {
        "api": "https://api.ons.gov.uk/",
        "data": ["economic_indicators", "industry_statistics", "employment_data"]
    },
    "fca_data": {
        "api": "https://api.fca.org.uk/",
        "data": ["financial_services", "regulatory_notices", "enforcement_actions"]
    }
}

# US Government Sources
US_SOURCES = {
    "sec_edgar": {
        "api": "https://data.sec.gov/api/",
        "data": ["10k_filings", "10q_filings", "8k_filings", "proxy_statements", "insider_trading"],
        "rate_limit": "10 requests/second"
    },
    "federal_register": {
        "api": "https://api.federalregister.gov/v1/",
        "data": ["proposed_rules", "final_rules", "notices", "presidential_documents"]
    },
    "uspto": {
        "api": "https://developer.uspto.gov/api-catalog/",
        "data": ["patents", "trademarks", "patent_applications", "assignments"]
    },
    "treasury": {
        "api": "https://api.fiscaldata.treasury.gov/",
        "data": ["economic_indicators", "debt_data", "spending", "revenue"]
    },
    "bls": {
        "api": "https://api.bls.gov/publicAPI/v2/",
        "data": ["employment", "inflation", "wages", "productivity"]
    }
}

# Financial Market APIs
FINANCIAL_SOURCES = {
    "alpha_vantage": {
        "api": "https://www.alphavantage.co/query",
        "data": ["stock_prices", "forex", "crypto", "commodities", "economic_indicators"],
        "rate_limit": "5 requests/minute (free)"
    },
    "quandl": {
        "api": "https://www.quandl.com/api/v3/",
        "data": ["economic_data", "financial_statements", "alternative_data"],
        "coverage": "400+ financial institutions"
    },
    "yahoo_finance": {
        "api": "https://query1.finance.yahoo.com/",
        "data": ["stock_data", "company_financials", "analyst_ratings", "insider_trades"]
    },
    "morningstar": {
        "api": "https://api.morningstar.com/",
        "data": ["fund_data", "stock_analysis", "portfolio_tools"]
    }
}

# Industry & Research Sources
RESEARCH_SOURCES = {
    "statista": {
        "api": "https://api.statista.com/",
        "data": ["market_research", "industry_reports", "consumer_surveys", "forecasts"]
    },
    "cbinsights": {
        "api": "https://api.cbinsights.com/",
        "data": ["startup_funding", "venture_capital", "market_intelligence", "tech_trends"]
    },
    "pitchbook": {
        "data": ["private_equity", "venture_capital", "ma_activity", "valuations"]
    },
    "factset": {
        "api": "https://api.factset.com/",
        "data": ["financial_data", "estimates", "fundamentals", "ownership"]
    }
}

# Combined data sources for easy access
ALL_DATA_SOURCES = {
    "news": NEWS_SOURCES,
    "regional_news": REGIONAL_NEWS,
    "social": SOCIAL_PLATFORMS,
    "uk_government": UK_SOURCES,
    "us_government": US_SOURCES,
    "financial": FINANCIAL_SOURCES,
    "research": RESEARCH_SOURCES
}

def get_source_count():
    """Get total count of available data sources"""
    total = 0
    for category, sources in ALL_DATA_SOURCES.items():
        if isinstance(sources, dict):
            total += len(sources)
        else:
            total += 1
    return total

def get_active_sources():
    """Get list of active data sources"""
    active_sources = []
    for category, sources in ALL_DATA_SOURCES.items():
        if isinstance(sources, dict):
            for source_name in sources.keys():
                active_sources.append(f"{category}.{source_name}")
        else:
            active_sources.append(category)
    return active_sources

