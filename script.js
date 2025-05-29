// 合并的DOMContentLoaded事件监听器
document.addEventListener('DOMContentLoaded', function() {
    // 自定义Prism.js高亮规则
    Prism.languages.pseudo = {
        'keyword': /\b(算法|输入|输出|如果|否则|对每个|初始化|返回)\b/,
        'string': /“[^”]+”/,
        'comment': /\/\/.*$/
    };

    // 确保Prism.js高亮应用
    Prism.highlightAll();

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
            const submenu = this.nextElementSibling; // 获取子菜单
            submenu.classList.toggle('active'); // 切换 active 类
            submenu.style.display = submenu.classList.contains('active') ? 'block' : 'none';
        });
    });

    // 默认展开子菜单
    document.querySelectorAll('.submenu').forEach(submenu => {
        submenu.classList.add('active');
        submenu.style.display = 'block';
    });

    // JSON内容折叠功能
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            const content = document.getElementById(targetId);
            const isCollapsed = content.classList.contains('collapsed');

            if (isCollapsed) {
                content.classList.remove('collapsed');
                button.classList.remove('collapsed');
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.classList.add('collapsed');
                button.classList.add('collapsed');
                content.style.maxHeight = '0';
            }
        });
    });

    // 全局展开/收缩按钮
    const toggleAllBtn = document.createElement('button');
    toggleAllBtn.textContent = '全部展开/收缩';
    toggleAllBtn.style.marginBottom = '1em';
    toggleAllBtn.style.padding = '0.5em 1em';
    toggleAllBtn.style.backgroundColor = '#007bff';
    toggleAllBtn.style.color = '#fff';
    toggleAllBtn.style.border = 'none';
    toggleAllBtn.style.borderRadius = '4px';
    toggleAllBtn.style.cursor = 'pointer';

    toggleAllBtn.addEventListener('click', () => {
        const allContents = document.querySelectorAll('.json-content');
        const allButtons = document.querySelectorAll('.toggle-btn');
        const allCollapsed = Array.from(allContents).every(content => content.classList.contains('collapsed'));

        allContents.forEach(content => {
            content.classList.toggle('collapsed', !allCollapsed);
            if (!allCollapsed) {
                content.style.maxHeight = '0';
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
        allButtons.forEach(button => {
            button.classList.toggle('collapsed', !allCollapsed);
        });
    });

    // 将全局按钮插入到第一个JSON容器之前
    const firstJsonContainer = document.querySelector('.json-container');
    firstJsonContainer.parentNode.insertBefore(toggleAllBtn, firstJsonContainer);
});