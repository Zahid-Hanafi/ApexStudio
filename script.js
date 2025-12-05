const presetBookings = [
    { date: '2025-01-15', service: 'Wedding Photography', user: 'Upin', status: 'Completed' },
    { date: '2025-01-20', service: 'Profile Photoshoot', user: 'Ipin', status: 'Completed' },
    { date: '2025-02-14', service: 'Convocation', user: 'Kak Ros', status: 'Completed' },
    { date: '2025-03-10', service: 'Convocation', user: 'Opah', status: 'Completed' },
    { date: '2025-03-15', service: 'Convocation', user: 'Mei Mei', status: 'Completed' },
    { date: '2025-04-05', service: 'Family Portrait', user: 'Tok Dalang', status: 'Completed' },
    { date: '2025-05-12', service: 'Fashion & Product', user: 'Uncle Muthu', status: 'Completed' },
    { date: '2025-05-20', service: 'Fashion & Product', user: 'Uncle AhTong', status: 'Completed' },
    { date: '2025-06-01', service: 'Wedding Photography', user: 'Jarjit', status: 'Completed' },
    { date: '2025-06-15', service: 'Wedding Photography', user: 'Ehsan', status: 'Completed' },
    { date: '2025-06-22', service: 'Newborn Photoshoot', user: 'Fizi', status: 'Completed' },
    { date: '2025-07-08', service: 'Profile Photoshoot', user: 'Mail', status: 'Completed' },
    { date: '2025-08-18', service: 'Convocation', user: 'Ijat', status: 'Completed' },
    { date: '2025-08-25', service: 'Convocation', user: 'Susanti', status: 'Completed' },
    { date: '2025-09-09', service: 'Family Portrait', user: 'Boboiboy', status: 'Completed' },
    { date: '2025-09-30', service: 'Profile Photoshoot', user: 'Ejen Ali', status: 'Completed' },
    { date: '2025-10-12', service: 'Wedding Photography', user: 'Doreamon', status: 'Completed' },
    { date: '2025-10-25', service: 'Newborn Photoshoot', user: 'Hagemaru', status: 'Completed' },
    { date: '2025-11-11', service: 'Fashion & Product', user: 'Shin Chan', status: 'Completed' },
    { date: '2025-11-20', service: 'Family Portrait', user: 'Didi', status: 'Completed' },
    { date: '2025-12-01', service: 'Wedding Photography', user: 'Nana', status: 'Pending' },
    { date: '2025-12-05', service: 'Convocation', user: 'Jojo', status: 'Confirmed' },
    { date: '2025-12-10', service: 'Newborn Photoshoot', user: 'Pak Atan', status: 'Pending' },
    { date: '2025-12-12', service: 'Family Portrait', user: 'Pak Beruang', status: 'Confirmed' },
    { date: '2025-12-15', service: 'Profile Photoshoot', user: 'Adudu', status: 'Pending' },
    { date: '2025-12-20', service: 'Wedding Photography', user: 'Gopal', status: 'Confirmed' },
    { date: '2025-12-24', service: 'Family Portrait', user: 'Yaya', status: 'Pending' },
    { date: '2025-12-25', service: 'Family Portrait', user: 'Yin', status: 'Confirmed' },
    { date: '2025-12-28', service: 'Fashion & Product', user: 'Tok Aba', status: 'Pending' },
    { date: '2025-12-30', service: 'Convocation', user: 'Omar Hana', status: 'Pending' }
];

document.addEventListener('DOMContentLoaded', function() {
    
    // 0. INIT DATA
    initBookingSystem();

    // 1. DASHBOARD USER DISPLAY
    const userNameDisplay = document.getElementById('displayUserName');
    if (userNameDisplay) {
        const storedName = localStorage.getItem('apex_name');
        userNameDisplay.innerText = storedName ? storedName : "Guest";
    }

    // 2. DASHBOARD STATS SYNC
    if (document.getElementById('totalCount')) {
        updateDashboardStats();
    }

    // 3. CHART VISUALIZATION (Dynamic)
    if (document.getElementById('monthlyChart')) {
        renderCharts();
    }

    // 4. AUTHENTICATION
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            localStorage.setItem('apex_name', document.getElementById('regName').value);
            localStorage.setItem('apex_user', document.getElementById('regUser').value);
            localStorage.setItem('apex_pass', document.getElementById('regPass').value);
            alert('Registration Successful! Please Login.');
            window.location.href = 'index.html';
        });
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const u = document.getElementById('username').value;
            const p = document.getElementById('password').value;
            if (u === localStorage.getItem('apex_user') && p === localStorage.getItem('apex_pass')) {
                window.location.href = 'dashboard.html';
            } else {
                document.getElementById('error-msg').classList.remove('d-none');
                document.getElementById('error-msg').innerText = "Invalid Credentials";
            }
        });
    }

    // 5. BOOKING FORM LOGIC
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const date = document.getElementById('bookDate').value;
            const service = document.getElementById('bookService').value;
            const currentUser = localStorage.getItem('apex_name') || 'Guest User';
            
            
            const allBookings = JSON.parse(localStorage.getItem('apex_bookings'));
            const isTaken = allBookings.some(b => b.date === date);

            if (isTaken) {
                document.getElementById('dateError').classList.remove('d-none');
            } else {
                document.getElementById('dateError').classList.add('d-none');
                
                allBookings.push({ date: date, service: service, user: currentUser, status: 'Confirmed' });
                
                allBookings.sort((a, b) => new Date(a.date) - new Date(b.date));
                localStorage.setItem('apex_bookings', JSON.stringify(allBookings));
                alert('Booking Confirmed!');
                location.reload();
            }
        });
    }

    // 6. RENDER TABLES 
    if (document.getElementById('allBookingsTableBody')) renderAllBookings();
    if (document.getElementById('myBookingTable')) renderMyBookings();
    if (document.getElementById('calendarGrid')) renderCalendar();
});



function initBookingSystem() {
    if (!localStorage.getItem('apex_bookings')) {
        localStorage.setItem('apex_bookings', JSON.stringify(presetBookings));
    }
}

function updateDashboardStats() {
    const bookings = JSON.parse(localStorage.getItem('apex_bookings')) || [];
    

    const total = bookings.length;
    const completed = bookings.filter(b => b.status === 'Completed').length;
    const pending = bookings.filter(b => b.status === 'Pending').length;

    
    document.getElementById('totalCount').innerText = total;
    document.getElementById('pendingCount').innerText = pending;
    document.getElementById('completedCount').innerText = completed;
}

function renderCharts() {
    const bookings = JSON.parse(localStorage.getItem('apex_bookings')) || [];

    
    const monthCounts = new Array(12).fill(0); 
    bookings.forEach(b => {
        const monthIndex = new Date(b.date).getMonth(); 
        if (!isNaN(monthIndex)) {
            monthCounts[monthIndex]++;
        }
    });

    
    const serviceMap = {};
    bookings.forEach(b => {
        
        let key = b.service; 
        if(serviceMap[key]) {
            serviceMap[key]++;
        } else {
            serviceMap[key] = 1;
        }
    });
    
    
    const serviceLabels = Object.keys(serviceMap);
    const serviceData = Object.values(serviceMap);

    
    const ctxBar = document.getElementById('monthlyChart');
    if (ctxBar) {
        new Chart(ctxBar, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Bookings per Month',
                    data: monthCounts, 
                    backgroundColor: '#0F7173', // Apex Teal
                    borderColor: '#0F7173',
                    borderWidth: 1,
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { 
                        beginAtZero: true,
                        ticks: { stepSize: 1 } 
                    }
                }
            }
        });
    }

    
    const ctxPie = document.getElementById('serviceChart');
    if (ctxPie) {
        new Chart(ctxPie, {
            type: 'doughnut',
            data: {
                labels: serviceLabels, 
                datasets: [{
                    data: serviceData, 
                    backgroundColor: [
                        '#0F7173', 
                        '#169A9D', 
                        '#27ae60', 
                        '#2c3e50', 
                        '#95a5a6', 
                        '#e67e22', 
                        '#8e44ad'  
                    ],
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'bottom' }
                }
            }
        });
    }
}

function renderAllBookings() {
    const tbody = document.getElementById('allBookingsTableBody');
    if (!tbody) return;
    const bookings = JSON.parse(localStorage.getItem('apex_bookings'));
    tbody.innerHTML = '';
    bookings.forEach(b => {
        let badge = b.status === 'Completed' ? 'bg-success' : (b.status === 'Confirmed' ? 'bg-primary' : 'bg-warning text-dark');
        tbody.innerHTML += `
            <tr>
                <td class="ps-4 fw-bold">${b.date}</td>
                <td>${b.service}</td>
                <td>${b.user}</td>
                <td><span class="badge ${badge}">${b.status}</span></td>
            </tr>`;
    });
}

function renderMyBookings() {
    const tbody = document.getElementById('myBookingTable');
    if (!tbody) return;
    const bookings = JSON.parse(localStorage.getItem('apex_bookings'));
    const user = localStorage.getItem('apex_name') || 'Guest User';
    const myBookings = bookings.filter(b => b.user === user);
    
    document.getElementById('myBookingCount').innerText = myBookings.length;
    tbody.innerHTML = '';
    
    if (myBookings.length === 0) {
        document.getElementById('noBookingMsg').classList.remove('d-none');
    } else {
        myBookings.forEach(b => {
            tbody.innerHTML += `
                <tr>
                    <td class="ps-4">${b.date}</td>
                    <td>${b.service}</td>
                    <td><span class="badge bg-primary">Confirmed</span></td>
                    <td class="text-end pe-4"><button onclick="deleteBooking('${b.date}')" class="btn btn-sm btn-outline-danger">Cancel</button></td>
                </tr>`;
        });
    }
}

function deleteBooking(date) {
    if(confirm('Cancel booking?')) {
        let bookings = JSON.parse(localStorage.getItem('apex_bookings'));
        bookings = bookings.filter(b => b.date !== date);
        localStorage.setItem('apex_bookings', JSON.stringify(bookings));
        location.reload();
    }
}

function renderCalendar() {
    const grid = document.getElementById('calendarGrid');
    if (!grid) return;
    const bookings = JSON.parse(localStorage.getItem('apex_bookings'));

    const bookedDates = bookings.map(b => b.date);
    
    for (let i = 1; i <= 31; i++) {
        let date = `2025-12-${i.toString().padStart(2, '0')}`;
        let isBooked = bookedDates.includes(date);
        let cls = isBooked ? 'booked' : 'available';
        grid.innerHTML += `<div class="col-2"><div class="calendar-day ${cls} rounded d-flex align-items-center justify-content-center border"><span class="${isBooked ? 'text-danger fw-bold' : ''}">${i}</span></div></div>`;
    }
}

function logout() {
    if(confirm('Log out?')) window.location.href = 'index.html';
}



function scrollToTop() {
    const duration = 1200; 
    const start = window.scrollY;
    const startTime = performance.now();

    
    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    function animation(currentTime) {
        const timeElapsed = currentTime - startTime;
        let progress = timeElapsed / duration;

        
        if (progress > 1) progress = 1;

        const val = easeOutCubic(progress);

        window.scrollTo(0, start * (1 - val));

        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}
