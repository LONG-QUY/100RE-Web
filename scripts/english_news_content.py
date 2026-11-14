"""English translations of the existing Vietnamese news copy; names are retained."""
import json
import re
from pathlib import Path

ARTICLES = [
    (
        'HUST and University of Bradford education and research collaboration workshop at the HUST Alumni building.',
        'On December 10, 2025, HUST and the University of Bradford held a workshop at the Alumni building to discuss joint education pathways and renewable energy research.',
        '''<p class="article-lead">On the morning of December 10, 2025, the workshop <strong>Research and Education Collaboration between Hanoi University of Science and Technology and the University of Bradford</strong> took place on the first floor of the HUST Alumni building. The event advanced the transnational education partnership and outlined pathways for transfer programs and renewable energy research.</p>
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
<p>The HUST–UoB workshop highlighted the role of HUST and its School of Electrical and Electronic Engineering in transnational education and renewable energy workforce development, alongside their commitment to international cooperation and sustainable development in Vietnam.</p>'''
    ),
    (
        '100RE Lab member Phan Văn Long with youth delegates and UNDP experts at the special report launch.',
        '100RE Lab member Phan Văn Long joined the launch of the special report on Vietnamese youth climate action, highlighting the role of young engineers in the journey toward Net Zero 2050.',
        '''<p class="article-lead">In Hanoi, the United Nations Development Programme (UNDP), the Department of Climate Change under the Ministry of Natural Resources and Environment, and the Hồ Chí Minh Communist Youth Union jointly launched the special report <strong>Vietnamese Youth for Climate Action 2022–2025</strong>. 100RE Lab member and young engineer Phan Văn Long participated and contributed to the forum.</p>
<h3>Young people's role in the energy transition</h3>
<p>The report brings together initiatives, technological solutions, and green entrepreneurship models developed by young people and engineering students across Vietnam. Delegates discussed financial mechanisms, clean technology transfer, and career opportunities in renewable energy.</p>
<blockquote>“Young people are not only among those most affected by climate change. They are also a highly creative force in digital technology, artificial intelligence, and green engineering to deliver Vietnam's Net Zero 2050 commitment.”<cite>— UNDP Vietnam representative at the event (translated from Vietnamese)</cite></blockquote>
<h3>Practical contributions from 100RE Lab</h3>
<p>Phan Văn Long and the 100RE Lab research group introduced community education models for sustainable energy through SE4Y (Sustainable Energy for Youth), carbon emissions calculation tools, and rooftop solar solutions with BESS storage for rural areas.</p>
<p>Participation in national forums reflects the lab's commitment to connecting academic research with social responsibility and encouraging community climate action.</p>'''
    ),
    (
        'Technical seminar and hands-on HOMER Pro modeling session at the D9-300 laboratory.',
        'The 100RE Lab Hydrogen Team held a technical seminar on hydrogen storage integration in microgrids and hands-on optimization using HOMER Pro.',
        '''<p class="article-lead">The integration of <strong>green hydrogen</strong> into microgrids creates new opportunities for future power systems. To develop technical knowledge and research skills, the 100RE Lab Hydrogen Team held an internal technical seminar.</p>
<h3>Seminar topics</h3><ul>
<li><strong>Introduction to HOMER Pro:</strong> An internationally used simulation tool developed by NREL, supporting the optimal design of hybrid renewable energy systems.</li>
<li><strong>Electrolyzer and fuel cell modeling:</strong> Analysis of conversion efficiency when surplus wind and solar electricity is used for long-term hydrogen storage.</li>
<li><strong>Life-cycle cost optimization (LCOE and NPC):</strong> Techno-economic assessment for isolated grids and Net Zero industrial zones.</li></ul>
<blockquote>“Hydrogen can provide seasonal energy storage to address renewable curtailment when wind and solar generation exceed 50% of total load capacity.”<cite>Translated from the original seminar report.</cite></blockquote>
<p>More than 25 doctoral researchers, graduate students, and final-year students participated. They practiced building grid-connected and standalone supply scenarios in HOMER Pro under the guidance of senior researchers.</p>'''
    ),
    (
        '100RE Lab researchers receive a Best Paper Award certificate at GMSARN 2024.',
        'The 100RE Lab research delegation received a Best Paper Award at the 18th GMSARN International Conference for research on islanding detection and frequency stability in BESS-integrated grids.',
        '''<p class="article-lead">At the <strong>18th GMSARN International Conference</strong>, hosted by Hanoi University of Science and Technology, a 100RE Lab research team received the scientific committee's <strong>Best Paper Award</strong>.</p>
<h3>The award-winning research</h3>
<p>The paper, <em>Adaptive Notch Filter-based islanding detection for grid-connected inverter with zero non-detection zone</em>, was authored by Assoc. Prof. Nguyễn Đức Tuyên, engineer Lê Ngọc Dũng, and Phạm Mạnh Hải, MSc.</p>
<p>The research developed an active control algorithm based on an adaptive notch filter (ANF). It detects islanding in fewer than two voltage cycles (under 40 ms) without distorting the current waveform, eliminating the non-detection zone.</p>
<p>The award recognizes the lab's sustained research efforts and international academic standards.</p>'''
    ),
    (
        '100RE Lab members visit an electrical laboratory at Shibaura Institute of Technology (SIT), Tokyo.',
        'Five young 100RE Lab members received fully funded Sakura Science Exchange Program 2023 scholarships for field research and study at Shibaura Institute of Technology, Japan.',
        '''<p class="article-lead">The <strong>Sakura Science Exchange Program</strong>, funded by the Japan Science and Technology Agency (JST), awarded full scholarships to five outstanding students and researchers from 100RE Lab.</p>
<h3>Academic experiences in Tokyo and Kyoto</h3>
<p>During the ten-day visit, students:</p><ul><li>Worked at the Power Systems Laboratory of Shibaura Institute of Technology (SIT) under the guidance of Prof. Goro Fujita.</li><li>Visited a smart load dispatch center and a digital substation in Tokyo.</li><li>Presented at the Vietnam–Japan International Student Science Workshop.</li></ul>
<p>The program helped students develop independent research skills, explore advanced energy technologies, and expand their international collaboration networks.</p>'''
    )
]

if __name__ == '__main__':
    path = Path(__file__).resolve().parents[1] / 'Frontend/assets/js/data.js'
    source = path.read_text(encoding='utf-8')
    for index, (caption, excerpt, content) in enumerate(ARTICLES, 1):
        start = source.index(f'id: "news-{index}"')
        end = source.index('      `', source.index('content: `', start)) + len('      `')
        part = source[start:end]
        part = re.sub(r'imageCaption: ".*?",', lambda _: 'imageCaption: ' + json.dumps(caption, ensure_ascii=False) + ',', part)
        part = re.sub(r'excerpt: ".*?",', lambda _: 'excerpt: ' + json.dumps(excerpt, ensure_ascii=False) + ',', part)
        part = re.sub(r'content: `.*?`', lambda _: 'content: `\n' + content + '\n      `', part, flags=re.S)
        source = source[:start] + part + source[end:]
    source = source.replace('Tọa đàm Chuyển dịch Năng lượng & Net Zero 2050', 'Energy Transition & Net Zero 2050 Roundtable')
    path.write_text(source, encoding='utf-8')
