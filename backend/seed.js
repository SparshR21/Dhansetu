const mongoose = require("mongoose");
const Scheme = require("./models/scheme"); // Import your model
const dotenv = require("dotenv");

dotenv.config();

const Schemes = [
    // Post Office Schemes
    { name: "Post Office Monthly Income Scheme (POMIS)", category: "Post Office Schemes", description: "A government-backed savings scheme offering monthly interest payouts.", duration: "5 years", interestRate: "7.4% p.a.", eligibility: "Indian residents", link: "https://www.indiapost.gov.in" },
    { name: "Senior Citizen Savings Scheme (SCSS)", category: "Post Office Schemes", description: "A high-return savings scheme for senior citizens with quarterly interest payout.", duration: "5 years (extendable by 3 years)", interestRate: "8.2% p.a.", eligibility: "Indian residents aged 60+ (or 55+ with retirement benefits)", link: "https://www.indiapost.gov.in" },
    { name: "Public Provident Fund (PPF)", category: "Post Office Schemes", description: "A long-term investment option with tax-free interest and maturity amount.", duration: "15 years (extendable in 5-year blocks)", interestRate: "7.1% p.a.", eligibility: "Indian residents", link: "https://www.indiapost.gov.in" },
    { name: "National Savings Certificate (NSC)", category: "Post Office Schemes", description: "A fixed-income investment with tax benefits under Section 80C.", duration: "5 years", interestRate: "7.7% p.a.", eligibility: "Indian residents", link: "https://www.indiapost.gov.in" },
    { name: "Kisan Vikas Patra (KVP)", category: "Post Office Schemes", description: "A savings certificate scheme that doubles the investment in a fixed period.", duration: "115 months", interestRate: "7.5% p.a.", eligibility: "Indian residents", link: "https://www.indiapost.gov.in" },
    { name: "Sukanya Samriddhi Yojana (SSY)", category: "Post Office Schemes", description: "A savings scheme for girl children with tax benefits and high interest.", duration: "21 years (partial withdrawal after 18 years)", interestRate: "8.0% p.a.", eligibility: "Parents/guardians of a girl child below 10 years", link: "https://www.indiapost.gov.in" },
    
    // Tax-saving Schemes
    { name: "Equity-Linked Savings Scheme (ELSS)", category: "Tax-Saving Schemes", description: "A mutual fund scheme with tax benefits under Section 80C and market-linked returns.", duration: "3 years (lock-in period)", interestRate: "Varies (market-dependent, ~12-15% historically)", eligibility: "Indian residents", link: "https://www.amfiindia.com" },
    { name: "National Pension System (NPS)", category: "Tax-Saving Schemes", description: "A retirement savings scheme with tax benefits under Sections 80C and 80CCD.", duration: "Till retirement (partial withdrawal allowed after 10 years)", interestRate: "8-10% p.a. (market-linked)", eligibility: "Indian citizens aged 18-70", link: "https://www.npscra.nsdl.co.in" },
    { name: "Tax-Saver Fixed Deposit (FD)", category: "Tax-Saving Schemes", description: "A fixed deposit with tax benefits under Section 80C but with a lock-in period.", duration: "5 years", interestRate: "6.5-7.5% p.a.", eligibility: "Indian residents", link: "https://www.rbi.org.in" },
    { name: "Voluntary Provident Fund (VPF)", category: "Tax-Saving Schemes", description: "An extension of EPF with tax-free returns and additional savings for salaried employees.", duration: "Till retirement or withdrawal", interestRate: "8.1% p.a.", eligibility: "Salaried employees under EPF", link: "https://www.epfindia.gov.in" },
    { name: "Unit Linked Insurance Plan (ULIP)", category: "Tax-Saving Schemes", description: "A combination of insurance and investment with tax benefits.", duration: "5+ years", interestRate: "Market-linked", eligibility: "Indian residents", link: "https://www.irdai.gov.in" },
    { name: "Employees' Provident Fund (EPF)", category: "Tax-Saving Schemes", description: "A compulsory retirement savings scheme with employer contribution.", duration: "Till retirement", interestRate: "8.15% p.a.", eligibility: "Salaried employees", link: "https://www.epfindia.gov.in" },
    
    // Government Bonds
    { name: "Sovereign Gold Bond (SGB)", category: "Government Bonds", description: "Gold-backed bond issued by the government with tax benefits.", duration: "8 years (early redemption after 5 years)", interestRate: "2.5% p.a.", eligibility: "Indian residents", link: "https://rbi.org.in" },
    { name: "Government Securities (G-Secs)", category: "Government Bonds", description: "Bonds issued by the RBI for long-term investors.", duration: "5-40 years", interestRate: "6-7% p.a.", eligibility: "Indian residents", link: "https://rbi.org.in" },
    { name: "RBI Floating Rate Savings Bonds", category: "Government Bonds", description: "Bonds with interest rates that reset every six months.", duration: "7 years", interestRate: "Linked to NSC rates", eligibility: "Indian residents", link: "https://rbi.org.in" },
    { name: "Treasury Bills (T-Bills)", category: "Government Bonds", description: "Short-term government securities with zero risk.", duration: "91, 182, or 364 days", interestRate: "Market-determined", eligibility: "Indian residents", link: "https://rbi.org.in" },
    { name: "State Development Loans (SDLs)", category: "Government Bonds", description: "Bonds issued by state governments to fund projects.", duration: "10+ years", interestRate: "6.5-7.5% p.a.", eligibility: "Indian residents", link: "https://rbi.org.in" },
    { name: "Inflation-Indexed Bonds (IIBs)", category: "Government Bonds", description: "Government bonds that protect against inflation.", duration: "10 years", interestRate: "Linked to inflation", eligibility: "Indian residents", link: "https://rbi.org.in" },
    
    // Low-Risk Investments
    { name: "Public Provident Fund (PPF)", category: "Low-Risk Investments", description: "A risk-free, tax-free investment backed by the government.", duration: "15 years", interestRate: "7.1% p.a.", eligibility: "Indian residents", link: "https://www.indiapost.gov.in" },
    { name: "Post Office Recurring Deposit (RD)", category: "Low-Risk Investments", description: "A monthly deposit scheme with fixed returns.", duration: "5 years", interestRate: "6.9% p.a.", eligibility: "Indian residents", link: "https://www.indiapost.gov.in" },
    { name: "Debt Mutual Funds", category: "Low-Risk Investments", description: "Mutual funds investing in government and corporate bonds.", duration: "Varies", interestRate: "5-8% p.a.", eligibility: "Indian residents", link: "https://www.amfiindia.com" },
    { name: "Gold ETF", category: "Low-Risk Investments", description: "Exchange-traded funds that invest in gold.", duration: "No fixed tenure", interestRate: "Market-linked", eligibility: "Indian residents", link: "https://www.nseindia.com" },
    { name: "Fixed Deposits (FDs)", category: "Low-Risk Investments", description: "Guaranteed returns with various tenure options.", duration: "7 days to 10 years", interestRate: "3-7.5% p.a.", eligibility: "Indian residents", link: "https://www.rbi.org.in" },

     // Mutual Funds
    { name: "Large Cap Mutual Fund", category: "Mutual Funds", description: "A mutual fund that primarily invests in large-cap companies for stable returns.", duration: "No fixed duration", interestRate: "10-15% p.a. (market-linked)", eligibility: "Indian residents", link: "https://www.amfiindia.com" },
    { name: "Mid Cap Mutual Fund", category: "Mutual Funds", description: "A mutual fund that invests in mid-sized companies with growth potential.", duration: "No fixed duration", interestRate: "12-18% p.a. (market-linked)", eligibility: "Indian residents", link: "https://www.amfiindia.com" },
    { name: "Small Cap Mutual Fund", category: "Mutual Funds", description: "A mutual fund that invests in small-cap companies with high risk and high reward potential.", duration: "No fixed duration", interestRate: "15-20% p.a. (market-linked)", eligibility: "Indian residents", link: "https://www.amfiindia.com" },
    { name: "Debt Mutual Fund", category: "Mutual Funds", description: "A low-risk mutual fund investing in government and corporate bonds.", duration: "No fixed duration", interestRate: "6-8% p.a. (market-linked)", eligibility: "Indian residents", link: "https://www.amfiindia.com" },
    { name: "Balanced Hybrid Mutual Fund", category: "Mutual Funds", description: "A mix of equity and debt investments for balanced risk and returns.", duration: "No fixed duration", interestRate: "8-12% p.a. (market-linked)", eligibility: "Indian residents", link: "https://www.amfiindia.com" },
    { name: "Index Fund", category: "Mutual Funds", description: "A passive investment tracking a market index such as Nifty 50 or Sensex.", duration: "No fixed duration", interestRate: "10-14% p.a. (market-linked)", eligibility: "Indian residents", link: "https://www.amfiindia.com" },

    // Fixed Deposits (FDs)
    { name: "Bank Fixed Deposit", category: "FDs", description: "A traditional savings instrument with fixed returns and multiple tenure options.", duration: "7 days to 10 years", interestRate: "3-7.5% p.a.", eligibility: "Indian residents", link: "https://www.rbi.org.in" },
    { name: "Tax Saver FD", category: "FDs", description: "A tax-saving fixed deposit with a 5-year lock-in period.", duration: "5 years", interestRate: "6.5-7.5% p.a.", eligibility: "Indian residents", link: "https://www.rbi.org.in" },
    { name: "Senior Citizens FD", category: "FDs", description: "A fixed deposit offering higher interest rates for senior citizens.", duration: "1 to 10 years", interestRate: "7.5-8.5% p.a.", eligibility: "Indian residents aged 60+", link: "https://www.rbi.org.in" },
    { name: "Corporate Fixed Deposit", category: "FDs", description: "A high-interest fixed deposit offered by companies instead of banks.", duration: "1 to 10 years", interestRate: "8-9.5% p.a.", eligibility: "Indian residents", link: "https://www.bajajfinserv.in" },
    { name: "Recurring Deposit (RD)", category: "FDs", description: "A systematic saving option with monthly deposits and fixed interest.", duration: "6 months to 10 years", interestRate: "6-7.5% p.a.", eligibility: "Indian residents", link: "https://www.rbi.org.in" },

    // Government Schemes
    { name: "Pradhan Mantri Jan Dhan Yojana (PMJDY)", category: "Government Schemes", description: "A financial inclusion program providing zero-balance accounts with insurance and overdraft benefits.", duration: "No fixed duration", interestRate: "Based on savings account rate", eligibility: "Indian residents", link: "https://pmjdy.gov.in" },
    { name: "Atal Pension Yojana (APY)", category: "Government Schemes", description: "A pension scheme targeted at unorganized sector workers with guaranteed monthly pension.", duration: "Till retirement", interestRate: "Varies based on contribution", eligibility: "Indian citizens aged 18-40", link: "https://www.npscra.nsdl.co.in" },
    { name: "Pradhan Mantri Vaya Vandana Yojana (PMVVY)", category: "Government Schemes", description: "A pension scheme for senior citizens with assured returns.", duration: "10 years", interestRate: "7.4% p.a.", eligibility: "Indian residents aged 60+", link: "https://licindia.in" },
    { name: "Pradhan Mantri Awas Yojana (PMAY)", category: "Government Schemes", description: "A housing scheme providing financial assistance for affordable housing.", duration: "Varies based on eligibility", interestRate: "Subsidized interest rates", eligibility: "Indian residents meeting income criteria", link: "https://pmaymis.gov.in" },
    { name: "Sovereign Gold Bonds (SGBs)", category: "Government Schemes", description: "Government-issued bonds that allow investment in gold with annual interest payouts.", duration: "8 years (exit after 5 years allowed)", interestRate: "2.5% p.a. (plus gold price appreciation)", eligibility: "Indian residents", link: "https://www.rbi.org.in" },
    { name: "Mahila Samman Savings Certificate (MSSC)", category: "Government Schemes", description: "A government-backed savings scheme for women offering high returns.", duration: "2 years", interestRate: "7.5% p.a.", eligibility: "Indian women and girls", link: "https://www.indiapost.gov.in"}
  ];

  const seedDB = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  
      console.log("Connected to MongoDB ✅");
  
      await Scheme.deleteMany(); // Clear existing data
      console.log("Existing data deleted 🗑️");
  
      await Scheme.insertMany(Schemes); // Insert new data
      console.log("Database seeded successfully 🚀");
  
      mongoose.connection.close(); // Close the connection
      console.log("Connection closed 🔌");
    } catch (error) {
      console.error("Error seeding database ❌", error);
      mongoose.connection.close();
    }
  };
  
  // Run the function
  seedDB();