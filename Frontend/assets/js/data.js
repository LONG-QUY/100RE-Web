/**
 * 100RE LABORATORY - Centralized Academic & Research Dataset
 * Extracted from 100RE_Lab_Website_Rebuild_Spec_Antigravity.md
 */

window.LAB_DATA = {
  // 1. Research Areas Dataset (9 Areas)
  researchAreas: [
    {
      id: "solar",
      slug: "solar",
      title: "Solar Energy (PV)",
      team: "PV Team",
      leader: "Bui Quang Minh",
      icon: "fa-solar-panel",
      heroImage: "assets/images/banner_pv.jpg",
      summary: "Advanced modeling, irradiance forecasting, PV array reconfiguration, and rooftop SCADA optimization.",
      vision: "Developing highly effective, flexible, and adaptive PV systems moving toward 100% renewable energy integration.",
      topics: [
        "Photovoltaic systems mathematical modeling",
        "Solar irradiance & power output forecasting",
        "PV SCADA & real-time monitoring system",
        "PV array dynamic reconfiguration to mitigate partial shading",
        "Hosting capacity assessment for distribution networks"
      ],
      conducted: "Experimental PV SCADA setup at HUST D9 building, dynamic matrix switching system, and rooftop solar hosting capacity evaluation in Ha Tinh.",
      futureDirections: "Large-scale community solar sharing, multi-terminal hybrid inverter integration with BESS and EV charging stations."
    },
    {
      id: "wind",
      slug: "wind",
      title: "Wind Energy",
      team: "Wind Team",
      leader: "Nguyen Hoang Nam",
      icon: "fa-wind",
      heroImage: "assets/images/banner_wind.jpg",
      summary: "Wind turbine aerodynamics, Low Voltage Ride Through (LVRT), output smoothing, and hybrid wind-storage systems.",
      vision: "Maximizing wind energy harvest with superior fault ride-through and ultra-smooth grid injection.",
      topics: [
        "Wind turbine power curve forecasting and wake effect modeling",
        "Low Voltage Ride Through (LVRT) capability enhancement",
        "Output power smoothing using integrated hybrid BESS",
        "Grid-connected simulation under turbulent wind conditions"
      ],
      conducted: "Tokyo University of Science & NEDO small wind turbine PCS testing; MATLAB/Simulink wind farm grid integration models.",
      futureDirections: "Offshore floating wind turbine wake optimization and hybrid deep-sea wind-hydrogen platforms."
    },
    {
      id: "unit-commitment-demand-response",
      slug: "unit-commitment-demand-response",
      title: "Unit Commitment & Demand Response (UCDR)",
      team: "Unit Commitment & Demand Response Team",
      leader: "Nguyen Tuan Anh",
      icon: "fa-sliders",
      heroImage: "assets/images/banner_dr_uc.jpg",
      summary: "Mathematical optimization, generator scheduling, economic dispatch, dynamic pricing, and microgrid demand-side flexibility.",
      vision: "Achieving optimal multi-period generation scheduling and demand-side elasticity that minimizes cost while guaranteeing 100% reliability.",
      topics: [
        "Microgrid Unit Commitment with high renewable penetration",
        "Mixed-Integer Linear Programming (MILP) vs Genetic Algorithm (GA)",
        "Stochastic UC considering wind/PV probabilistic uncertainty",
        "Joint optimization of Unit Commitment with BESS and Demand Response",
        "Incentive-based and dynamic pricing Demand Response programs",
        "Consumer satisfaction modeling and social welfare maximization"
      ],
      conducted: "Stochastic UC algorithms incorporating dynamic demand response and energy storage constraints; HUST campus microgrid dispatch models.",
      futureDirections: "Quantum-inspired optimization algorithms, automated IoT-enabled demand response, and rolling-horizon dispatching for 100% renewable power systems."
    },
    {
      id: "smart-grid",
      slug: "smart-grid",
      title: "Smart Grid & Microgrid",
      team: "Smart Grid Team",
      leader: "Le Ngoc Dung",
      icon: "fa-tower-broadcast",
      heroImage: "assets/images/banner_smartgrid.jpg",
      summary: "Two-way communication, intelligent monitoring, microgrid management, and active distribution networks.",
      vision: "Building self-healing, transparent, secure, and economically optimized smart power grids.",
      topics: [
        "Intelligent monitoring, protection, and automatic control",
        "Cybersecurity and ICT integration in SCADA/EMS networks",
        "Virtual Power Plants (VPP) and decentralized energy trading",
        "Active distribution network voltage & frequency regulation"
      ],
      conducted: "GIZ Smart Grid Roadmap for Vietnam, SCADA/DCS assessment for National Load Dispatch Center (A0), Microgrid testbed.",
      futureDirections: "Zero-inertia grid control algorithms, digital twins of national power transmission networks."
    },
    {
      id: "electric-vehicle",
      slug: "electric-vehicle",
      title: "Electric Vehicle (EV)",
      team: "Electric Vehicle Team",
      leader: "Dao Quoc Khanh",
      icon: "fa-car-battery",
      heroImage: "assets/images/banner_ev.jpg",
      summary: "EV charging infrastructure, Vehicle-to-Grid (V2G) interaction, smart charging scheduling, and distribution impact.",
      vision: "Transforming the transportation sector into a dynamic, flexible grid-balancing asset through bidirectional charging.",
      topics: [
        "EV charging station impact on distribution voltage and power quality",
        "Smart charging scheduling algorithms to minimize peak demand",
        "Vehicle-to-Grid (V2G) and Vehicle-to-Home (V2H) bidirectional power flow",
        "Electricity market incentives and charging pricing mechanisms"
      ],
      conducted: "EV development implications and incentive policy framework for GreenID; charging load forecasting for Hanoi city.",
      futureDirections: "Autonomous coordinated V2G aggregators participating in national ancillary services."
    },
    {
      id: "hydrogen",
      slug: "hydrogen",
      title: "Green Hydrogen",
      team: "Hydrogen Team",
      leader: "Nguyen Hoang Anh",
      icon: "fa-atom",
      heroImage: "assets/images/banner_hydrogen.jpg",
      summary: "Renewable-powered water electrolysis, fuel cell systems, seasonal storage, and green hydrogen supply chains.",
      vision: "Decarbonizing heavy industry, maritime transport, and seasonal energy storage with 100% green hydrogen.",
      topics: [
        "Transition from fossil-based hydrogen to renewable-powered Green Hydrogen",
        "Water electrolyzers efficiency & MPPT coupling optimization",
        "Power-to-Gas and long-term seasonal energy storage",
        "Hydrogen applications in transport, DRI steel, ammonia, and chemical industries"
      ],
      conducted: "AIST Japan 20 kW solar water electrolyzer system; SEATUC2023 presentation; Washington DC policy roundtable paper.",
      futureDirections: "Offshore wind-to-hydrogen integrated clusters in Central Vietnam and fuel-cell micro-CHP systems."
    },
    {
      id: "bess",
      slug: "bess",
      title: "Battery Energy Storage (BESS)",
      team: "BESS Team",
      leader: "Nguyen Quang Anh",
      icon: "fa-battery-three-quarters",
      heroImage: "assets/images/banner_bess.jpg",
      summary: "Grid-scale battery systems, state of charge/health estimation, frequency regulation, and peak shaving.",
      vision: "Empowering high-penetration renewable grids with high-density, durable, and economically viable storage solutions.",
      topics: [
        "Grid-scale BESS for transmission and distribution networks",
        "Primary & secondary frequency regulation and voltage support",
        "Battery degradation modeling, thermal management & lifecycle optimization",
        "Ancillary services market modeling and renewable curtailment reduction"
      ],
      conducted: "National BESS Deployment in Vietnam Power System study for VIETSE; hybrid BESS + PV dynamic simulation models.",
      futureDirections: "Second-life EV battery repurposing for grid storage and sodium-ion battery grid-scale trials."
    },
    {
      id: "ai",
      slug: "ai",
      title: "Artificial Intelligence",
      team: "AI Team",
      leader: "Nguyen Trong Thanh",
      icon: "fa-brain",
      heroImage: "assets/images/banner_ai.jpg",
      summary: "Deep Learning, Neural Networks, and AI algorithms applied to renewable energy forecasting and system stability.",
      vision: "Pioneering intelligent data-driven intelligence for clean energy grids, predictive maintenance, and energy markets.",
      topics: [
        "Solar irradiance and wind speed/power forecasting",
        "Deep Learning architectures: ANN, RNN, LSTM, CNN-LSTM, SAM-LSTM, EDSACL",
        "PV fault detection and life-expectancy prediction",
        "Blockchain and AI for decentralized peer-to-peer energy trading",
        "Real-time grid stability assessment via neural networks"
      ],
      conducted: "Solar radiation forecasting software winning 2nd prize in MOET National Scientific Research Contest 2021; SVNCKH2022 3rd place.",
      futureDirections: "Edge-AI embedded micro-controllers for sub-second inverter protection and autonomous microgrid dispatching."
    }
  ],

  // 2. Timeline / Research Experiences (2005 - 2018)
  experiencesTimeline: [
    {
      year: "2017 – 2018",
      title: "AIST (National Institute of Advanced Industrial Science and Technology, Japan)",
      role: "Senior Researcher",
      desc: "Developed a 20 kW solar PV system integrated with water electrolyzer, MPPT tracking, Li-ion capacitor, and current smoothing control for green hydrogen production."
    },
    {
      year: "2015 – 2017",
      title: "Tokyo University of Science & NEDO",
      role: "Project Researcher",
      desc: "NEDO project on small wind turbine Power Conditioning Systems (PCS), comprehensive power quality measurements, Fault Ride Through (FRT), and anemometer data logging."
    },
    {
      year: "2012 – 2015",
      title: "Shibaura Institute of Technology, Japan",
      role: "Postdoctoral Research Fellow",
      desc: "Researched PV integrated Active Power Filter (APF), Adaptive Notch Filter algorithms, distributed generation optimization, and remote island frequency stabilization."
    },
    {
      year: "2009 – 2012",
      title: "Doctor of Philosophy (PhD) in Electrical Engineering",
      role: "Shibaura Institute of Technology",
      desc: "Doctoral dissertation on Islanding Detection methods, negative-sequence active injection, Adaptive Notch Filter, Solid-State Transfer Switch (SSTS), and droop control."
    },
    {
      year: "2011",
      title: "Waseda University – TEPCO Joint Research",
      role: "Research Collaborator",
      desc: "Developed equivalent induction motor models using MidFielder and PSCAD for Tokyo Electric Power Company (TEPCO) power grid stability analysis."
    },
    {
      year: "2008 – 2009",
      title: "Master of Science (M.S.) Thesis",
      role: "Shibaura Institute of Technology",
      desc: "Dynamic model simulation of Solid Oxide Fuel Cell (SOFC), internal methane reforming, heat exchanger balance, and feedback temperature control."
    },
    {
      year: "2007 – 2008",
      title: "Hanoi University of Science and Technology (HUST)",
      role: "Power System Researcher",
      desc: "Power system design, transient stability, power quality analysis, lightning protection, and digital relay protection coordination."
    },
    {
      year: "2006 – 2007",
      title: "Northern Region Load Dispatch Center (A1, EVN)",
      role: "Dispatcher Intern / Trainee",
      desc: "Dispatch operations training, load curve monitoring across major hydro/thermal power plants and 220kV/500kV substations in Northern Vietnam."
    },
    {
      year: "2006",
      title: "Demand Side Management (DSM) Project",
      role: "Project Engineer",
      desc: "Energy efficiency and DSM project at National Political Institute; technical, economic, and behavioral approaches to loss reduction."
    },
    {
      year: "2005 – 2006",
      title: "Bachelor of Science (B.S.) Thesis",
      role: "HUST Electrical Engineering",
      desc: "Cau Giay district distribution grid renovation: loss reduction, distribution line redesign, capacitor placement, and optimal power flow."
    }
  ],


  // 4. Projects Dataset
  projects: [
    {
      id: "proj-1",
      title: "Rooftop PV SCADA Monitoring, Fault Detection & Array Reconfiguration",
      org: "Hanoi University of Science and Technology (HUST)",
      period: "2021 – 2024",
      tags: ["Solar PV", "SCADA", "Hardware", "Optimization"],
      desc: "Built a complete hardware-software testbed on HUST D9 building comprising a 3.6 kW solar array, DAQ data logger, smart relays, and automated switching matrices to eliminate partial shading losses."
    },
    {
      id: "proj-2",
      title: "Behind-the-Meter Solar PV in Vietnam: Regulatory & Technical Framework",
      org: "GIZ (German Agency for International Cooperation) & EREA",
      period: "May 2021 – Dec 2021",
      tags: ["GIZ", "Policy", "Solar", "Self-Consumption"],
      desc: "Technical consultation for Electricity and Renewable Energy Authority (EREA) on incentive mechanisms, self-consumption guidelines, and grid impact mitigation for behind-the-meter solar systems."
    },
    {
      id: "proj-3",
      title: "Smart Grid Roadmap Development for Vietnam Power System",
      org: "GIZ & Ministry of Industry and Trade (MOIT)",
      period: "Dec 2020 – Mar 2022",
      tags: ["Smart Grid", "Roadmap", "Policy", "SCADA"],
      desc: "Comprehensive analysis of Vietnam's national grid infrastructure, interviews with dispatch centers, regulatory review, and technical roadmap for advanced automation, AMI, and VPP deployment."
    },
    {
      id: "proj-4",
      title: "Battery Energy Storage System (BESS) Deployment in Vietnam Power System",
      org: "VIETSE (Vietnam Initiative for Energy Transition)",
      period: "Jan 2021 – Oct 2021",
      tags: ["VIETSE", "BESS", "Stability", "Ancillary Services"],
      desc: "Landmark study assessing international BESS experiences, grid frequency stability simulation, investment cost-benefit analysis, and policy recommendations for curtailment reduction in Vietnam."
    },
    {
      id: "proj-5",
      title: "Viet Nam Climate Promise — Youth4Climate Learning & Energy Transition",
      org: "UNDP (United Nations Development Programme)",
      period: "2021 – 2023",
      tags: ["UNDP", "Youth4Climate", "Education", "Training"],
      desc: "Empowering youth leadership in sustainable energy: developed 5 multimedia educational modules, conducted training workshops for 70+ young engineers, and guided youth-led community clean energy projects."
    },
    {
      id: "proj-6",
      title: "SCADA / DCS / EMS Technical Assessment for Dispatching Centers",
      org: "National Load Dispatch Center (A0, EVN)",
      period: "Jan 2021 – Feb 2021",
      tags: ["EVN", "A0", "SCADA/EMS", "DCS"],
      desc: "Assessed control protocols (IEC 60870-5-104, IEC 61850), hardware architecture, and communication reliability for Vietnam regional and national dispatching systems."
    },
    {
      id: "proj-7",
      title: "Electric Vehicle (EV) Grid Impact & Incentive Policy Study",
      org: "GreenID (Green Innovation and Development Centre)",
      period: "Dec 2021 – Feb 2022",
      tags: ["GreenID", "EV", "Policy", "Charging"],
      desc: "Analyzed distribution grid loading and charging profiles, recommending policy mechanisms, time-of-use tariffs, and public charging standards for Vietnam."
    },
    {
      id: "proj-8",
      title: "Rooftop Solar Integration in Huong Khe Distribution Grid",
      org: "Ha Tinh Power Company (PC Ha Tinh, EVN CPC)",
      period: "May 2021 – Jun 2022",
      tags: ["EVN CPC", "Distribution Grid", "Voltage Stability"],
      desc: "Grid simulation on PSS/ADEPT and DigSILENT PowerFactory to analyze reverse power flow, voltage swell, and protection coordination under high rooftop PV penetration."
    }
  ],

  // 5. Achievements Dataset
  achievements: [
    {
      id: "ach-1",
      title: "Battle of Minds 2021 — Global Innovation Challenge",
      rank: "1st Place Vietnam & 5th Place Globally",
      year: 2021,
      org: "BAT Global",
      desc: "Outperformed 200+ universities across Vietnam and competed among 650+ international teams from 13 countries with an innovative renewable energy sharing solution ($3,000 national prize)."
    },
    {
      id: "ach-2",
      title: "National Scientific Research Contest for University Students",
      rank: "2nd Prize (Ministry of Education & Training)",
      year: 2021,
      org: "MOET Vietnam",
      desc: "HUST representative team won Second Prize nationwide among 460+ research teams from 98 universities with deep learning solar radiation forecasting software."
    },
    {
      id: "ach-3",
      title: "Student Forum on Sustainable Energy & Electrical Engineering",
      rank: "Gold & Bronze Articles, Best Presentation",
      year: "2020 – 2022",
      org: "100RE Lab & HUST",
      desc: "Annual academic student forum attracting hundreds of student researchers. PV team won Gold Article; Hydrogen team won Best Presentation and Bronze Article in 2022."
    },
    {
      id: "ach-4",
      title: "ASEAN Energy Youth Awards & Youth For Climate Contest",
      rank: "Winner / Top Finalist",
      year: 2021,
      org: "ASEAN Centre for Energy (ACE) & UNDP",
      desc: "Recognized across Southeast Asia for pioneering clean energy solutions, community awareness programs, and youth-driven climate innovation."
    }
  ],

  // 6. News & Blog Articles (Full authentic publication dataset)
  news: [
    {
      id: "news-1",
      title: "Workshop: Strengthening Collaboration in Renewable Energy Education and Research between HUST and UoB",
      slug: "workshop-hust-uob-renewable-energy-collaboration",
      category: "International Collaboration",
      date: "Dec 12, 2025",
      readTime: "4 min read",
      author: "Khánh Đào",
      authorRole: "100RE Editorial Board",
      authorAvatar: "assets/images/logo.jpg",
      views: "1.4k views",
      image: "assets/images/banner_pv.jpg",
      imageCaption: "HUST and University of Bradford education and research collaboration workshop at the HUST Alumni building.",
      excerpt: "On December 10, 2025, HUST and the University of Bradford held a workshop at the Alumni building to discuss joint education pathways and renewable energy research.",
      tags: ["HUST", "University of Bradford", "Renewable Energy", "Transnational Education", "UK-Vietnam"],
      content: `
<p class="article-lead">On the morning of December 10, 2025, the workshop <strong>Research and Education Collaboration between Hanoi University of Science and Technology and the University of Bradford</strong> took place on the first floor of the HUST Alumni building. The event advanced the transnational education partnership and outlined pathways for transfer programs and renewable energy research.</p>
<p>University leaders, lecturers, and students attended to help shape the partnership and support the implementation of agreements between the two institutions.</p>
<h3>Representatives from both universities</h3>
<p><strong>University of Bradford, United Kingdom:</strong></p><ul><li><strong>Prof. Ben Whiteside</strong> — Director of the Institute of Digital and Sustainable Futures.</li><li><strong>Dr. Cường Đào</strong> — Director of the Renewable and Sustainable Energy MSc program.</li></ul>
<p><strong>Hanoi University of Science and Technology:</strong></p><ul><li><strong>Assoc. Prof. Nguyễn Hữu Thanh</strong> — Dean of the School of Electrical and Electronic Engineering.</li><li><strong>Assoc. Prof. Nguyễn Đức Tuyên</strong> — Head of 100RE Lab / PGRE.</li><li><strong>Assoc. Prof. Nguyễn Quốc Minh</strong> — Deputy Head of Electrical Engineering.</li><li><strong>Assoc. Prof. Trương Thu Hương</strong> — Deputy Head of Communications Engineering.</li></ul>
<blockquote>“International collaboration in education and research is key to equipping students with global capabilities and addressing the urgent challenges of Vietnam's energy transition.”<cite>— Assoc. Prof. Nguyễn Đức Tuyên, Head of 100RE Lab (translated from Vietnamese)</cite></blockquote>
<h3>Development strategy and dual-degree programs, 2026–2028</h3>
<p>Assoc. Prof. Nguyễn Đức Tuyên opened the workshop by discussing its context and the importance of international collaboration for students and lecturers during the global energy transition. Assoc. Prof. Nguyễn Quốc Minh then presented HUST's research capabilities and energy-related education programs, emphasizing the university's readiness to adopt advanced programs.</p>
<p>Dr. Cường Đào introduced the UK–Vietnam transnational education collaboration project, while Prof. Ben Whiteside shared the research priorities of the Institute of Digital and Sustainable Futures.</p>
<p>Assoc. Prof. Trương Thu Hương offered practical perspectives on research and study approaches in the United Kingdom and Vietnam, drawing on her international academic experience to encourage students and early-career lecturers.</p>
<p>Discussions covered trends, experience, and implementation plans for dual-degree programs, transfer pathways, and joint research groups. Both sides expressed their intention to implement these agreements during 2026–2028 and strengthen student and staff exchanges.</p>
<h3>Conclusions and future directions</h3>
<p>In his closing remarks, Assoc. Prof. Nguyễn Hữu Thanh emphasized that the event was the beginning of a long-term strategy to strengthen HUST's standing in global engineering education, extending beyond memoranda of understanding.</p>
<p>The HUST–UoB workshop highlighted the role of HUST and its School of Electrical and Electronic Engineering in transnational education and renewable energy workforce development, alongside their commitment to international cooperation and sustainable development in Vietnam.</p>
      `
    },
    {
      id: "news-2",
      title: "100RE Lab Member Phan Van Long in the Launching Ceremony of Special Report on Youth For Climate Action",
      slug: "phan-van-long-youth-for-climate-action-special-report",
      category: "Youth & Climate Action",
      date: "Oct 5, 2025",
      readTime: "4 min read",
      author: "100RE Media Team",
      authorRole: "Communications Lead",
      authorAvatar: "assets/images/logo.jpg",
      views: "1.1k views",
      image: "assets/images/banner_ai.jpg",
      imageCaption: "100RE Lab member Phan Văn Long with youth delegates and UNDP experts at the special report launch.",
      excerpt: "100RE Lab member Phan Văn Long joined the launch of the special report on Vietnamese youth climate action, highlighting the role of young engineers in the journey toward Net Zero 2050.",
      tags: ["Youth4Climate", "UNDP", "Climate Action", "Net Zero 2050", "HUST Engineers"],
      content: `
<p class="article-lead">In Hanoi, the United Nations Development Programme (UNDP), the Department of Climate Change under the Ministry of Natural Resources and Environment, and the Hồ Chí Minh Communist Youth Union jointly launched the special report <strong>Vietnamese Youth for Climate Action 2022–2025</strong>. 100RE Lab member and young engineer Phan Văn Long participated and contributed to the forum.</p>
<h3>Young people's role in the energy transition</h3>
<p>The report brings together initiatives, technological solutions, and green entrepreneurship models developed by young people and engineering students across Vietnam. Delegates discussed financial mechanisms, clean technology transfer, and career opportunities in renewable energy.</p>
<blockquote>“Young people are not only among those most affected by climate change. They are also a highly creative force in digital technology, artificial intelligence, and green engineering to deliver Vietnam's Net Zero 2050 commitment.”<cite>— UNDP Vietnam representative at the event (translated from Vietnamese)</cite></blockquote>
<h3>Practical contributions from 100RE Lab</h3>
<p>Phan Văn Long and the 100RE Lab research group introduced community education models for sustainable energy through SE4Y (Sustainable Energy for Youth), carbon emissions calculation tools, and rooftop solar solutions with BESS storage for rural areas.</p>
<p>Participation in national forums reflects the lab's commitment to connecting academic research with social responsibility and encouraging community climate action.</p>
      `
    },
    {
      id: "news-3",
      title: "Technical Seminar & Workshop on Hydrogen in Microgrids and HOMER Pro Simulation Tool",
      slug: "seminar-hydrogen-in-microgrids-homer-pro",
      category: "Scientific Workshops",
      date: "Oct 3, 2025",
      readTime: "3 min read",
      author: "Hydrogen Research Group",
      authorRole: "Technical Lead",
      authorAvatar: "assets/images/logo.jpg",
      views: "980 views",
      image: "assets/images/banner_hydrogen.jpg",
      imageCaption: "Technical seminar and hands-on HOMER Pro modeling session at the D9-300 laboratory.",
      excerpt: "The 100RE Lab Hydrogen Team held a technical seminar on hydrogen storage integration in microgrids and hands-on optimization using HOMER Pro.",
      tags: ["Hydrogen", "HOMER Pro", "Microgrid", "NREL", "Techno-Economic Analysis"],
      content: `
<p class="article-lead">The integration of <strong>green hydrogen</strong> into microgrids creates new opportunities for future power systems. To develop technical knowledge and research skills, the 100RE Lab Hydrogen Team held an internal technical seminar.</p>
<h3>Seminar topics</h3><ul>
<li><strong>Introduction to HOMER Pro:</strong> An internationally used simulation tool developed by NREL, supporting the optimal design of hybrid renewable energy systems.</li>
<li><strong>Electrolyzer and fuel cell modeling:</strong> Analysis of conversion efficiency when surplus wind and solar electricity is used for long-term hydrogen storage.</li>
<li><strong>Life-cycle cost optimization (LCOE and NPC):</strong> Techno-economic assessment for isolated grids and Net Zero industrial zones.</li></ul>
<blockquote>“Hydrogen can provide seasonal energy storage to address renewable curtailment when wind and solar generation exceed 50% of total load capacity.”<cite>Translated from the original seminar report.</cite></blockquote>
<p>More than 25 doctoral researchers, graduate students, and final-year students participated. They practiced building grid-connected and standalone supply scenarios in HOMER Pro under the guidance of senior researchers.</p>
      `
    },
    {
      id: "news-4",
      title: "100RE Lab Researchers Win Best Paper Award at GMSARN 2024 International Conference",
      slug: "gmsarn-2024-best-paper-award",
      category: "Awards & Recognition",
      date: "Nov 28, 2024",
      readTime: "3 min read",
      author: "100RE Editorial Board",
      authorRole: "Editorial Committee",
      authorAvatar: "assets/images/logo.jpg",
      views: "1.6k views",
      image: "assets/images/banner_smartgrid.jpg",
      imageCaption: "100RE Lab researchers receive a Best Paper Award certificate at GMSARN 2024.",
      excerpt: "The 100RE Lab research delegation received a Best Paper Award at the 18th GMSARN International Conference for research on islanding detection and frequency stability in BESS-integrated grids.",
      tags: ["GMSARN 2024", "Best Paper Award", "BESS", "Islanding Detection", "Smart Grid"],
      content: `
<p class="article-lead">At the <strong>18th GMSARN International Conference</strong>, hosted by Hanoi University of Science and Technology, a 100RE Lab research team received the scientific committee's <strong>Best Paper Award</strong>.</p>
<h3>The award-winning research</h3>
<p>The paper, <em>Adaptive Notch Filter-based islanding detection for grid-connected inverter with zero non-detection zone</em>, was authored by Assoc. Prof. Nguyễn Đức Tuyên, engineer Lê Ngọc Dũng, and Phạm Mạnh Hải, MSc.</p>
<p>The research developed an active control algorithm based on an adaptive notch filter (ANF). It detects islanding in fewer than two voltage cycles (under 40 ms) without distorting the current waveform, eliminating the non-detection zone.</p>
<p>The award recognizes the lab's sustained research efforts and international academic standards.</p>
      `
    },
    {
      id: "news-5",
      title: "100RE Lab Students Awarded Prestigious Sakura Science Exchange Scholarship in Japan",
      slug: "sakura-science-exchange-scholarship-japan-2023",
      category: "Awards & Scholarships",
      date: "Sep 18, 2023",
      readTime: "3 min read",
      author: "Student Affairs Committee",
      authorRole: "Student Chapter",
      authorAvatar: "assets/images/logo.jpg",
      views: "1.3k views",
      image: "assets/images/banner_wind.jpg",
      imageCaption: "100RE Lab members visit an electrical laboratory at Shibaura Institute of Technology (SIT), Tokyo.",
      excerpt: "Five young 100RE Lab members received fully funded Sakura Science Exchange Program 2023 scholarships for field research and study at Shibaura Institute of Technology, Japan.",
      tags: ["Sakura Science", "Japan Exchange", "Shibaura Institute of Technology", "Scholarship"],
      content: `
<p class="article-lead">The <strong>Sakura Science Exchange Program</strong>, funded by the Japan Science and Technology Agency (JST), awarded full scholarships to five outstanding students and researchers from 100RE Lab.</p>
<h3>Academic experiences in Tokyo and Kyoto</h3>
<p>During the ten-day visit, students:</p><ul><li>Worked at the Power Systems Laboratory of Shibaura Institute of Technology (SIT) under the guidance of Prof. Goro Fujita.</li><li>Visited a smart load dispatch center and a digital substation in Tokyo.</li><li>Presented at the Vietnam–Japan International Student Science Workshop.</li></ul>
<p>The program helped students develop independent research skills, explore advanced energy technologies, and expand their international collaboration networks.</p>
      `
    }
  ],

  // 7. Journey Events (13 Milestones)
  journey: [
    {
      id: "j-1",
      title: "100RE Lab General Meeting 2024",
      date: "July 2024",
      location: "Hanoi, Vietnam",
      image: "assets/images/banner_smartgrid.jpg",
      desc: "Annual gathering of 40+ lab members, supervisors, and alumni celebrating 6 years of 100RE Lab with research presentations and roadmap for 2024–2026."
    },
    {
      id: "j-2",
      title: "The 18th GMSARN International Conference (GMSARN 2024)",
      date: "November 2024",
      location: "HUST, Hanoi",
      image: "assets/images/banner_pv.jpg",
      desc: "Hosted at HUST on Smart Energy, Environment, and Sustainable Development in the Greater Mekong Subregion, featuring 5 research papers from 100RE Lab."
    },
    {
      id: "j-3",
      title: "CPESE 2023 International Conference in Japan",
      date: "September 2023",
      location: "Kyoto & Tokyo, Japan",
      image: "assets/images/banner_wind.jpg",
      desc: "Presenting cutting-edge renewable research at the 10th International Conference on Power and Energy Systems Engineering (CPESE 2023)."
    },
    {
      id: "j-4",
      title: "Energy Transition & Net Zero 2050 Roundtable",
      date: "29.08.2023",
      location: "Hanoi, Vietnam",
      image: "assets/images/banner_dr_uc.jpg",
      desc: "High-level panel discussion on Vietnam's energy transition, power development plan VIII (PDP8), and roadmap toward 100% renewable energy."
    },
    {
      id: "j-5",
      title: "Wind Power Advanced Training in DTU Denmark",
      date: "August 2023",
      location: "Technical University of Denmark (DTU)",
      image: "assets/images/banner_wind.jpg",
      desc: "Lab members participated in intensive wind turbine aerodynamics and grid integration training at DTU Wind Energy department."
    },
    {
      id: "j-6",
      title: "Washington D.C. Energy Transition Roundtable",
      date: "July 2023",
      location: "Washington D.C., USA",
      image: "assets/images/banner_hydrogen.jpg",
      desc: "Assoc. Prof. Nguyen Duc Tuyen presented Vietnam's clean energy policy and green hydrogen opportunities at the U.S. Clean EDGE Asia forum."
    },
    {
      id: "j-7",
      title: "100RE Lab Field Trip & Team Building 2023",
      date: "June 2023",
      location: "Ba Vi National Park, Hanoi",
      image: "assets/images/banner_bess.jpg",
      desc: "Annual retreat uniting all 9 research teams for outdoor activities, research sharing, and celebration after semester final exams."
    },
    {
      id: "j-8",
      title: "Sustainable Energy Training for Youth (SE4Y)",
      date: "June 2023",
      location: "Hanoi, Vietnam",
      image: "assets/images/banner_ai.jpg",
      desc: "Organized 2-day intensive training on sustainable energy technologies, green lifestyle, and international study orientation for 76 young trainees."
    },
    {
      id: "j-9",
      title: "ABB AVS Scholarship Award 2022",
      date: "December 2022",
      location: "Hanoi, Vietnam",
      image: "assets/images/banner_ev.jpg",
      desc: "100RE Lab researcher Nguyen Trong Thanh awarded the prestigious ABB Jurgen Dormann / AVS Scholarship for excellence in smart grid research."
    },
    {
      id: "j-10",
      title: "SVNCKH 2022 Scientific Contest",
      date: "May 2022",
      location: "HUST, Hanoi",
      image: "assets/images/banner_pv.jpg",
      desc: "AI Team members awarded 3rd place in HUST University Student Scientific Research Contest for solar radiation neural network forecasting."
    },
    {
      id: "j-11",
      title: "Sakura Science Exchange Program in Japan",
      date: "Feb 11 – 20, 2023",
      location: "Tokyo & Shibaura, Japan",
      image: "assets/images/banner_smartgrid.jpg",
      desc: "Funded by JST: 10-day research exchange visiting Daidan Research Center, Shibaura IT power laboratories, robotics showrooms, and master thesis defenses."
    },
    {
      id: "j-12",
      title: "SEATUC 2023 Conference in Thailand",
      date: "Feb 23 – 24, 2023",
      location: "Suranaree University of Technology, Thailand",
      image: "assets/images/banner_hydrogen.jpg",
      desc: "Hydrogen team members presented papers on fuel cell modeling and participated in campus technical visits and academic gala."
    },
    {
      id: "j-13",
      title: "2nd Regional CSO Energy Workshop & Training",
      date: "Feb 28 – Mar 2, 2023",
      location: "Siem Reap, Cambodia",
      image: "assets/images/banner_bess.jpg",
      desc: "Jointly organized by USAID, WWF, NREL, and BMZ-100RE MAP on regional civil-society energy advocacy and renewable energy mapping across Southeast Asia."
    }
  ],

  // 8. Featured Alumni Dataset (9 Featured Profiles + 21 Team Alumni)
  featuredAlumni: [
    {
      id: "feat-alumni-1",
      name: "Lê Viết Thịnh",
      labPeriod: "2/2019 – 8/2022",
      formerRole: "Former PV Lead and Lab Lead",
      currentPos: "PhD student @ Virginia Tech",
      teamCode: "pv",
      image: "assets/images/alumni/le_viet_thinh.png",
      email: "thinhle@vt.edu",
      phone: "",
      achievements: [
        "Publications: 4 journal papers, 5 conference papers",
        "Projects: 3 university projects (PV curve modeling - participant; Partial shading mitigation for enhancing PV generation - leader; Demand response - participant), 1 course project (Unit commitment in microgrid - leader)",
        "Contests: First place of Student forum 2020; Honor prize of Student research competition at HUST 2020",
        "Awards: Fellow, Vietnam Education Foundation Fellows and Scholars Association (Nov. 2021)"
      ],
      bio: "Former PV Lead and Lab Lead (1st Gen). Conducted research in partial shading mitigation and PV curve modeling before pursuing PhD studies at Virginia Tech."
    },
    {
      id: "feat-alumni-2",
      name: "Phan Văn Long",
      labPeriod: "4/2021 – 8/2023",
      formerRole: "Former H2 Lead and Lab Lead (2nd Gen)",
      currentPos: "Junior Engineer - OWC, ABL Group",
      teamCode: "hydrogen",
      image: "assets/images/alumni/phan_van_long.jpg",
      email: "phanlongbkhn123@gmail.com",
      phone: "(+84) 932392803",
      achievements: [
        "Research/Publications: 6 Journal Papers Q1, 1 International & 1 Domestic Journal Paper; 5+ International Conference Papers (UK, Japan, Singapore, Thailand), 2+ Domestic Conference Papers; 1 R&D Project (with OWC), 1 National Report (with UNDP)",
        "Projects: 3 Regional Level Projects (Topic: OWF, Floating PV, Hydrogen, Ammonia; with OWC as a Junior Engineer); 4 National Level Projects (Topic: RTS Policies, EV, Hydrogen, Energy; with Dr. Tuyen as a RA); 2 National Level Projects (Topic: Youth, Climate Change, Energy Transition; with UNDP as an individual consultant); 2 Local Projects (Topic: Electricity Safety, RTS; with Dr. Hai & Dr. Son as a RA)",
        "Contests: 7+ Contests (3 x 1st prize, 2 x 2nd prize, 2 x 3rd prize)",
        "Awards & Scholarships: 5+ awards & honors"
      ],
      bio: "Former Green Hydrogen Lead and 2nd Gen Lab Lead. Authored 6 Q1 papers, led regional offshore wind & hydrogen studies, and consulted on national climate policy reports with UNDP."
    },
    {
      id: "feat-alumni-3",
      name: "Trần Quốc Ngữ",
      labPeriod: "6/2019 – 1/2022",
      formerRole: "Former UC-DR Member",
      currentPos: "SCADA Engineer at Toshiba Transmission & Distribution Vietnam (TTDV)",
      teamCode: "dr_uc",
      image: "assets/images/alumni/tran_quoc_ngu.jpg",
      email: "ngu.tranquoc.bscee@gmail.com",
      phone: "+84 343828333",
      achievements: [
        "Publications: 1 journal paper, 2 conference papers",
        "Projects: 1 university project (Demand Response)",
        "Contests: 4th place at Student Research Competition HUST 2020",
        "Awards: Power system Alumni Scholarship 2020"
      ],
      bio: "Former core member of Demand Response & Unit Commitment Team. Conducted research on power system demand response before joining Toshiba Transmission & Distribution Vietnam as a SCADA Engineer."
    },
    {
      id: "feat-alumni-4",
      name: "Đỗ Văn Long",
      labPeriod: "11/2019 – 8/2022",
      formerRole: "Former UC-DR Lead",
      currentPos: "Engineer at Power Market Operation Department, National Load Dispatch Centre (A0)",
      teamCode: "dr_uc",
      image: "assets/images/alumni/do_van_long.jpg",
      email: "",
      phone: "0967 559 475",
      achievements: [
        "Research/Publications: 2 Journal Papers (Q1: 1, Q2: 1), 2 Domestic Journal Papers; 2 International Conference Papers, 2 Domestic Conference Papers",
        "Projects: 1 University Project (Topic: Demand Response)"
      ],
      bio: "Former Unit Commitment & Demand Response Team Lead. Published high-impact papers in Q1/Q2 journals on economic dispatch and power market modeling. Currently operating at National Load Dispatch Centre (A0)."
    },
    {
      id: "feat-alumni-5",
      name: "Nguyễn Văn Thức",
      labPeriod: "1/2020 – 8/2022",
      formerRole: "Former Wind Member",
      currentPos: "Primary Equipment Engineer at Toshiba Transmission & Distribution Vietnam (TTDV)",
      teamCode: "wind",
      image: "assets/images/alumni/nguyen_van_thuc.jpg",
      email: "nguyenthuc0510@gmail.com",
      phone: "+84 946583644",
      achievements: [
        "Projects: 1 university project (Topic: Wind power + PV), IE project (PV + HVDC + Calculation TRV + Use Comsol software to calculate and simulate leakage currents on insulators)",
        "Contests: Student Forum 2020",
        "Awards: Scholarship of Toshiba Vietnam; Scholarship of HUST"
      ],
      bio: "Former Wind Energy Team member. Specialized in Wind-PV integration, HVDC systems, TRV transient calculation, and COMSOL insulator leakage current simulation."
    },
    {
      id: "feat-alumni-6",
      name: "Vũ Xuân Sơn Hữu",
      labPeriod: "5/2019 – 8/2022",
      formerRole: "Former AI Lead",
      currentPos: "Engineer at Renewable Energy Management Department, National Load Dispatch Centre (A0)",
      teamCode: "ai",
      image: "assets/images/alumni/vu_xuan_son_huu.jpg",
      email: "huu.vuxuanson1999@gmail.com",
      phone: "+84 352035317",
      achievements: [
        "Publications: 1 journal paper (Q2); 5 international conference papers",
        "Projects: 3 university projects (participant)",
        "Contests: Student research competition at HUST 2021 (leader) - 1st; Student research competition at MoET 2021 (leader) - 2nd",
        "Awards: Google’s TensorFlow Developer Certificate"
      ],
      bio: "Former AI Team Lead. Led the team to 1st Prize at HUST and 2nd Prize at MoET National Student Research Competitions with AI-driven renewable forecasting models."
    },
    {
      id: "feat-alumni-7",
      name: "Trần Hoàng Ánh",
      labPeriod: "8/2020 – 8/2022",
      formerRole: "Former Wind Member",
      currentPos: "Electrical Design Engineer at Advanced Information Technologies Corporation (AIT)",
      teamCode: "wind",
      image: "assets/images/alumni/tran_hoang_anh.jpg",
      email: "anhs.th1879@gmail.com",
      phone: "+84 964968726",
      achievements: [
        "Projects: 1 university project (Topic: Power Supply Systems), IE project (Calculating the power flow of Vietnam's 220kV and 500kV power grid)",
        "Contests: Student Forum 2020",
        "Awards: Scholarship of Lotte Vietnam; Tran Dai Nghia Scholarship"
      ],
      bio: "Former Wind Team member. Conducted extensive power flow calculations for Vietnam's 220kV and 500kV national transmission grid and recipient of Tran Dai Nghia & Lotte scholarships."
    },
    {
      id: "feat-alumni-8",
      name: "Nguyễn Huy Tiên",
      labPeriod: "2/2021 – 8/2023",
      formerRole: "Former Wind Lead",
      currentPos: "Wind Energy Specialist & Development Engineer",
      teamCode: "wind",
      image: "assets/images/alumni/nguyen_huy_tien.jpg",
      email: "",
      phone: "+84 373282058",
      achievements: [
        "Publications: 1 Journal Paper, 1 Domestic Journal Paper",
        "Projects: EVN project (Topic: PV)",
        "Awards: International Intern Research Program"
      ],
      bio: "Former Wind Energy Team Lead. Researched wind energy conversion systems and solar PV grid integration for EVN, participating in international research exchange programs."
    },
    {
      id: "feat-alumni-9",
      name: "Hoàng Nhật",
      labPeriod: "7/2020 – 8/2023",
      formerRole: "Former EV Lead",
      currentPos: "Power Electronics & EV Systems Engineer",
      teamCode: "ev",
      image: "assets/images/alumni/hoang_nhat.png",
      email: "hoangnhat27102k@gmail.com",
      phone: "+84 333575592",
      achievements: [
        "Projects: 3 projects (VIETSE on BESS, GREENID on EV, 100RELab on PV)",
        "Publications: 3 conferences (2 on Student Forum 2020/2021, 1 on IEEE CPESE 2023); 1 journal rank Q4 (IOP Science: Environmental and Earth)",
        "Contests: Student Forum 2020, Student Forum 2021",
        "Awards: 4+ awards and scholarships"
      ],
      bio: "Former Electric Vehicle Team Lead. Led projects on EV smart charging with GREENID and BESS deployment with VIETSE, publishing across IEEE CPESE and IOP Science."
    }
  ],

  // Team Alumni Directory (21 Members)
  teamAlumni: [
    { id: "team-alumni-1", name: "Nguyen Dang Duong", team: "PV Team", teamCode: "pv", image: "assets/images/alumni/nguyen_dang_duong.png" },
    { id: "team-alumni-2", name: "Dao Quang Tung", team: "PV Team", teamCode: "pv", image: "assets/images/alumni/dao_quang_tung.jpg" },
    { id: "team-alumni-3", name: "Hoang Tuan Linh", team: "Unit Commitment Team", teamCode: "dr_uc", image: "assets/images/alumni/hoang_tuan_linh.png" },
    { id: "team-alumni-4", name: "Ta Xuan Hung", team: "Unit Commitment Team", teamCode: "dr_uc", image: "assets/images/alumni/ta_xuan_hung.jpg" },
    { id: "team-alumni-5", name: "Le Hanh Duc", team: "Wind Team", teamCode: "wind", image: "assets/images/alumni/le_hanh_duc.jpg" },
    { id: "team-alumni-6", name: "Nguyen Trung Hai", team: "Wind Team", teamCode: "wind", image: "assets/images/alumni/nguyen_trung_hai.png" },
    { id: "team-alumni-7", name: "Nguyen Sy Quan", team: "Smart Grid Team", teamCode: "smartgrid", image: "assets/images/alumni/nguyen_sy_quan.jpg" },
    { id: "team-alumni-8", name: "Vo Ba Linh", team: "Smart Grid Team", teamCode: "smartgrid", image: "assets/images/alumni/vo_ba_linh.jpg" },
    { id: "team-alumni-9", name: "Tran Minh Khoi", team: "Smart Grid Team", teamCode: "smartgrid", image: "assets/images/alumni/tran_minh_khoi.jpg" },
    { id: "team-alumni-10", name: "Tran Dinh Le Hoang", team: "Smart Grid Team", teamCode: "smartgrid", image: "assets/images/alumni/tran_dinh_le_hoang.jpg" },
    { id: "team-alumni-11", name: "Tran Minh Tuan", team: "Electric Vehicle Team", teamCode: "ev", image: "assets/images/alumni/tran_minh_tuan.jpg" },
    { id: "team-alumni-12", name: "Do Chi Kien", team: "Hydrogen Team", teamCode: "hydrogen", image: "assets/images/alumni/do_chi_kien.jpg" },
    { id: "team-alumni-13", name: "Hoang Hieu Long", team: "Hydrogen Team", teamCode: "hydrogen", image: "assets/images/alumni/hoang_hieu_long.jpg" },
    { id: "team-alumni-14", name: "Nguyen Manh Khai", team: "Hydrogen Team", teamCode: "hydrogen", image: "assets/images/alumni/nguyen_manh_khai.jpg" },
    { id: "team-alumni-15", name: "Le Thi Minh Lien", team: "BESS Team", teamCode: "bess", image: "assets/images/alumni/le_thi_minh_lien.jpg" },
    { id: "team-alumni-16", name: "Ta Duy Bach", team: "BESS Team", teamCode: "bess", image: "assets/images/alumni/ta_duy_bach.png" },
    { id: "team-alumni-17", name: "Vu Quoc Anh", team: "BESS Team", teamCode: "bess", image: "assets/images/alumni/vu_quoc_anh.jpg" },
    { id: "team-alumni-18", name: "Nguyen Dinh Phu Nghia", team: "BESS Team", teamCode: "bess", image: "assets/images/alumni/nguyen_dinh_phu_nghia.jpg" },
    { id: "team-alumni-19", name: "Nguyen Trong Thanh", team: "AI Team", teamCode: "ai", image: "assets/images/alumni/nguyen_trong_thanh.png" },
    { id: "team-alumni-20", name: "Nguyen H. Minh Giang", team: "AI Team", teamCode: "ai", image: "assets/images/alumni/nguyen_hoang_minh_giang.png" },
    { id: "team-alumni-21", name: "Do Dinh Hieu", team: "AI Team", teamCode: "ai", image: "assets/images/alumni/do_dinh_hieu.jpg" }
  ],


  // 9. Collaborations Dataset
  collaborations: {
    academic: [
      { name: "Nagoya University", country: "Japan", icon: "fa-graduation-cap" },
      { name: "Shibaura Institute of Technology", country: "Japan", icon: "fa-graduation-cap" },
      { name: "Nanyang Technological University (NTU)", country: "Singapore", icon: "fa-graduation-cap" },
      { name: "Tokyo University of Science", country: "Japan", icon: "fa-graduation-cap" },
      { name: "University of the Ryukyus", country: "Japan", icon: "fa-graduation-cap" },
      { name: "Gifu University", country: "Japan", icon: "fa-graduation-cap" },
      { name: "Hanoi University of Science and Technology (HUST)", country: "Vietnam", icon: "fa-graduation-cap" },
      { name: "Electric Power University (EPU)", country: "Vietnam", icon: "fa-graduation-cap" },
      { name: "Hanoi University of Industry (HaUI)", country: "Vietnam", icon: "fa-graduation-cap" },
      { name: "Ho Chi Minh City University of Technology (HCMUT)", country: "Vietnam", icon: "fa-graduation-cap" }
    ],
    industry: [
      { name: "TOSHIBA", role: "Power & Industrial Systems", icon: "fa-building" },
      { name: "EVN (Vietnam Electricity)", role: "National Power Utility", icon: "fa-bolt" },
      { name: "GIZ", role: "German Development Cooperation", icon: "fa-globe" },
      { name: "AFTER FIT", role: "Solar & Wind Developer (Japan)", icon: "fa-solar-panel" },
      { name: "SHIZEN ENERGY", role: "Renewable Energy (Japan)", icon: "fa-leaf" },
      { name: "NIRAS", role: "International Engineering Consultancy", icon: "fa-compass-drafting" },
      { name: "VIETSE", role: "Energy Transition Initiative", icon: "fa-chart-pie" },
      { name: "ATS JSC", role: "Substation Automation & SCADA", icon: "fa-network-wired" },
      { name: "AIT (Asian Institute of Technology)", role: "Regional Technology Institute", icon: "fa-building-columns" }
    ],
    individuals: [
      { name: "Prof. Goro Fujita", affiliation: "Shibaura Institute of Technology, Japan" },
      { name: "Prof. Junji Kondoh", affiliation: "Tokyo University of Science, Japan" },
      { name: "Prof. Toshihisa Funabashi", affiliation: "Nagoya University, Japan" },
      { name: "Prof. Takeyoshi Kato", affiliation: "Nagoya University, Japan" },
      { name: "Dr. Tuyen Vu", affiliation: "Clarkson University, USA" },
      { name: "Prof. Yuan-Kang Wu", affiliation: "National Chung Cheng University, Taiwan" },
      { name: "Dr. Samet Biricik", affiliation: "European University of Lefke" },
      { name: "Dr. Dang Hoang Anh", affiliation: "Electric Power University, Vietnam" }
    ]
  },

  // 10. Lab Equipment Dataset (20 Items)
  equipment: [
    {
      id: "eq-1",
      name: "Solar Power System (Rooftop)",
      model: "3.6 kW On-Grid SCADA",
      specs: [
        { label: "Location", value: "Building D9, HUST" },
        { label: "Capacity", value: "3.6 kWp" },
        { label: "Inverter", value: "Growatt 3600MTL-S" },
        { label: "Features", value: "DAQ, Automated Relay Matrix" }
      ]
    },
    {
      id: "eq-2",
      name: "Digital Storage Oscilloscope",
      model: "Siglent SDS1052DL+",
      specs: [
        { label: "Bandwidth", value: "50 MHz, 2 Channels" },
        { label: "Sample Rate", value: "500 MSa/s" },
        { label: "Display", value: "7-inch TFT-LCD Color" },
        { label: "Interface", value: "USB Host, USB Device, LAN" }
      ]
    },
    {
      id: "eq-3",
      name: "Programmable DC Electronic Load",
      model: "Itech IT8200 Series",
      specs: [
        { label: "Modes", value: "CV / CC / CR / CP" },
        { label: "Testing", value: "Short-circuit & Battery Test" },
        { label: "Protection", value: "OVP, OCP, OPP, OTP" },
        { label: "Resolution", value: "1 mV / 1 mA" }
      ]
    },
    {
      id: "eq-4",
      name: "High Regulation DC Power Supply",
      model: "GW Instek SPS-606",
      specs: [
        { label: "Voltage", value: "0 – 60 V DC" },
        { label: "Current", value: "0 – 6 A" },
        { label: "Regulation", value: "CV <= 0.01% + 3mV" },
        { label: "Features", value: "Over-voltage Protection" }
      ]
    },
    {
      id: "eq-5",
      name: "Memory Data Logger",
      model: "Hioki 8430-20 & PW 8198",
      specs: [
        { label: "Channels", value: "10 Isolated Analog Channels" },
        { label: "Sampling", value: "10 ms on all channels" },
        { label: "Storage", value: "CF Card & USB Drive" },
        { label: "Origin", value: "Japan" }
      ]
    },
    {
      id: "eq-6",
      name: "Industrial Solar Power Meter",
      model: "Tenmars TM-207",
      specs: [
        { label: "Range", value: "2000 W/m² (634 BTU)" },
        { label: "Accuracy", value: "+/- 10 W/m²" },
        { label: "Sensor", value: "External Photodiode Sensor" },
        { label: "Function", value: "Solar irradiance measurement" }
      ]
    },
    {
      id: "eq-7",
      name: "Precision True RMS Multimeter",
      model: "Fluke 289 Data Logging",
      specs: [
        { label: "Display", value: "50,000 Counts TrendCapture" },
        { label: "Logging", value: "Up to 10,000 readings" },
        { label: "Bandwidth", value: "100 kHz AC True RMS" },
        { label: "Low Pass", value: "Accurate motor drive voltage" }
      ]
    },
    {
      id: "eq-8",
      name: "Control System Design Experimental Kit",
      model: "TechShare Experimental Platform",
      specs: [
        { label: "Provider", value: "TechShare Japan" },
        { label: "Application", value: "MATLAB/Simulink Real-Time" },
        { label: "Components", value: "Inverter, Motor, Sensors" },
        { label: "Purpose", value: "Inverter & Motor Control" }
      ]
    },
    {
      id: "eq-9",
      name: "On-Grid Solar Inverter",
      model: "Growatt 3600MTL-S",
      specs: [
        { label: "Rated Power", value: "3.6 kW" },
        { label: "MPPT", value: "Dual MPPT Trackers" },
        { label: "Max Efficiency", value: "97.9%" },
        { label: "Communication", value: "RS485, Wi-Fi" }
      ]
    },
    {
      id: "eq-10",
      name: "AC Magnetic Contactor",
      model: "Fuji SC-N1 Series",
      specs: [
        { label: "Contacts", value: "2 NO + 2 NC Auxiliaries" },
        { label: "Coil Voltage", value: "220V AC 50/60Hz" },
        { label: "Origin", value: "Fuji Electric, Japan" },
        { label: "Application", value: "Automated Grid Isolation" }
      ]
    },
    {
      id: "eq-11",
      name: "High-Performance Workstation 1 (AI & ML)",
      model: "Ryzen 7 3700X / 32GB RAM",
      specs: [
        { label: "CPU", value: "AMD Ryzen 7 3700X (8C/16T)" },
        { label: "RAM", value: "32 GB DDR4 3200MHz" },
        { label: "Display", value: "Samsung S24R35x IPS" },
        { label: "Purpose", value: "Deep Learning & ANN Training" }
      ]
    },
    {
      id: "eq-12",
      name: "Power System Simulation Workstation 2",
      model: "Ryzen 5 5600X / 16GB RAM",
      specs: [
        { label: "CPU", value: "AMD Ryzen 5 5600X (6C/12T)" },
        { label: "RAM", value: "16 GB DDR4 3200MHz" },
        { label: "GPU", value: "Radeon RX550" },
        { label: "Software", value: "DigSILENT, PSCAD, MATLAB" }
      ]
    }
  ],

  // 11. Useful Links Dataset
  usefulLinks: [
    {
      title: "NREL (National Renewable Energy Laboratory) Data & Tools",
      category: "dataset",
      url: "https://www.nrel.gov/research/data-tools.html",
      desc: "Comprehensive solar radiation (NSRDB), wind resource database, and PVWatts calculator."
    },
    {
      title: "IEEE Power & Energy Society (PES)",
      category: "academic",
      url: "https://www.ieee-pes.org/",
      desc: "Global forum for sharing technological developments in the electric power industry."
    },
    {
      title: "HOMER Energy (Microgrid Simulation Software)",
      category: "software",
      url: "https://www.homerenergy.com/",
      desc: "Industry standard tool for optimizing hybrid renewable microgrid systems and hydrogen storage."
    },
    {
      title: "DigSILENT PowerFactory",
      category: "software",
      url: "https://www.digsilent.de/en/powerfactory.html",
      desc: "Leading power system analysis software for transmission, distribution, and renewable grid connection."
    },
    {
      title: "IRENA (International Renewable Energy Agency)",
      category: "standards",
      url: "https://www.irena.org/",
      desc: "Global renewable energy statistics, cost reduction trends, and policy frameworks."
    },
    {
      title: "Vietnam Electricity Regulatory Authority (ERAV)",
      category: "energy-market",
      url: "https://erav.vn/",
      desc: "Regulatory documents, competitive electricity market rules, and clean energy tariff decrees in Vietnam."
    }
  ],

  // 12. Photos Gallery Dataset
  photos: [
    { id: "photo-1", title: "PV Team Banner & Solar Research", category: "teams", caption: "PV Team research testbed and rooftop solar installation at Building D9.", image: "assets/images/banner_pv.jpg" },
    { id: "photo-2", title: "AI Team Deep Learning Platform", category: "teams", caption: "Deep learning models SAM-LSTM for solar irradiance and wind power forecasting.", image: "assets/images/banner_ai.jpg" },
    { id: "photo-3", title: "Demand Response & Unit Commitment Team", category: "teams", caption: "Microgrid power dispatch, MILP optimization, and electricity market simulation.", image: "assets/images/banner_dr_uc.jpg" },
    { id: "photo-4", title: "Wind Energy Research Cluster", category: "teams", caption: "Wind turbine aerodynamics, LVRT capability, and grid stability testbed.", image: "assets/images/banner_wind.jpg" },
    { id: "photo-5", title: "Smart Grid & SCADA Automation", category: "teams", caption: "Intelligent microgrid control, cybersecurity, and IEC 61850 substation integration.", image: "assets/images/banner_smartgrid.jpg" },
    { id: "photo-6", title: "Electric Vehicle & V2G Infrastructure", category: "teams", caption: "EV smart charging algorithms and Vehicle-to-Grid distribution grid impact.", image: "assets/images/banner_ev.jpg" },
    { id: "photo-7", title: "Green Hydrogen Production & Fuel Cell", category: "teams", caption: "Renewable electrolysis coupling, fuel cell efficiency, and hydrogen supply chains.", image: "assets/images/banner_hydrogen.jpg" },
    { id: "photo-8", title: "Battery Energy Storage Systems (BESS)", category: "teams", caption: "Utility-scale BESS frequency regulation and battery degradation modeling.", image: "assets/images/banner_bess.jpg" }
  ]
};

// Recognize unchanged legacy news copy without replacing editor-authored content.
window.LAB_LEGACY_NEWS_HASHES = {"news-1":{"imageCaption":1506782824,"excerpt":2510673181,"content":2014217281},"news-2":{"imageCaption":4027896952,"excerpt":2726447347,"content":957324392},"news-3":{"imageCaption":892201382,"excerpt":4152682024,"content":2266569930},"news-4":{"imageCaption":2934563239,"excerpt":1608934480,"content":1387763234},"news-5":{"imageCaption":2217461832,"excerpt":1980064137,"content":466216938}};
