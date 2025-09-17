let sidebarOpen = false;

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');

    sidebarOpen = !sidebarOpen;

    if (sidebarOpen) {
        sidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    } else {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

//Handle nav item clicks
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();

        //Remove active class from all times
        document.querySelectorAll('.nav-item').forEach(nav => {
            nav.classList.remove('active');
        });

        //Add active class to clicked item
        item.classList.add('active');

        //Close sidebar after selection
        setTimeout(() => {
            toggleSidebar();
        }, 200);
    });
});

//Handle swipe gestures
let startX = 0;
let currentX = 0;
let isDragging = false;

document.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
});

document.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
});

document.addEventListener('touchedend', () => {
    if (!isDragging) return;

    const diff = currentX - startX;

    //Swipe right to open sidebar (from left edge)
    if (diff > 50 && startX < 50 && !sidebarOpen) {
        toggleSidebar();
    }

    //Swipe left to close sidebar
    if (diff < -50 && sidebarOpen) {
        closeSidebar();
    }

    isDragging = false;
});

//Add haptic feedbACK FOR Ios DEVICES
function addHapticFeedback() {
    if (window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate(50);
    }
}

//Add haptic feedback to buttons
document.querySelectorAll('button, .nav-item').forEach(element => {
    element.addEventListener('touchstart', addHapticFeedback);
});

function openDetail(type) {
    //Redirect to tthe detail page for the selected category
    window.location.href = 'sorting-guide.html?type=${type}';
}

