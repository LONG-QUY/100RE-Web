"""Regenerate public navigation: python scripts/build_public_navigation.py."""
from pathlib import Path
from html import escape
import re

ROOT = Path(__file__).resolve().parents[1]
# Label, destination, child destinations. Workspace is deliberately excluded.
NAVIGATION = [
    ('About Lab', 'index.html', []),
    ('Publications', 'publications.html', []),
    ('Research Teams', 'research-areas.html', [
        ('8 Research Teams', 'research-areas.html'),
        ('Researchers & Members', 'members.html'),
        ('Lab Alumni', 'alumni.html'),
        ('Research Projects', 'projects.html'),
        ('Research Experiences', 'research-experiences.html')]),
    ('News & Activities', 'news.html', [
        ('News', 'news.html'), ('Lab Journey', 'journey.html'),
        ('Gallery & Activities', 'photos.html')]),
    ('Collaborators & Funding', 'collaborations.html', [
        ('Collaborators', 'collaborations.html'),
        ('Funding & Support', 'collaborations.html#funding'),
        ('Support the Lab', 'fund-raise.html')]),
    ('Digital Systems & SCADA', 'mini-scada.html', [
        ('Digital Systems & SCADA', 'mini-scada.html'),
        ('Equipment & Testbeds', 'lab-equipment.html'),
        ('Useful Links', 'useful-links.html')]),
    ('How to Join Us', 'join-us.html', [])
]

def render(page):
    items = []
    for index, (label, href, children) in enumerate(NAVIGATION):
        active = page == href or any(page == url.split('#')[0] for _, url in children)
        if page == 'about.html' and href == 'index.html':
            active = True
        current = ' aria-current="page"' if page == href else ''
        link = f'<a href="{href}" class="nav-link{" active" if active else ""}"{current}>{escape(label)}</a>'
        if children:
            menu_id = f'public-submenu-{index}'
            link += f'<button type="button" class="nav-submenu-toggle" aria-label="Show {escape(label)} menu" aria-expanded="false" aria-controls="{menu_id}"><i class="fa-solid fa-chevron-down" aria-hidden="true"></i></button>'
            link += f'<ul class="dropdown-menu" id="{menu_id}">'
            for child, url in children:
                link += f'<li class="dropdown-item"><a href="{url}">{escape(child)}</a></li>'
            link += '</ul>'
        items.append(f'<li class="nav-item{" has-dropdown" if children else ""}">{link}</li>')
    items.append('<li class="nav-item" id="loginNavItem"><button class="nav-link btn-nav-login" id="navLoginBtn"><i class="fa-solid fa-lock" aria-hidden="true"></i> Login</button></li>')
    return '<nav aria-label="Main navigation"><ul class="nav-menu" id="navMenu">\n' + '\n'.join(items) + '\n</ul></nav>'

if __name__ == '__main__':
    for path in (ROOT / 'Frontend').glob('*.html'):
        original = path.read_bytes()
        newline = '\r\r\n' if b'\r\r\n' in original else '\r\n' if b'\r\n' in original else '\n'
        source = original.decode('utf-8').replace('\r\r\n', '\n').replace('\r\n', '\n')
        source, count = re.subn(r'<nav>\s*<ul class="nav-menu" id="navMenu">.*?</nav>|<nav aria-label="Main navigation">.*?</nav>', render(path.name), source, count=1, flags=re.S)
        if count:
            source = source.replace('id="mobileToggle" aria-label="Toggle navigation"', 'id="mobileToggle" aria-label="Toggle navigation" aria-controls="navMenu" aria-expanded="false"')
            source = re.sub(r'(assets/js/public-site\.js)(?:\?[^"\s]*)?', r'\1?v=public-navigation-20261114', source)
            source = re.sub(r'(assets/css/style\.css)(?:\?[^"\s]*)?', r'\1?v=public-navigation-20261114', source)
            path.write_bytes(source.replace('\n', newline).encode('utf-8'))
            print(path.name)
