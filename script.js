// 搜索功能
document.getElementById('search').addEventListener('input', function(e) {
    const searchText = e.target.value.toLowerCase();
    const links = document.querySelectorAll('.sidebar a');
    links.forEach(link => {
        const text = link.textContent.toLowerCase();
        link.parentElement.style.display = text.includes(searchText) ? 'block' : 'none';
    });
});

// 子菜单切换功能
document.querySelectorAll('.toggle').forEach(toggle => {
    toggle.addEventListener('click', function(e) {
        e.preventDefault(); // 阻止默认锚点跳转
        const submenu = this.nextElementSibling; // 获取紧邻的子菜单
        submenu.classList.toggle('active'); // 切换 active 类
    });
});