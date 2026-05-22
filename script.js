document.addEventListener('DOMContentLoaded', function() 
{
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');

    // Mappa pagina → parte del href del dropdown toggle da attivare
    const pageToDropdown = {
        'materie-professionali.html': 'Materie Professionali',
        'materie-umanistiche.html':   'Materie Umanistiche',
        'educazione-civica.html':     'Educazione Civica',
    };

    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href') || '';

        // Link diretto (es. index.html, pcto.html)
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
            return;
        }

        // Dropdown toggle: attiva se la pagina corrente corrisponde
        if (link.classList.contains('dropdown-toggle')) {
            const label = link.textContent.trim();
            if (pageToDropdown[currentPage] && label.includes(pageToDropdown[currentPage])) {
                link.classList.add('active');
            }
        }
    });
            
    const subjectLinks = document.querySelectorAll('.subject-nav a, .dropdown-item');
    const subjectSections = document.querySelectorAll('.subject-card');
    
    function updateActiveLink() {
        let currentSection = '';
        const scrollPosition = window.scrollY + 150;
        
        subjectSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = '#' + section.getAttribute('id');
            }
        });
        
        subjectLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentSection) {
                link.classList.add('active');
            }
        });
    }
    
    subjectLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if(this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if(targetElement) {
                    const dropdowns = document.querySelectorAll('.dropdown-menu.show');
                    dropdowns.forEach(dropdown => {
                        dropdown.classList.remove('show');
                    });
                    
                    subjectLinks.forEach(link => link.classList.remove('active'));
                    this.classList.add('active');
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();
});